import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { styled } from "@mui/system";
import { ChatBubbleOutline } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

const CommentCard = styled(Card)(({ theme }) => ({
  marginTop: "1rem",
  padding: "1rem",
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.8)",
}));

const CommentText = styled(Card.Title)(({ theme }) => ({
  fontSize: "1.25rem",
}));

const ThreadTitle = styled(Card.Text)(({ theme }) => ({
  fontSize: "1rem",
  opacity: 0.7,
}));

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.text}</p>
          {/* Add any other comment details you want to display */}
        </div>
      ))}
    </div>
  );
};

const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newThread, setNewThread] = useState({
    station: "",
    title: "",
    body: "",
  });
  const API = process.env.REACT_APP_API_URL;
  const nycTrainLines = [
    "Select Train Line",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "A",
    "C",
    "E",
    "B",
    "D",
    "F",
    "M",
    "N",
    "Q",
    "R",
    "W",
    "G",
    "J",
    "Z",
    "L",
    "S",
  ];

  useEffect(() => {
    const fetchCommentsForThread = async (threadId) => {
      try {
        const response = await axios.get(
          `${API}/api/threads/${threadId}/comments`
        );
        return response.data.data; // Assuming the comments are returned in the response
      } catch (error) {
        console.error(`Error fetching comments for thread ${threadId}:`, error);
        return []; // Return an empty array if there's an error
      }
    };

    const fetchThreadsAndComments = async () => {
      try {
        const response = await axios.get(`${API}/api/threads`);
        const threadsData = response.data.data;

        // Fetch comments for each thread
        const threadsWithComments = await Promise.all(
          threadsData.map(async (thread) => {
            const comments = await fetchCommentsForThread(thread.id);
            return { ...thread, comments };
          })
        );

        setThreads(threadsWithComments);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreadsAndComments();
  }, [API]);

  // Filter threads based on the selected station
  const filteredThreads = selectedStation
    ? threads.filter((thread) => thread.station === selectedStation)
    : threads;

  // Handler for opening the "Create New Thread" modal
  const openNewThreadModal = () => {
    setShowNewThreadModal(true);
  };

  // Handler for closing the "Create New Thread" modal
  const closeNewThreadModal = () => {
    setShowNewThreadModal(false);
  };

  // Handler for submitting a new thread
  const submitNewThread = async () => {
    try {
      // Make a POST request to create a new thread
      const response = await axios.post(`${API}/api/threads`, newThread);

      // Add the new thread to the list
      setThreads([...threads, response.data.data]);

      // Reset the new thread state
      setNewThread({
        station: "",
        title: "",
        body: "",
      });

      // Close the modal
      closeNewThreadModal();
    } catch (error) {
      console.error("Error creating a new thread:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Live Thread Feed!</h3>

          {/* Add a dropdown to select a station */}
          <Form.Group className="mb-3">
            <Form.Label>Select a Station</Form.Label>
            <Form.Select
              name="station"
              onChange={(e) => {
                setSelectedStation(e.target.value);
                // Enable the "Create New Thread" button when a station is selected
                setNewThread({ ...newThread, station: e.target.value });
              }}
              value={selectedStation}
            >
              <option value="">All Stations</option>
              {nycTrainLines.map((line, lineIndex) => (
                <option key={lineIndex} value={line}>
                  {line}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Button to open the "Create New Thread" modal */}
          <Button
            variant="primary"
            onClick={() => setShowNewThreadModal(true)} // Show the modal when the button is clicked
            disabled={!newThread.station}
          >
            Create New Thread
          </Button>

          {filteredThreads.map((thread, index) => (
            <CommentCard key={index}>
              <Card.Body>
                {/* Avatar and date */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`https://source.unsplash.com/random/50x50/?portrait&${index}`}
                    alt="avatar"
                    style={{ borderRadius: "50%", marginRight: "10px" }}
                  />
                  <div>
                    <CommentText>{thread.title}</CommentText>
                    <small>{new Date().toLocaleString()}</small>
                  </div>
                </div>

                {/* NYC MTA train line dropdown */}
                <Card.Text>
                  {thread.body.split("\n").map((text, tIndex) => (
                    <React.Fragment key={tIndex}>
                      <ChatBubbleOutline />
                      <ThreadTitle as="span">{text}</ThreadTitle>
                      <br />
                    </React.Fragment>
                  ))}
                </Card.Text>

                {/* Display comments for the thread */}
                <CommentList comments={thread.comments} />
              </Card.Body>
            </CommentCard>
          ))}
        </Col>
      </Row>

      {/* NewThread modal */}
      <Modal show={showNewThreadModal} onHide={closeNewThreadModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="station">
            <Form.Label>Select Station</Form.Label>
            <Form.Select
              value={newThread.station}
              onChange={(e) =>
                setNewThread({ ...newThread, station: e.target.value })
              }
            >
              {nycTrainLines.map((line, lineIndex) => (
                <option key={lineIndex} value={line}>
                  {line}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Thread Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter thread title"
              value={newThread.title}
              onChange={(e) =>
                setNewThread({ ...newThread, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Thread Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter thread body"
              value={newThread.body}
              onChange={(e) =>
                setNewThread({ ...newThread, body: e.target.value })
              }
            />
          </Form.Group>
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
    </Container>
  );
};

export default Threads;
