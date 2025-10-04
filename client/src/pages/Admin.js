import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete, Upload } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Admin = () => {
  const { isAuthenticated, login } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginForm.email, loginForm.password);
    if (!result.success) {
      setMessage(result.message);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(tech => tech.trim()),
      };

      if (editingProject) {
        await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, projectData);
        setMessage('Project updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData);
        setMessage('Project created successfully!');
      }

      setOpenProjectDialog(false);
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: '',
        featured: false,
      });
      fetchProjects();
    } catch (error) {
      setMessage('Error saving project: ' + error.response?.data?.message);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      ...project,
      technologies: project.technologies.join(', '),
    });
    setOpenProjectDialog(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
        setMessage('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        setMessage('Error deleting project: ' + error.response?.data?.message);
      }
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      await axios.post('http://localhost:5000/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Resume uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading resume: ' + error.response?.data?.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Admin Login
          </Typography>
          {message && <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>}
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
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {message && (
        <Alert 
          severity={message.includes('Error') ? 'error' : 'success'} 
          sx={{ mb: 3 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}

      {/* Resume Upload Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Resume Management
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<Upload />}
        >
          Upload New Resume
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={handleResumeUpload}
          />
        </Button>
      </Paper>

      {/* Projects Section */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            Projects Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenProjectDialog(true)}
          >
            Add Project
          </Button>
        </Box>

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                    {project.featured && (
                      <Chip label="Featured" size="small" color="primary" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box>
                    {project.technologies.map((tech, index) => (
                      <Chip key={index} label={tech} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Project Dialog */}
      <Dialog open={openProjectDialog} onClose={() => setOpenProjectDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Technologies (comma separated)"
              value={projectForm.technologies}
              onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="GitHub URL"
              value={projectForm.githubUrl}
              onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Live URL (optional)"
              value={projectForm.liveUrl}
              onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Image URL (optional)"
              value={projectForm.imageUrl}
              onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                />
              }
              label="Featured Project"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProjectDialog(false)}>Cancel</Button>
          <Button onClick={handleProjectSubmit} variant="contained">
            {editingProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;