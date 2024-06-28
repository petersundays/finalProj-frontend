import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeLogged.css";
import MainNavbarLogged from "../components/MainNavbarLogged/MainNavbarLogged";
import MainOffcanvasLogged from "../components/MainOffcanvasLogged/MainOffcanvasLogged";
import MainSidebar from "../components/MainSidebar/MainSidebar";
import MainFooter from "../components/MainFooter/MainFooter";
import MessageHub from "../components/MessageHub/MessageHub";
import AssetNew from "../components/AssetNew/AssetNew";
import ProjectsListLogged from "../components/ProjectsListLogged/ProjectsListLogged";
import ProjectNew from "../components/ProjectNew/ProjectNew";
import TaskNew from "../components/TaskNew/TaskNew";
import AdminSettings from "../components/AdminSettings/AdminSettings";
import AssetEdit from "../components/AssetEdit/AssetEdit";
import ProjectEdit from "../components/ProjectEdit/ProjectEdit";
import TaskEdit from "../components/TaskEdit/TaskEdit";
import UserEditProfile from "../components/UserEditProfile/UserEditProfile";
import TasksListGantt from "../components/TasksListGantt/TasksListGantt";
import ProjPublic from "../components/ProjectPublic/ProjPublic";
import ProjPrivate from "../components/ProjectPrivate/ProjPrivate";
import AdminStats from "../components/AdminStats/AdminStats";
//import UsersList from "../components/UsersList/UsersList";
import UserViewProfilePublic from "../components/UserViewProfilePublic/UserViewProfilePublic";
import AssetView from "../components/AssetView/AssetView";
import TaskView from "../components/TaskView/TaskView";

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
                    <Route path="/" element={<ProjectsListLogged />} />
                    <Route path="/message-hub" element={<MessageHub />} />
                    <Route path="/add-asset" element={<AssetNew />} />
                    <Route path="/new-project" element={<ProjectNew />} />
                    <Route path="/new-task" element={<TaskNew />} />
                    <Route path="/settings" element={<AdminSettings />} />
                    <Route path="/edit-asset/:id" element={<AssetEdit />} />
                    <Route path="/edit-project/:id" element={<ProjectEdit />} />
                    <Route path="/edit-task/:id" element={<TaskEdit />} />
                    <Route path="/edit-profile/:id" element={<UserEditProfile />} />
                    <Route path="/project-plan/:id" element={<TasksListGantt />} />
                    <Route path="/project/:id" element={<ProjPublic />} />
                    <Route
                      path="/project-details/:id"
                      element={<ProjPrivate />}
                    />
                    <Route path="/statistics" element={<AdminStats />} />
                    {/* <Route path="/users" element={<UsersList />} /> */}
                    <Route path="/user-profile/:id" element={<UserViewProfilePublic />} />
                    <Route path="/asset/:id" element={<AssetView />} />
                    <Route path="/task/:id" element={<TaskView />} />
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
