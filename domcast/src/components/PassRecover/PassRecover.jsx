import React, { useState } from "react";
import { Row, Col, Form, Button, FloatingLabel, Card } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./PassRecover.css";
import { Base_url_users } from "../../functions/UsersFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function PassRecover () {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

      console.log("Password redefined: " + password);

      try {
        const response = await fetch(`${Base_url_users}reset-password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: password,
        });
        console.log({ password });

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
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Card className="p-4 align-items-center justifiy-content-center">
          <h2
            className="text-center my-4"
            style={{ color: "var(--color-blue-01)" }}
          >
            {t("Redefine your password")}
          </h2>

          <FloatingLabel
            controlId="floatingPassword"
            className="mt-4 mb-3 mx-5"
          >
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "25rem" }}
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
            className="my-3 mx-5"
          >
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: "25rem" }}
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
          <Card className="my-4 mx-3" style={{ border: "none" }}>
            <Row style={{ justifyContent: "center", gap: "3rem" }}>
              <Button
                onClick={handleCancel}
                className="btn-cancel"
                style={{ width: "10rem" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="btn-save"
                style={{ width: "10rem" }}
              >
                Save
              </Button>
            </Row>
          </Card>
        </Card>
      </Col>
    </Row>
  );
};

export default PassRecover;
