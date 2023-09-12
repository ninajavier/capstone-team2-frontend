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
const generateUniqueKey = (id, index) => {
  return `${id}_${index}`;
};
let affectedLines = null;
function SubwayAlerts() {
  const [subwayAlerts, setSubwayAlerts] = useState([]);
  const [checkedTrains, setCheckedTrains] = useState({});
  useEffect(() => {
    const apiUrl = "http://localhost:8888/subway-alerts";

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setSubwayAlerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service alerts:", error);
      });
  }, []);
  // Sort Alerts by train line
  // optionally display end time
  // if end time card is grey'd out
  //display routeId(Train Letter/number) in sPrograde live alter

  return (
    <div>
      <FilterDropdown
        checkedTrains={checkedTrains}
        setCheckedTrains={setCheckedTrains}
      />

      <h1>Subway Alerts</h1>

      <Container className="all-subway-alerts">
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
                    {
                      (affectedLines = entity.alert.informedEntity.map(
                        (train, index) => (
                          <Badge
                            className="train-badges"
                            id={train.routeId}
                            key={index}
                          >
                            {train.routeId}
                          </Badge>
                        )
                      ))
                    }
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
                    {entity.alert.informedEntity.map(
                      (informedEntity, index) => (
                        <li key={index}>{informedEntity.routeId} </li>
                      )
                    )}
                  </ul>
                </Card.Body>
              </Card>
            ))}
          </ul>
        ) : (
          <p>Loading...</p> //add anamation
        )}{" "}
      </Container>
    </div>
  );
}

export default SubwayAlerts;
