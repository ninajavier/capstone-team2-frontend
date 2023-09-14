import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [userThreads, setUserThreads] = useState([]);

  useEffect(() => {
    // Add logic to check for a valid JWT in cookies/local storage and fetch user data from your backend
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/users/${user.id}`);
          setUserProfile(response.data);

          const commentsResponse = await axios.get(`/api/users/${user.id}/comments`);
          setUserComments(commentsResponse.data);

          const threadsResponse = await axios.get(`/api/users/${user.id}/threads`);
          setUserThreads(threadsResponse.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data);
      onClose();
      navigate('/landing');
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      // If you have a backend endpoint to initiate Google authentication, make a request to that endpoint here
      const response = await axios.get('/api/auth/google');
      setUser(response.data);
      onClose();
      navigate('/landing');
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      onClose();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? `Welcome, ${user.email}` : "Sign In"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <>
            <img src={userProfile.profilePhoto} alt="Profile" />
            <h3>Your Comments:</h3>
            <ul>
              {userComments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
              ))}
            </ul>
            <h3>Your Threads:</h3>
            <ul>
              {userThreads.map((thread, index) => (
                <li key={index}>{thread.title}</li>
              ))}
            </ul>
          </>
        ) : (
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {user ? (
          <Button variant="danger" onClick={handleSignOut}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button variant="primary" onClick={handleSignInWithGoogle}>
              Sign In with Google
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
