import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Comments from '../Components/Threads';

const Community = () => {
  const [filter, setFilter] = useState('Location');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container mt-4">
      <Container fluid className="py-5 bg-light text-center">
        <h1>
            <i className="material-icons">forum</i> Welcome to Prograde's Community Page
          </h1>
          <p>Navigating NYC has never been easier. Get real-time updates, connect with the community, and find the best routes for your journey.</p>
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
              Explore
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
                View Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Img variant="top" src="/assets/vignelli-clip.gif" alt="Settings image" />
            <Card.Body>
              <Card.Title>
                <i className="material-icons">directions</i> Find Route
              </Card.Title>
              <Card.Text>
                Customize your preferences, notifications, and more to get the most out of Prograde.
              </Card.Text>
              <Button variant="secondary" as={Link} to="/find-route">
          Find a Route
          </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* The rest of your code for the Community component */}
      <Row className="justify-content-center mt-4">
        <Col xs={12} className="text-center">
         
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mb-3">
          
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Comments />
        </Col>
      </Row>
    </div>
  );
};

export default Community;
