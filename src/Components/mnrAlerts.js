import { useState, useEffect } from "react";
import axios from "axios";

const MnrAlerts = () => {
  const [metroNorthRailroadAlerts, setMetroNorthRailroadAlerts] = useState({});

  useEffect(() => {
    const apiUrl = `https://prograde.onrender.com/all-service-alerts`;

    axios
      .get(apiUrl)
      .then((response) => {
        setMetroNorthRailroadAlerts(response.data);
        console.log(metroNorthRailroadAlerts);
      })
      .catch((error) => {
        console.error("Error fetching service alerts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Mnr Alerts</h1>
    </div>
  );
};

export default MnrAlerts;
