import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const videos = [
    "assets/bkview.mp4",
    "assets/qnsview.mp4",
    "assets/siview.mp4",
    "assets/mtnview.mp4",
    "assets/njview.mp4",
    "assets/liview.mp4",
  ];
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  return (
    <div className="position-relative" style={{ height: "calc(100vh - 60px)" }}>
      {/* Adjust 60px to your navbar height */}
      <video
        className="position-fixed top-0 start-0 w-100 h-100 object-cover"
        playsInline
        autoPlay
        muted
        loop
        style={{ objectFit: "cover" }}
      >
        <source src={randomVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Container
        className="position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center bg-opacity-75 bg-dark text-white p-4"
        style={{
          borderRadius: "15px",
          maxWidth: "600px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h1>Welcome to Prograde!</h1>
        <p>
          Embark on a transformative journey with Prograde — a hub where productivity meets community engagement. Designed with NYC transit users in mind, our platform revolutionizes the way you receive service updates, offering real-time, locally sourced information to streamline your commuting experience. Immerse yourself in a space where learning is intuitive, and growth is inevitable. Dive in to witness the future of community-powered transit experience.
        </p>
        <Button variant="primary" onClick={() => navigate("/community")}>
          Check Out the Community
        </Button>
      </Container>
    </div>
  );
};

export default LandingPage;
