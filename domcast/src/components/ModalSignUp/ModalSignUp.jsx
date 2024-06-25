import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { Base_url_users } from "../../functions/UsersFunctions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ModalSignUp.css";

function ModalSignUp({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRegex =
    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "" || confirmPassword === "") {
      console.log("All fields must be filled in");
      return;
    } else if (emailRegex.test(email) === false) {
      console.log("Invalid email");
      return;
    } else if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    } else if (email === "") {
      console.log("Email field must be filled in");
      return;
    } else if (password.length < 12 || confirmPassword.length < 12) {
      console.log("Password must be at least 12 characters long");
    } else if (!passwordRegex.test(password)) {
      console.log(
        "Password must have one capital letter, one small letter, one number, and one symbol"
      );
    } else {
      console.log("Passwords match");

      const user = {
        email: email,
        password: password,
      };

      console.log(user.email);
      console.log(user.password);

      try {
        const response = await fetch(Base_url_users, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          console.log("User registered");
          handleClose();
        } else {
          console.log("User not registered");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            className="mb-3 mx-5"
          >
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            className="mb-3 mx-5"
          >
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                onClick={toggleShowConfirmPassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </FloatingLabel>
          <Button
            type="submit"
            className="my-3 modal-submit"
            style={{ width: "15rem" }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSignUp;
