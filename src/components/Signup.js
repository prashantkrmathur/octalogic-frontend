import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Signup() {
const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const base_url = 'https://octalogic-production.up.railway.app';

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/api/auth/register`, {
        firstName,
        lastName,
        email,
        mobile,
        profilePic,
        password,
      });
      alert('Signup successful');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Signup
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSignup}
      >
        <TextField
          required
          id="first-name"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          id="last-name"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
          id="mobile"
          label="Mobile"
          variant="outlined"
          value={mobile}
          onChange={(e) => setMobile(Number(e.target.value))}
        />
        <TextField
          id="profile-pic"
          label="Profile Picture URL"
          variant="outlined"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
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
          Signup
        </Button>
      </Box>
    </Container>
  );
}

export default Signup;
