import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel, FormText } from "react-bootstrap";
import ModalForgotPassword from "../ModalForgotPassword/ModalForgotPassword.jsx";
import { useNavigate } from "react-router-dom";
import { Base_url_users } from "../../functions/UsersFunctions.jsx";
import { userStore } from "../../stores/UserStore.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function ModalLogin({ show, handleClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLoggedUser } = userStore();
  const [showModalForgotPassword, setShowModalForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setShowModalForgotPassword(true);
    handleClose();
  };

  const handleCloseForgotPasswordModal = () => {
    setShowModalForgotPassword(false);
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
        const response = await fetch(`${Base_url_users}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setLoggedUser(data);
          setTimeout(() => {
            console.log(userStore.getState().loggedUser);
            navigate("/domcast/myprojects", { replace: true });
          }, 100);
          } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
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
            <FloatingLabel controlId="floatingPassword" className="mb-3 mx-5">
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

      <ModalForgotPassword
        show={showModalForgotPassword}
        handleClose={handleCloseForgotPasswordModal}
        handleSubmit={handleSubmitForgotPassword}
      />
    </>
  );
}

export default ModalLogin;
