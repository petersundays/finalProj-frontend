import React from "react";
import "./NavbarNotLogged.css";


function NavbarNotLogged() {
  return (
    <nav class="navbar nabvar-expand-lg navbar-dark background-transparent">
      <div class="container">
         {/* Logo */}
        <a class="navbar-brand fs-4" href="#">
          DomCast
        </a>
         {/* Navbar Toggler */}
        <button
          class="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
         {/* Sidebar */}
        <div
          class="sidebar offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
             {/* Sidebar Header */}
          <div class="offcanvas-header text-white border-bottom">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              DomCast
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
             {/* Sidebar Body */}
          <div class="offcanvas-body d-flex flex-column flex-lg-row p-2 p-lg-0">
            <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link" href="#projects">
                  Projects
                </a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link" href="#loginSignUp">
                  Login / Sign up
                </a>
              </li>
              </ul>
               {/* Language Selector */}
            <div class="d-flex justify-content-center align-items-center gap-3">
                <a class="text-white text-decoration-none px-3 py-1" href="#EN">
                  EN
                </a>
                <a class="text-white text-decoration-none px-3 py-1 " href="#PT">
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
