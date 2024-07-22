import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function VehicleCard({ vehicle, userData}) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleBookNow = () => {
    if (userData && userData.token && userData.user ) {
        console.log('====================================');
        console.log(vehicle);
        console.log("token", vehicle);
        console.log('====================================');
        navigate('/booking', { state: { user: userData, vehicle : vehicle} });
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
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
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        <Button size="small" variant="contained" color="primary" onClick={handleBookNow} disabled={vehicle.isBooked}>
          Book Now
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Please log in to book the vehicle"
        action={
          <Button color="secondary" size="small" onClick={() => navigate('/login')}>
            Login
          </Button>
        }
      />
    </Card>
  );
}

export default VehicleCard;
