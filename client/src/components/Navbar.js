import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ darkMode, toggleTheme }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: darkMode ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #64b5f6, #f48fb1)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Portfolio
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" component={Link} to="/projects">
                Projects
              </Button>
              <Button color="inherit" component={Link} to="/blog">
                Blog
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact
              </Button>
              <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={Link} to="/admin">
                    Admin
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" component={Link} to="/admin">
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;