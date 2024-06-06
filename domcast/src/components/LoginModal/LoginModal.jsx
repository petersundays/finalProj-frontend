import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";

function LoginModal({ show, handleClose, handleSubmit }) {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
    handleClose();
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleSubmitForgotPassword = (event) => {
    event.preventDefault();
    // Handle forgot password logic here
    console.log("Forgot password form submitted");
  };

  return (
    <>
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
                <a href="#forgot-password" onClick={handleForgotPassword}>
                  Forgot your password?
                </a>
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={handleCloseForgotPasswordModal}
        handleSubmit={handleSubmitForgotPassword}
      />
    </>
  );
}

export default LoginModal;
