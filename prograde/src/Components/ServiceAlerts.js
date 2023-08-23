import React, { useState, useEffect } from "react";
import axios from "axios";

function ServiceAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const apiUrl =
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace";

    const apiKey = "OLEPnbM7K87leaINTEi5t1a4l7POZrf9acZ7RVIU"; //

    axios
      .get(apiUrl, {
        headers: {
          "x-api-key": apiKey,
        },
      })
      .then((response) => {
        console.log(response);
        setAlerts(response.data);
        console.log(alerts, response, response.data);
      })
      .catch((error) => {
        console.error("Error fetching service alerts:", error);
      });
  }, []);
  return (
    <div>
      <h1>Service Alerts</h1>
      <p>{alerts}</p>
      {/* <ul>
        {alerts.map((alert) => (
          <li key={alert.informed_entity[0].route_id}>
            <h2>{alert.header_text.translation[0].text}</h2>
            <p>{alert.description_text.translation[0].text}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ServiceAlerts;
