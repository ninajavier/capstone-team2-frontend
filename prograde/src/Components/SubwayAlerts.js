import React, { useState, useEffect } from "react";
import axios from "axios";

function SubwayAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8888/subway-alerts";

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);

        setAlerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service alerts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Subway Alerts</h1>
      <p>{alerts}</p>
    </div>
  );
}

export default SubwayAlerts;
