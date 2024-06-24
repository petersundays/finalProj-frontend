import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeLogged.css";
import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import OffcanvasLogged from "../components/OffcanvasLogged/OffcanvasLogged";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import NewUser from "../components/NewUser/NewUser";
import EmailTable from "../components/EmailTable/EmailTable";
import AddAsset from "../components/AddAsset/AddAsset";
import CardGrid from "../components/CardGrid/CardGrid";
import NewProj from "../components/NewProj/NewProj";
import NewTask from "../components/NewTask/NewTask";

function HomeLogged() {
  const [show, setShow] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [Projects, setProjects] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleExpandProjects = () => setExpandedProjects(!expandedProjects);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
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
                {/* Render any component here */}
                <NewUser />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default HomeLogged;
