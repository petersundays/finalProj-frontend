import React from "react";
import { Container } from "react-bootstrap";
import "../Banner-login/bannerLogin.css";

function BannerLogin() {
  return (
    <div className="banner py-5 text-center">
      <Container>
        <h2>Welcome to your creative playground!</h2>
        <h4>Your ideas... Endless possibilities!</h4>
      </Container>
    </div>
  );
}

export default BannerLogin;
