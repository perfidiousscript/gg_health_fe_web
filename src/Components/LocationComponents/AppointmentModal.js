import React from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

class AppointmentModal extends React.Component {
  hourOptions() {
    let optionArray = [];
    for (var i = 1; i <= 12; i++) {
      optionArray.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return optionArray;
  }

  showDates(dates) {
    let datesHtml = [];
    if (dates.start) {
      datesHtml.push(
        <p>
          Create appointment for {dates.start.getMonth()}/
          {dates.start.getDate()} to {dates.end.getMonth()}/
          {dates.end.getDate()}
        </p>
      );
    } else {
      datesHtml.push(
        <p>
          Create appointment for {dates.date.getMonth()}/{dates.date.getDate()}{" "}
        </p>
      );
    }
    return datesHtml;
  }

  render() {
    const { handleClose, dates } = this.props;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Modal!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ dates: dates }}
            onSubmit={values => {
              // dispatch(addAppointment(values));
            }}
          >
            {({ isFetching, responseStatus }) => (
              <Form>
                {this.showDates(dates)}
                <label name="startTime">Start Time: </label>
                <select id="startTime">{this.hourOptions()}</select>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default AppointmentModal;
