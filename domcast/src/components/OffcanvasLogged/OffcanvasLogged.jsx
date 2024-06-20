import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";

function OffcanvasLogged({
  show,
  handleClose,
  expandedProjects,
  toggleExpandProjects,
  handleLanguageChange,
  language,
}) {
  return (
    <Offcanvas show={show} onHide={handleClose} className="offcanvas-main-changed">
      <Offcanvas.Header closeButton>
        <div className="offcanvas-header">
          <img src={defaultProfilePic} alt="Profile" className="profile-pic mr-2" />
          <Offcanvas.Title className="offcanvas-main-title">first name</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <hr />
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div>
          <Nav className="flex-column profileNavbar">
            <Nav.Link href="#myProfile">My Profile</Nav.Link>
            <Nav.Link href="#messages">Messages</Nav.Link>
          </Nav>
          <hr />
          <Nav className="d-flex flex-column justify-content-between sidebarNavbar">
            <Nav.Link onClick={toggleExpandProjects}>
              Projects {expandedProjects ? "▲" : "▼"}
            </Nav.Link>
            {expandedProjects && (
              <div className="ml-3">
                <Nav.Link href="#all-projects">All Projects</Nav.Link>
                <Nav.Link href="#my-projects">My Projects</Nav.Link>
                <Nav.Link href="#approvals">Approvals</Nav.Link>
              </div>
            )}
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#assets">Assets</Nav.Link>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
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
  );
}

export default OffcanvasLogged;
