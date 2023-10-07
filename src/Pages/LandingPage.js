import React from "react";
import FirebaseLogin from "../Components/FirebaseLogin";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const videos = [
    "assets/bkview.mp4",
    "assets/bxview.mp4",
    "assets/qnsview.mp4",
    "assets/siview.mp4",
    "assets/mtnview.mp4",
    "assets/njview.mp4",
    "assets/liview.mp4",
  ];
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Video background */}
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
      <Container fluid
        className="position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center bg-opacity-75 bg-dark text-white p-4"
        style={{
          borderRadius: "15px",
          maxWidth: "1200px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h1>Welcome to Prograde!</h1>
        <h5>
        "Prograde is a NYC transit-focused social network offering real-time service updates and a community space for commuters to connect and grow. Join the future of community-driven transit experiences."
        </h5>

        {/* FirebaseLogin component */}
        <FirebaseLogin />

      </Container>
    </div>
  );
};

export default LandingPage;
