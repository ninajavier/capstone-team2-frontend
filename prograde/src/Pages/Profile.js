import React from 'react';
import UserProfile from './UserProfile'; // Ensure the path is correct
import { Card, Row, Col } from 'react-bootstrap';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ForumIcon from '@material-ui/icons/Forum';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';

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
                <StarIcon /> Progrades
              </Card.Title>
              <Card.Text>
                <div>
                  <ThumbUpIcon /> Upvotes
                  {/* Here you'd list out the threads/posts the user has upvoted */}
                </div>
                <div className="mt-2">
                  <ThumbDownIcon /> Downvotes
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
                <ForumIcon /> Threads
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
                <CommentIcon /> Comments
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
                <FavoriteIcon /> Favorite Routes
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
