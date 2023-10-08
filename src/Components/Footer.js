import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#000",
    minHeight: "80px",
    fontSize: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Raleway, sans-serif",
    paddingTop: "1em",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
    marginTop: "2em"
  };

  const pantoneColors = [
    "#0039A6",
    "#FF6319",
    "#6CBE45",
    "#996633",
    "#A7A9AC",
    "#FCCC0A",
    "#808183",
    "#EE352E",
    "#00933C",
    "#B933AD",
  ];

  const squaresContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const squareStyle = {
    width: "30px", // Set the width of each square
    height: "30px", // Set the height of each square
    margin: "0 5px", // Add spacing between squares
  };

  return (
    <footer style={footerStyle}>
      <img
        src="./assets/pursuit.png" // Assuming the image path is correct
        alt="Pursuit Logo" // Provide a meaningful alt text
        style={{ width: "100px", height: "auto", marginRight: "10px" }}
         // Adjust the image size and spacing
      />
      <Container>
        &copy; {new Date().getFullYear()} Prograde. All rights reserved.
      </Container>
      <div style={squaresContainerStyle}>
        {pantoneColors.map((color, index) => (
          <div
            key={index}
            style={{
              ...squareStyle,
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
