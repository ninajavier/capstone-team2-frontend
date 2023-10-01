import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

function formatAlertPeriod(alert) {
  //gets dates of Piunx in numbers
  const startTimestamp = parseInt(alert.activePeriod[0].start);
  const endTimestamp = parseInt(alert.activePeriod[0].end);

  const estOffset = -5 * 60 * 60; //converting tot EST
  const startDate = new Date((startTimestamp + estOffset) * 1000);
  const endDate = new Date((endTimestamp + estOffset) * 1000);
  //start/end  date + time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // months for time date display
}

const MnrAlerts = () => {
  const [metroNorthRailroadAlerts, setMetroNorthRailroadAlerts] =
    useState(null);

  useEffect(() => {
    const apiUrl = `https://prograde.onrender.com/all-service-alerts`;

    axios
      .get(apiUrl)
      .then((response) => {
        setMetroNorthRailroadAlerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service alerts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Metro North RailRoad Alerts</h1>
      <Container>
        {metroNorthRailroadAlerts && metroNorthRailroadAlerts.entity ? (
          metroNorthRailroadAlerts.entity.map((ent) => {
            return ent.alert.informedEntity[0].agencyId === "MNR" ? (
              <Card key={ent.id}>
                <Card.Header>PROGRADE LIVE ALERT </Card.Header>
                <Card.Title>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ent.alert.headerText.translation[1].text,
                    }}
                  ></div>
                </Card.Title>
                <Card.Body>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ent.alert.descriptionText.translation[1].text,
                    }}
                  ></div>
                  <div>{formatAlertPeriod(ent.alert)}</div>
                </Card.Body>
              </Card>
            ) : null;
          })
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default MnrAlerts;
