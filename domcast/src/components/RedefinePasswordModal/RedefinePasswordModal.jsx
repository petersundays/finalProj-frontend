import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import "./RedefinePassword.css";
import { Base_url_users } from "../../functions/UsersFunctions";
import { useParams, useNavigate } from "react-router-dom";

const RedefinePasswordModal = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
    } else if (password === "" || confirmPassword === "") {
      console.log("Password fields must be filled in");
    } else if (password.length < 12 || confirmPassword.length < 12) {
      console.log("Password must be at least 12 characters long");
    } else if (!passwordRegex.test(password)) {
      console.log(
        "Password must have one capital letter, one small letter, one number, and one symbol"
      );
    } else {
      console.log("Passwords match");

      try {
        const response = await fetch(`${Base_url_users}reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ password: password }),
        });

        if (response.ok) {
          console.log("Password redefined");
          navigate("/", { replace: true });
        } else {
          console.log("Password not redefined");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3>Choose your new password</h3>
          <FloatingLabel
            controlId="floatingPassword"
            label="Old Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirm Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FloatingLabel>
          <Button variant="primary" onClick={handleSubmit} className="me-2">
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RedefinePasswordModal;
