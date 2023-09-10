import React from 'react';
import UserProfile from './UserProfile'; // Ensure the path is correct
import { Card, Row, Col } from 'react-bootstrap';

const Profile = () => {
  return (
    <div className="Profile container mt-4">
      <h1 className="text-center mb-4">Welcome to Prograde Profile Page!</h1>
      
      <UserProfile />

      <Row>
        <Col md={6}>
          <Card className="mb-4" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>
                <i className="material-icons">star</i> Progrades
              </Card.Title>
              <Card.Text>
                <div>
                  <i className="material-icons">thumb_up</i> Upvotes
                  {/* Here you'd list out the threads/posts the user has upvoted */}
                </div>
                <div className="mt-2">
                  <i className="material-icons">thumb_down</i> Downvotes
                  {/* Here you'd list out the threads/posts the user has downvoted */}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>
                <i className="material-icons">forum</i> Threads
              </Card.Title>
              <Card.Text>
                {/* Here you'd list out the threads the user has created */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>
                <i className="material-icons">comment</i> Comments
              </Card.Title>
              <Card.Text>
                {/* Here you'd list out the comments the user has posted */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>
                <i className="material-icons">favorite</i> Favorite Routes
              </Card.Title>
              <Card.Text>
                {/* Here you'd list out the user's favorite routes */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* You can add other components or elements here if needed */}
    </div>
  );
}

export default Profile;
