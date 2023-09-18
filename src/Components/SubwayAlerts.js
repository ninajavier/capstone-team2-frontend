import React, { useState, useEffect } from "react";
import axios from "axios";
export default function SubwayAlerts() {
  const [subwayAlerts, setSubwayAlerts] = useState({});

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
      <h1>Subway Alerts</h1>
    </div>
  );
}
