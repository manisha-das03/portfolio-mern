import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Alert,
} from '@mui/material';

const SimpleAdmin = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === 'admin@portfolio.com' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      setMessage('Login successful!');
    } else {
      setMessage('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Admin Login
          </Typography>
          {message && (
            <Alert severity={message.includes('successful') ? 'success' : 'error'} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Demo credentials:
            </Typography>
            <Typography variant="body2">
              Email: admin@portfolio.com
            </Typography>
            <Typography variant="body2">
              Password: admin123
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Alert severity="success" sx={{ mb: 3 }}>
        Welcome to the admin panel! Here you can manage your portfolio content.
      </Alert>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Stats
        </Typography>
        <Typography variant="body1">
          • Portfolio is live and running
        </Typography>
        <Typography variant="body1">
          • Backend API connected
        </Typography>
        <Typography variant="body1">
          • Ready to add your content
        </Typography>
      </Paper>

      <Button
        variant="outlined"
        onClick={() => setIsAuthenticated(false)}
      >
        Logout
      </Button>
    </Container>
  );
};

export default SimpleAdmin;