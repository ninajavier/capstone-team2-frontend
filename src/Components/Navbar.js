import React, { useState } from "react";
import { Navbar, Nav, Container, Image, Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import RatingModal from "./RatingModal";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const MyNavbar = () => {
  const progradeLogoPath = "./assets/ProgradeTrain.png";

  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = {}; //useUser();

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navbarStyle = {
    backgroundColor: "#000", // "#273170" Set the background color
    minHeight: "100px", // Set the minimum height to make it larger
    fontSize: "20px", // Set the font size
    fontWeight: 250, // Add any other inline styles you want here
  };

  // Customize the button style to remove the green outline
  const buttonStyle = {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <Navbar
      style={navbarStyle}
      variant="dark"
      expand="lg"
      className="justify-content-center"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image
              src={progradeLogoPath}
              roundedCircle
              width="100"
              height="50"
              className="mr-2"
            />
            <strong>Prograde</strong>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/home">
              <Nav.Link className="navbar-link">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/community">
              <Nav.Link className="navbar-link">Community</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/find-route">
              <Nav.Link className="navbar-link">Find Route</Nav.Link>
            </LinkContainer>
            <NavDropdown title="About Us" id="basic-nav-dropdown" className="navbar-link">
              <LinkContainer to="/build">
                <NavDropdown.Item>Github Repositories</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/developers">
                <NavDropdown.Item>Meet the Developers</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/profile">
              <Nav.Link className="navbar-link">Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings">
              <Nav.Link className="navbar-link">Settings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/station-info">
              <Nav.Link className="navbar-link">Station Info</Nav.Link>
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
              <Button
                style={buttonStyle} // Apply the button style here
                onClick={openAuthModal}
                className="navbar-link"
              >
                Rate Prograde
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <RatingModal
        show={showAuthModal}
        onClose={closeAuthModal}
        isAuthenticated={!!user}
      />
    </Navbar>
  );
};

export default MyNavbar;
