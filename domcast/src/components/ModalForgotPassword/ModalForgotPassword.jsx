import React, { useState } from "react";
import { Modal, Form, Button, FormText } from "react-bootstrap";
import { Base_url_users } from "../../functions/UsersFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function ModalForgotPassword({ show, handleClose }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const emailRegex =
    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      console.log("Email field must be filled in");
      return;
    } else if (emailRegex.test(email) === false) {
      console.log("Invalid email");
      return;
    } else {
      console.log("Email is valid");

      try {
        const response = await fetch(`${Base_url_users}recover-password`, {
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
  };

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
          <FormText
            className="mb-3 mx-5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Form.Control
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "23rem" }}
            />
          </FormText>
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

export default ModalForgotPassword;
