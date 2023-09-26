import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub'; // Import the GitHub icon

const developers = [
  {
    name: 'Laura',
    role: 'Product Owner',
    imageUrl: 'https://avatars.githubusercontent.com/u/107360787?v=4', // Replace with actual image URL
    description: 'Laura is our product owner, ensuring ethical practices. She handles our MTA API data, leads retrospectives, and maintains our app\'s vision.',
    githubUrl: 'https://github.com/laura-williams-1', // Replace with actual GitHub URL
  },
  {
    name: 'Christina',
    role: 'Project Manager & Scrum Master',
    imageUrl: 'https://avatars.githubusercontent.com/u/113807743?v=4', // Replace with actual image URL
    description: 'Christina is our project manager and scrum master. She manages Google Authentication, Firebase, and oversees the backend and app styling.',
    githubUrl: 'https://github.com/christina-github', // Replace with actual GitHub URL
  },
  {
    name: 'Nina',
    role: 'Lead Developer',
    imageUrl: 'https://avatars.githubusercontent.com/u/115429067?v=4', // Replace with actual image URL
    description: 'Nina is our lead developer. She created repositories, resolves merge conflicts, handles Google Maps API, and manages our deployments on various platforms.',
    githubUrl: 'https://github.com/ninajavier', // Replace with actual GitHub URL
  },
];

const MeetTheDevelopers = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Meet the Developers
      </Typography>
      <Grid container spacing={3}>
        {developers.map((developer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt={developer.name}
                height="260"
                image={developer.imageUrl}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {developer.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {developer.role}
                </Typography>
                <Typography variant="body2">
                  {developer.description}
                </Typography>
                <IconButton
                  color="primary"
                  component="a"
                  href={developer.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MeetTheDevelopers;
