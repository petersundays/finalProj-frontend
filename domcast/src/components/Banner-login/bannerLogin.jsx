import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Banner-login/bannerLogin.css';
import banner from "../../multimedia/banner-login.jpg";

function BannerLogin() {
  return (
    <Container fluid className="banner py-5 mt-5 rounded">
      <Row>
        <Col xs={12} md={8} className="mx-5">
          <h1 className="mb-3 text-white">Header Text</h1>
          <h3 className="mb-3 text-white">Subheader Text</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default BannerLogin;