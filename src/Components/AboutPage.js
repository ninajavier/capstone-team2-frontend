import React from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div>
      <Container>
        <h1>PROGRADE</h1>
        <h3>Elevate your commute</h3>
      </Container>

      <Container>
        <h2>Our Mission</h2>
        <p>
          Our mission is simple: to make your daily commute smoother, more
          engaging, and truly communal. We've created a platform that bridges
          the gap between real-time transit information and a vibrant community
          where you can share your transit stories, report issues, and connect
          with others who understand exactly what you're going through.
        </p>
      </Container>

      <Container>
        <h4>Join the Prograde Community</h4>
        <p>
          Sign up today and experience the difference. Become a part of a
          community that values your stories, embraces your challenges, and is
          dedicated to making your daily commute as smooth as possible. Prograde
          – where real-time updates meet communal connections. Your journey, our
          mission.
        </p>
        {/* sign in form will go here in this container */}
      </Container>

      <Container>
        <p>
          <strong>Real-Time Updates:</strong> Stay informed about delays,
          service interruptions, and station conditions in real time, so you can
          plan your journey better.
        </p>
      </Container>

      <Container>
        <p>
          <strong>Anonymous Interactions:</strong> Your privacy and safety
          matter. Interact with others, share your stories, and report issues
          all while remaining anonymous.
        </p>
      </Container>

      <Container>
        <p>
          <strong>Community Engagement: </strong> Join a thriving community of
          NYC commuters who understand your daily struggles. Share your
          experiences, learn from others, and make your voice heard.
        </p>
      </Container>
    </div>
  );
};

export default About;
