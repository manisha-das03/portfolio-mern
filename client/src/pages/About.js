import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Paper,
  Chip,
} from '@mui/material';
import {
  School,
  Work,
  Code,
  Psychology,
} from '@mui/icons-material';
import axios from 'axios';

const About = () => {
  const [profile, setProfile] = useState(null);

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

  // Sample data - you can make this dynamic later
  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using MERN stack',
      icon: <Work />,
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Built and maintained multiple client projects using React and Node.js',
      icon: <Code />,
    },
    {
      title: 'Computer Science Degree',
      company: 'University',
      period: '2016 - 2020',
      description: 'Bachelor of Science in Computer Science with focus on web technologies',
      icon: <School />,
    },
  ];

  const getSkillLevel = (level) => {
    switch (level) {
      case 'Expert': return 95;
      case 'Advanced': return 80;
      case 'Intermediate': return 65;
      case 'Beginner': return 40;
      default: return 50;
    }
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
      {/* About Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Me
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Get to know me better
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Psychology color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5">My Story</Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {profile.bio}
                </Typography>
                <Typography variant="body1">
                  I'm passionate about creating digital solutions that make a difference. 
                  With expertise in full-stack development, I enjoy turning complex problems 
                  into simple, beautiful, and intuitive solutions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Quick Facts
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">{profile.name}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1">{profile.title}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">{profile.location || 'Remote'}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{profile.email}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Skills Section */}
      {profile.skills && profile.skills.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Skills & Expertise
          </Typography>
          <Grid container spacing={3}>
            {profile.skills.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6">{skill.name}</Typography>
                      <Chip 
                        label={skill.level} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getSkillLevel(skill.level)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Experience Timeline */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Experience & Education
        </Typography>
        <Timeline position="alternate">
          {experience.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  {item.icon}
                </TimelineDot>
                {index < experience.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" component="h3">
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {item.company} • {item.period}
                  </Typography>
                  <Typography variant="body2">
                    {item.description}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Container>
  );
};

export default About;