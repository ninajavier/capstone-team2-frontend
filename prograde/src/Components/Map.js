import React, { useState, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

const center = { lat: 48.8584, lng: 2.2945 };

const LocationInput = ({ useCurrentLocation, currentPosition }) => {
  const [currentAddress, setCurrentAddress] = useState("");
  const originRef = useRef();

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
    <Form.Group as={Col} md={6}>
      <Form.Control
        type="text"
        placeholder={useCurrentLocation ? `${currentAddress}` : "Origin"}
        ref={originRef}
      />
    </Form.Group>
  );
};

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();
  const travelModeRef = useRef();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
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
  }, []);

  async function calculateRoute() {
    if (destinationRef.current.value === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const mode = travelModeRef.current.value;
    let origin;

    if (useCurrentLocation && currentPosition) {
      origin = new window.google.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng
      );
    } else {
      origin = originRef.current.value;
    }

    const results = await directionsService.route({
      origin,
      destination: destinationRef.current.value,
      travelMode: mode,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
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
      <Row>
        <Col sm={6} className="input-container">
          <Autocomplete>
            <LocationInput
              useCurrentLocation={useCurrentLocation}
              currentPosition={currentPosition}
            />
          </Autocomplete>
        </Col>
        <Col md={5} className="input-container">
          <Autocomplete>
            <Form.Control
              type="text"
              placeholder="Destination"
              ref={destinationRef}
            />
          </Autocomplete>
        </Col>
        <Col sm={1} className="button-container">
          <Button variant="primary" type="button" onClick={calculateRoute}>
            Go
          </Button>
        </Col>
      </Row>

      <Row>
        <Form.Group as={Col} md={2}>
          <label>Mode of Travel:</label>
          <select ref={travelModeRef}>
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Button variant="primary" type="button" onClick={clearRoute}>
            Clear Route
          </Button>
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <Button
            variant="primary"
            type="button"
            onClick={centerToUserLocation}
          >
            Center to User
          </Button>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={2}>
          <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>
        </Form.Group>
      </Row>

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

      {directionsResponse && (
        <div>
          <h2>Written Directions:</h2>
          <ol>
            {directionsResponse.routes[0].legs[0].steps.map((step, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: step.instructions }}
              ></li>
            ))}
          </ol>
        </div>
      )}
    </Container>
  );
};

export default Map;
