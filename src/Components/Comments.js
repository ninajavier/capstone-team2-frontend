import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { styled } from '@mui/system';
import { ChatBubbleOutline } from '@mui/icons-material';

const CommentCard = styled(Card)(({ theme }) => ({
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.8)',
}));

const CommentText = styled(Card.Title)(({ theme }) => ({
  fontSize: '1.25rem',
}));

const ThreadTitle = styled(Card.Text)(({ theme }) => ({
  fontSize: '1rem',
  opacity: 0.7,
}));

const Icon = styled(ChatBubbleOutline)(({ theme }) => ({
  marginRight: '0.5rem',
}));

const Comments = () => {
  const [comments, setComments] = useState([]);

  const nycTrainLines = [
    "Select Train Line", "1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "B", "D", "F", "M", "N", "Q", "R", "W", "G", "J", "Z", "L", "S"
  ];

  useEffect(() => {
    const fetchCommentsAndThreads = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1/posts');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchCommentsAndThreads();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Let's Display Progrades Below!</h3>
          {comments.map((comment, index) => (
            <CommentCard key={index}>
              <Card.Body>
                {/* Avatar and date */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`https://source.unsplash.com/random/50x50/?portrait&${index}`} alt="avatar" style={{ borderRadius: '50%', marginRight: '10px' }} />
                  <div>
                    <CommentText>{comment.title}</CommentText>
                    <small>{new Date().toLocaleString()}</small> {/* Display the current date and time */}
                  </div>
                </div>

                {/* NYC MTA train line dropdown */}
                <Form.Select aria-label="Default select example" style={{ marginBottom: '10px' }}>
                  {nycTrainLines.map((line, lineIndex) => (
                    <option key={lineIndex} value={line}>
                      {line}
                    </option>
                  ))}
                </Form.Select>

                <Card.Text>
                  {comment.body.split('\n').map((text, tIndex) => (
                    <React.Fragment key={tIndex}>
                      <Icon />
                      <ThreadTitle as="span">{text}</ThreadTitle>
                      <br />
                    </React.Fragment>
                  ))}
                </Card.Text>
              </Card.Body>
            </CommentCard>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Comments;
