import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeLogged.css";
import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import OffcanvasLogged from "../components/OffcanvasLogged/OffcanvasLogged";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import EmailTable from "../components/EmailTable/EmailTable";
import AddAsset from "../components/AddAsset/AddAsset";
import CardGrid from "../components/CardGrid/CardGrid";
import NewProj from "../components/NewProj/NewProj";
import NewTask from "../components/NewTask/NewTask";
import AdminSettings from "../components/AdminSettings/AdminSettings";
import EditAsset from "../components/EditAsset/EditAsset";
import EditProj from "../components/EditProj/EditProj";
import EditTask from "../components/EditTask/EditTask";
import EditProfile from "../components/EditProfile/EditProfile";
import GanttChart from "../components/GanttChart/GanttChart";
import ProjPublic from "../components/ProjPublic/ProjPublic";
import ProjPrivate from "../components/ProjPrivate/ProjPrivate";
import AdminStats from "../components/AdminStats/AdminStats";
//import UsersList from "../components/UsersList/UsersList";
import ViewProfile from "../components/ViewProfile/ViewProfile";
import ViewAsset from "../components/ViewAsset/ViewAsset";
import ViewTask from "../components/ViewTask/ViewTask";

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
        <NavbarLogged
          handleShow={handleShow}
          handleLanguageChange={handleLanguageChange}
          language={language}
        />
        <OffcanvasLogged
          show={show}
          handleClose={handleClose}
          expandedProjects={expandedProjects}
          toggleExpandProjects={toggleExpandProjects}
          handleLanguageChange={handleLanguageChange}
          language={language}
        />
        <Container fluid className="main-container">
          <Row className="flex-grow-1">
            <Sidebar
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
                    <Route path="/message-hub" element={<EmailTable />} />
                    <Route path="/add-asset" element={<AddAsset />} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default HomeLogged;
