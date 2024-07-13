import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeLogged.css";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import AdminProjectsApprovalList from "../components/AdminProjectsApprovalList/AdminProjectsApprovalList";
import AssetEdit from "../components/AssetEdit/AssetEdit";
import AssetList from "../components/AssetList/AssetList";
import LogList from "../components/LogList/LogList";
import MainFooter from "../components/MainFooter/MainFooter";
import MainNavbarLogged from "../components/MainNavbarLogged/MainNavbarLogged";
import MainOffcanvasLogged from "../components/MainOffcanvasLogged/MainOffcanvasLogged";
import MainSidebar from "../components/MainSidebar/MainSidebar";
import MessageHub from "../components/MessageHub/MessageHub";
import ProjectChat from "../components/ProjectChat/ProjectChat";
import ProjectEdit from "../components/ProjectEdit/ProjectEdit";
import ProjectUserList from "../components/ProjectUserList/ProjectUserList";
import ProjectGlobalList from "../components/ProjectGlobalList/ProjectGlobalList";
import ProjectNew from "../components/ProjectNew/ProjectNew";
import ProjectPublic from "../components/ProjectView/ProjectPublic/ProjectPublic";
import ProjectPrivate from "../components/ProjectView/ProjectPrivate/ProjectPrivate";
import TaskEdit from "../components/TaskEdit/TaskEdit";
import TaskList from "../components/TaskList/TaskList";
import TaskNew from "../components/TaskNew/TaskNew";
import TaskView from "../components/TaskView/TaskView";
import UserEdit from "../components/UserEdit/UserEdit";
import UserList from "../components/UserList/UserList";
import UserView from "../components/UserView/UserView";


function HomeLogged() {
  const [show, setShow] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(false);
  const [language, setLanguage] = useState("EN");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleExpandProjects = () => setExpandedProjects(!expandedProjects);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div className="Layout">
      <MainNavbarLogged
        handleShow={handleShow}
        handleLanguageChange={handleLanguageChange}
        language={language}
      />
      <MainOffcanvasLogged
        show={show}
        handleClose={handleClose}
        expandedProjects={expandedProjects}
        toggleExpandProjects={toggleExpandProjects}
        handleLanguageChange={handleLanguageChange}
        language={language}
      />
      <Container fluid className="main-container">
        <Row className="flex-grow-1">
          <MainSidebar
            expandedProjects={expandedProjects}
            toggleExpandProjects={toggleExpandProjects}
          />
          <Col
            xs={12}
            md={10}
            className="content d-flex justify-content-center align-items-center"
          >
            <Card className="custom-card">
              <Card.Body className="card-body-custom">
                <Routes>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/admin-projects/approval-list" element={<AdminProjectsApprovalList />} />
                  <Route path="/asset/edit/:id" element={<AssetEdit />} />
                  <Route path="/assets/list" element={<AssetList />} />
                  <Route path="/logs/list/:id" element={<LogList />} />
                  <Route path="/message-hub/*" element={<MessageHub />} />
                  <Route path="/myprojects" element={<ProjectUserList />} />
                  <Route path="/project/edit/:id" element={<ProjectEdit />} />
                  <Route path="/projects/list" element={<ProjectGlobalList />} />
                  <Route path="/project/new" element={<ProjectNew />} />
                  <Route path="/project/view/:id" element={<ProjectPublic />} />
                  <Route path="/myproject/view/:id" element={<ProjectPrivate />} />
                  <Route path="/project/chat/:id" element={<ProjectChat />} />
                  <Route path="/task/edit/:id" element={<TaskEdit />} />
                  <Route path="/tasks/list/:id" element={<TaskList />} />
                  <Route path="/task/new" element={<TaskNew />} />
                  <Route path="/task/view/:id" element={<TaskView />} />
                  <Route path="/user/edit/:id" element={<UserEdit />} />
                  <Route path="/users/list" element={<UserList />} />
                  <Route path="/user/view/:id" element={<UserView />} />
                </Routes>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
}

export default HomeLogged;
