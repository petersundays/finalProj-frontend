import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeLogged.css";
import MainNavbaNotLogged from "../components/MainNavbaNotLogged/MainNavbaNotLogged";
import MainOffcanvasNotLogged from "../components/MainOffcanvasNotLogged/MainOffcanvasNotLogged";
import MainFooter from "../components/MainFooter/MainFooter";
import ProjectListNotLogged from "../components/ProjectListNotLogged/ProjectListNotLogged";

function Home() {
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
    <div className="div-not-logged">
      <MainNavbaNotLogged
        handleShow={handleShow}
        handleLanguageChange={handleLanguageChange}
        language={language}
      />
      <MainOffcanvasNotLogged
        show={show}
        handleClose={handleClose}
        expandedProjects={expandedProjects}
        toggleExpandProjects={toggleExpandProjects}
        handleLanguageChange={handleLanguageChange}
        language={language}
      />
      <Container fluid className="main-container">
        <Row className="flex-grow-1">
          <Col className="content">
            <ProjectListNotLogged />
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
}

export default Home;
