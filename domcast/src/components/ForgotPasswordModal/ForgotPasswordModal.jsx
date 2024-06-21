import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { BASE_URL } from "../../functions/UsersFunctions";

function ForgotPasswordModal({ show, handleClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        const response = await fetch(`${BASE_URL}forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: email,
          },
        });

        if (response.ok) {
          console.log("Email sent");
          handleClose();
        } else {
          console.log("Email not sent");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="mt-2 p-4">
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Forgot your password?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <h5 className="mb-4 modal-title">
          Enter your email and you'll get a link to redefine it
        </h5>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3 mx-5"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
          <Button
            type="submit"
            className="my-3 custom-btn"
            style={{
              width: "15rem",
              backgroundColor: "var(--color-yellow-01)",
              borderColor: "var(--color-yellow-01)",
              color: "var(--color-coal)",
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
