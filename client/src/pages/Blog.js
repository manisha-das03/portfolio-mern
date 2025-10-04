import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { CalendarToday, Person, ArrowForward } from '@mui/icons-material';

const Blog = () => {
  // Sample blog posts - you can make this dynamic later
  const [posts] = useState([
    {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for building large-scale React applications that are maintainable and performant.',
      content: 'Full content here...',
      author: 'Your Name',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['React', 'JavaScript', 'Frontend'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      featured: true,
    },
    {
      id: 2,
      title: 'Node.js Performance Optimization',
      excerpt: 'Discover techniques to optimize your Node.js applications for better performance and scalability.',
      content: 'Full content here...',
      author: 'Your Name',
      date: '2024-01-10',
      readTime: '7 min read',
      tags: ['Node.js', 'Backend', 'Performance'],
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      featured: false,
    },
    {
      id: 3,
      title: 'MongoDB Best Practices',
      excerpt: 'Essential tips and tricks for working with MongoDB in production environments.',
      content: 'Full content here...',
      author: 'Your Name',
      date: '2024-01-05',
      readTime: '6 min read',
      tags: ['MongoDB', 'Database', 'Backend'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      featured: false,
    },
    {
      id: 4,
      title: 'Full-Stack Development Roadmap 2024',
      excerpt: 'A comprehensive guide to becoming a full-stack developer in 2024.',
      content: 'Full content here...',
      author: 'Your Name',
      date: '2024-01-01',
      readTime: '10 min read',
      tags: ['Career', 'Full-Stack', 'Learning'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      featured: true,
    },
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Blog
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
        Thoughts, tutorials, and insights about web development
      </Typography>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Posts
          </Typography>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} md={6} key={post.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip label="Featured" color="primary" size="small" />
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(post.date)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="h5" component="h3" gutterBottom>
                      {post.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {post.excerpt}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      {post.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{post.author}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.readTime}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Button
                        endIcon={<ArrowForward />}
                        onClick={() => {
                          // Navigate to full post - implement later
                          console.log('Navigate to post:', post.id);
                        }}
                      >
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Recent Posts
          </Typography>
          <Grid container spacing={4}>
            {regularPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(post.date)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {post.readTime}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" component="h3" gutterBottom>
                      {post.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {post.excerpt}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                    
                    <Button
                      fullWidth
                      variant="outlined"
                      endIcon={<ArrowForward />}
                      onClick={() => {
                        // Navigate to full post - implement later
                        console.log('Navigate to post:', post.id);
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {posts.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary">
          No blog posts yet. Check back soon for updates!
        </Typography>
      )}
    </Container>
  );
};

export default Blog;