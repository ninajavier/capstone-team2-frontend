import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Card, Button, Form } from 'react-bootstrap';
import Comments from '../Components/Comments';
import ThreadDetail from '../Components/ThreadDetail';

const Community = () => {
  const [filter, setFilter] = useState('Location');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs={12} className="text-center">
          <h1>
            <i className="material-icons">forum</i> Welcome to Prograde's Community Page
          </h1>
        </Col>
      </Row>

      <Row className="mt-3 mb-4">
        <Col md={3}>
          <Form.Control as="select" value={filter} onChange={handleFilterChange}>
            <option value="Location">Location</option>
            <option value="Borough">Borough</option>
            <option value="Time">Time</option>
            <option value="Station">Station</option>
          </Form.Control>
        </Col>
        <Col md={9}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <i className="material-icons">sort</i> Sort By: {filter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* ... dynamically generate dropdown items based on the selected filter ... */}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mb-3">
            <Card.Header>
              <i className="material-icons">location_on</i> Current Location
            </Card.Header>
            <Card.Body>
              <Card.Title>Nearby Discussions</Card.Title>
              <Card.Text>
                View discussions near your current location to stay updated with the latest happenings around you.
              </Card.Text>
              <Button variant="primary">
                <i className="material-icons">explore</i> Explore
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Comments />
          <ThreadDetail />
        </Col>
      </Row>
    </Container>
  );
};

export default Community;
