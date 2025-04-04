import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ContributionsPage = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [newContribution, setNewContribution] = useState({
    memberName: '',
    amount: '',
    date: '',
  });
  const [errors, setErrors] = useState({});

  const goal = 5000; // Example goal for contributions

  // Simulate loading 50 contributions
  useEffect(() => {
    setTimeout(() => {
      const sampleContributions = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        memberName: `Member ${index + 1}`,
        amount: (Math.random() * 100 + 50).toFixed(2), // Random amount between 50 and 150
        date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
          .toISOString()
          .split('T')[0], // Random date in 2023
      }));
      setContributions(sampleContributions);
      setLoading(false); // Stop loading after data is fetched
    }, 2000); // Simulate a 2-second delay
  }, []);

  // Calculate total contributions
  const totalContributions = contributions.reduce(
    (total, contribution) => total + parseFloat(contribution.amount || 0),
    0
  );

  // Calculate trends data dynamically from contributions
  const trendsData = contributions.reduce((acc, contribution) => {
    const month = new Date(contribution.date).toLocaleString('default', { month: 'long' });
    const existingMonth = acc.find((item) => item.month === month);
    if (existingMonth) {
      existingMonth.total += parseFloat(contribution.amount);
    } else {
      acc.push({ month, total: parseFloat(contribution.amount) });
    }
    return acc;
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!newContribution.memberName) newErrors.memberName = 'Member name is required.';
    if (!newContribution.amount || isNaN(newContribution.amount)) {
      newErrors.amount = 'Valid amount is required.';
    }
    if (!newContribution.date) newErrors.date = 'Date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle opening and closing dialogs
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewContribution({ memberName: '', amount: '', date: '' });
    setErrors({});
  };

  const handleOpenViewDialog = (contribution) => {
    setSelectedContribution(contribution);
    setOpenViewDialog(true);
  };
  const handleCloseViewDialog = () => setOpenViewDialog(false);

  // Handle adding a new contribution
  const handleAddContribution = () => {
    if (!validateForm()) return;

    const newId = contributions.length > 0 ? contributions[contributions.length - 1].id + 1 : 1;
    setContributions([...contributions, { id: newId, ...newContribution }]);
    handleCloseAddDialog();
  };

  // Handle deleting a contribution
  const handleDeleteContribution = (id) => {
    setContributions(contributions.filter((contribution) => contribution.id !== id));
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'memberName', headerName: 'Member Name', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenViewDialog(params.row)}
            style={{ marginRight: '8px' }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteContribution(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contributions Management
      </Typography>

      {/* Contribution Trends */}
      <Typography variant="h5" gutterBottom>
        Contribution Trends
      </Typography>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={trendsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Progress Bar */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '32px' }}>
        Contribution Goal Progress
      </Typography>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={20} />
      ) : (
        <Box sx={{ width: '100%', marginBottom: '16px' }}>
          <LinearProgress
            variant="determinate"
            value={(totalContributions / goal) * 100}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body1" align="center" sx={{ marginTop: '8px' }}>
            {`$${totalContributions.toFixed(2)} raised out of $${goal.toFixed(2)} (${(
              (totalContributions / goal) *
              100
            ).toFixed(2)}%)`}
          </Typography>
        </Box>
      )}

      {/* Financial Contributions Table */}
      <Typography variant="h5" gutterBottom>
        Financial Contributions
      </Typography>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={contributions}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            disableRowSelectionOnClick
          />
        </div>
      )}

      {/* Add Contribution Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Contribution</DialogTitle>
        <DialogContent>
          <TextField
            label="Member Name"
            fullWidth
            margin="normal"
            value={newContribution.memberName}
            onChange={(e) => setNewContribution({ ...newContribution, memberName: e.target.value })}
            error={!!errors.memberName}
            helperText={errors.memberName}
          />
          <TextField
            label="Amount"
            fullWidth
            margin="normal"
            value={newContribution.amount}
            onChange={(e) => setNewContribution({ ...newContribution, amount: e.target.value })}
            error={!!errors.amount}
            helperText={errors.amount}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newContribution.date}
            onChange={(e) => setNewContribution({ ...newContribution, date: e.target.value })}
            error={!!errors.date}
            helperText={errors.date}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddContribution} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Contribution Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} fullWidth maxWidth="sm">
        <DialogTitle>Contribution Details</DialogTitle>
        <DialogContent>
          {selectedContribution && (
            <div>
              <Typography variant="h6">Member Name: {selectedContribution.memberName}</Typography>
              <Typography>Amount: {selectedContribution.amount}</Typography>
              <Typography>Date: {selectedContribution.date}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContributionsPage;
