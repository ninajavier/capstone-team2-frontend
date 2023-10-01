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
import { format } from "date-fns";
import CommentList from './CommentList'; // Import the CommentList component
import icons from "../Assets";


const CommentCard = styled(Card)(({ theme }) => ({
  marginTop: "1rem",
  padding: "1rem",
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.8)",
}));

const CommentText = styled(Card.Title)(({ theme }) => ({
  fontSize: "1.25rem",
  marginBottom: "0",
}));

const ThreadTitle = styled(Card.Text)(({ theme }) => ({
  fontSize: "1rem",
  opacity: 0.7,
}));


const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [selectedTrainLine, setSelectedTrainLine] = useState("");
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [showEditThreadModal, setShowEditThreadModal] = useState(false);
  const [newThread, setNewThread] = useState({
    trainLine: "",
    title: "",
    body: "",
  });
  const [editingThread, setEditingThread] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [selectedThreadIndex, setSelectedThreadIndex] = useState(null);

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
        const response = await axios.get(`${API}/api/threads/${threadId}/comments`);
        return response.data.comments;
      } catch (error) {
        console.error(`Error fetching comments for thread ${threadId}:`, error);
        return [];
      }
    };
  
    const fetchThreadsAndComments = async () => {
      try {
        const response = await axios.get(`${API}/api/threads`);
        const threadsData = response.data.data;
    
        const threadsWithComments = await Promise.all(
          threadsData.map(async (thread) => {
            const commentsResponse = await axios.get(`${API}/api/threads/${thread.id}/comments`);
            const comments = commentsResponse.data.data;
            return { ...thread, comments };
          })
        );
    
        const sortedThreads = threadsWithComments.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    
        setThreads(sortedThreads);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };
    
  
    fetchThreadsAndComments();
  }, [API]);

  const toggleComments = (index) => {
    setShowComments(!showComments);
    setSelectedThreadIndex(index);
  };

  const filteredThreads = selectedTrainLine
    ? threads.filter((thread) => thread.trainLine === selectedTrainLine)
    : threads;

  const openNewThreadModal = () => {
    setShowNewThreadModal(true);
  };

  const closeNewThreadModal = () => {
    setShowNewThreadModal(false);
  };

  const openEditThreadModal = (thread) => {
    setEditingThread(thread);
    setShowEditThreadModal(true);
  };

  const closeEditThreadModal = () => {
    setShowEditThreadModal(false);
  };

  const submitNewThread = async () => {
    try {
      const response = await axios.post(`${API}/api/threads`, newThread);
      setThreads([...threads, response.data.data]);
      setNewThread({
        trainLine: "",
        title: "",
        body: "",
      });
      closeNewThreadModal();
    } catch (error) {
      console.error("Error creating a new thread:", error);
    }
  };

  const submitEditedThread = async () => {
    try {
      const response = await axios.put(
        `${API}/api/threads/${editingThread.id}`,
        editingThread
      );
      const updatedThreads = threads.map((thread) =>
        thread.id === editingThread.id ? response.data.data : thread
      );
      setThreads(updatedThreads);
      closeEditThreadModal();
    } catch (error) {
      console.error(`Error editing thread with ID ${editingThread.id}:`, error);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      await axios.delete(`${API}/api/threads/${threadId}`);
      const updatedThreads = threads.filter((thread) => thread.id !== threadId);
      setThreads(updatedThreads);
    } catch (error) {
      console.error(`Error deleting thread with ID ${threadId}:`, error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Live Thread Feed!</h3>

          <Button
            variant="primary"
            onClick={openNewThreadModal}
          >
            Create New Thread
          </Button>

          {filteredThreads.map((thread, index) => (
            <CommentCard key={index}>
              <Card.Body>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`https://source.unsplash.com/random/50x50/?portrait&${index}`}
                    alt="avatar"
                    style={{ borderRadius: "50%", marginRight: "10px" }}
                  />
                  <div>
                    <CommentText>{thread.title}</CommentText>
                    <small>
                      {format(new Date(thread.created_at), "yyyy-MM-dd HH:mm:ss")}
                    </small>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex" }}>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => openEditThreadModal(thread)}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteThread(thread.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <Card.Text>
                  Train Line: {thread.train_line}
                  <br />
                  Station: {thread.station}
                  <br />
                  Is Favorite: {thread.is_favorite ? 'Yes' : 'No'}
                  <br />
                  Tags: {thread.tags.join(', ')}
                  <br />
                  {thread.body.split("\n").map((text, tIndex) => (
                    <React.Fragment key={tIndex}>
                      <ChatBubbleOutline />
                      <ThreadTitle as="span">{text}</ThreadTitle>
                      <br />
                    </React.Fragment>
                  ))}
                </Card.Text>

                {icons[thread.trainLine] && (
                  <img
                    src={icons[thread.trainLine]}
                    alt={`${thread.trainLine} icon`}
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "8px",
                    }}
                  />
                )}

                {selectedThreadIndex === index && showComments ? <CommentList comments={thread.comments} /> : null}
              </Card.Body>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => toggleComments(index)}
                style={{ marginLeft: "10px" }}
              >
                {selectedThreadIndex === index && showComments ? "Hide Comments" : "View Comments"}
              </Button>
            </CommentCard>
          ))}
        </Col>
      </Row>

      <Modal show={showNewThreadModal} onHide={closeNewThreadModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="trainLine">
            <Form.Label>Select Train Line</Form.Label>
            <Form.Select
              value={newThread.trainLine}
              onChange={(e) =>
                setNewThread({ ...newThread, trainLine: e.target.value })
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

      <Modal show={showEditThreadModal} onHide={closeEditThreadModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="trainLine">
            <Form.Label>Select Train Line</Form.Label>
            <Form.Select
              value={editingThread?.trainLine || ""}
              onChange={(e) =>
                setEditingThread({ ...editingThread, trainLine: e.target.value })
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
              value={editingThread?.title || ""}
              onChange={(e) =>
                setEditingThread({ ...editingThread, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Thread Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter thread body"
              value={editingThread?.body || ""}
              onChange={(e) =>
                setEditingThread({ ...editingThread, body: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditThreadModal}>
            Close
          </Button>
          <Button variant="primary" onClick={submitEditedThread}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Threads;