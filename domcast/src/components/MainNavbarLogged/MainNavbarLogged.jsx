import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import logo from "../../multimedia/logo/domcast-05-navbar-logo.png";
import "./MainNavbarLogged.css";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";
import { projectStore } from "../../stores/ProjectStore.jsx";
import { Base_url_users } from "../../functions/UsersFunctions.jsx";
import ModalRedefinePassword from "../ModalRedefinePassword/ModalRedefinePassword.jsx";

function MainNavbarLogged({ handleShow, handleLanguageChange, language }) {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);
  const clearLoggedUser = userStore((state) => state.clearLoggedUser);
  const resetDetailedProject = projectStore((state) => state.resetDetailedProject);
  const resetNewProject = projectStore((state) => state.resetNewProject);


  const userId = userStore((state) => state.loggedUser.id);

  const [showModalRedefinePassword, setShowModalRedefinePassword] =
    useState(false);

  const viewProfile = () => {
    navigate(`user/view/${userId}`, { replace: true });
  };

  const editProfile = () => {
    navigate(`user/edit/${userId}`, { replace: true });
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    const token = userStore.getState().loggedUser.sessionToken;
    const id = userStore.getState().loggedUser.id;

    try {
      const response = await fetch(`${Base_url_users}logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
          id: id,
        },
      });

      if (response.ok) {
        console.log("Logout successful");
        clearLoggedUser();
        resetDetailedProject();
        resetNewProject();
        navigate("/", { replace: true });
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenModalRedefinePassword = () => {
    setShowModalRedefinePassword(true);
  };

  const handleCloseModalRedefinePassword = () => {
    setShowModalRedefinePassword(false);
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
          onClick={() => navigate("/domcast/", { replace: true })}
          className="logo me-auto"
          alt="DomCast: empowering innovation"
        >
          <img src={logo} alt="DomCast" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <img
              src={loggedUser.photo ? loggedUser.photo : defaultProfilePic}
              alt="Profile"
              className="profile-pic me-2"
            />
            <NavDropdown
              title={
                <span className="dropdown-title">
                  {loggedUser.firstName} {loggedUser.lastName}
                </span>
              }
              id="basic-nav-dropdown"
              className="ms-2 me-5 dropdown-profile"
            >
              <NavDropdown.Item onClick={viewProfile}>View Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={editProfile}>
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleOpenModalRedefinePassword}>
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <div className="btn-group" role="group">
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
      <ModalRedefinePassword
        show={showModalRedefinePassword}
        handleClose={handleCloseModalRedefinePassword}
      />
    </Navbar>
  );
}

export default MainNavbarLogged;
