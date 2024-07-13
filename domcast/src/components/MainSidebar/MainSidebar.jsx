import React, { useState } from "react";
import { Nav, Col } from "react-bootstrap";
import "./MainSidebar.css";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import 'boxicons';

function MainSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expandedProjects, setExpandedProjects] = useState(false);
  const [expandedAssets, setExpandedAssets] = useState(false);

  const loggedUser = userStore((state) => state.loggedUser);
  const unreadMessages = userStore((state) => state.unreadMessages);
  const setUnreadMessages = userStore((state) => state.setUnreadMessages);

  const turnOffUnread = () => {
    setUnreadMessages(false);
    navigate("/domcast/message-hub");
  };

  const toggleExpandProjects = () => {
    setExpandedProjects(!expandedProjects);
    setExpandedAssets(false);
  };

  const toggleExpandAssets = () => {
    setExpandedAssets(!expandedAssets);
    setExpandedProjects(false);
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
        <Nav.Link onClick={() => turnOffUnread()}>
        
          Message Hub

          {unreadMessages && 
            <box-icon name='bell-ring' type='solid' flip='horizontal' animation='tada' color='#ff0000' className='bx-lg' ></box-icon>
          }

        </Nav.Link>
        <Nav.Link onClick={() => navigate("/domcast/assets/list")}>
        Assets
        </Nav.Link>
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
