import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
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

    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${(minutes < 10 ? "0" : "") + minutes} ${ampm}`;
    };

    if (
      startDate.getDate() === endDate.getDate() &&
      startDate.getMonth() === endDate.getMonth()
    ) {
      // same end /start date
      const formattedStartDate = `${
        monthNames[startDate.getMonth()]
      } ${startDate.getDate()}, ${startDate.getFullYear()} ${formatTime(
        startDate
      )}`;
      const formattedEndDate =
        endDate.getTime() === Number.MAX_SAFE_INTEGER
          ? "until further notice"
          : formatTime(endDate);
      return `${formattedStartDate} - ${formattedEndDate} EST`;
    } else if (endDate.getTime() === Number.MAX_SAFE_INTEGER) {
      // no end date
      return `Active as of ${
        monthNames[startDate.getMonth()]
      } ${startDate.getDate()}, ${startDate.getFullYear()} ${formatTime(
        startDate
      )} EST until further notice`;
    } else {
      return `${
        monthNames[startDate.getMonth()]
      } ${startDate.getDate()}, ${startDate.getFullYear()} ${formatTime(
        startDate
      )} EST - ${
        monthNames[endDate.getMonth()]
      } ${endDate.getDate()}, ${endDate.getFullYear()} ${formatTime(
        endDate
      )} EST`;
    }
  }
  const sortedAlerts = lirrAlerts
    ? lirrAlerts.entity
        .filter((ent) => ent.alert.informedEntity[0].agencyId === "LI")
        .sort((a, b) => {
          const startDateA = parseInt(a.alert.activePeriod[0].start);
          const startDateB = parseInt(b.alert.activePeriod[0].start);
          return startDateA - startDateB;
        })
    : [];

  return (
    <div>
      <div>
        <h1>Long Island Rail Road (LIRR) Alerts</h1>
        <Container>
          {sortedAlerts.length > 0 ? (
            sortedAlerts.map((ent) => (
              <Card className="lirr-alerts" key={ent.id}>
                <Card.Header>PROGRADE LIVE ALERT </Card.Header>
                <Card.Title className="lirr-alerts-title">
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
                  <b>When's it happening?</b>
                  <div>{formatAlertPeriod(ent.alert)}</div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Container>
      </div>
    </div>
  );
};

export default LIRRAlerts;
