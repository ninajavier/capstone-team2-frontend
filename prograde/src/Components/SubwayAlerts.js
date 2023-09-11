import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import axios from "axios";

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

c;
function SubwayAlerts() {
  const [subwayAlerts, setSubwayAlerts] = useState([]);

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
      <h1>Subway Alerts</h1>
      {subwayAlerts.entity ? (
        <ul>
          {subwayAlerts.entity.map((entity, index) => (
            <Card
              className="subway-alerts"
              key={generateUniqueKey(entity.id, index)}
            >
              {console.log(entity)}
              <Card.Header>PROGRADE LIVE ALERT</Card.Header>{" "}
              <Card.Title>
                {entity.alert.headerText.translation[0].text}
              </Card.Title>
              <br />
              <strong>Goes Into Affect on</strong>{" "}
              {ESTHandler(entity.alert.activePeriod[0].start)}
              <br />
              <strong>Current Train Lines Affected</strong>
              <ul>
                {entity.alert.informedEntity.map((informedEntity, index) => (
                  <li key={index}>
                    {informedEntity.routeId}
                    {/* {informedEntity.stopId || "N/A"} */}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SubwayAlerts;
