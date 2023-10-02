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

const FirebaseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [userThreads, setUserThreads] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {}, []);
  console.log(userComments, userThreads);

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

          // Fetch the user's profile photo from Firebase and update the state
          const photoURL = user.photoURL; // Assuming Firebase provides the photo URL
          setUserProfile({ ...userProfile, profilePhoto: photoURL });
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
      navigate("/community"); // Redirect to the Community page on successful login
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/community"); // Redirect to the Community page on successful login with Google
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
    <Container fluid>
      <Row className="justify-content-center">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="d-flex align-items-center p-5"
        >
          <Card
            className="w-100 p-5"
            style={{
              borderRadius: "50%", // Make the card circular
              width: "400px", // Adjust the size as needed
              height: "400px", // Adjust the size as needed
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly", // Add spacing around the buttons
            }}
          >
            <Card.Title className="text-center">
              <Image
                src="./assets/ProgradeLogo.png"
                roundedCircle
                width="100"
                height="100"
                className="mb-3"
              />
            </Card.Title>
            {error && <div className="login-error">{error}</div>}
            {user ? (
              <>
                <img
                  src={`https://source.unsplash.com/random/50x50/?portrait&`}
                  alt="avatar"
                  style={{ borderRadius: "50%", marginRight: "10px" }}
                />
                <div><strong>Welcome Back</strong></div>
                <div>{user.displayName}</div>
                <div>{user.email}</div>
                {/* <h3>Your Threads:</h3>
                <h3>Your Comments:</h3> */}
                <Button variant="danger" onClick={handleSignOut}>
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FirebaseLogin;
