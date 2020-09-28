import React, { Component } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";

import "./Passenger.scss";

class Passenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPassengers: 12,
    };
  }

  getAllPassengerButtons = () => {
    let data = [];
    for (let i = 0; i < 12; i++) {
      data.push(0);
    }

    return data.map((value, key) => {
      const doesBreak = [2, 5, 8, 11].includes(key);
      let isDisable = true;
      if (this.props.isPassangeListAvailable) {
        isDisable = false;
      }
      const { currentPassengers } = this.props;
      return (
        <span key={`${key}`}>
          <Button
            variant={
              currentPassengers && currentPassengers >= key
                ? "success"
                : "secondary"
            }
            disabled={isDisable}
            onClick={
              !isDisable ? () => this.props.onSelectPassenger(key) : () => {}
            }
          ></Button>
          {doesBreak ? <br /> : null}
        </span>
      );
    });
  };

  render() {
    return (
      <div className="Passenger">
        <Alert variant="dark">
          <Row>
            <Col>{this.getAllPassengerButtons()}</Col>
          </Row>
        </Alert>
      </div>
    );
  }
}
export default Passenger;
