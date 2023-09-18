import React, { useState, useEffect } from "react";
import { Card, Badge, Container } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";

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
  let affectedLines = null;
  useEffect(() => {
    const apiUrl = "http://localhost:8888/subway-alerts";

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
  const allServiceAlerts = (
    <Container>
      {" "}
      {subwayAlerts.entity ? (
        <ul>
          {subwayAlerts.entity.map((entity, index) => (
            <Card
              className="subway-alerts"
              key={generateUniqueKey(entity.id, index)}
            >
              <Card.Header className="subway-alerts-header">
                PROGRADE LIVE ALERT{" "}
                <b>
                  {entity.alert.informedEntity.map((train, index) => (
                    <Badge
                      className="train-badges"
                      id={train.routeId}
                      key={index}
                    >
                      {train.routeId}
                    </Badge>
                  ))}
                  {console.log("affected lines", typeof affectedLines)}
                </b>
              </Card.Header>{" "}
              <Card.Title className="subway-alerts-title">
                {entity.alert.headerText.translation[0].text}
              </Card.Title>
              <Card.Body>
                {entity.alert.descriptionText &&
                entity.alert.descriptionText.translation &&
                entity.alert.descriptionText.translation[0]
                  ? entity.alert.descriptionText.translation[0].text
                  : null}
                <strong>Goes Into Affect on</strong>{" "}
                {ESTHandler(entity.alert.activePeriod[0].start)}
                <br />
                <strong>Current Train Lines Affected</strong>
                <ul>
                  {entity.alert.informedEntity.map((informedEntity, index) => (
                    <li key={index}>{informedEntity.routeId} </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          ))}
        </ul>
      ) : null}
    </Container>
  );

  const checkObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const filterAlters = (
    <Container>
      {subwayAlerts.entity ? (
        <ul>
          {subwayAlerts.entity.map((entity, index) => {
            const matchingRoutes = [];

            entity.alert.informedEntity.forEach((train) => {
              if (checkedTrains[train.routeId]) {
                matchingRoutes.push(train.routeId);
              }
            });

            if (matchingRoutes.length > 0) {
              return (
                <Card
                  className="subway-alerts"
                  key={generateUniqueKey(entity.id, index)}
                >
                  <Card.Header className="subway-alerts-header">
                    PROGRADE LIVE ALERT{" "}
                    <b>
                      {matchingRoutes.map((route, index) => (
                        <Badge className="train-badges" id={route} key={index}>
                          {route}
                        </Badge>
                      ))}
                      {console.log("affected lines", typeof affectedLines)}
                    </b>
                  </Card.Header>
                  <Card.Title className="subway-alerts-title">
                    {entity.alert.headerText.translation[0].text}
                  </Card.Title>
                  <Card.Body>
                    {entity.alert.descriptionText &&
                    entity.alert.descriptionText.translation &&
                    entity.alert.descriptionText.translation[0]
                      ? entity.alert.descriptionText.translation[0].text
                      : null}
                    <strong>Goes Into Affect on</strong>{" "}
                    {ESTHandler(entity.alert.activePeriod[0].start)}
                    <br />
                    <strong>Current Train Lines Affected</strong>
                    <ul>
                      {matchingRoutes.map((route, index) => (
                        <li key={index}>{route}</li>
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

  return (
    <div>
      <FilterDropdown
        checkedTrains={checkedTrains}
        setCheckedTrains={setCheckedTrains}
      />
      <h1>Subway Alerts</h1>
      {subwayAlerts.entity
        ? Object.keys(checkedTrains).length === 0
          ? allServiceAlerts
          : filterAlters
        : loadingPage}
    </div>
  );
}
