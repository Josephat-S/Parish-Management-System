import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const MembersPage = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      location: 'New York',
      role: 'Admin',
      dateOfRegistration: '2023-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      location: 'Los Angeles',
      role: 'Member',
      dateOfRegistration: '2023-02-10',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '555-123-4567',
      location: 'Chicago',
      role: 'Moderator',
      dateOfRegistration: '2023-03-05',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@example.com',
      phone: '444-987-6543',
      location: 'Houston',
      role: 'Member',
      dateOfRegistration: '2023-04-20',
    },
  ]);
  const [searchText, setSearchText] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Filter rows based on search text
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.email.toLowerCase().includes(searchText.toLowerCase()) ||
      member.phone.includes(searchText) ||
      member.location.toLowerCase().includes(searchText.toLowerCase()) ||
      member.role.toLowerCase().includes(searchText.toLowerCase())
  );

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'dateOfRegistration', headerName: 'Date of Registration', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewClick(params.row)}
            style={{ marginRight: '8px' }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setOpenDeleteDialog(true);
  };

  // Handle confirming the deletion
  const handleConfirmDelete = () => {
    setMembers((prevMembers) => prevMembers.filter((m) => m.id !== selectedMember.id));
    setOpenDeleteDialog(false);
    setSelectedMember(null);
  };

  // Handle canceling the deletion
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedMember(null);
  };

  // Handle viewing a member's details
  const handleViewClick = (member) => {
    setSelectedMember(member);
    setOpenViewDialog(true);
  };

  // Handle closing the view dialog
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedMember(null);
  };

  return (
    <div>
      <h1>Manage Members</h1>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredMembers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedMember?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Member Details Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Member Details</DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {selectedMember.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Email: {selectedMember.email}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Phone: {selectedMember.phone}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Location: {selectedMember.location}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Role: {selectedMember.role}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Date of Registration: {selectedMember.dateOfRegistration}
                </Typography>
              </CardContent>
            </Card>
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

export default MembersPage;