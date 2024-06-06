import React from "react";
import { Nav, Col } from "react-bootstrap";

function Sidebar({ expandedProjects, toggleExpandProjects }) {
  return (
    <Col xs={12} md={2} className="bg-light sidebar sidebar-changed d-none d-lg-block">
      <Nav defaultActiveKey="/home" className="flex-column">
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
    </Col>
  );
}

export default Sidebar;
