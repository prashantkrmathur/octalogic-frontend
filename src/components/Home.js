import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Button, Typography, AppBar, Toolbar, Avatar, Grid } from '@mui/material';
import Logo from './assets/octalogic.svg'; // Ensure the logo image is in the correct path
import VehicleCard from './VehicleCard'; // Import the VehicleCard component

function HomePage() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const base_url = 'https://octalogic-production.up.railway.app';

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${base_url}/api/vehicle/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setVehicles(response.data.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={Logo} alt="Logo" style={{ height: '40px' }} />
          {user && (
            <Box display="flex" alignItems="center">
              <Avatar src={user.profilePic} alt="Profile" sx={{ marginRight: '10px' }} />
              <Typography variant="h6" component="p" sx={{ marginRight: '20px' }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="20vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Vehicle Booking System
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {vehicles.map((vehicle) => (
          <Grid item key={vehicle.id}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
