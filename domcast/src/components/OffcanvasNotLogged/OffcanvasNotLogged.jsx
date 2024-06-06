import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";

function OffcanvasComponent({
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
          <Offcanvas.Title className="offcanvas-main-title">Hello! Join us now!</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <hr />
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div>
          <Nav className="flex-column profileNavbar">
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#sign-up">Sign up</Nav.Link>
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

export default OffcanvasComponent;
