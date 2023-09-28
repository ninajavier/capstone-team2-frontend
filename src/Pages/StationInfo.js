import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const StationInfo = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs={12} className="text-center">
          <h1>
            <i className="material-icons">train</i> Welcome To Prograde Station
            Info!
          </h1>
        </Col>
      </Row>

      <Row className="mt-4">
        {["Subway", "Buses", "LIRR", "Metro-North", "Staten Island Rail"].map(
          (transport, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-center">
                    <i className="material-icons">{getIconName(transport)}</i>{" "}
                    {transport}
                  </Card.Title>
                  <Card.Text>
                    Find all the information, schedules, and routes for{" "}
                    {transport}.
                  </Card.Text>
                  {transport === "Subway" ? (
                    <Button variant="primary" block href="subway-alerts">
                      Learn More
                    </Button>
                  ) : (
                    <img
                      src="/assets/comingsoon.png"
                      alt={`${transport} Coming Soon`}
                      style={{ width: "30%", height: "auto" }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

const getIconName = (transport) => {
  switch (transport) {
    case "Subway":
      return "directions_subway";
    case "Buses":
      return "directions_bus";
    case "LIRR":
      return "train";
    case "Metro-North":
      return "tram";
    case "Staten Island Rail":
      return "train";
    default:
      return "directions_transit";
  }
};

export default StationInfo;
