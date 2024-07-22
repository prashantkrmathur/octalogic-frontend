import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Button, Typography, AppBar, Toolbar, Avatar, Grid, FormControl, FormControlLabel, RadioGroup, Radio, TextField } from '@mui/material';
import { DateRangePicker } from '@mui/lab';
import Logo from './assets/octalogic.svg';
import VehicleCard from './VehicleCard';

function LandingPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [wheelCount, setWheelCount] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
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
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
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

      if (wheelCount) {
        filtered = filtered.filter(vehicle => vehicle.vehicleType.type.toLowerCase() === (wheelCount === '2' ? 'twowheeler' : 'fourwheeler'));
      }

      if (vehicleType) {
        filtered = filtered.filter(vehicle => vehicle.vehicleType.carType === vehicleType || vehicle.vehicleType.bikeType === vehicleType);
      }

      if (selectedModel) {
        filtered = filtered.filter(vehicle => vehicle.model === selectedModel);
      }

      setFilteredVehicles(filtered);
    };

    filterVehicles();
  }, [wheelCount, vehicleType, selectedModel, vehicles]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={Logo} alt="Logo" style={{ height: '40px' }} />
          {user ? (
            <Box display="flex" alignItems="center">
              <Avatar src={user.profilePic} alt="Profile" sx={{ marginRight: '10px' }} />
              <Typography variant="h6" component="p" sx={{ marginRight: '20px' }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate('/login')} sx={{ marginRight: '10px' }}>
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
          <Typography variant="h6">Number of Wheels</Typography>
          <RadioGroup row value={wheelCount} onChange={(e) => setWheelCount(e.target.value)}>
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <Typography variant="h6">Type of Vehicle</Typography>
          <RadioGroup row value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            {/* Map the vehicle types dynamically from the vehicle data */}
            {Array.from(new Set(vehicles.map(vehicle => vehicle.vehicleType.carType || vehicle.vehicleType.bikeType))).map(type => (
              <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <Typography variant="h6">Specific Model</Typography>
          <RadioGroup row value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            {/* Map the vehicle models dynamically from the filtered vehicle data */}
            {Array.from(new Set(filteredVehicles.map(vehicle => vehicle.model))).map(model => (
              <FormControlLabel key={model} value={model} control={<Radio />} label={model} />
            ))}
          </RadioGroup>
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Select Date Range</Typography>
          <DateRangePicker
            startText="Start Date"
            endText="End Date"
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} sx={{ mr: 2 }} />
                <TextField {...endProps} />
              </>
            )}
          />
        </Box>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {filteredVehicles.map((vehicle) => (
          <Grid item key={vehicle.id}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default LandingPage;
