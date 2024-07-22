import React, { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, CardMedia, Typography, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Container,
  AppBar,
  Toolbar,
  Avatar
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './assets/octalogic.svg';

dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(advancedFormat);

function Booking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user;
  const vehicle = location.state?.vehicle;

  useEffect(() => {
    console.log("vehicle", vehicle);
    console.log("userData", userData);
  }, []);

  const handleBookNow = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const bookingData = {
      userId: userData.user.id, // Assuming userData contains the user's ID
      vehicleId: vehicle.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      const response = await axios.post(
        'https://octalogic-production.up.railway.app/api/vehicle/booking',
        bookingData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`, // Include token in request headers
          },
        }
      );

      if (response.status === 201) {
        setOpen(true);
      } else {
        alert('Failed to book the vehicle. Please try again.');
      }
    } catch (error) {
      console.error('Error booking vehicle:', error);
      alert('Error booking vehicle. Please try again.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/', { state: { user: userData} });
  };
 const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
   <Container>
    <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={Logo} alt="Logo" style={{ height: '40px' }} />
          {userData && userData.user ? (
            <Box display="flex" alignItems="center">
              <Avatar src={userData.user.profilePic} alt="Profile" sx={{ marginRight: '10px' }} />
              <Typography variant="h6" component="p" sx={{ marginRight: '20px' }}>
                {userData.user.firstName} {userData.user.lastName}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ marginRight: '10px' }}
              >
                Login
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
     <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ maxWidth: 345, m: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={vehicle.imageUrl}
            alt={`${vehicle.make} ${vehicle.model}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {vehicle.make} {vehicle.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vehicle.year} - {vehicle.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ₹{vehicle.pricePerDay} per day
            </Typography>
            <Typography variant="body2" color={vehicle.isBooked ? 'red' : 'green'}>
              {vehicle.isBooked ? 'Booked' : 'Available'}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
                />
              </LocalizationProvider>
            </Box>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleBookNow}
              disabled={vehicle.isBooked}
            >
              Book Now
            </Button>
          </Box>
        </Card>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Booking Successful"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your booking has been confirmed. Thank you for using our service.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
   </Container>
  );
}

export default Booking;
