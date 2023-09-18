import { Form, Dropdown } from "react-bootstrap";
import "./styles.css";
import { useState } from "react";
import icons from "../Assets/index.js";

const FilterDropdown = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const checkboxHandler = (event) => {
    event.stopPropagation();
  };
  function isNumber(value) {
    return Number.isFinite(Number(value));
  }

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
    "S",
    "W",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ];
  // REMVOING  "LIRR", "MNR","SIR",
  function getIconKeyFromLabel(label) {
    if (isNumber(label)) {
      return `_${label}_digit`;
    } else {
      return `${label.toLowerCase()}_letter`;
    }
  }

  function getIconForLabel(label) {
    const key = getIconKeyFromLabel(label);
    return icons[key];
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Trains</Dropdown.Toggle>
      <Dropdown.Menu className="multi-column-dropdown">
        <Form onSubmit={submitHandler}>
          <Form.Group className="trains-dropdown">
            {labels.map((trainLabel, index) => {
              const icon = getIconForLabel(trainLabel);
              return (
                <Dropdown.Item onClick={checkboxHandler} key={index}>
                  <div className="icon-checkbox-wrapper">
                    <Form.Check type="checkbox" onClick={checkboxHandler} />
                    <img
                      src={icon}
                      alt={`${trainLabel} icon`}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginLeft: "8px",
                      }}
                    />
                  </div>
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
