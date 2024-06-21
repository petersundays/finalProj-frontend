import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel, Toast } from "react-bootstrap";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore.jsx";

function LoginModal({ show, handleClose }) {
  const navigate = useNavigate();
  const { setUser } = userStore();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      const login = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch(`${BASE_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          Toast.show("Welcome to DomCast!");
          setUser(data.user);
          navigate("/home", { replace: true });
        } else {
          console.log("Login failed");
          Toast.show("Login failed.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      Toast.show("Email and password must be filled in");
      console.log("Email and password must be filled in");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="mt-2 p-4">
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <h5 className="mb-4 modal-title">Let's move your projects forward</h5>
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
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3 mx-5"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="mb-3 text-center">
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
