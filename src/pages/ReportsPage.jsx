import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState({
    members: [],
    contributions: [],
    other: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setReports({
        members: [
          { id: 1, name: 'John Doe', status: 'Active' },
          { id: 2, name: 'Jane Smith', status: 'Inactive' },
          { id: 3, name: 'Alice Johnson', status: 'Active' },
          { id: 4, name: 'Bob Brown', status: 'Inactive' },
          { id: 5, name: 'Charlie White', status: 'Active' },
          { id: 6, name: 'Diana Green', status: 'Inactive' },
        ],
        contributions: [
          { id: 1, name: 'John Doe', amount: 100 },
          { id: 2, name: 'Jane Smith', amount: 50 },
          { id: 3, name: 'Alice Johnson', amount: 75 },
          { id: 4, name: 'Bob Brown', amount: 20 },
          { id: 5, name: 'Charlie White', amount: 150 },
        ],
        other: [
          { id: 1, report: 'Event Attendance', details: '50 attendees' },
        ],
      });
      setLoading(false);
    }, 2000); // Simulate 2 seconds of loading
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderSkeleton = () => (
    <Box>
      <Skeleton variant="text" width="80%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ my: 2 }} />
    </Box>
  );

  const renderTable = (data, headers) => (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );

  const renderChart = (data) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Reports
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Members Report
        </Typography>
        {loading ? renderSkeleton() : renderTable(reports.members, ['ID', 'Name', 'Status'])}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contributions Report
        </Typography>
        {loading ? renderSkeleton() : renderChart(reports.contributions)}
        {loading ? null : renderTable(reports.contributions, ['ID', 'Name', 'Amount'])}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Other Reports
        </Typography>
        {loading ? renderSkeleton() : renderTable(reports.other, ['ID', 'Report', 'Details'])}
      </Box>
    </Container>
  );
};

export default ReportsPage;
