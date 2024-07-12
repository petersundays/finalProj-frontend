import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./MainFooter.css";
import { NotificationWS } from "../../websockets/NotificationWS.jsx";

function MainFooter() {
  
  const {ws} = NotificationWS();

  useEffect(() => {
  }, [ws]);

  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container>
        <span>&copy; 2024 DomCast</span>
      </Container>
    </footer>
  );
}

export default MainFooter;
