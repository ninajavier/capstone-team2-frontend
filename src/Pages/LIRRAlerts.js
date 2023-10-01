import { useState, useEffect } from "react";
import axios from "axios";
const LIRRAlerts = () => {
  const [lirrAlerts, setLirrAlerts] = useState({});

  useEffect(() => {
    axios
      .get("https://prograde.onrender.com/all-service-alerts")
      .then((res) => {
        setLirrAlerts(res.data);
        console.log(lirrAlerts);
      })
      .catch((error) => console.error("Error Fetching LIRR Alerts", error));
  }, []);
  return (
    <div>
      <h1>LIRR</h1>
    </div>
  );
};

export default LIRRAlerts;
