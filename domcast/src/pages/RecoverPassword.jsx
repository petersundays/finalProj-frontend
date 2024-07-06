import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RecoverPassword.css";
import MainNavbaNotLogged from "../components/MainNavbaNotLogged/MainNavbaNotLogged";
import MainOffcanvasNotLogged from "../components/MainOffcanvasNotLogged/MainOffcanvasNotLogged";
import MainFooter from "../components/MainFooter/MainFooter";
import PassRecover from "../components/PassRecover/PassRecover";

function RecoverPassword() {
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
    <div className="div-recover-pass">
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
            <PassRecover />
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
}

export default RecoverPassword;
