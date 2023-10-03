import React, { useEffect, useState } from "react";
// Import individual images with "A-letter" pattern
import _1Train from "../Assets/1-digit.256x256.png";
import _2Train from "../Assets/2-digit.256x256.png";
import _3Train from "../Assets/3-digit.256x256.png";
import _4Train from "../Assets/4-digit.256x256.png";
import _5Train from "../Assets/5-digit.256x256.png";
import _6Train from "../Assets/6-digit.256x256.png";
import _7Train from "../Assets/7-digit.256x256.png";
import _ATrain from "../Assets/a-letter.256x256.png";
import _BTrain from "../Assets/b-letter.256x256.png";
import _CTrain from "../Assets/c-letter.256x256.png";
import _DTrain from "../Assets/d-letter.256x256.png";
import _ETrain from "../Assets/e-letter.256x256.png";
import _FTrain from "../Assets/f-letter.256x256.png";
import _MTrain from "../Assets/m-letter.256x256.png";
import _NTrain from "../Assets/n-letter.256x256.png";
import _QTrain from "../Assets/q-letter.256x256.png";
import _RTrain from "../Assets/r-letter.256x256.png";
import _WTrain from "../Assets/w-letter.256x256.png";
import _GTrain from "../Assets/g-letter.256x256.png";
import _JTrain from "../Assets/j-letter.256x256.png";
import _ZTrain from "../Assets/z-letter.256x256.png";
import _LTrain from "../Assets/l-letter.256x256.png";
import _STrain from "../Assets/s-letter.256x256.png";

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
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { ChatBubble, Edit, Delete, Place, Subway } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import CommentList from "./CommentList"; // Import the CommentList component

const CommentCard = styled(Card)(({ theme }) => ({
  marginTop: "1rem",
  padding: "1rem",
  borderRadius: "10px",
  backgroundColor: "rgba(64, 64, 64, 0.4)", // Darker gray color with 40% opacity
}));

const CommentText = styled(Card.Title)(({ theme }) => ({
  fontSize: "1.25rem",
  marginBottom: "0",
}));

const ThreadTitle = styled(Card.Text)(({ theme }) => ({
  fontSize: "1rem",
  opacity: 0.7,
}));

const getTrainLineIcon = (trainLine) => {
  switch (trainLine) {
    case "1":
      return _1Train;
    case "2":
      return _2Train;
    case "3":
      return _3Train;
    case "4":
      return _4Train;
    case "5":
      return _5Train;
    case "6":
      return _6Train;
    case "7":
      return _7Train;
    case "A":
      return _ATrain;
    case "B":
      return _BTrain;
    case "C":
      return _CTrain;
    case "D":
      return _DTrain;
    case "E":
      return _ETrain;
    case "F":
      return _FTrain;
    case "M":
      return _MTrain;
    case "N":
      return _NTrain;
    case "Q":
      return _QTrain;
    case "R":
      return _RTrain;
    case "W":
      return _WTrain;
    case "G":
      return _GTrain;
    case "J":
      return _JTrain;
    case "Z":
      return _ZTrain;
    case "L":
      return _LTrain;
    case "S":
      return _STrain;
    default:
      return null; // Return null for unknown train lines
  }
};

const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [showEditThreadModal, setShowEditThreadModal] = useState(false);
  const [newThread, setNewThread] = useState({
    train_line: "Select Train Line",
    station: "",
    title: "",
    body: "",
    rating: 1, // Default rating
    is_favorite: false, // Default is_favorite
    tags: [],
  });
  const [editingThread, setEditingThread] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [selectedThreadIndex, setSelectedThreadIndex] = useState(null);
  const [sortByTrainLine, setSortByTrainLine] = useState(""); // Added state for sorting by train line
  const [selectedTrainLine, setSelectedTrainLine] = useState("All"); // Added state for selected train line

  const API = process.env.REACT_APP_API_URL;
  const nycTrainLines = [
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
    const fetchThreadsAndComments = async () => {
      try {
        const response = await axios.get(`${API}/api/threads`);
        const threadsData = response.data.data;

        const threadsWithComments = await Promise.all(
          threadsData.map(async (thread) => {
            const commentsResponse = await axios.get(
              `${API}/api/threads/${thread.id}/comments`
            );
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
        train_line: "Select Train Line",
        station: "",
        title: "",
        body: "",
        rating: 1,
        is_favorite: false,
        tags: [],
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

  const filteredThreads = threads.filter((thread) => {
    if (selectedTrainLine === "All") {
      return true; // Show all threads if "All" is selected
    } else {
      return thread.train_line === selectedTrainLine; // Filter threads by selected train line
    }
  });
  // Sort threads based on the selected train line
  if (sortByTrainLine === "asc") {
    // Ascending order
    filteredThreads.sort((a, b) => a.train_line.localeCompare(b.train_line));
  } else if (sortByTrainLine === "desc") {
    // Descending order
    filteredThreads.sort((a, b) => b.train_line.localeCompare(a.train_line));
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>Live Thread Feed!</h3>
          <Form.Group controlId="selectTrainLine">
            <Form.Label>Select Train Line</Form.Label>
            <Form.Select
              value={selectedTrainLine}
              onChange={(e) => setSelectedTrainLine(e.target.value)}
            >
              <option value="All">All</option>
              {nycTrainLines.map((line, lineIndex) => (
                <option key={lineIndex} value={line}>
                  {line}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={openNewThreadModal}>
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
                      {format(
                        new Date(thread.created_at),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </small>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex" }}>
                    <IconButton
                      variant="outline-primary"
                      size="sm"
                      onClick={() => openEditThreadModal(thread)}
                      style={{ marginRight: "5px" }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteThread(thread.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>

                <Card.Text>
                  <Subway />:
                  {getTrainLineIcon(thread.train_line) && (
                    <img
                      src={getTrainLineIcon(thread.train_line)}
                      alt={`${thread.train_line} icon`}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginLeft: "8px",
                      }}
                    />
                  )}
                  <br />
                  <Place />: {thread.station}
           
                  Tags: {thread.tags.join(", ")}
                  <br />
                  {thread.body.split("\n").map((text, tIndex) => (
                    <React.Fragment key={tIndex}>
                      <ChatBubble />
                      <ThreadTitle as="span">{text}</ThreadTitle>
                      <br />
                    </React.Fragment>
                  ))}
                </Card.Text>

                {selectedThreadIndex === index && showComments ? (
                  <CommentList comments={thread.comments} />
                ) : null}
              </Card.Body>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => toggleComments(index)}
                style={{ marginLeft: "10px" }}
              >
                {selectedThreadIndex === index && showComments
                  ? "Hide Comments"
                  : "View Comments"}
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
          <Form.Group controlId="train_line">
            <Form.Label>Select Train Line</Form.Label>
            <Form.Select
              value={newThread.train_line}
              onChange={(e) =>
                setNewThread({ ...newThread, train_line: e.target.value })
              }
            >
              {nycTrainLines.map((line, lineIndex) => (
                <option key={lineIndex} value={line}>
                  {line}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="station">
            <Form.Label>Station</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter station"
              value={newThread.station}
              onChange={(e) =>
                setNewThread({ ...newThread, station: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="is_favorite">
            <Form.Label>Is Favorite</Form.Label>
            <Form.Check
              type="checkbox"
              label="Yes"
              checked={newThread.is_favorite}
              onChange={(e) =>
                setNewThread({ ...newThread, is_favorite: e.target.checked })
              }
            />
          </Form.Group>
          <Form.Group controlId="tags">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              value={newThread.tags.join(", ")}
              onChange={(e) =>
                setNewThread({ ...newThread, tags: e.target.value.split(", ") })
              }
            />
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
          <Form.Group controlId="rating">
            <Form.Label>Rating (1-5)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              min="1"
              max="5"
              value={newThread.rating}
              onChange={(e) =>
                setNewThread({ ...newThread, rating: parseInt(e.target.value) })
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
          <Form.Group controlId="train_line">
            <Form.Label>Select Train Line</Form.Label>
            <Form.Select
              value={editingThread?.train_line || "Select Train Line"}
              onChange={(e) =>
                setEditingThread({
                  ...editingThread,
                  train_line: e.target.value,
                })
              }
            >
              {nycTrainLines.map((line, lineIndex) => (
                <option key={lineIndex} value={line}>
                  {line}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="station">
            <Form.Label>Station</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter station"
              value={editingThread?.station || ""}
              onChange={(e) =>
                setEditingThread({ ...editingThread, station: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="is_favorite">
            <Form.Label>Is Favorite</Form.Label>
            <Form.Check
              type="checkbox"
              label="Yes"
              checked={editingThread?.is_favorite || false}
              onChange={(e) =>
                setEditingThread({
                  ...editingThread,
                  is_favorite: e.target.checked,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="tags">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              value={editingThread?.tags ? editingThread.tags.join(", ") : ""}
              onChange={(e) =>
                setEditingThread({
                  ...editingThread,
                  tags: e.target.value.split(", "),
                })
              }
            />
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
          <Form.Group controlId="rating">
            <Form.Label>Rating (1-5)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              min="1"
              max="5"
              value={editingThread?.rating || 1}
              onChange={(e) =>
                setEditingThread({
                  ...editingThread,
                  rating: parseInt(e.target.value),
                })
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
