import React from "react";
import "./NavbarNotLogged.css";
import logo from "../../multimedia/logo/domcast-02-navbar-logo.png";

function NavbarNotLogged() {
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
          <div className="offcanvas-body d-flex flex-column p-4">
            <ul
              className="navbar-nav justify-content-center
             align-items-center fs-5 flex-grow-1 pe-3"
            >
              <li className="nav-item mx-2">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>
            </ul>
            {/* Login / Signup */}
            <div
              className="d-flex justify-content-center
            align-items-center gap-3 mb-3"
            >
              <a
                className="text-dark text-decoration-none rounded-3 px-2 py-1 "
                href="#login"
              >
                Login
              </a>
              <a
                className="text-dark text-decoration-none rounded-3 px-2 py-1 "
                href="#signUp"
              >
                Sign up
              </a>
            </div>
            {/* Language Selector */}
            <div
              className="d-flex justify-content-center
            align-items-center gap-3"
            >
              <a
                className="text-dark text-decoration-none rounded-3 px-4 py-1 "
                style={{ backgroundColor: "#FE7C66" }}
                href="#EN"
              >
                EN
              </a>
              <a
                className="text-dark text-decoration-none rounded-3 px-4 py-1 "
                style={{ backgroundColor: "#5DE1C4" }}
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

export default NavbarNotLogged;
