import React, { useState, useEffect } from "react";
import axios from "axios";

const ESTHandler = (UnixTimeStamp) => {
  let timeStamp = UnixTimeStamp;

  const date = new Date(timeStamp * 1000);
  return date.toLocaleString("en-US");
};

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

  //.activePeriod the time the alter should go into affect
  //.

  return (
    <div>
      <h1>Subway Alerts</h1>
      {subwayAlerts.entity ? (
        <ul>
          {subwayAlerts.entity.map((entity) => (
            <li key={entity.id}>
              <strong>PROGRADE LIVE ALERT</strong>{" "}
              {entity.alert.headerText.translation[0].text}
              <br />
              <strong>Goes Into Affect on</strong>{" "}
              {entity.alert.activePeriod[0].start}
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
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SubwayAlerts;
