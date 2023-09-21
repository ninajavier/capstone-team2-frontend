import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';


const ThreadCard = styled(Card)(({ theme }) => ({
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.8)', // Slight opacity applied here
}));

const CommentList = styled('ul')(({ theme }) => ({
  paddingLeft: '1rem',
  opacity: 0.8, // Slight opacity applied here
}));

const CommentListItem = styled('li')(({ theme }) => ({
  marginBottom: '0.5rem',
}));

const ThreadDetail = (props) => {
  const [thread, setThread] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id: threadId } = useParams();

  useEffect(() => {
    const fetchThreadDetail = async () => {
      try {
        // Fetch thread details from your API
        const response = await axios.get(`/api/threads/${threadId}`);
        setThread(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching thread details:", error);
      }
    };

    fetchThreadDetail();
  }, [threadId]);

  useEffect(() => {
    const fetchExternalComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${threadId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching external comments:', error);
      }
    };

    fetchExternalComments();
  }, [threadId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <ThreadCard>
            <Card.Body>
              <Card.Title>{thread.title}</Card.Title>
              <Card.Text>{thread.description}</Card.Text>
            </Card.Body>
          </ThreadCard>
          <ThreadCard>
            <Card.Body>
              <Card.Title>Comments</Card.Title>
              <CommentList>
                {comments.map((comment, index) => (
                  <CommentListItem key={index}>
                    {comment.body}
                  </CommentListItem>
                ))}
              </CommentList>
            </Card.Body>
          </ThreadCard>
        </Col>
      </Row>
    </Container>
  );
}

export default ThreadDetail;
