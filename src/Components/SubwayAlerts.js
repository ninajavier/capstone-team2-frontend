import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";

import { Card, Badge, Container, Alert, Spinner } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";
import icons from "../Assets";
import DateFilter from "./DateFilter";
import AccessibleIcon from "@mui/icons-material/Accessible";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

function processDescriptionText(text) {
  //ACESS ICONS
  text = text.replace(
    /\[accessibility icon\]/g,
    '<span class="icon-accessibility-placeholder"></span>'
  );
  //BUS ICON
  text = text.replace(
    /\[shuttle bus icon\]/g,
    '<span class="icon-shuttle-bus-placeholder"></span>'
  );
  // TRAINS ICONS
  const trainLines = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "j",
    "l",
    "m",
    "n",
    "q",
    "r",
    "s",
    "w",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ];
  trainLines.forEach((train) => {
    const pattern = new RegExp(`\\[${train}\\]`, "gi");
    let replacement;
    if (isNaN(train)) {
      replacement = `<img class="train-render-icon" src=${
        icons[train.toLowerCase() + "_letter"]
      } alt='${train} train icon' />`;
    } else {
      replacement = `<img class="train-render-icon" src=${
        icons["_" + train + "_digit"]
      } alt='${train} train icon' />`;
    }
    text = text.replace(pattern, replacement);
  });
  return text;
}

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
                  <h2>
                    Alerts for Train:{" "}
                    <img
                      className="card-subway-icons"
                      src={
                        isNaN(selectedTrain)
                          ? icons[`${selectedTrain.toLocaleLowerCase()}_letter`]
                          : icons[`_${selectedTrain}_digit`]
                      }
                    />
                    {console.log(icons)}
                  </h2>
                  {console.log(
                    "selected train",
                    selectedTrain,
                    typeof selectedTrain
                  )}
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
                            {
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: processDescriptionText(
                                    entity.alert.headerText.translation[1].text
                                  ),
                                }}
                              ></div>
                            }
                          </Card.Title>
                          <Card.Body>
                            {entity.alert.descriptionText &&
                            entity.alert.descriptionText.translation &&
                            entity.alert.descriptionText.translation[1] ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: processDescriptionText(
                                    entity.alert.descriptionText.translation[1]
                                      .text
                                  ),
                                }}
                              ></div>
                            ) : null}
                            <div style={{ marginTop: "1rem" }}>
                              <strong>Starts on</strong>{" "}
                              {ESTHandler(entity.alert.activePeriod[0].start)}
                            </div>
                            <br />
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
          <DateFilter />
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
