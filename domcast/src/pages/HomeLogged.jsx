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
import NewAsset from "../components/AssetNew/AssetNew";
import CardGrid from "../components/ProjectsListLogged/ProjectsListLogged";
import NewProj from "../components/ProjectNew/ProjectNew";
import NewTask from "../components/TaskNew/TaskNew";
import AdminSettings from "../components/AdminSettings/AdminSettings";
import EditAsset from "../components/AssetEdit/AssetEdit";
import EditProj from "../components/ProjectEdit/ProjectEdit";
import EditTask from "../components/TaskEdit/TaskEdit";
import EditProfile from "../components/UserEditProfile/UserEditProfile";
import GanttChart from "../components/TasksListGantt/TasksListGantt";
import ProjPublic from "../components/ProjectPublic/ProjPublic";
import ProjPrivate from "../components/ProjectPrivate/ProjPrivate";
import AdminStats from "../components/AdminStats/AdminStats";
//import UsersList from "../components/UsersList/UsersList";
import ViewProfile from "../components/UserViewProfilePublic/UserViewProfilePublic";
import ViewAsset from "../components/AssetView/AssetView";
import ViewTask from "../components/TaskView/TaskView";

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
    <Router>
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
                    <Route path="/" element={<CardGrid />} />
                    <Route path="/message-hub" element={<MessageHub />} />
                    <Route path="/add-asset" element={<NewAsset />} />
                    <Route path="/new-project" element={<NewProj />} />
                    <Route path="/new-task" element={<NewTask />} />
                    <Route path="/settings" element={<AdminSettings />} />
                    <Route path="/edit-asset/:id" element={<EditAsset />} />
                    <Route path="/edit-project/:id" element={<EditProj />} />
                    <Route path="/edit-task/:id" element={<EditTask />} />
                    <Route path="/edit-profile/:id" element={<EditProfile />} />
                    <Route path="/project-plan/:id" element={<GanttChart />} />
                    <Route path="/project/:id" element={<ProjPublic />} />
                    <Route
                      path="/project-details/:id"
                      element={<ProjPrivate />}
                    />
                    <Route path="/statistics" element={<AdminStats />} />
                    {/* <Route path="/users" element={<UsersList />} /> */}
                    <Route path="/user-profile/:id" element={<ViewProfile />} />
                    <Route path="/asset/:id" element={<ViewAsset />} />
                    <Route path="/task/:id" element={<ViewTask />} />
                  </Routes>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <MainFooter />
      </div>
    </Router>
  );
}

export default HomeLogged;
