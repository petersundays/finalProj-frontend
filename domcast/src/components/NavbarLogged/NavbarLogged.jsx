import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import logo from "../../multimedia/logo/domcast-05-navbar-logo.png";
import "../../pages/HomeLogged.css";

function NavbarLogged({ handleShow, handleLanguageChange, language }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-top-changes">
      <Container>
        <Navbar.Brand href="#home" className="logo me-auto" alt="DomCast: empowering innovation">
          <img src={logo} alt="DomCast" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <img src={defaultProfilePic} alt="Profile" className="profile-pic me-2" />
            <NavDropdown title={<span className="dropdown-title">first name</span>} id="basic-nav-dropdown" className="ms-2 me-5 dropdown-profile">
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#inbox">Inbox</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-outline-secondary ${language === "EN" ? "active" : ""}`}
                onClick={() => handleLanguageChange("EN")}
                style={{ width: "50px", height: "32px", fontSize: "12px", fontWeight: "bold" }}
              >
                EN
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary ${language === "PT" ? "active" : ""}`}
                onClick={() => handleLanguageChange("PT")}
                style={{ width: "50px", height: "32px", fontSize: "12px", fontWeight: "bold" }}
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

export default NavbarLogged;