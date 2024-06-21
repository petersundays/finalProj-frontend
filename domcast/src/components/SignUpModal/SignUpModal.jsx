import React from "react";
import { Modal, Form, Button, FloatingLabel, Row } from "react-bootstrap";

function SignUpModal({ show, handleClose, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="mt-2 p-4">
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <h5 className="mb-4 modal-title">Join us! We want you on board!</h5>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3 mx-5"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3 mx-5"
          >
            <Form.Control type="password" placeholder="Password" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirm Password"
            className="mb-3 mx-5"
          >
            <Form.Control
              type="password"
              placeholder="Confirm password"
              required
            />
          </FloatingLabel>
          <Button type="submit" className="my-3 modal-submit" style={{ width: "15rem" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
