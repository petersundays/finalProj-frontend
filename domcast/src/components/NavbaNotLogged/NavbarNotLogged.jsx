import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../multimedia/logo/domcast-05-navbar-logo.png";
import "./NavbarNotLogged.css";

function NavbarNotLogged({
  handleShow,
  handleLanguageChange,
  language,
}) {
  const handleLogin = () => {
    console.log("Login");
  };

  const handleSignUp = () => {
    console.log("Sign Up");
  };

  return (
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
  );
}

export default NavbarNotLogged;
