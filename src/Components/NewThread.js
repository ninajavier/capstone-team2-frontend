import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { styled } from '@mui/system';
import { ChatBubbleOutline } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';


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

const NewThread = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    station: '',
    title: '',
    body: '',
  });
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const API = process.env.REACT_APP_API_URL;
  const nycTrainLines = [
    "Select Train Line", "1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "B", "D", "F", "M", "N", "Q", "R", "W", "G", "J", "Z", "L", "S"
  ];

  const showNewThread = () => {
    setShowNewThreadModal(true);
  };

  const closeNewThreadModal = () => {
    setShowNewThreadModal(false);
  };

  const showSuccess = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  const submitNewThread = async () => {
    try {
      // Make a POST request to create a new thread
      const response = await axios.post(`${API}/api/threads`, newThread);

      // Add the new thread to the list
      setThreads([...threads, response.data.data]);

      // Reset the new thread state
      setNewThread({
        station: '',
        title: '',
        body: '',
      });

      // Close the modal
      closeNewThreadModal();

      // Show the success modal
      showSuccess();
    } catch (error) {
      console.error('Error creating a new thread:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Live Thread Feed!</h3>
          <Button variant="primary" onClick={showNewThread} style={{ marginBottom: '1rem' }}>
            Add New Thread
          </Button>
          {threads.map((comment, index) => (
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
      {/* New Thread Modal */}
      <Modal show={showNewThreadModal} onHide={closeNewThreadModal}>
  <Modal.Header closeButton>
    <Modal.Title>Create a New Thread</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Select a Station</Form.Label>
        <Form.Select name="station" onChange={handleInputChange} value={newThread.station}>
          {nycTrainLines.map((line, lineIndex) => (
            <option key={lineIndex} value={line}>
              {line}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Thread Title</Form.Label>
        <Form.Control type="text" name="title" onChange={handleInputChange} value={newThread.title} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Thread Body</Form.Label>
        <Form.Control as="textarea" name="body" onChange={handleInputChange} value={newThread.body} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeNewThreadModal}>
      Close
    </Button>
    <Button variant="primary" onClick={submitNewThread}>
      Create Thread
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showSuccessModal} onHide={closeSuccessModal}>
  <Modal.Header closeButton>
    <Modal.Title>Success!</Modal.Title>
  </Modal.Header>
  <Modal.Body>Your thread has been added successfully.</Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={closeSuccessModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </Container>
  );
};

export default NewThread;
