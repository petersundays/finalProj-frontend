import React from "react";
import "./NavbarAdmin.css";
import logo from "../../multimedia/logo/domcast-02-navbar-logo.png";

function NavbarAdmin() {
  return (
    // Navbar
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img src={logo} alt="DomCast" className="navbar-logo" />
        </a>
        {/* Toggle Btn */}
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
          <div className="offcanvas-header border-bottom">
            <img src={logo} alt="DomCast" className="navbar-logo" />
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          {/* Sidebar Body */}
          <div className="offcanvas-body d-flex flex-column p-4" >
            <ul
              className="navbar-nav justify-content-top
             fs-5 flex-grow-1 pe-3 "
            >
              <li className="nav-item mx-2">
                <a className="nav-link" aria-current="page" href="#home" style={{ color: "#081C3A" }}>
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" aria-current="page" href="#myProfile" style={{ color: "#081C3A" }}>
                  My Profile
                </a>
              </li>
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "#081C3A" }}
                >
                  Projects
                </a>
                <ul class="dropdown-menu custom-dropdown-menu align-items-left fs-5 flex-grow-1 pe-3">
                  <li>
                    <a class="dropdown-item mx-2" href="#allProjects" style={{ color: "#081C3A" }}>
                      All Projects
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item mx-2" href="#createProject" style={{ color: "#081C3A" }}>
                      Create Project
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item mx-2" href="#approvals" style={{ color: "#081C3A" }}>
                      Approvals
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" aria-current="page" href="#inbox" style={{ color: "#081C3A" }}>
                  Inbox
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#allUsers" style={{ color: "#081C3A" }}>
                  All Users
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" aria-current="componentsAndResources" href="#" style={{ color: "#081C3A" }}>
                  Components & Resources
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#statistics" style={{ color: "#081C3A" }}>
                  Statistics
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#settings" style={{ color: "#081C3A" }}>
                  Settings
                </a>
              </li>
            </ul>
            {/* Logout */}
            <div
              className="d-flex 
            align-items-left gap-3 mb-3"
            >
              <a
                className="text-dark text-decoration-none fs-5 rounded-3 px-2 py-5"
                href="#logout"
                style={{ color: "#081C3A" }}
              >
                Logout
              </a>
            </div>
            {/* Language Selector */}
            <div
              className="d-flex justify-content-center
            align-items-center gap-3"
            >
              <a
                className="text-decoration-none rounded-3 px-4 py-1 fw-bold"
                style={{ backgroundColor: "#212121", color: "#F9F9F9" }}
                href="#EN"
              >
                EN
              </a>
              <a
                className="text-decoration-none rounded-3 px-4 py-1 fw-bold"
                style={{ backgroundColor: "#212121", color: "#F9F9F9" }}
                href="#PT"
              >
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
