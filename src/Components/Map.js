import React, { useState, useRef, useEffect } from "react";
import _1Train from "../Assets/1-digit.256x256.png";
import _2Train from "../Assets/2-digit.256x256.png";
import _3Train from "../Assets/3-digit.256x256.png";
import _4Train from "../Assets/4-digit.256x256.png";
import _5Train from "../Assets/5-digit.256x256.png";
import _6Train from "../Assets/6-digit.256x256.png";
import _7Train from "../Assets/7-digit.256x256.png";
import _ATrain from "../Assets/a-letter.256x256.png";
import _BTrain from "../Assets/b-letter.256x256.png";
import _CTrain from "../Assets/c-letter.256x256.png";
import _DTrain from "../Assets/d-letter.256x256.png";
import _ETrain from "../Assets/e-letter.256x256.png";
import _FTrain from "../Assets/f-letter.256x256.png";
import _MTrain from "../Assets/m-letter.256x256.png";
import _NTrain from "../Assets/n-letter.256x256.png";
import _QTrain from "../Assets/q-letter.256x256.png";
import _RTrain from "../Assets/r-letter.256x256.png";
import _WTrain from "../Assets/w-letter.256x256.png";
import _GTrain from "../Assets/g-letter.256x256.png";
import _JTrain from "../Assets/j-letter.256x256.png";
import _ZTrain from "../Assets/z-letter.256x256.png";
import _LTrain from "../Assets/l-letter.256x256.png";
import _STrain from "../Assets/s-letter.256x256.png";
import axios from "axios";
import {
  useMapContext,
  SET_CURRENT_POSITION,
  SET_DIRECTIONS_RESPONSE,
} from "./MapContext";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { styled } from "@mui/system";
import { ChatBubble, Place, Subway } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import "./styles.css";
import NewThread from "./NewThread";

const CommentCard = styled(Card)(({ theme }) => ({
  marginTop: "1rem",
  padding: "1rem",
  borderRadius: "10px",
  backgroundColor: "rgba(64, 64, 64, 0.4)", // Darker gray color with 40% opacity
}));

const CommentText = styled(Card.Title)(({ theme }) => ({
  fontSize: "1.25rem",
  marginBottom: "0",
}));

const ThreadTitle = styled(Card.Text)(({ theme }) => ({
  fontSize: "1rem",
  opacity: 0.7,
}));

const getTrainLineIcon = (trainLine) => {
  switch (trainLine) {
    case "1":
      return _1Train;
    case "2":
      return _2Train;
    case "3":
      return _3Train;
    case "4":
      return _4Train;
    case "5":
      return _5Train;
    case "6":
      return _6Train;
    case "7":
      return _7Train;
    case "A":
      return _ATrain;
    case "B":
      return _BTrain;
    case "C":
      return _CTrain;
    case "D":
      return _DTrain;
    case "E":
      return _ETrain;
    case "F":
      return _FTrain;
    case "M":
      return _MTrain;
    case "N":
      return _NTrain;
    case "Q":
      return _QTrain;
    case "R":
      return _RTrain;
    case "W":
      return _WTrain;
    case "G":
      return _GTrain;
    case "J":
      return _JTrain;
    case "Z":
      return _ZTrain;
    case "L":
      return _LTrain;
    case "S":
      return _STrain;
    default:
      return null; // Return null for unknown train lines
  }
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const LocationInput = ({ useCurrentLocation, currentPosition, originRef }) => {
  useEffect(() => {
    if (useCurrentLocation && currentPosition) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: currentPosition }, (results, status) => {
        if (status === "OK" && results[0]) {
          originRef.current.value = results[0].formatted_address;
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    } else {
      originRef.current.value = "";
    }
  }, [useCurrentLocation, currentPosition, originRef]);

  return (
    <Form.Group as={Col} md={12}>
      <Autocomplete>
        <Form.Control type="text" placeholder="Origin" ref={originRef} />
      </Autocomplete>
    </Form.Group>
  );
};
const libs = ["places"];

const Map = () => {
  const { state, dispatch } = useMapContext();
  const { currentPosition, directionsResponse } = state;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libs,
  });

  const [map, setMap] = useState(null);
  // const [directionsResponse, setDirectionsResponse] = useState(null);
  const originRef = useRef(null);
  const destinationRef = useRef();
  const travelModeRef = useRef();
  // const [currentPosition, setCurrentPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [useCurrentLocation] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [geoAddress, setGeoAddress] = useState("");
  let directionsService;
  const departureTimeRef = useRef(null);
  const [trainThreads, setTrainThreads] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  const [showTrainThreads, setShowTrainThreads] = useState(false);
  const trainIds = [];
  const noThreads = !trainThreads.data || trainThreads.data.length === 0;
  const noThreadsAlt = !trainThreads || trainThreads.length === 0;

  const getThreadsByTrainId = async (train_id) => {
    try {
      const response = await axios.get(
        `${API}/api/threads/by-train/${train_id}`
      );
      console.log(train_id, response);
      return response.data.data;
    } catch (error) {
      return error;
    }
  };

  const getThreadsByTrains = async (train_id) => {
    try {
      const response = await axios.get(
        `${API}/api/threads/by-train?trains=${train_id}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator && !watchId) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch({
            type: SET_CURRENT_POSITION,
            payload: { lat: latitude, lng: longitude },
          });

          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const currentTime = `${hours}:${minutes}`;

          if (departureTimeRef.current) {
            departureTimeRef.current.value = currentTime;
          } else {
            console.error("departureTimeRef.current is null");
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
      setWatchId(id);
    } else {
      console.error("Geolocation is not available in your browser.");
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId, departureTimeRef, dispatch]);

  if ("gelocation" in navigator) {
    setGeoAddress(originRef.current.value);
  }

  async function calculateRoute() {
    if (destinationRef.current.value === "") {
      return;
    }

    dispatch({ type: SET_DIRECTIONS_RESPONSE, payload: null });
    centerToUserLocation();
    directionsService = new window.google.maps.DirectionsService();
    const mode = travelModeRef.current.value;

    const originAddress = originRef.current.value;

    const geocoder = new window.google.maps.Geocoder();

    try {
      const geocodeResult = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: originAddress }, (results, status) => {
          if (status === "OK" && results[0]) {
            resolve(results[0].geometry.location);
          } else {
            reject(new Error("Geocoder failed due to: " + status));
          }
        });
      });

      const origin = geocodeResult;

      const departureTime = departureTimeRef.current.value;

      if (!departureTime) {
        alert("Please enter a departure time.");
        return;
      }

      const selectedTime = new Date();
      selectedTime.setHours(departureTime.split(":")[0]);
      selectedTime.setMinutes(departureTime.split(":")[1]);

      const results = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin,
            destination: destinationRef.current.value,
            travelMode: mode,
            transitOptions: {
              departureTime: selectedTime,
              routingPreference: "FEWER_TRANSFERS",
            },
          },
          (response, status) => {
            if (status === "OK") {
              resolve(response);
            } else {
              reject(
                new Error("Directions request failed with status: " + status)
              );
            }
          }
        );
      });

      if (results) {
        dispatch({ type: SET_DIRECTIONS_RESPONSE, payload: results });
        markers.forEach((marker) => {
          marker.setMap(null);
        });

        const routeMarkers = [
          new window.google.maps.Marker({
            position: results.routes[0].legs[0].start_location,
            map: map,
          }),
          new window.google.maps.Marker({
            position: results.routes[0].legs[0].end_location,
            map: map,
          }),
        ];

        setMarkers(routeMarkers);
      }
    } catch (error) {
      console.error("Error geocoding or calculating the route:", error);
    }
  }

  async function getTrainThreads() {
    if (directionsResponse) {
      directionsResponse.routes[0].legs[0].steps.forEach((step) => {
        if (
          step.transit &&
          step.transit.line.agencies[0].name === "MTA New York City Transit"
        ) {
          trainIds.push(step.transit.line.short_name);
        }
      });

      try {
        if (trainIds.length === 1) {
          const threads = await getThreadsByTrainId(trainIds[0]);
          console.log(trainIds);
          setTrainThreads(threads);
        } else if (trainIds.length === 2) {
          let id = trainIds.join("");
          const threads = await getThreadsByTrains(id);
          setTrainThreads(threads);
        }
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    }
    setShowTrainThreads(!showTrainThreads);
  }
  const updateDepartureTimeToCurrent = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    departureTimeRef.current.value = currentTime;
  };

  function clearRoute() {
    dispatch({ type: SET_DIRECTIONS_RESPONSE, payload: null });
    centerToUserLocation();
    originRef.current.value = currentPosition ? geoAddress : "";
    destinationRef.current.value = "";
    updateDepartureTimeToCurrent();
  }

  function centerToUserLocation() {
    if (map && currentPosition) {
      map.panTo(currentPosition);
      map.setZoom(15);
    }
  }

  if (loadError) {
    return (
      <div>
        Error loading the Google Maps API. Please check your API key and network
        connection.
      </div>
    );
  }
  console.log(trainThreads);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={6} className="input-container">
          <LocationInput
            useCurrentLocation={useCurrentLocation}
            currentPosition={currentPosition}
            originRef={originRef}
          />
        </Col>
        <Col sm={5} className="input-container">
          <Autocomplete>
            <Form.Control
              type="text"
              placeholder="Destination"
              ref={destinationRef}
            />
          </Autocomplete>
        </Col>
        <Col md={1} className="mb-1 d-flex justify-content-end">
          <Button variant="dark" type="button" onClick={calculateRoute}>
            Go
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={4} className="mb-4 d-flex align-items-center">
          <Form.Label className="me-3">Departure Time:</Form.Label>
          <Form.Control type="time" ref={departureTimeRef} className="me-4" />
        </Col>

        <Col md={4} className="mb-4 d-flex align-items-center">
          <Form.Label>Mode of Travel:</Form.Label>
          <Form.Select ref={travelModeRef} className="ms-2">
            <option value="TRANSIT">Transit</option>
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
          </Form.Select>
        </Col>

        <Col md={4} className="mb-4 d-flex justify-content-end">
          {useCurrentLocation && currentPosition && (
            <Button
              variant="dark"
              type="button"
              onClick={clearRoute}
              className="me-2"
            >
              Clear Route
            </Button>
          )}
          <Button variant="dark" type="button" onClick={centerToUserLocation}>
            Center Map
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={directionsResponse ? 6 : 12}>
          <div style={{ width: "100%", height: "100vh" }}>
            <GoogleMap
              center={currentPosition || center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "500px" }}
              options={{
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: true,
              }}
              onLoad={(map) => setMap(map)}
            >
              {useCurrentLocation && currentPosition && (
                <Marker position={currentPosition} />
              )}
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </div>
        </Col>

        {directionsResponse && (
          <Col md={6} className="route-info">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, marginRight: "1rem" }}>
                <div className="direction-info">
                  <h5>Distance: {directionsResponse?.routes[0]?.legs[0]?.distance?.text ||
                      ""}</h5>
                  
                </div>
                <div className="direction-info">
                  <h5>Duration: {directionsResponse?.routes[0]?.legs[0]?.duration?.text ||
                      ""}</h5>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div className="direction-info">
                  <h5>Departure Time: {departureTimeRef.current && departureTimeRef.current.value}</h5>
                  
                </div>
                <div className="direction-info">
                  <h5>Arrival Time: {directionsResponse.routes[0].legs[0].arrival_time.text}</h5>
                </div>
              </div>
            </div>

            <div
              className="directions-container"
              style={{ background: "black", color: "white", padding: "1rem", margin: "2em", borderRadius: "10px" }}
            >
              <h3>Directions:</h3>
              <ol
                className="directions-list"
                style={{ listStyleType: "decimal", paddingLeft: "1.5em" }}
              >
                {directionsResponse.routes[0].legs[0].steps.map(
                  (step, index) => (
                    <li key={index} className="directions-step">
                      {step.transit ? (
                        <div>
                          <div>
                            <img
                              className="map-transit-icons"
                              src={step.transit.line.vehicle.icon}
                              alt={step.transit.line.vehicle.name}
                            />
                            <img
                              className="map-transit-icons"
                              src={step.transit.line.icon}
                              alt={step.transit.line.name}
                            />
                            {step.transit.line.name}
                          </div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: step.instructions,
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: step.instructions,
                          }}
                        />
                      )}
                    </li>
                  )
                )}
              </ol>
            </div>

            <div>
              <NewThread />
              <Button variant="dark" type="button" onClick={getTrainThreads}>
                {showTrainThreads ? "Hide Train Threads" : "Show Train Threads"}
              </Button>
              <div>
                {showTrainThreads && noThreads && noThreadsAlt ? (
                  <p>No threads in relation to your route.</p>
                ) : (
                  <>
                    {trainIds.length > 1
                      ? trainThreads.data.map((thread, index) => (
                          <div key={thread.id}>
                            <CommentCard key={index}>
                              <Card.Body>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={`https://source.unsplash.com/random/50x50/?portrait&${index}`}
                                    alt="avatar"
                                    style={{
                                      borderRadius: "50%",
                                      marginRight: "10px",
                                    }}
                                  />
                                  <div>
                                    <CommentText>{thread.title}</CommentText>
                                    <small>
                                      {format(
                                        new Date(thread.created_at),
                                        "yyyy-MM-dd HH:mm:ss"
                                      )}
                                    </small>
                                  </div>
                                </div>

                                <Card.Text>
                                  <Subway />:
                                  {getTrainLineIcon(thread.train_line) && (
                                    <img
                                      src={getTrainLineIcon(thread.train_line)}
                                      alt={`${thread.train_line} icon`}
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        marginLeft: "8px",
                                      }}
                                    />
                                  )}
                                  <br />
                                  <Place />: {thread.station}
                                  Tags: {thread.tags.join(", ")}
                                  <br />
                                  {thread.body
                                    .split("\n")
                                    .map((text, tIndex) => (
                                      <React.Fragment key={tIndex}>
                                        <ChatBubble />
                                        <ThreadTitle as="span">
                                          {text}
                                        </ThreadTitle>
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </Card.Text>
                              </Card.Body>
                            </CommentCard>
                          </div>
                        ))
                      : trainThreads.map((thread, index) => (
                          <div key={index}>
                            <CommentCard key={index}>
                              <Card.Body>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={`https://source.unsplash.com/random/50x50/?portrait&${index}`}
                                    alt="avatar"
                                    style={{
                                      borderRadius: "50%",
                                      marginRight: "10px",
                                    }}
                                  />
                                  <div>
                                    <CommentText>{thread.title}</CommentText>
                                    <small>
                                      {format(
                                        new Date(thread.created_at),
                                        "yyyy-MM-dd HH:mm:ss"
                                      )}
                                    </small>
                                  </div>
                                </div>

                                <Card.Text>
                                  <Subway />:
                                  {getTrainLineIcon(thread.train_line) && (
                                    <img
                                      src={getTrainLineIcon(thread.train_line)}
                                      alt={`${thread.train_line} icon`}
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        marginLeft: "8px",
                                      }}
                                    />
                                  )}
                                  <br />
                                  <Place />: {thread.station}
                                  Tags: {thread.tags.join(", ")}
                                  <br />
                                  {thread.body
                                    .split("\n")
                                    .map((text, tIndex) => (
                                      <React.Fragment key={tIndex}>
                                        <ChatBubble />
                                        <ThreadTitle as="span">
                                          {text}
                                        </ThreadTitle>
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </Card.Text>
                              </Card.Body>
                            </CommentCard>
                          </div>
                        ))}
                  </>
                )}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Map;
