import React from "react";
import { Container } from "react-bootstrap";
import "../Banner-login/bannerLogin.css";

function BannerLogin() {
  return (
    <div className="banner py-5 text-center">
      <Container>
        <h2>Welcome to Our Application!</h2>
        <h4>Join our team and start collaborating today!</h4>
      </Container>
    </div>
  );
}

export default BannerLogin;
