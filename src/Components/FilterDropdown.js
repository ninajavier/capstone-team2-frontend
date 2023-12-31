import { Form, Dropdown, Button } from "react-bootstrap";
import "./styles.css";

import icons from "../Assets/index.js";

const FilterDropdown = ({ checkedTrains, setCheckedTrains }) => {
  console.log("checked trains ", checkedTrains);

  const handleChange = (event) => {
    setCheckedTrains({
      ...checkedTrains,
      [event.target.name]: event.target.checked,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const checkboxHandler = (event) => {
    event.stopPropagation();
  };
  function isNumber(value) {
    return Number.isFinite(Number(value));
  }
  const clearTrains = () => {
    setCheckedTrains({});
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

  //not sure how label becomes an param but i undertsnad what the function does
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
  // code seems redudent you could return

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Trains</Dropdown.Toggle>
        <Dropdown.Menu className="multi-column-dropdown">
          <Form onSubmit={submitHandler}>
            <Form.Group className="trains-dropdown">
              {labels.map((trainLabel, index) => {
                const icon = getIconForLabel(trainLabel); //not sure
                return (
                  <Dropdown.Item onClick={checkboxHandler} key={index}>
                    <div className="icon-checkbox-wrapper">
                      <Form.Check
                        name={trainLabel}
                        type="checkbox"
                        onClick={checkboxHandler}
                        checked={checkedTrains[`${trainLabel}`] || false}
                        onChange={handleChange}
                      />
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
              <Dropdown.Item>
                <Button
                  className="clear-trains"
                  size="sm"
                  onClick={clearTrains}
                >
                  Clear Trains
                </Button>
              </Dropdown.Item>
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default FilterDropdown;
