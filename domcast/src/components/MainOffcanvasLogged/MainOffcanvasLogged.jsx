import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";
import "./MainOffcanvasLogged.css";

function MainOffcanvasLogged({
  show,
  handleClose,
}) {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);
  const clearLoggedUser = userStore((state) => state.clearLoggedUser);

  const [expandedProjects, setExpandedProjects] = useState(false);
  const [expandedMessageHub, setExpandedMessageHub] = useState(false);
  const [expandedAssets, setExpandedAssets] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState(false);
  const [language, setLanguage] = useState("EN");

  const toggleExpandProjects = () => {
    setExpandedProjects(!expandedProjects);
    setExpandedAssets(false);
    setExpandedLogs(false);
    setExpandedMessageHub(false);
  };

  const toggleExpandMessageHub = () => {
    setExpandedMessageHub(!expandedMessageHub);
    setExpandedProjects(false);
    setExpandedAssets(false);
    setExpandedLogs(false);
  };

  const toggleExpandAssets = () => {
    setExpandedAssets(!expandedAssets);
    setExpandedProjects(false);
    setExpandedLogs(false);
    setExpandedMessageHub(false);
  };

  const toggleExpandLogs = () => {
    setExpandedLogs(!expandedLogs);
    setExpandedProjects(false);
    setExpandedAssets(false);
    setExpandedMessageHub(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleLogout = () => {
    clearLoggedUser();
    navigate("/", { replace: true });
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className="offcanvas-main-changed"
    >
      <Offcanvas.Header closeButton>
        <div className="offcanvas-header">
          <img
            src={defaultProfilePic}
            alt="Profile"
            className="profile-pic mr-2"
          />
          <Offcanvas.Title className="offcanvas-main-title">
            {loggedUser.firstName} {loggedUser.lastName}
          </Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <hr />
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div>
          <Nav className="flex-column profileNavbar">
            <Nav.Link href="#myProfile">My Profile</Nav.Link>
            <Nav.Link href="changePassword">Change Password</Nav.Link>
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
                <Nav.Link href="#new-project">New Project</Nav.Link>
                <Nav.Link href="#approvals">Approvals</Nav.Link>
              </div>
            )}
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav className="d-flex flex-column justify-content-between sidebarNavbar">
              <Nav.Link onClick={toggleExpandMessageHub}>
                Message Hub {expandedMessageHub ? "▲" : "▼"}
              </Nav.Link>
              {expandedMessageHub && (
                <div className="ml-3">
                  <Nav.Link href="#inbox">Inbox</Nav.Link>
                  <Nav.Link href="#sent">Sent</Nav.Link>
                </div>
              )}
            </Nav>
            <Nav className="d-flex flex-column justify-content-between sidebarNavbar">
              <Nav.Link onClick={toggleExpandAssets}>
                Assets {expandedAssets ? "▲" : "▼"}
              </Nav.Link>
              {expandedAssets && (
                <div className="ml-3">
                  <Nav.Link href="#allAssets">All Assets</Nav.Link>
                  <Nav.Link href="#newAsset">New Asset</Nav.Link>
                </div>
              )}
            </Nav>
            <Nav className="d-flex flex-column justify-content-between sidebarNavbar">
              <Nav.Link onClick={toggleExpandLogs}>
                Logs {expandedLogs ? "▲" : "▼"}
              </Nav.Link>
              {expandedLogs && (
                <div className="ml-3">
                  <Nav.Link href="#allLogs">All Logs</Nav.Link>
                  <Nav.Link href="#newLog">New Log</Nav.Link>
                </div>
              )}
            </Nav>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
          </Nav>
        </div>
        <Nav className="flex-column bottomNavbar mt-4 mb-3 align-items-center">
          <div className="btn-group btn-offcanvas-main" role="group">
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                language === "EN" ? "active" : ""
              }`}
              onClick={() => handleLanguageChange("EN")}
              style={{ width: "80px" }}
            >
              EN
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                language === "PT" ? "active" : ""
              }`}
              onClick={() => handleLanguageChange("PT")}
              style={{ width: "80px" }}
            >
              PT
            </button>
          </div>
          <Nav.Link href="#logout" className="mt-2" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MainOffcanvasLogged;
