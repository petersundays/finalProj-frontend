import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./MainFooter.css";
import { NotificationWS } from "../../websockets/NotificationWS.jsx";
import { userStore } from "../../stores/UserStore.jsx";
import { use } from "i18next";
import { Base_url_messages } from "../../functions/UsersFunctions.jsx";

function MainFooter() {
  const loggedUser = userStore((state) => state.loggedUser);
  const unreadMessages = userStore((state) => state.unreadMessages);
  const setUnreadMessages = userStore((state) => state.setUnreadMessages);
  
  const {ws} = NotificationWS();

  useEffect(() => {

  }, [ws, unreadMessages]);

  useEffect(() => {
      const handleUnread = async () => {
        await countUnread();
      }

      handleUnread();
  }, []);

  const countUnread = async () => {
    const url = new URL(`${Base_url_messages}/count-personal-unread`);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (response.ok) {
        const unread = await response.json();
        setUnreadMessages(unread);
        
      } else {
        console.log("Error marking message as read");
      }
    } catch (error) {
      console.error("Error fetching sent messages", error);
    }
    
  };
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container>
        <span>&copy; 2024 DomCast</span>
      </Container>
    </footer>
  );
}

export default MainFooter;
