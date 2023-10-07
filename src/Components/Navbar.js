import React, { useState, useContext } from "react";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import RatingModal from "./RatingModal";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { UserContext } from "../providers/UserProvider"; // Import UserContext

const MyNavbar = () => {
  const progradeLogoPath = "./assets/ProgradeTrain.png";

  const [showAuthModal, setShowAuthModal] = useState(false);
  const user = useContext(UserContext); // Access user context

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
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

  const logoStyle = {
    marginRight: "auto", // Align the logo to the left
  };

  return (
    <Navbar
      style={navbarStyle}
      variant="dark"
      expand="lg"
    >
      <Container>
        <LinkContainer to="/" style={logoStyle}>
          <Navbar.Brand>
            <Image
              src={progradeLogoPath}
              roundedCircle
              width="100"
              height="50"
              className="mr-2"
            />
            <strong><h1>Prograde</h1></strong>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <LinkContainer to="/home">
              <Nav.Link className="navbar-link"><h5>Home</h5></Nav.Link>
            </LinkContainer>
            <NavDropdown title={<h5>About Us</h5>} id="basic-nav-dropdown" className="navbar-link" style={{ marginTop: '1.9rem' }}>
              <LinkContainer to="/build">
                <NavDropdown.Item><h6>Github Repositories</h6></NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/developers">
                <NavDropdown.Item><h6>Meet the Developers</h6></NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/community">
              <Nav.Link className="navbar-link"><h5>Community</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/find-route">
              <Nav.Link className="navbar-link"><h5>Find Route</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/station-info">
              <Nav.Link className="navbar-link"><h5>Service Alerts</h5></Nav.Link>
            </LinkContainer>
            {/* RatingModal trigger */}
            <Nav.Link onClick={openAuthModal} className="navbar-link">
              <h5>Feedback?</h5>
            </Nav.Link>
            <NavDropdown title={user ? <Image
              src={user.photoURL}
              roundedCircle
              width="50"
              height="50"
              alt="User Avatar"
            /> : null} id="basic-nav-dropdown" className="navbar-link">
              {user && (
                <NavDropdown.Item>
                  <Navbar.Text style={{ color: "#000" }}>{user.email}</Navbar.Text>
                </NavDropdown.Item>
              )}
              {user && (
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    <h6>Profile</h6>
                  </NavDropdown.Item>
                </LinkContainer>
              )}
              {user && (
                <NavDropdown.Item onClick={handleSignOut}>
                  <h6>Logout</h6>
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* RatingModal */}
      <RatingModal
        show={showAuthModal}
        onClose={closeAuthModal}
      />
    </Navbar>
  );
};

export default MyNavbar;
