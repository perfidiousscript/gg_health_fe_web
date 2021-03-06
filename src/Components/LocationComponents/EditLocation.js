import React from "react";
import Store from "../../js/store/index.js";
import Calendar from "react-calendar";
import AppointmentModal from "./AppointmentModal.js";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Col, Row, Button, Modal } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import { editLocation } from "../../js/actions/location_actions.js";
import "./Location.css";

import PropTypes from "prop-types";

class EditLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location.state.location,
      show: false,
      dates: { start: "", end: "" }
    };
  }

  servicesRows() {
    return (
      <Row>
        <Col>Services Here!</Col>
      </Row>
    );
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { dispatch, isFetching } = this.props;
    const { show, dates } = this.state;
    const { location } = this.state.location;

    return (
      <div>
        <h4>Edit Location!</h4>
        <Modal show={show} onHide={this.handleClose} centered>
          <AppointmentModal
            handleClose={this.handleClose}
            handleSelect={this.handleSelect}
            services={location.services}
          />
        </Modal>

        <Row>
          <Col md={{ span: 3, offset: 1 }}>
            <Formik
              initialValues={{
                name: location.name,
                address: location.address,
                phone_number: location.phone_number
              }}
              onSubmit={values => {
                dispatch(editLocation(values));
              }}
            >
              {({ isFetching, responseStatus }) => (
                <Form>
                  <Row>
                    <Col>
                      <label htmlFor="name">Location Name</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field type="text" name="name" /> <br />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor="name">Address </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field type="text" name="address" /> <br />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor="name">Phone Number</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field type="text" name="phone_number" /> <br />
                    </Col>
                  </Row>
                  {this.servicesRows()}
                </Form>
              )}
            </Formik>
          </Col>
          <Col
            md={{ span: 8 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Calendar calendarType="US" />
            <Button
              variant="link"
              onClick={this.handleShow}
              style={{ width: "67%", border: "1px solid gray", color: "black" }}
            >
              Add appointment
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 4 }}></Col>
        </Row>
      </div>
    );
  }
}

export default EditLocation;
