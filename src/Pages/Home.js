import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AboutPage from '../Components/AboutPage'; // Import the AboutPage component


const Home = () => {
  return (
    <div className="container mt-4">
      <Container fluid className="py-5 bg-light text-center">
        <h1>Welcome To Prograde HomePage!</h1>
        <p>
          Navigating NYC has never been easier. Get real-time updates, connect with the community, and find the best routes for your journey.
        </p>
        <p>
          <Button variant="primary" as={Link} to="/find-route">
            <i className="material-icons">directions</i> Find a Route
          </Button>
        </p>
      </Container>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
          <Card.Img variant="top" src="/assets/paths.avif" alt="Community image" />

            <Card.Body>
              <Card.Title>
                <i className="material-icons">people</i> Community
              </Card.Title>
              <Card.Text>
                Connect with other commuters, share your experiences, and get the latest tips and tricks for navigating the city.
              </Card.Text>
              <Button variant="secondary" as={Link} to="/community">
                <i className="material-icons">explore</i> Explore
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Img variant="top" src="/assets/uptown.gif" alt="Profile image" />
            <Card.Body>
              <Card.Title>
                <i className="material-icons">account_circle</i> Your Profile
              </Card.Title>
              <Card.Text>
                View your contributions, bookmarks, upvotes, and more. Personalize your Prograde experience.
              </Card.Text>
              <Button variant="secondary" as={Link} to="/profile">
                <i className="material-icons">arrow_forward</i> View Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Img variant="top" src="/assets/vignelli-clip.gif" alt="Settings image" />
            <Card.Body>
              <Card.Title>
                <i className="material-icons">settings</i> Settings
              </Card.Title>
              <Card.Text>
                Customize your preferences, notifications, and more to get the most out of Prograde.
              </Card.Text>
              <Button variant="secondary" as={Link} to="/settings">
                <i className="material-icons">tune</i> Configure
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AboutPage />

    </div>
  )
}

export default Home;
