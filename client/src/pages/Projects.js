import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        My Projects
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Here are some of the projects I've worked on
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {project.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={project.imageUrl}
                  alt={project.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {project.title}
                  {project.featured && (
                    <Chip
                      label="Featured"
                      size="small"
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
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
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHub />}
                  href={project.githubUrl}
                  target="_blank"
                  sx={{ mb: 1 }}
                >
                  View Code
                </Button>
                {project.liveUrl && (
                  <Button
                    fullWidth
                    variant="contained"
                    href={project.liveUrl}
                    target="_blank"
                  >
                    Live Demo
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {projects.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary">
          No projects found. Check back later!
        </Typography>
      )}
    </Container>
  );
};

export default Projects;