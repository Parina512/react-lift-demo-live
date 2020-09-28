import React, { Component } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";

import "./Lift.scss";

class Lift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalLifts: 10,
    };
  }

  getAllLiftButtons = () => {
    let data = [];
    for (let i = 9; i >= 0; i--) {
      data.push(i);
    }
    let isDisable = true;
    if (this.props.isLiftListAvailable) {
      isDisable = false;
    }
    return data.map((value, key) => {
      const doesBreak = [0, 2, 4, 6, 8].includes(value);
      const { currentLiftFloor, tempFloor } = this.props;
      let variant = "light";
      if (currentLiftFloor === value) {
        variant = "danger";
      } else if (tempFloor === value) {
        variant = "success";
      }
      return (
        <span key={`${value}`}>
          <Button
            variant={variant}
            disabled={isDisable}
            onClick={
              !isDisable ? () => this.props.onSelectFloor(value) : () => {}
            }
          >
            {`${value + 1}`}
          </Button>
          {doesBreak ? <br /> : null}
        </span>
      );
    });
  };

  render() {
    return (
      <div className="Lift">
        <Alert variant="dark">
          <Row>
            <Col>{this.getAllLiftButtons()}</Col>
          </Row>
        </Alert>
      </div>
    );
  }
}
export default Lift;
