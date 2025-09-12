// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from './client';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function register(event) {
    event.preventDefault();
    toast.dismiss();
    if (!username.trim() || !password.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      const msg = await api.post('/auth/register', { username, password });
      toast.success(typeof msg === 'string' ? msg : 'Registration successful');
      setTimeout(() => navigate('/login'), 1500);
    } catch (e) {
      toast.error(e.message || 'Registration failed');
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>Signup</Typography>
        <Box component="form" onSubmit={register} noValidate autoComplete="off">
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Signup</Button>
        </Box>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">Already existing user?</Typography>
          <Button variant="text" onClick={() => navigate('/login')} size="small" sx={{ mt: 1 }}>Login</Button>
        </Box>
      </Paper>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Container>
  );
}

export default Signup;
