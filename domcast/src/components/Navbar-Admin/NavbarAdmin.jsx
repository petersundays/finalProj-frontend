import React from "react";
import "./NavbarAdmin.css";


function NavbarAdmin() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fs-4" href="#">
          DomCast
        </a>
        {/* Navbar Toggler */}
        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Sidebar */}
        <div
          className="sidebar offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
            {/* Sidebar Header */}
          <div className="offcanvas-header text-white border-bottom">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              DomCast
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
            {/* Sidebar Body */}
          <div className="offcanvas-body d-flex flex-column flex-lg-row p-2 p-lg-0">
            <ul className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#projectsApprovals">
                  Projects Approvals
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#stats">
                  Stats
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#configurations">
                  Configurations
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#createProject">
                  Create Project
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#inbox">
                  Inbox
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#myProfile">
                  My Profile
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#users">
                  Users
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#componentsResources">
                  Components & Resources
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#logout">
                  Logout
                </a>
              </li>
              </ul>
              {/* Language Selector */}
            <div className="d-flex justify-content-center align-items-center gap-3">
                <a className="text-white text-decoration-none px-3 py-1" href="#EN">
                  EN
                </a>
                <a className="text-white text-decoration-none px-3 py-1 " href="#PT">
                  PT
                </a>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
