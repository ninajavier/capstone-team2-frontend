import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
export default function SubwayAlerts() {
  const [subwayAlerts, setSubwayAlerts] = useState({});
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
  console.log("res.data");
  console.log("subway-alerts", subwayAlerts);
  return (
    <div>
      <Card className="card">
        <Card.Body>
          <h1>Subway Alerts</h1>
          {subwayAlerts.entity ? (
            <ul>
              {subwayAlerts.entity.map((entity, index) => (
                <li key={generateUniqueKey(entity.id, index)}>
                  <strong>PROGRADE LIVE ALERT</strong>{" "}
                  {entity.alert.headerText.translation[0].text}
                  <br />
                  <strong>Goes Into Affect on</strong>{" "}
                  {ESTHandler(entity.alert.activePeriod[0].start)}
                  <br />
                  <strong>Current Train Lines Affected</strong>
                  <ul>
                    {entity.alert.informedEntity.map(
                      (informedEntity, index) => (
                        <li key={index}>
                          {informedEntity.routeId}
                          {/* {informedEntity.stopId || "N/A"} */}
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
