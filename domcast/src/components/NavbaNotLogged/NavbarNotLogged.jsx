import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../../multimedia/logo/domcast-05-navbar-logo.png";
import "./NavbarNotLogged.css";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";

function NavbarNotLogged({ handleShow, handleLanguageChange, language }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Login form submitted");
  };

  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    // Handle sign up logic here
    console.log("Sign Up form submitted");
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        className="navbar-top-changes"
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="logo me-auto"
            alt="DomCast: empowering innovation"
          >
            <img src={logo} alt="DomCast" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                href="#login"
                onClick={handleLogin}
                className="login-btn me-lg-3"
                style={{
                  width: "100px",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  verticalAlign: "middle",
                }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                href="#sign-up"
                onClick={handleSignUp}
                className="sign-up-btn me-lg-5"
                style={{
                  width: "100px",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  verticalAlign: "middle",
                }}
              >
                Sign Up
              </Nav.Link>
              <div className="btn-group ms-lg-5" role="group">
                <button
                  type="button"
                  className={`btn btn-outline-secondary ${
                    language === "EN" ? "active" : ""
                  }`}
                  onClick={() => handleLanguageChange("EN")}
                  style={{
                    width: "50px",
                    height: "32px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-secondary ${
                    language === "PT" ? "active" : ""
                  }`}
                  onClick={() => handleLanguageChange("PT")}
                  style={{
                    width: "50px",
                    height: "32px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  PT
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseLoginModal}
        handleSubmit={handleSubmitLogin}
      />
      <SignUpModal
        show={showSignUpModal}
        handleClose={handleCloseSignUpModal}
        handleSubmit={handleSubmitSignUp}
      />
    </>
  );
}

export default NavbarNotLogged;
