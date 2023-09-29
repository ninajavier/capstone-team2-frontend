import React, { useState, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

const center = { 
  lat: 40.7128, 
  lng: -74.0060 
};

const LocationInput = ({ useCurrentLocation, currentPosition, originRef }) => {
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    if (useCurrentLocation && currentPosition) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: currentPosition }, (results, status) => {
        if (status === "OK" && results[0]) {
          setCurrentAddress(results[0].formatted_address);
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    } else {
      setCurrentAddress("");
    }
  }, [useCurrentLocation, currentPosition]);

  return (
    <Form.Group as={Col} md={12}>
      <Form.Control
        type="text"
        value={currentAddress}
        ref={originRef}
        onChange={(e) => setCurrentAddress(e.target.value)}
      />
    </Form.Group>
  );
};
const libs = ["places"];
const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libs,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const originRef = useRef(null);
  const destinationRef = useRef();
  const travelModeRef = useRef();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [useCurrentLocation] = useState(true);
  const [markers, setMarkers] = useState([]);
  let directionsService;

  useEffect(() => {
    if ("geolocation" in navigator && !watchId) {
      console.log('testing')
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
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
  }, [watchId]);

  async function calculateRoute() {
    if (destinationRef.current.value === "") {
      return;
    }
    clearRoute();
    directionsService = new window.google.maps.DirectionsService();
    const mode = travelModeRef.current.value;
    console.log(directionsService);

    const originAddress = originRef.current.value;

    const geocoder = new window.google.maps.Geocoder();
    console.log("hello");

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
      console.log("geocodeResult");

      const results = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin,
            destination: destinationRef.current.value,
            travelMode: mode,
          },
          (response, status) => {
            if (status === "OK") {
              resolve(response);
              console.log("response");
            } else {
              reject(
                new Error("Directions request failed with status: " + status)
              );
            }
          }
        );
      });

      if (results) {
        setDirectionsResponse(results);
        // Clear existing markers
        markers.forEach((marker) => {
          marker.setMap(null);
        });

        // Create new markers for the route
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

  function clearRoute() {
    setDirectionsResponse(null);
    centerToUserLocation();
    // clear origin (or reset to user location)
    // clear destination

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={6} className="input-container">
          <Autocomplete>
            <LocationInput
              useCurrentLocation={useCurrentLocation}
              currentPosition={currentPosition}
              originRef={originRef}
            />
          </Autocomplete>
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
        <Col md={1} className="button-container">
          <Button variant="dark" type="button" onClick={calculateRoute}>
            Go
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Form.Group as={Col} md={4}>
          <Form.Label><h6>Mode of Travel:</h6></Form.Label>

          <Form.Select ref={travelModeRef}>
            <option value="TRANSIT">Transit</option>
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md={8}>
          {useCurrentLocation && currentPosition && (
              <Button variant="dark" type="button" onClick={clearRoute}>
            Clear Route
          </Button>
              )}

          <Button variant="dark" type="button" onClick={centerToUserLocation}>
            Center Map
          </Button>
        </Form.Group>
      </Row>

      <Row>
        <Col md={directionsResponse ? 6 : 12}>
          <div style={{ width: "100%", height: "500px" }}>
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
          <Col md={6} className="text-left">
            <div>
              <h5>
                Distance:{" "}
                {directionsResponse?.routes[0]?.legs[0]?.distance?.text || ""}{" "}
              </h5>
              <h5>
                Duration:{" "}
                {directionsResponse?.routes[0]?.legs[0]?.duration?.text || ""}{" "}
              </h5>
              <h4>Directions:</h4>
              <ol>
                {directionsResponse.routes[0].legs[0].steps.map(
                  (step, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: step.instructions }}
                    ></li>
                  )
                )}
              </ol>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Map;
