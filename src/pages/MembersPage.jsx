import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import dayjs from 'dayjs';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchText, setSearchText] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    dateOfRegistration: null,
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setMembers([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', location: 'New York', role: 'Admin', dateOfRegistration: '2023-01-15', password: 'Password@123' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', location: 'Los Angeles', role: 'Member', dateOfRegistration: '2023-02-10', password: 'Password@456' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '5551234567', location: 'Chicago', role: 'Moderator', dateOfRegistration: '2023-03-05', password: 'Password@789' },
        { id: 4, name: 'Bob Brown', email: 'bob@example.com', phone: '4449876543', location: 'Houston', role: 'Member', dateOfRegistration: '2023-04-20', password: 'Password@101' },
        { id: 5, name: 'Charlie Green', email: 'charlie@example.com', phone: '3332221111', location: 'San Francisco', role: 'Admin', dateOfRegistration: '2023-05-15', password: 'Password@202' },
        { id: 6, name: 'Diana White', email: 'diana@example.com', phone: '2223334444', location: 'Seattle', role: 'Member', dateOfRegistration: '2023-06-10', password: 'Password@303' },
        { id: 7, name: 'Eve Black', email: 'eve@example.com', phone: '1112223333', location: 'Austin', role: 'Moderator', dateOfRegistration: '2023-07-05', password: 'Password@404' },
        { id: 8, name: 'Frank Blue', email: 'frank@example.com', phone: '9998887777', location: 'Boston', role: 'Member', dateOfRegistration: '2023-08-20', password: 'Password@505' },
        { id: 9, name: 'Grace Yellow', email: 'grace@example.com', phone: '8887776666', location: 'Denver', role: 'Admin', dateOfRegistration: '2023-09-15', password: 'Password@606' },
        { id: 10, name: 'Hank Red', email: 'hank@example.com', phone: '7776665555', location: 'Miami', role: 'Member', dateOfRegistration: '2023-10-10', password: 'Password@707' },
      ]);
      setLoading(false); // Stop loading after data is fetched
    }, 2000); // Simulate a 2-second delay
  }, []);

  // Validation functions
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only letters and spaces allowed
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validateRole = (role) => /^[a-zA-Z\s]+$/.test(role); // Only letters and spaces allowed
  const validateLocation = (location) => /^[a-zA-Z\s]+\d*$/.test(location); // Text followed by optional numbers
  const validateDate = (date) => dayjs(date).isBefore(dayjs().add(1, 'day')); // Date must not exceed today
  const validatePhone = (phone) => /^\d{10}$/.test(phone); // Only 10 digits allowed

  const validateForm = () => {
    const newErrors = {};
    if (!newMember.name) {
      newErrors.name = 'Name is required.';
    } else if (!validateName(newMember.name)) {
      newErrors.name = 'Name can only contain letters and spaces.';
    } else if (members.some((member) => member.name.toLowerCase() === newMember.name.toLowerCase())) {
      newErrors.name = 'Name must be unique.';
    }

    if (!newMember.email) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(newMember.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!newMember.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!validatePhone(newMember.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!newMember.role) {
      newErrors.role = 'Role is required.';
    } else if (!validateRole(newMember.role)) {
      newErrors.role = 'Role can only contain letters and spaces.';
    }

    if (!newMember.location) {
      newErrors.location = 'Location is required.';
    } else if (!validateLocation(newMember.location)) {
      newErrors.location = 'Location must have text first, followed by optional numbers.';
    }

    if (!newMember.dateOfRegistration) {
      newErrors.dateOfRegistration = 'Date of registration is required.';
    } else if (!validateDate(newMember.dateOfRegistration)) {
      newErrors.dateOfRegistration = 'Date cannot exceed the current date.';
    }

    if (!newMember.password) {
      newErrors.password = 'Password is required.';
    } else if (!validatePassword(newMember.password)) {
      newErrors.password =
        'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle opening the add dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  // Handle closing the add dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewMember({
      name: '',
      email: '',
      phone: '',
      location: '',
      role: '',
      dateOfRegistration: null,
      password: '',
    });
    setErrors({});
  };

  // Handle adding a new member
  const handleAddMember = () => {
    if (!validateForm()) return;

    const newId = members.length > 0 ? members[members.length - 1].id + 1 : 1;
    setMembers([...members, { id: newId, ...newMember }]);
    handleCloseAddDialog();
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

  // Handle deleting a member
  const handleDeleteClick = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'dateOfRegistration', headerName: 'Date of Registration', width: 180 },
    { field: 'password', headerName: 'Password', width: 150 },
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
            onClick={() => handleDeleteClick(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage Members</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        startIcon={<AddIcon />}
        style={{ marginBottom: '16px' }}
      >
        Add New
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Box sx={{ height: 400, width: '100%' }}>
        {loading ? (
          // Skeleton loader while data is loading
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <DataGrid
            rows={members.filter(
              (member) =>
                member.name.toLowerCase().includes(searchText.toLowerCase()) ||
                member.email.toLowerCase().includes(searchText.toLowerCase()) ||
                member.phone.includes(searchText) ||
                member.location.toLowerCase().includes(searchText.toLowerCase()) ||
                member.role.toLowerCase().includes(searchText.toLowerCase())
            )}
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
        )}
      </Box>

      {/* Add New Member Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={newMember.phone}
            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newMember.location}
            onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
            error={!!errors.location}
            helperText={errors.location}
          />
          <TextField
            label="Role"
            fullWidth
            margin="normal"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            error={!!errors.role}
            helperText={errors.role}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Registration"
              value={newMember.dateOfRegistration}
              onChange={(newValue) =>
                setNewMember({ ...newMember, dateOfRegistration: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!errors.dateOfRegistration}
                  helperText={errors.dateOfRegistration}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={newMember.password}
            onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMember} color="primary">
            Add
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
            <div>
              <Typography variant="h6">Name: {selectedMember.name}</Typography>
              <Typography>Email: {selectedMember.email}</Typography>
              <Typography>Phone: {selectedMember.phone}</Typography>
              <Typography>Location: {selectedMember.location}</Typography>
              <Typography>Role: {selectedMember.role}</Typography>
              <Typography>Date of Registration: {selectedMember.dateOfRegistration}</Typography>
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

export default MembersPage;