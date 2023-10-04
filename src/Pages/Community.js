import { Container, Row, Col,  Card, Button,  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Threads from '../Components/Threads';

const Community = () => {


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
                <i className="material-icons">railway_alert</i> Service Alerts
              </Card.Title>
              <Card.Text>
              Stay informed with the latest guidance and strategies from MTA's Navigators, covering climate emergencies, outages, and practical route advice.
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
                <i className="material-icons">developer_board</i> Devs
              </Card.Title>
              <Card.Text>
              Discover the remarkable Pursuit Core Fellows who brought <strong>Prograde</strong> to NYC -- <strong>Sign up for Developer Beta!</strong>
              </Card.Text>
              <Button variant="secondary" as={Link} to="/developers">
                Sign Up
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
        {/* <Threads /> */}
          <Threads />
        </Col>
      </Row>
    </div>
  );
};

export default Community;
