import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        margin="5px"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Vehicle Booking System
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ mb: 2 }}
            style={{margin : "5px"}}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/signup')}
            sx={{ mb: 2 }}
            style={{margin : "5px"}}

          >
            Signup
          </Button>
        </Box>
        <Box mt={4}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => alert('Plesae Login to Book Vehicle')}
            sx={{ mb: 2 }}
          >
            Book Vehicle
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
