import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";

const MapForm = ({ calculateRoute, clearRoute, originRef, destinationRef, travelModeRef }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Origin</Form.Label>
        <Autocomplete>
          <input type="text" placeholder="Enter origin" ref={originRef} />
        </Autocomplete>
      </Form.Group>
      <Form.Group>
        <Form.Label>Destination</Form.Label>
        <Autocomplete>
          <input
            type="text"
            placeholder="Enter destination"
            ref={destinationRef}
          />
        </Autocomplete>
      </Form.Group>
      <Form.Group>
        <Form.Label>Mode of Travel</Form.Label>
        <select ref={travelModeRef} className="form-control">
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
      </Form.Group>
      <Button variant="primary" onClick={calculateRoute}>
        Calculate Route
      </Button>
      <Button variant="secondary" onClick={clearRoute}>
        Clear Route
      </Button>
    </Form>
  );
};

export default MapForm;
