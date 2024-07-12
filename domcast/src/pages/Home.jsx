import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import MainNavbaNotLogged from "../components/MainNavbaNotLogged/MainNavbaNotLogged";
import MainOffcanvasNotLogged from "../components/MainOffcanvasNotLogged/MainOffcanvasNotLogged";
import MainFooter from "../components/MainFooter/MainFooter";
import ProjectGlobalList from "../components/ProjectGlobalList/ProjectGlobalList";
import OthersBannerLogin from "../components/OthersBannerLogin/OthersBannerLogin";
import backgroundPic from "../multimedia/background-pic.png";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function Home() {
  const { t } = useTranslation();
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
    <div
      className="div-not-logged"
      style={{
        backgroundImage: `url(${backgroundPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "auto",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      <Container fluid className="main-container-not-logged">
        <Row className="row-banner">
          <Card className="banner mb-0 no-border-card">
            <OthersBannerLogin />
          </Card>
        </Row>
        <Row className="flex-grow-1">
          <Col className="content-not-logged">
            <ProjectGlobalList />
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
}

export default Home;
