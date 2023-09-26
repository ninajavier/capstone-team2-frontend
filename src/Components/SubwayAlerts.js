import React, { useState, useEffect } from "react";
import { Card, Badge, Container, Alert, Spinner } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";

// const apiUrl = process.env.REACT_APP_API_URL;

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

export default function SubwayAlerts() {
  const [subwayAlerts, setSubwayAlerts] = useState({});
  const [checkedTrains, setCheckedTrains] = useState({});

  const generateUniqueKey = (id, index) => {
    return `${id}_${index}`;
  };

  useEffect(() => {
    const apiUrl = `https://prograde.onrender.com/subway-alerts`;

    axios
      .get(apiUrl)
      .then((response) => {
        setSubwayAlerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service alerts:", error);
      });
  }, []);
  const loadingPage = (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" />
      <h1>Loadings</h1>
    </div>
  );
  // const allServiceAlerts = (
  //   <Container>
  //     {" "}
  //     {subwayAlerts.entity ? (
  //       <ul>
  //         {subwayAlerts.entity.map((entity, index) => (
  //           <Card
  //             className="subway-alerts"
  //             key={generateUniqueKey(entity.id, index)}
  //           >
  //             <Card.Header className="subway-alerts-header">
  //               PROGRADE LIVE ALERT{" "}
  //               <b>
  //                 {entity.alert.informedEntity.map((train, index) => (
  //                   <Badge
  //                     className="train-badges"
  //                     id={train.routeId}
  //                     key={index}
  //                   >
  //                     {train.routeId}
  //                   </Badge>
  //                 ))}
  //                 {console.log("affected lines", typeof affectedLines)}
  //               </b>
  //             </Card.Header>{" "}
  //             <Card.Title className="subway-alerts-title">
  //               {entity.alert.headerText.translation[0].text}
  //             </Card.Title>
  //             <Card.Body>
  //               {entity.alert.descriptionText &&
  //               entity.alert.descriptionText.translation &&
  //               entity.alert.descriptionText.translation[0]
  //                 ? entity.alert.descriptionText.translation[0].text
  //                 : null}
  //               <strong>Goes Into Affect on</strong>{" "}
  //               {ESTHandler(entity.alert.activePeriod[0].start)}
  //               <br />
  //               <strong>Current Train Lines Affected</strong>
  //               <ul>
  //                 {entity.alert.informedEntity.map((informedEntity, index) => (
  //                   <li key={index}>{informedEntity.routeId} </li>
  //                 ))}
  //               </ul>
  //             </Card.Body>
  //           </Card>
  //         ))}
  //       </ul>
  //     ) : null}
  //   </Container>
  // );

  const a = "a";
  // const filterAlters = (
  //   <Container>
  //     {subwayAlerts.entity ? (
  //       <ul>
  //         {subwayAlerts.entity.map((entity, index) => {
  //           const matchingRoutes = [];
  //           console.log(matchingRoutes);
  //           entity.alert.informedEntity.forEach((train) => {
  //             if (checkedTrains[train.routeId]) {
  //               matchingRoutes.push(train.routeId);
  //             }
  //           });
  //           matchingRoutes.sort();
  //           if (matchingRoutes.length > 0) {
  //             return (
  //               <Card
  //                 className="subway-alerts"
  //                 key={generateUniqueKey(entity.id, index)}
  //               >
  //                 <Card.Header className="subway-alerts-header">
  //                   PROGRADE LIVE ALERT{" "}
  //                   <b>
  //                     {matchingRoutes.map((route, index) => (
  //                       <Badge className="train-badges" id={route} key={index}>
  //                         {route}
  //                       </Badge>
  //                     ))}
  //                     {console.log("affected lines", typeof affectedLines)}
  //                   </b>
  //                 </Card.Header>
  //                 <Card.Title className="subway-alerts-title">
  //                   {entity.alert.headerText.translation[0].text}
  //                 </Card.Title>
  //                 <Card.Body>
  //                   {entity.alert.descriptionText &&
  //                   entity.alert.descriptionText.translation &&
  //                   entity.alert.descriptionText.translation[0]
  //                     ? entity.alert.descriptionText.translation[0].text
  //                     : null}{" "}
  //                   <div style={{ marginTop: "1rem" }}>
  //                     <strong>Starts on</strong>{" "}
  //                     {ESTHandler(entity.alert.activePeriod[0].start)}
  //                   </div>
  //                   <br />
  //                   <ul>
  //                     {matchingRoutes.map((route, index) => (
  //                       <strong>
  //                         Current Train Line(s) Affected
  //                         <ul key={index}>{route}</ul>
  //                       </strong>
  //                     ))}
  //                   </ul>
  //                 </Card.Body>
  //               </Card>
  //             );
  //           } else {
  //             return null; // No matching routes, don't render Card
  //           }
  //         })}
  //       </ul>
  //     ) : null}
  //   </Container>
  // );
  const filterAlters = (
    <Container>
      {subwayAlerts.entity ? (
        <ul>
          {console.log("checked trains", checkedTrains)}
          {Object.keys(checkedTrains).map((selectedTrain) => {
            console.log("selected trains", selectedTrain);
            const matchingAlerts = subwayAlerts.entity.filter((entity) => {
              return entity.alert.informedEntity.some(
                (train) => train.routeId === selectedTrain
              );
            });
            console.log("matching alerts", matchingAlerts);
            if (matchingAlerts.length > 0) {
              return (
                <div key={selectedTrain}>
                  <h2>Alerts for Train:{selectedTrain}</h2>
                  <ul>
                    {matchingAlerts.map((entity, index) => (
                      <li key={generateUniqueKey(entity.id, index)}>
                        <Card className="subway-alerts">
                          <Card.Header className="subway-alerts-header">
                            PROGRADE LIVE ALERT{" "}
                            <b>
                              {entity.alert.informedEntity.map(
                                (train, index) => (
                                  <Badge
                                    className="train-badges"
                                    id={train.routeId}
                                    key={index}
                                  >
                                    {train.routeId}
                                  </Badge>
                                )
                              )}
                            </b>
                          </Card.Header>
                          <Card.Title className="subway-alerts-title">
                            {entity.alert.headerText.translation[0].text}
                          </Card.Title>
                          <Card.Body>
                            {entity.alert.descriptionText &&
                            entity.alert.descriptionText.translation &&
                            entity.alert.descriptionText.translation[0]
                              ? entity.alert.descriptionText.translation[0].text
                              : null}
                            <div style={{ marginTop: "1rem" }}>
                              <strong>Starts on</strong>{" "}
                              {ESTHandler(entity.alert.activePeriod[0].start)}
                            </div>
                            <br />

                            {/* <ul>
                              {entity.alert.informedEntity.map(
                                (informedEntity, index) => (
                                  
                                  <li key={index}>{informedEntity.routeId} </li>
                                )
                              )}
                            </ul> */}
                          </Card.Body>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            } else {
              return null;
            }
          })}
        </ul>
      ) : null}
    </Container>
  );

  const noSubwayAlerts = (
    <Alert variant="warning">No train line selected</Alert>
  );
  return (
    <div>
      <div className="bg-dark text-white py-4">
        <Container className="subwayAlerts-header">
          <h1>Subway Line Alerts</h1>
          <FilterDropdown
            className="filter-dropdown"
            checkedTrains={checkedTrains}
            setCheckedTrains={setCheckedTrains}
          />
        </Container>
      </div>
      {subwayAlerts.entity
        ? Object.keys(checkedTrains).length === 0
          ? noSubwayAlerts
          : filterAlters
        : loadingPage}
    </div>
  );
}
