import React from "react";
import { Nav, Col } from "react-bootstrap";
import "./MainSidebar.css";

function MainSidebar({ expandedProjects, toggleExpandProjects }) {
  return (
    <Col xs={12} md={2} className="bg-light sidebar sidebar-changed d-none d-lg-block" style={{ backgroundColor: "var(--color-yellow-01)"}}>
      <Nav defaultActiveKey="/home" className="flex-column">
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
        <Nav.Link href="messageHub">Message Hub</Nav.Link>
        <Nav.Link href="#assets">Assets</Nav.Link>
        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
      </Nav>
    </Col>
  );
}

export default MainSidebar;
