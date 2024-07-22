import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const base_url = 'https://octalogic-production.up.railway.app';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/api/auth/login`, 
        { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('====================================');
      console.log(response.body);
      console.log('====================================');

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Save the token in localStorage
        alert('Login successful');
        navigate('/');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          required
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
