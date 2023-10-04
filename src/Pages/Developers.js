import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub'; // Import the GitHub icon
import LinkedInIcon from '@mui/icons-material/LinkedIn'; // Import the LinkedIn icon
import EmailIcon from '@mui/icons-material/Email'; // Import the Email icon
import DevSignup from '../Components/DevSignup'
const developers = [
  {
    name: 'Laura',
    role: 'Product Owner',
    imageUrl: 'https://media.licdn.com/dms/image/C4E03AQG6WaRQdmJdzQ/profile-displayphoto-shrink_400_400/0/1651074171271?e=1701302400&v=beta&t=wbstt_DY4CTEZgvSXcJyZRRT25xdhfjYZnkW19wkCVw', // Replace with actual image URL
    description: 'Laura is our product owner, ensuring ethical practices. She handles our MTA API data, leads retrospectives, and maintains our app\'s vision.',
    githubUrl: 'https://github.com/laura-williams-1', // Replace with actual GitHub URL
    linkedinUrl: 'https://www.linkedin.com/in/laura/', // Replace with actual LinkedIn URL
    email: 'laura@example.com', // Replace with actual email address
  },
  {
    name: 'Nina',
    role: 'Lead Developer',
    imageUrl: 'https://avatars.githubusercontent.com/u/115429067?v=4', // Replace with actual image URL
    description: 'Nina is our lead developer. She created repositories, resolves merge conflicts, handles Google Maps API, and manages our deployments on various platforms.',
    githubUrl: 'https://github.com/ninajavier', // Replace with actual GitHub URL
    linkedinUrl: 'https://www.linkedin.com/in/nina/', // Replace with actual LinkedIn URL
    email: 'nina@example.com', // Replace with actual email address
  },
  {
    name: 'Christina',
    role: 'Project Manager & Scrum Master',
    imageUrl: 'https://avatars.githubusercontent.com/u/113807743?v=4', // Replace with actual image URL
    description: 'Christina is our project manager and scrum master. She manages Google Authentication, Firebase, and oversees the backend and app styling.',
    githubUrl: 'https://github.com/christina-github', // Replace with actual GitHub URL
    linkedinUrl: 'https://www.linkedin.com/in/christina/', // Replace with actual LinkedIn URL
    email: 'christina@example.com', // Replace with actual email address
  },
];

const MeetTheDevelopers = () => {
  return (
    <Container maxWidth="lg" style={{ marginBottom: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        <h1>Meet the Developers</h1>
      </Typography>
      <Grid container spacing={2}>
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
                <IconButton
                  color="primary"
                  component="a"
                  href={developer.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  component="a"
                  href={`mailto:${developer.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EmailIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <DevSignup />
      </div>
    </Container>
  );
};

export default MeetTheDevelopers;