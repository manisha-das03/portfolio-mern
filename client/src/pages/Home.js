import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Download,
  GitHub,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import axios from 'axios';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchResume();
    fetchFeaturedProjects();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchResume = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resume/current');
      setResume(response.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects/featured');
      setFeaturedProjects(response.data);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
    }
  };

  const handleDownloadResume = () => {
    if (resume) {
      window.open(resume.fileUrl, '_blank');
    }
  };

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Avatar
          src={profile.profileImage}
          sx={{ width: 150, height: 150, mx: 'auto', mb: 3 }}
        />
        <Typography variant="h2" component="h1" gutterBottom>
          {profile.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {profile.title}
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          {profile.bio}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          {resume && (
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
          )}
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
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email color="primary" />
            <Typography>{profile.email}</Typography>
          </Box>
          {profile.phone && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone color="primary" />
              <Typography>{profile.phone}</Typography>
            </Box>
          )}
          {profile.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn color="primary" />
              <Typography>{profile.location}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Skills Section */}
      {profile.skills && profile.skills.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {profile.skills.map((skill, index) => (
              <Chip
                key={index}
                label={`${skill.name} (${skill.level})`}
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <Box>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Featured Projects
          </Typography>
          <Grid container spacing={4}>
            {featuredProjects.map((project) => (
              <Grid item xs={12} md={6} key={project._id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {project.technologies.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        href={project.githubUrl}
                        target="_blank"
                        startIcon={<GitHub />}
                      >
                        Code
                      </Button>
                      {project.liveUrl && (
                        <Button
                          size="small"
                          href={project.liveUrl}
                          target="_blank"
                          variant="outlined"
                        >
                          Live Demo
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Home;