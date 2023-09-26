import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';
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

const API = process.env.REACT_APP_API_URL; // Use the environment variable for API URL

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from the API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/api/threads/:threadId/comments`); // Replace with your actual API endpoint URL
        setComments(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchData();
  }, []);

  // Function to update comments
  const updateComments = async (newComment) => {
    try {
      // Make a POST request to add a new comment
      const response = await axios.post(`${API}/api/threads/:threadId/comments`, newComment); // Replace with your actual API endpoint URL

      // Update comments with the new comment
      setComments([...comments, response.data]);
    } catch (error) {
      console.error('Error adding a new comment:', error);
    }
  };

  return (
    <Container>
      {comments.map((comment, index) => (
        <CommentCard key={index}>
          <Card.Body>
            <Card.Text>
              {comment.text.split('\n').map((text, tIndex) => (
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
      {/* You can add a form or button to allow users to add new comments */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment"
            onChange={(e) => updateComments({ text: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => updateComments({ text: 'New comment' })}>
          Add Comment
        </Button>
      </Form>
    </Container>
  );
};

export default Comments;
