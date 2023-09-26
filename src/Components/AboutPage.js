import React from "react";
import { Container, Card, CardContent, Typography, Box, CardMedia, Grid } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Card elevation={3} sx={{ p: 2 }}>
          <video
            autoPlay
            loop
            muted
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          >
            <source src="/assets/vecteezy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
          <video
            autoPlay
            loop
            muted
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          >
            <source src="/assets/passing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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

      <Box my={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Card elevation={3} sx={{ p: 2 }}>
          <video
            autoPlay
            loop
            muted
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          >
            <source src="/assets/commuting.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Card elevation={3} sx={{ p: 2 }}>
            <CardMedia
              component="img"
              alt="Real-Time Updates"
              height="200"
              image="/assets/realtime.png" // Replace with your image path
            />
            <CardContent>
              <Typography variant="body1">
                <strong>Real-Time Updates:</strong> Stay informed about delays,
                service interruptions, and station conditions in real time, so you
                can plan your journey better.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={3} sx={{ p: 2 }}>
            <CardMedia
              component="img"
              alt="Community Engagements"
              height="200"
              image="/assets/community.png" // Replace with your image path
            />
            <CardContent>
              <Typography variant="body1">
                <strong>Community Engagement:</strong> Join a thriving community of
                NYC commuters who understand your daily struggles. Share your
                experiences, learn from others, and make your voice heard.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={3} sx={{ p: 2 }}>
            <CardMedia
              component="img"
              alt="Anonymous Interactions"
              height="200"
              image="/assets/anonymous.png" // Replace with your image path
            />
            <CardContent>
            <Typography variant="body1">
                <strong>Anonymous Interactions:</strong> Your privacy and safety
                matter. Interact with others, share your stories, and report issues
                all while remaining anonymous.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
