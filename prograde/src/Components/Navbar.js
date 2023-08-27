import React, { useState } from "react";
import { Navbar, Nav, Container, Image, Button } from "react-bootstrap"; // Added Button import
import { LinkContainer } from "react-router-bootstrap";
import AuthModal from "./AuthModal";
import { useUser } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const MyNavbar = () => {
  const progradeLogoPath = "./assets/ProgradeLogo.png";

  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally, reset any user-specific data or redirect the user to a specific page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image
              src={progradeLogoPath}
              roundedCircle
              width="40"
              height="40"
              className="mr-2"
            />
            Prograde
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/community">
              <Nav.Link>Community</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/find-route">
              <Nav.Link>Find Route</Nav.Link>
            </LinkContainer>
            {user ? (
              <>
                <Navbar.Text className="mr-3">
                  Signed in as: {user.email}
                </Navbar.Text>
                <Button variant="outline-info" onClick={handleSignOut}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline-success" onClick={openAuthModal}>
                Login
              </Button>
            )}
            <LinkContainer to="/profile" className="ml-3">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings">
              <Nav.Link>Settings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/station-info">
              <Nav.Link>Station Info</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <AuthModal
        show={showAuthModal}
        onClose={closeAuthModal}
        isAuthenticated={!!user}
      />
    </Navbar>
  );
};

export default MyNavbar;
