import React, { useState } from "react";
import { Nav, Col } from "react-bootstrap";
import "./MainSidebar.css";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";

function MainSidebar() {
  const navigate = useNavigate();
  const [expandedProjects, setExpandedProjects] = useState(false);
  const [expandedMessageHub, setExpandedMessageHub] = useState(false);
  const [expandedAssets, setExpandedAssets] = useState(false);

  const loggedUser = userStore((state) => state.loggedUser);

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

  return (
    <Col
      xs={12}
      md={2}
      className="bg-light sidebar sidebar-changed d-none d-lg-block"
      style={{ backgroundColor: "var(--color-yellow-01)" }}
    >
      <Nav defaultActiveKey="/home" className="flex-column">
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
              <Nav.Link onClick={() => navigate("/domcast/projects/approval-list")}>
                Approval List
              </Nav.Link>
            )}
          </div>
        )}
        <Nav.Link onClick={() => navigate("/domcast/users/list")}>Users</Nav.Link>
        <Nav.Link onClick={toggleExpandMessageHub}>
          Message Hub
          <span className="arrow">{expandedMessageHub ? "▲" : "▼"}</span>
        </Nav.Link>
        {expandedMessageHub && (
          <div className="ml-3">
            <Nav.Link onClick={() => navigate("/domcast/inbox")}>Inbox</Nav.Link>
            <Nav.Link onClick={() => navigate("/domcast/sent")}>Sent</Nav.Link>
          </div>
        )}
        <Nav.Link onClick={toggleExpandAssets}>
          Assets<span className="arrow">{expandedAssets ? "▲" : "▼"}</span>
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
        {loggedUser.type === 300 && (
          <Nav.Link onClick={() => navigate("/domcast/admin-dashboard")}>
            Dashboard
          </Nav.Link>
        )}
      </Nav>
    </Col>
  );
}

export default MainSidebar;
