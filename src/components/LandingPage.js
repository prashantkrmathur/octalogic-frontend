import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Button, Typography, AppBar, Toolbar, Avatar } from '@mui/material';
import Logo from './assets/octalogic.svg';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const [userData, setUserData] = useState(user)

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={Logo} alt="Logo" style={{ height: '40px' }} />
          {console.log("userDta", userData)}
          {userData && userData.user && (
            <Box display="flex" alignItems="center">
              <Avatar src={userData.profilePic} alt="Profile" sx={{ marginRight: '10px' }} />
              <Typography variant="h6" component="p" sx={{ marginRight: '20px' }}>
                {userData.user.firstName} {userData.user.lastName}
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
        height="70vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Vehicle Booking System
        </Typography>
        <Box mt={4}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => alert('Book Vehicle')}
            sx={{ mb: 2 }}
          >
            Book Vehicle
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LandingPage;
