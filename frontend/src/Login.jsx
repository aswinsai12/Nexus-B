// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { api } from './client';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!username.trim()) { setError('Please type username'); return; }
    if (!password.trim()) { setError('Please type password'); return; }
    setError('');
    try {
      const message = await api.post('/auth/login', { username, password });
      const ok = typeof message === 'string' ? message.includes('success') : true;
      if (ok) {
        localStorage.setItem('username', username);
        navigate('/board', { state: { username } });
      } else {
        setError('Invalid username or password');
      }
    } catch {
      setError('Login failed');
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Login</Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">New User?</Typography>
            <Button variant="text" onClick={() => navigate('/')} size="small" sx={{ mt: 1 }}>Signup</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
