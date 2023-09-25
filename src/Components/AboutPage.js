import React from "react";
import { Container, Card, CardContent, Typography, Box, CardMedia } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Card elevation={3} sx={{ p: 2 }}>
          <CardMedia
            component="img"
            alt="Welcome"
            height="200"
            image="/assets/welcome-placeholder.jpg" // Replace with your image path
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Welcome to PROGRADE
            </Typography>
            <Typography variant="body1">
              Elevate your daily commute with Prograde, where real-time transit
              information meets community engagement. We are here to make your
              journey smoother and more enjoyable.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box my={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Card elevation={3} sx={{ p: 2 }}>
          <CardMedia
            component="img"
            alt="Mission"
            height="200"
            image="/assets/mission-placeholder.jpg" // Replace with your image path
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              Our mission is simple: to make your daily commute smoother, more
              engaging, and truly communal. We've created a platform that bridges
              the gap between real-time transit information and a vibrant
              community where you can share your transit stories, report issues,
              and connect with others who understand exactly what you're going
              through.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box my={4}>
        <Card elevation={3} sx={{ p: 2 }}>
          <CardMedia
            component="img"
            alt="Community"
            height="200"
            image="/assets/community-placeholder.jpg" // Replace with your image path
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Join the Prograde Community
            </Typography>
            <Typography variant="body1">
              Sign up today and experience the difference. Become a part of a
              community that values your stories, embraces your challenges, and is
              dedicated to making your daily commute as smooth as possible.
              Prograde – where real-time updates meet communal connections. Your
              journey, our mission.
            </Typography>
            {/* Sign-in form will go here in this section */}
          </CardContent>
        </Card>
      </Box>

      <Box my={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Card elevation={3} sx={{ p: 2 }}>
          <CardMedia
            component="img"
            alt="Updates"
            height="200"
            image="/assets/updates-placeholder.jpg" // Replace with your image path
          />
          <CardContent>
            <Typography variant="body1">
              <strong>Real-Time Updates:</strong> Stay informed about delays,
              service interruptions, and station conditions in real time, so you
              can plan your journey better.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box my={4}>
        <Card elevation={3} sx={{ p: 2 }}>
          <CardMedia
            component="img"
            alt="Interactions"
            height="200"
            image="/assets/interactions-placeholder.jpg" // Replace with your image path
          />
          <CardContent>
            <Typography variant="body1">
              <strong>Anonymous Interactions:</strong> Your privacy and safety
              matter. Interact with others, share your stories, and report issues
              all while remaining anonymous.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box my={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Card elevation={3} sx={{ p: 2 }}>
          <CardMedia
            component="img"
            alt="Engagement"
            height="200"
            image="/assets/engagement-placeholder.jpg" // Replace with your image path
          />
          <CardContent>
            <Typography variant="body1">
              <strong>Community Engagement:</strong> Join a thriving community of
              NYC commuters who understand your daily struggles. Share your
              experiences, learn from others, and make your voice heard.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default About;
