import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import logo from "../../multimedia/logo/domcast-05-navbar-logo.png";
import "./MainNavbarLogged.css";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";
import { Base_url_users } from "../../functions/UsersFunctions.jsx";

function MainNavbarLogged({ handleShow, handleLanguageChange, language }) {
  const navigate = useNavigate();
  const { setUser } = userStore();


const handleLogout = async (event) => {
  event.preventDefault();

  const token = userStore.getState().user.sessionToken;
  console.log(token);
  const id = userStore.getState().user.id;
  console.log(id);

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
      setUser({
        id: null,
        sessionToken: "",
        firstName: "",
        lastName: "",
        nickname: "",
        photo: "",
        biography: "",
        visible: false,
        workplace: "",
        interests: [],
        skills: [],
      });
      navigate("/", { replace: true });
    } else {
      console.log("Logout failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  };
   

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
              <NavDropdown.Item href="#messages">Messages</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
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

export default MainNavbarLogged;
