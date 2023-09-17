import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../providers/UserProvider";

import { auth, googleProvider } from "../config/firebase";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [userThreads, setUserThreads] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/users/${user.id}`);
          setUserProfile(response.data);

          const commentsResponse = await axios.get(
            `/api/users/${user.id}/comments`
          );
          setUserComments(commentsResponse.data);

          const threadsResponse = await axios.get(
            `/api/users/${user.id}/threads`
          );
          setUserThreads(threadsResponse.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/landing");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/landing");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Container 
    fluid 
    className="d-flex flex-column justify-content-center p-0"
    style={{ 
      height: 'calc(100vh - 60px)',  // Adjust 60px to your navbar height
      background: `url('./assets/commuteimage.png') no-repeat center center`, 
      backgroundSize: 'cover' 
    }}
  >
    <Row noGutters className="justify-content-center">
      <Col 
        xs={12} sm={10} md={8} lg={6} xl={4}
        className="d-flex align-items-center p-5"
      >
        <Card 
          className="w-100 p-4" 
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.8)', 
            backdropFilter: 'blur(10px)' 
          }}
          >
            <Card.Title className="text-center">
              <Image
                src="./assets/ProgradeLogo.png"
                roundedCircle
                width="80"
                height="80"
                className="mb-3"
              />
              Welcome to Prograde
            </Card.Title>
            {error && <div className="login-error">{error}</div>}
            {user ? (
              <>
                <img src={userProfile.profilePhoto} alt="Profile" />
                <div>{user.displayName}</div>
                <div>{user.email}</div>
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
                <Button variant="danger" onClick={handleSignOut}>
                  Logout
                </Button>
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
                <Button variant="secondary" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSignInWithGoogle}
                  className="ml-2"
                >
                  Sign In with Google
                </Button>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
