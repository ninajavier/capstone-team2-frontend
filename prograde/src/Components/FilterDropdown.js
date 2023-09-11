import { Form, Dropdown } from "react-bootstrap";
import "./styles.css";
import { useState } from "react";
import "../Assets/TrainIcons";
const FilterDropdown = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const checkboxHandler = (event) => {
    event.stopPropagation();
  };

  const labels = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "J",
    "L",
    "M",
    "N",
    "Q",
    "R",
    "W",
    "LIRR",
    "MNR",
    "SIR",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Trains
      </Dropdown.Toggle>
      <Dropdown.Menu className="multi-column-dropdown">
        <Form onSubmit={submitHandler}>
          <Form.Group className="trains-dropdown">
            {labels.map((trainLabel, index) => {
              return (
                <Dropdown.Item onClick={checkboxHandler} key={index}>
                  <Form.Check
                    type="checkbox"
                    onClick={checkboxHandler}
                    label={trainLabel}
                  />
                </Dropdown.Item>
              );
            })}
          </Form.Group>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropdown;
