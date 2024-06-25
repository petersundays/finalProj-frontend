import React from "react";
import { Container } from "react-bootstrap";
import "./MainFooter.css";

function MainFooter() {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container>
        <span>&copy; 2024 DomCast</span>
      </Container>
    </footer>
  );
}

export default MainFooter;
