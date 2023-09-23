import React, { useState } from "react";
import { Navbar, Nav, Container, Image, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import RatingModal
 from "./RatingModal";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const MyNavbar = () => {
  const progradeLogoPath = "./assets/ProgradeLogo.png";

  const [showRatingModal
    , setShowRatingModal
  ] = useState(false);
  const { user } = {}; //useUser();

  const openRatingModal
   = () => {
    setShowRatingModal
    (true);
  };

  const closeRatingModal
   = () => {
    setShowRatingModal
    (false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '120px' }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand style={{ fontSize: '36px' }}>
            <Image
              src={progradeLogoPath}
              roundedCircle
              width="80"
              height="80"
              className="mr-2"
            />
            Prograde
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/home">
              <Nav.Link>
                <i className="material-icons">home</i>
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/community">
              <Nav.Link>
                <i className="material-icons">group</i>
                Community
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/find-route">
              <Nav.Link>
                <i className="material-icons">directions</i>
                Find Route
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>
                <i className="material-icons">person</i>
                Profile
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings">
              <Nav.Link>
                <i className="material-icons">settings</i>
                Settings
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/station-info">
              <Nav.Link>
                <i className="material-icons">info</i>
                Station Info
              </Nav.Link>
            </LinkContainer>
            {user ? (
              <>
                <Navbar.Text className="mr-3" style={{ fontSize: '20px' }}>
                  Signed in as: {user.email}
                </Navbar.Text>
                <Button variant="outline-info" onClick={handleSignOut}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline-success" onClick={openRatingModal
              }>
                Rate Prograde?
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <RatingModal
      
        show={showRatingModal
        }
        onClose={closeRatingModal
        }
        isAuthenticated={!!user}
      />
    </Navbar>
  );
};

export default MyNavbar;
