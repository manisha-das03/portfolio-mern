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
} from '@mui/material';
import { Download, GitHub, LinkedIn } from '@mui/icons-material';
import axios from 'axios';

const SimpleHome = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simple data for now
    setProfile({
      name: 'Your Name',
      title: 'Full Stack Developer',
      bio: 'Welcome to my portfolio! I build amazing web applications.',
      email: 'your.email@example.com',
      skills: [
        { name: 'React', level: 'Advanced' },
        { name: 'Node.js', level: 'Advanced' },
        { name: 'MongoDB', level: 'Intermediate' }
      ]
    });
    
    setProjects([
      {
        _id: '1',
        title: 'Sample Project',
        description: 'A great project built with MERN stack',
        technologies: ['React', 'Node.js', 'MongoDB'],
        githubUrl: 'https://github.com',
        featured: true
      }
    ]);
  }, []);

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
          <Button
            variant="contained"
            startIcon={<Download />}
          >
            Download Resume
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href="https://github.com"
            target="_blank"
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            startIcon={<LinkedIn />}
            href="https://linkedin.com"
            target="_blank"
          >
            LinkedIn
          </Button>
        </Box>
      </Box>

      {/* Skills Section */}
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

      {/* Projects Section */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Projects
        </Typography>
        <Grid container spacing={4}>
          {projects.map((project) => (
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
                  <Button
                    size="small"
                    href={project.githubUrl}
                    target="_blank"
                    startIcon={<GitHub />}
                  >
                    View Code
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SimpleHome;