import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { DateRangePicker } from '@mui/lab';
import Logo from './assets/octalogic.svg';
import VehicleCard from './VehicleCard';

function LandingPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleType, setVehicleType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user;

  const base_url = 'https://octalogic-production.up.railway.app';

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${base_url}/api/vehicle/vehicleTypes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVehicles(response.data.data);
        setFilteredVehicles(response.data.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const filterVehicles = () => {
      let filtered = vehicles;

      if (vehicleType) {
        filtered = filtered.filter(
          (vehicle) => vehicle.type.toLowerCase() === vehicleType.toLowerCase()
        );
      }

      if (selectedType && vehicleType === 'TWOWHEELER') {
        filtered = filtered.filter((vehicle) => vehicle.bikeType === selectedType);
      }

      if (selectedType && vehicleType === 'FOURWHEELER') {
        filtered = filtered.filter((vehicle) => vehicle.carType === selectedType);
      }

      setFilteredVehicles(filtered);
    };

    filterVehicles();
  }, [vehicleType, selectedType, vehicles]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
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
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="20vh">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Vehicle Booking System
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <Typography variant="h6">Select Vehicle Type</Typography>
          <RadioGroup row value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <FormControlLabel value="TWOWHEELER" control={<Radio />} label="Twowheeler" />
            <FormControlLabel value="FOURWHEELER" control={<Radio />} label="Fourwheeler" />
          </RadioGroup>
        </FormControl>
        {vehicleType === 'TWOWHEELER' && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="bike-type-label">Bike Type</InputLabel>
            <Select
              labelId="bike-type-label"
              id="bike-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Bike Type"
            >
              {Array.from(new Set(vehicles.map((vehicle) => vehicle.bikeType)))
                .filter((type) => type)
                .map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        {vehicleType === 'FOURWHEELER' && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="car-type-label">Car Type</InputLabel>
            <Select
              labelId="car-type-label"
              id="car-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Car Type"
            >
              {Array.from(new Set(vehicles.map((vehicle) => vehicle.carType)))
                .filter((type) => type)
                .map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {filteredVehicles.map((vehicleType) =>
          vehicleType.vehicle.map((vehicle) => (
            <Grid item key={vehicle.id}>
              <VehicleCard vehicle={vehicle} userData={userData} token = {localStorage.getItem('token')}/>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default LandingPage;
