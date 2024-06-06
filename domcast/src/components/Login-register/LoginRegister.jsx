import React from "react";
import "../Login-register/LoginRegister.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";

function LoginRegister() {
  return (
    <Container className="custom-scroll rounded" style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}>
      {/* <Row className="mt-5"> */}
      <Row className="mt-5">
        {/* Login Section */}
        <Col md={6} className="text-center my-5">
          <h3 className="title text-white">Login</h3>
          <FloatingLabel
            controlId="loginEmail"
            label="e-mail"
            className="mb-3 text-dark-blue-01 mx-3 mt-3"
          >
            <Form.Control
              type="email"
              placeholder="e-mail"
              style={{ borderColor: "var(--color-blue-01)" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="loginPassword"
            label="password"
            className="mb-3 text-dark-blue-01 mx-3"
          >
            <Form.Control
              type="password"
              placeholder="password"
              style={{ borderColor: "var(--color-blue-01)" }}
            />
          </FloatingLabel>
          <Button
            variant="primary"
            className="mb-3 w-50 mx-auto d-block mt-4 fw-bold"
            style={{
              backgroundColor: "var(--color-blue-01)",
              color: "var(--color-white)",
            }}
          >
            Login
          </Button>
          <div className="text-center">
            <a href="#" className="text-blue-02">
              Forgot your password?
            </a>
          </div>
        </Col>

        {/* Sign Up Section */}
        <Col md={6} className="text-center my-5">
          <h3 className="title text-white">Sign Up</h3>
          <FloatingLabel
            controlId="signUpEmail"
            label="e-mail"
            className="mb-3 text-dark-blue-01 mx-3 mt-3"
          >
            <Form.Control
              type="email"
              placeholder="e-mail"
              style={{ borderColor: "var(--color-blue-01)" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="signUpPassword"
            label="password"
            className="mb-3 text-dark-blue-01 mx-3"
          >
            <Form.Control
              type="password"
              placeholder="password"
              style={{ borderColor: "var(--color-blue-01)" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="signUpConfirmPassword"
            label="confirm password"
            className="mb-3 text-dark-blue-01 mx-3"
          >
            <Form.Control
              type="password"
              placeholder="confirm password"
              style={{ borderColor: "var(--color-blue-01)" }}
            />
          </FloatingLabel>
          <Button
            variant="primary"
            className="mx-auto w-50 d-block mt-4 fw-bold"
            style={{
              backgroundColor: "var(--color-blue-01)",
              color: "var(--color-white)",
            }}
          >
            Sign Up
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginRegister;
