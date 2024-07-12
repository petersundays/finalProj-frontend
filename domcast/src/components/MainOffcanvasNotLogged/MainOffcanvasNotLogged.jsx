import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalSignUp from "../ModalSignUp/ModalSignUp";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function MainOffcanvasNotLogged({
  show,
  handleClose,
  handleLanguageChange,
  language,
}) {
  const { t } = useTranslation();
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  const handleLogin = () => {
    setShowModalLogin(true);
  };

  const handleCloseLoginModal = () => {
    setShowModalLogin(false);
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Login form submitted");
  };

  const handleSignUp = () => {
    setShowModalSignUp(true);
  };

  const handleCloseSignUpModal = () => {
    setShowModalSignUp(false);
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    // Handle sign up logic here
    console.log("Sign Up form submitted");
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} className="offcanvas-main-changed">
        <Offcanvas.Header closeButton>
          <div className="offcanvas-header">
            <Offcanvas.Title className="offcanvas-main-title">Hello! Join us now!</Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <div>
            <Nav className="flex-column profileNavbar">
              <Nav.Link href="#login" onClick={handleLogin}>Login</Nav.Link>
              <Nav.Link href="#sign-up" onClick={handleSignUp}>Sign up</Nav.Link>
            </Nav>
          </div>
          <Nav className="flex-column bottomNavbar mt-4 mb-3 align-items-center">
            <div className="btn-group btn-offcanvas-main" role="group">
              <button
                type="button"
                className={`btn btn-outline-secondary ${language === "EN" ? "active" : ""}`}
                onClick={() => handleLanguageChange("EN")}
                style={{ width: "80px" }}
              >
                EN
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary ${language === "PT" ? "active" : ""}`}
                onClick={() => handleLanguageChange("PT")}
                style={{ width: "80px" }}
              >
                PT
              </button>
            </div>
            <Nav.Link href="#logout" className="mt-2">Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <ModalLogin
        show={showModalLogin}
        handleClose={handleCloseLoginModal}
        handleSubmit={handleSubmitLogin}
      />
      <ModalSignUp
        show={showModalSignUp}
        handleClose={handleCloseSignUpModal}
        handleSubmit={handleSubmitSignUp}
      />
    </>
  );
}

export default MainOffcanvasNotLogged;
