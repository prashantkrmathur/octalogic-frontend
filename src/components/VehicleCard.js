import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

function VehicleCard({ vehicle }) {
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
        <Button size="small" variant="contained" color="primary">
          Book Now
        </Button>
      </Box>
    </Card>
  );
}

export default VehicleCard;
