import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  GitHub,
  LinkedIn,
  Twitter,
  Send,
} from '@mui/icons-material';
import axios from 'axios';

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For now, we'll just simulate sending
      // You can integrate with EmailJS, Formspree, or your own email service
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Get In Touch
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
        Let's discuss your next project or opportunity
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Feel free to reach out through any of these channels
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email color="primary" sx={{ mr: 2 }} />
                  <Typography>{profile.email}</Typography>
                </Box>
                {profile.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone color="primary" sx={{ mr: 2 }} />
                    <Typography>{profile.phone}</Typography>
                  </Box>
                )}
                {profile.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn color="primary" sx={{ mr: 2 }} />
                    <Typography>{profile.location}</Typography>
                  </Box>
                )}
              </Box>

              <Typography variant="h6" gutterBottom>
                Follow Me
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {profile.socialLinks?.github && (
                  <IconButton
                    href={profile.socialLinks.github}
                    target="_blank"
                    color="primary"
                  >
                    <GitHub />
                  </IconButton>
                )}
                {profile.socialLinks?.linkedin && (
                  <IconButton
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    color="primary"
                  >
                    <LinkedIn />
                  </IconButton>
                )}
                {profile.socialLinks?.twitter && (
                  <IconButton
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    color="primary"
                  >
                    <Twitter />
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Quick Response Times */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Response Times
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">Within 24 hours</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Project Inquiries
              </Typography>
              <Typography variant="body1">Within 48 hours</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Urgent Matters
              </Typography>
              <Typography variant="body1">Same day</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Send Me a Message
              </Typography>
              
              {message && (
                <Alert 
                  severity={message.includes('error') ? 'error' : 'success'} 
                  sx={{ mb: 3 }}
                  onClose={() => setMessage('')}
                >
                  {message}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      disabled={loading}
                      sx={{ minWidth: 150 }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;