import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { styled } from '@mui/system';
import { ChatBubbleOutline, Delete } from '@mui/icons-material'; // Import the Delete icon

const CommentCard = styled(Card)(({ theme }) => ({
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.8)',
}));

// const CommentText = styled(Card.Title)(({ theme }) => ({
//   fontSize: '1.25rem',
// }));

const ThreadTitle = styled(Card.Text)(({ theme }) => ({
  fontSize: '1rem',
  opacity: 0.7,
}));

const Icon = styled(ChatBubbleOutline)(({ theme }) => ({
  marginRight: '0.5rem',
}));

const DeleteIcon = styled(Delete)(({ theme }) => ({
  marginLeft: '0.5rem',
  cursor: 'pointer', // Add cursor pointer for the delete icon
  color: 'red', // Change the color to red
}));

const API = process.env.REACT_APP_API_URL; // Use the environment variable for API URL

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

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
  const updateComments = async () => {
    try {
      if (!newCommentText) return; // Don't submit empty comments

      // Make a POST request to add a new comment
      const response = await axios.post(`${API}/api/threads/:threadId/comments`, {
        text: newCommentText,
      }); // Replace with your actual API endpoint URL

      // Update comments with the new comment
      setComments([...comments, response.data]);
      setNewCommentText(''); // Clear the input field after submitting
    } catch (error) {
      console.error('Error adding a new comment:', error);
    }
  };

  // Function to delete a comment
  const deleteComment = async (commentId) => {
    try {
      // Make a DELETE request to remove the comment
      await axios.delete(`${API}/api/comments/${commentId}`); // Replace with your actual API endpoint URL

      // Update comments by filtering out the deleted comment
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error(`Error deleting comment with ID ${commentId}:`, error);
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
                  <DeleteIcon onClick={() => deleteComment(comment.id)} /> {/* Add the delete button */}
                  <br />
                </React.Fragment>
              ))}
            </Card.Text>
          </Card.Body>
        </CommentCard>
      ))}
      {/* Form to allow users to add a new comment */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={updateComments}>
          Add Comment
        </Button>
      </Form>
    </Container>
  );
};

export default Comments;
