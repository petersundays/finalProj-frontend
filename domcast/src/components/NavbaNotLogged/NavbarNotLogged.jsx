import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
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
  
  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
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
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleShow}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                href="#login"
                onClick={handleLogin}
                className="login-btn me-lg-3"
                style={{
                  width: "6.25rem",
                  height: "2.5rem",
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
                  width: "6.25rem",
                  height: "2.5rem",
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
                  className={`btn-language ${
                    language === "EN" ? "selected" : "unselected"
                  }`}
                  onClick={() => handleLanguageChange("EN")}
                  style={{
                    width: "3.25rem",
                    height: "2rem",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`btn-language ${
                    language === "PT" ? "selected" : "unselected"
                  }`}
                  onClick={() => handleLanguageChange("PT")}
                  style={{
                    width: "3.25rem",
                    height: "2rem",
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
      />
      <SignUpModal
        show={showSignUpModal}
        handleClose={handleCloseSignUpModal}
      />
    </>
  );
}

export default NavbarNotLogged;
