import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeLogged.css";
import NavbarNotLogged from "../components/NavbaNotLogged/NavbarNotLogged";
import OffcanvasNotLogged from "../components/OffcanvasNotLogged/OffcanvasNotLogged";
import FooterComponent from "../components/Footer/Footer";
import CardGridNotLogged from "../components/CardGridNotLogged/CardGridNotLogged";

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
    <div className="div-not-logged">
      <NavbarNotLogged
        handleShow={handleShow}
        handleLanguageChange={handleLanguageChange}
        language={language}
      />
      <OffcanvasNotLogged
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
            <CardGridNotLogged />
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default HomeLogged;
