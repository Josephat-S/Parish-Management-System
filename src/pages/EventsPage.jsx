import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    picture: null,
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null); // For image preview

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          title: 'Community Meeting',
          description: 'A meeting to discuss community issues.',
          date: '2023-04-01',
          location: 'Town Hall',
          picture: null,
        },
        {
          id: 2,
          title: 'Charity Run',
          description: 'A charity run to raise funds.',
          date: '2023-04-10',
          location: 'City Park',
          picture: null,
        },
        {
          id: 3,
          title: 'Music Festival',
          description: 'A festival featuring local bands.',
          date: '2023-04-15',
          location: 'Main Square',
          picture: null,
        },
        {
          id: 4,
          title: 'Art Exhibition',
          description: 'An exhibition showcasing local artists.',
          date: '2023-04-20',
          location: 'Art Gallery',
          picture: null,
        },
        {
          id: 5,
          title: 'Blood Donation Camp',
          description: 'A camp for blood donation.',
          date: '2023-04-25',
          location: 'Community Center',
          picture: null,
        },
        {
          id: 6,
          title: 'Book Fair',
          description: 'A fair for book lovers.',
          date: '2023-05-01',
          location: 'Library',
          picture: null,
        },
        {
          id: 7,
          title: 'Food Festival',
          description: 'A festival celebrating local cuisine.',
          date: '2023-05-05',
          location: 'Market Street',
          picture: null,
        },
        {
          id: 8,
          title: 'Tech Conference',
          description: 'A conference for tech enthusiasts.',
          date: '2023-05-10',
          location: 'Convention Center',
          picture: null,
        },
        {
          id: 9,
          title: 'Yoga Workshop',
          description: 'A workshop on yoga and wellness.',
          date: '2023-05-15',
          location: 'Wellness Center',
          picture: null,
        },
        {
          id: 10,
          title: 'Volunteer Meetup',
          description: 'A meetup for volunteers.',
          date: '2023-05-20',
          location: 'Community Hall',
          picture: null,
        },
      ]);
      setLoading(false); // Stop loading after data is fetched
    }, 2000); // Simulate a 2-second delay
  }, []);

  // Validation functions
  const validateTitleAndLocation = (value) => /^[a-zA-Z\s]+$/.test(value); // Only letters and spaces allowed
  const validateForm = () => {
    const newErrors = {};
    if (!newEvent.title) {
      newErrors.title = 'Title is required.';
    } else if (!validateTitleAndLocation(newEvent.title)) {
      newErrors.title = 'Title can only contain letters and spaces.';
    }

    if (!newEvent.description) newErrors.description = 'Description is required.';
    if (!newEvent.date) newErrors.date = 'Date is required.';

    if (!newEvent.location) {
      newErrors.location = 'Location is required.';
    } else if (!validateTitleAndLocation(newEvent.location)) {
      newErrors.location = 'Location can only contain letters and spaces.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle opening and closing dialogs
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewEvent({ title: '', description: '', date: '', location: '', picture: null });
    setErrors({});
    setPreview(null); // Reset image preview
  };

  const handleOpenViewDialog = (event) => {
    setSelectedEvent(event);
    setOpenViewDialog(true);
  };
  const handleCloseViewDialog = () => setOpenViewDialog(false);

  // Handle adding a new event
  const handleAddEvent = () => {
    if (!validateForm()) return;

    const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
    setEvents([...events, { id: newId, ...newEvent, picture: preview }]);
    handleCloseAddDialog();
  };

  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEvent({ ...newEvent, picture: file });
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'location', headerName: 'Location', width: 200 },
    {
      field: 'picture',
      headerName: 'Picture',
      width: 150,
      renderCell: (params) =>
        params.row.picture ? (
          <img
            src={params.row.picture}
            alt="Event"
            style={{ width: '100%', height: '50px', objectFit: 'cover' }}
          />
        ) : (
          'No Image'
        ),
    },
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
            onClick={() => handleDeleteEvent(params.row.id)}
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
        Manage Events
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        startIcon={<AddIcon />}
        style={{ marginBottom: '16px' }}
      >
        Add New Event
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <DataGrid
            rows={events}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            disableRowSelectionOnClick
          />
        )}
      </div>

      {/* Add Event Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            error={!!errors.date}
            helperText={errors.date}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            error={!!errors.location}
            helperText={errors.location}
          />
          <div style={{ marginTop: '16px' }}>
            <Typography variant="body1" gutterBottom>
              Upload Picture
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                display: 'block',
                marginBottom: '16px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            {preview && (
              <div style={{ marginTop: '16px' }}>
                <Typography variant="body2">Preview:</Typography>
                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '200px' }} />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} fullWidth maxWidth="sm">
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <div>
              <Typography variant="h6">Title: {selectedEvent.title}</Typography>
              <Typography>Description: {selectedEvent.description}</Typography>
              <Typography>Date: {selectedEvent.date}</Typography>
              <Typography>Location: {selectedEvent.location}</Typography>
              {selectedEvent.picture && (
                <div style={{ marginTop: '16px' }}>
                  <Typography variant="body2">Picture:</Typography>
                  <img
                    src={selectedEvent.picture}
                    alt="Event"
                    style={{ width: '100%', maxHeight: '200px' }}
                  />
                </div>
              )}
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

export default EventsPage;
