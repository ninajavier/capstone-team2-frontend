import React, { useState, useEffect } from "react";
import { Card, Badge, Container } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";
import { Train } from "@mui/icons-material"; // Import the Train icon

const ESTHandler = (UnixTimeStamp) => {
  let timeStamp = UnixTimeStamp;

  const options = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(timeStamp * 1000);
  return date.toLocaleString("en-US", options);
};

export default function SubwayAlerts() {
  const [subwayAlerts, setSubwayAlerts] = useState({});
  const [checkedTrains, setCheckedTrains] = useState({});

  const generateUniqueKey = (id, index) => {
    return `${id}_${index}`;
  };

  useEffect(() => {
    const apiUrl = `https://prograde.onrender.com/subway-alerts`;

    axios
      .get(apiUrl)
      .then((response) => {
        setSubwayAlerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service alerts:", error);
      });
  }, []);

  const loadingPage = <p>Loading...</p>;

  const renderTrainBadges = (matchingRoutes) => {
    return (
      <Badge className="train-badges">
        {matchingRoutes.map((route, index) => (
          <span key={index}>
            <Train fontSize="small" /> {route} {/* Train icon */}
          </span>
        ))}
      </Badge>
    );
  };

  const renderServiceAlerts = (filtered) => {
    return (
      <Container>
        {subwayAlerts.entity ? (
          <ul>
            {subwayAlerts.entity.map((entity, index) => {
              const matchingRoutes = entity.alert.informedEntity
                .map((train) => train.routeId)
                .filter((route) => checkedTrains[route]);

              if (!filtered || matchingRoutes.length > 0) {
                return (
                  <Card
                    className="subway-alerts"
                    key={generateUniqueKey(entity.id, index)}
                  >
                    <Card.Header className="subway-alerts-header">
                      PROGRADE LIVE ALERT{" "}
                      <b>{renderTrainBadges(matchingRoutes)}</b>
                    </Card.Header>
                    <Card.Title className="subway-alerts-title">
                      {entity.alert.headerText.translation[0].text}
                    </Card.Title>
                    <Card.Body>
                      {entity.alert.descriptionText &&
                      entity.alert.descriptionText.translation &&
                      entity.alert.descriptionText.translation[0]
                        ? entity.alert.descriptionText.translation[0].text
                        : null}{" "}
                      <div style={{ marginTop: "1rem" }}>
                        <strong>Starts on</strong>{" "}
                        {ESTHandler(entity.alert.activePeriod[0].start)}
                      </div>
                      <br />
                      <ul>
                        {matchingRoutes.map((route, index) => (
                          <strong key={index}>
                            Current Train Line(s) Affected
                            <ul>{route}</ul>
                          </strong>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                );
              } else {
                return null; // No matching routes, don't render Card
              }
            })}
          </ul>
        ) : null}
      </Container>
    );
  };

  return (
    <div>
      <FilterDropdown
        checkedTrains={checkedTrains}
        setCheckedTrains={setCheckedTrains}
      />
      <h1>Subway Alerts</h1>
      {subwayAlerts.entity
        ? Object.keys(checkedTrains).length === 0
          ? renderServiceAlerts(false)
          : renderServiceAlerts(true)
        : loadingPage}
    </div>
  );
}
