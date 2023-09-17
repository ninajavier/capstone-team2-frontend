import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "../config/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [userThreads, setUserThreads] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }

        const commentsRef = collection(db, "comments");
        const commentsQuery = query(commentsRef, where("userId", "==", user.uid));
        const commentsSnapshot = await getDocs(commentsQuery);
        setUserComments(commentsSnapshot.docs.map(doc => doc.data()));

        const threadsRef = collection(db, "threads");
        const threadsQuery = query(threadsRef, where("userId", "==", user.uid));
        const threadsSnapshot = await getDocs(threadsQuery);
        setUserThreads(threadsSnapshot.docs.map(doc => doc.data()));
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
    <Container fluid className="p-0">
      <Row noGutters className="min-vh-100">
        <Col md={6} className="d-flex align-items-center justify-content-center p-5">
          <Card className="w-100 p-4">
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
                <Button variant="primary" onClick={handleSignInWithGoogle} className="ml-2">
                  Sign In with Google
                </Button>
              </Form>
            )}
          </Card>
        </Col>
        <Col md={6} className="d-none d-md-block p-0">
          <Image src="./assets/commute.jpg" alt="Commute Image" fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
