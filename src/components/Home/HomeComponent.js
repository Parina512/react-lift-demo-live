import React, { Component } from "react";
import Lift from "../Lift/LiftComponent";
import Passenger from "../Passenger/PassengerComponent";
import { Container, Col, Row, Alert, Button } from "react-bootstrap";
import "../../../node_modules/@fortawesome/fontawesome-free/js/all";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./Home.scss";

class Home extends Component {
  constructor() {
    super();
    const tableList = localStorage.getItem("table")
      ? JSON.parse(localStorage.getItem("table"))
      : [];
    this.state = {
      goingUp: true,
      isPassangeListAvailable: true,
      isLiftListAvailable: false,
      currentPassengers: 0,
      currentLiftFloor: -1,
      lastLiftFloor: -1,
      tempFloor: -1,
      tableList: tableList,
    };
  }

  onSelectPassenger = (number) => {
    this.setState({
      currentPassengers: number,
      isPassangeListAvailable: false,
      isLiftListAvailable: true,
    });
  };

  setListners = () => {
    let intervelId = localStorage.getItem("intervelId");
    if (intervelId) {
      localStorage.removeItem("intervelId");
      clearInterval(intervelId);
    }

    intervelId = setInterval(() => {
      const { goingUp, currentLiftFloor, tempFloor } = this.state;
      if (tempFloor === currentLiftFloor) {
        // reset all
        clearInterval(intervelId);
        this.setState({
          lastLiftFloor: currentLiftFloor,
          tempFloor: currentLiftFloor,
          isPassangeListAvailable: true,
          isLiftListAvailable: false,
          currentPassengers: 0,
        });
      } else {
        this.setState({
          tempFloor: goingUp ? tempFloor + 1 : tempFloor - 1,
        });
      }
    }, 1000);
  };

  onSelectFloor = (number) => {
    const { lastLiftFloor, currentPassengers } = this.state;
    let { currentLiftFloor } = this.state;
    currentLiftFloor = number;
    this.setState(
      {
        currentLiftFloor,
        isPassangeListAvailable: false,
        isLiftListAvailable: false,
        goingUp: lastLiftFloor > currentLiftFloor ? false : true,
        tempFloor: lastLiftFloor,
      },
      () => {
        this.setListners();
      }
    );

    // saving into local storage
    let table = localStorage.getItem("table");
    let list = [];
    if (table) {
      list = JSON.parse(table);
    }
    list.push({
      currentPassengers: currentPassengers + 1,
      toFloor: currentLiftFloor + 1,
      fromFloor: lastLiftFloor + 1,
      date: new Date(),
    });
    table = JSON.stringify(list);
    localStorage.setItem("table", table);
    this.setState({
      tableList: JSON.parse(localStorage.getItem("table")),
    });
  };

  render() {
    let { goingUp, tableList } = this.state;

    const displayArr = [...tableList];
    return (
      <div className="Home">
        <Container>
          <Row>
            <Col>
              <Passenger
                isPassangeListAvailable={this.state.isPassangeListAvailable}
                currentPassengers={this.state.currentPassengers}
                onSelectPassenger={this.onSelectPassenger}
              />
            </Col>
            <Col>
              <Row>
                <Alert className="currentLiftNumber" variant="secondary">
                  {this.state.tempFloor + 1}
                </Alert>
                <span key={Math.random()} className="arrow">
                  {goingUp ? (
                    <i className="fas fa-arrow-up"></i>
                  ) : (
                    <i className="fas fa-arrow-down"></i>
                  )}
                </span>
              </Row>
              <Row>
                <Lift
                  isLiftListAvailable={this.state.isLiftListAvailable}
                  currentLiftFloor={this.state.currentLiftFloor}
                  tempFloor={this.state.tempFloor}
                  onSelectFloor={this.onSelectFloor}
                />
              </Row>
            </Col>
          </Row>
        </Container>

        <Row>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("table");
              this.setState({ tableList: [] });
            }}
          >
            Reset table
          </Button>
        </Row>
        <Row>
          <Col>
            <b>No. Passangers</b>
          </Col>
          <Col>
            <b>From Floor</b>
          </Col>
          <Col>
            <b>To Floor</b>
          </Col>
          <Col>
            <b>Date Time</b>
          </Col>
        </Row>
        {displayArr.reverse().map((item, index) => {
          return (
            <Row key={`${index}`}>
              <Col>{item.currentPassengers}</Col>
              <Col>{item.fromFloor}</Col>
              <Col>{item.toFloor}</Col>
              <Col>{item.date.substr(0, 19)}</Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default Home;
