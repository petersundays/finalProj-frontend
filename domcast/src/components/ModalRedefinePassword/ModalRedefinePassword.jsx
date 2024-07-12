import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import "./ModalRedefinePassword.css";
import { Base_url_users } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function ModalRedefinePassword({ show, handleClose }) {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = userStore();
  const token = user.token;
  const id = user.id;

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
        const response = await fetch(`${Base_url_users}password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
            id: id,
            oldPassword: oldPassword,
            newPassword: password,
          },
        });

        if (response.ok) {
          console.log("Password redefined");
          handleClose();
        } else {
          console.log("Password not redefined");
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
          <h3 className="my-2" style={{ color: "var(--color-blue-03"}}>Choose your new password</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <Form>
          <FloatingLabel controlId="floatingOldPassword" className="mb-3 mx-5">
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span
                onClick={toggleShowOldPassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </FloatingLabel>
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
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
              <Button
          variant="secondary"
          onClick={handleClose}
          className="modal-redefine-pass-cancel-btn mx-2"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          className="modal-redefine-pass-save-btn mx-2"
        >
          Redefine
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRedefinePassword;
