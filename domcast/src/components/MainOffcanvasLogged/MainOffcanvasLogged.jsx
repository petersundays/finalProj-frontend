import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";
import "./MainOffcanvasLogged.css";
import ModalRedefinePassword from "../ModalRedefinePassword/ModalRedefinePassword.jsx";

function MainOffcanvasLogged({ show, handleClose }) {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);
  const clearLoggedUser = userStore((state) => state.clearLoggedUser);

  const [expandedProjects, setExpandedProjects] = useState(false);
  const [expandedMessageHub, setExpandedMessageHub] = useState(false);
  const [expandedAssets, setExpandedAssets] = useState(false);
  const [showModalRedefinePassword, setShowModalRedefinePassword] =
    useState(false);
  const [language, setLanguage] = useState("EN");

  const userId = userStore((state) => state.loggedUser.id);

  const viewProfile = () => {
    navigate(`user/view/${userId}`, { replace: true });
  };

  const editProfile = () => {
    navigate(`user/edit/${userId}`, { replace: true });
  };

  const handleOpenModalRedefinePassword = () => {
    setShowModalRedefinePassword(true);
  };

  const handleCloseModalRedefinePassword = () => {
    setShowModalRedefinePassword(false);
  };

  const toggleExpandProjects = () => {
    setExpandedProjects(!expandedProjects);
    setExpandedAssets(false);
    setExpandedMessageHub(false);
  };

  const toggleExpandMessageHub = () => {
    setExpandedMessageHub(!expandedMessageHub);
    setExpandedProjects(false);
    setExpandedAssets(false);
  };

  const toggleExpandAssets = () => {
    setExpandedAssets(!expandedAssets);
    setExpandedProjects(false);
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
            <Nav.Link onClick={viewProfile}>View Profile</Nav.Link>
            <Nav.Link onClick={editProfile}>Edit Profile</Nav.Link>
            <Nav.Link onClick={handleOpenModalRedefinePassword}>
              Change Password
            </Nav.Link>
          </Nav>
          <hr />
          <Nav className="d-flex flex-column justify-content-between sidebarNavbar">
            <Nav.Link onClick={toggleExpandProjects}>
              Projects
              <span className="arrow">{expandedProjects ? "▲" : "▼"}</span>
            </Nav.Link>
            {expandedProjects && (
              <div className="ml-3">
                <Nav.Link onClick={() => navigate("/domcast/projects/list")}>
                  All Projects
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/domcast/myprojects")}>
                  My Projects
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/domcast/project/new")}>
                  New Project
                </Nav.Link>
                {loggedUser.type === 300 && (
                  <Nav.Link
                    onClick={() => navigate("/domcast/projects/approval-list")}
                  >
                    Approval List
                  </Nav.Link>
                )}
              </div>
            )}
            <Nav.Link onClick={() => navigate("/domcast/users/list")}>
              Users
            </Nav.Link>
            <Nav className="d-flex flex-column justify-content-between sidebarNavbar">
              <Nav.Link onClick={toggleExpandMessageHub}>
                Message Hub
                <span className="arrow">{expandedMessageHub ? "▲" : "▼"}</span>
              </Nav.Link>
              {expandedMessageHub && (
                <div className="ml-3">
                  <Nav.Link onClick={() => navigate("/domcast/inbox")}>
                    Inbox
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/domcast/sent")}>
                    Sent
                  </Nav.Link>
                </div>
              )}
            </Nav>
            <Nav className="d-flex flex-column justify-content-between sidebarNavbar">
              <Nav.Link onClick={toggleExpandAssets}>
                Assets
                <span className="arrow">{expandedAssets ? "▲" : "▼"}</span>
              </Nav.Link>
              {expandedAssets && (
                <div className="ml-3">
                  <Nav.Link onClick={() => navigate("/domcast/assets/list")}>
                    All Assets
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/domcast/asset/new")}>
                    New Asset
                  </Nav.Link>
                </div>
              )}
            </Nav>
            {loggedUser.type === 300 && (
              <Nav.Link onClick={() => navigate("/domcast/admin-dashboard")}>
                Dashboard
              </Nav.Link>
            )}{" "}
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
          <Nav.Link className="mt-2" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
      <ModalRedefinePassword
        show={showModalRedefinePassword}
        handleClose={handleCloseModalRedefinePassword}
      />
    </Offcanvas>
  );
}

export default MainOffcanvasLogged;
