
import React from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";

function LoginModal({ show, handleClose, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Let's move your projects forward</h5>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
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
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Password" required />
          </FloatingLabel>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
          <div className="mt-3 text-center">
            <span>
              <a href="#forgot-password">Forgot your password?</a>
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
