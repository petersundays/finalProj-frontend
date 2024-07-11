import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./MessageHub.css";
import MessageHubSent from "../MessageHubSent/MessageHubSent";
import MessageHubInbox from "../MessageHubInbox/MessageHubInbox";
import { useTranslation } from "react-i18next";
import { Base_url_lab_messages } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore.jsx";

const MessageHub = () => {
  const loggedUser = userStore((state) => state.loggedUser);
  const { t } = useTranslation();
  const [showInbox, setShowInbox] = useState(true);

  const [dataSent, setDataSent] = useState([]);
  const [dataInbox, setDataInbox] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const sentResponse = await fetch(
        `${Base_url_lab_messages}personal-sent`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
        }
      );

      if (sentResponse.ok) {
        const sent = await sentResponse.json();
        const formattedSent = sent.map(item => ({
          receiver: `${item.receiver.firstName} ${item.receiver.lastName}`,
          title: item.subject,
          message: item.content,
          date: item.timestamp.split('T')[0]
        }));
        setDataSent(formattedSent);
        console.log("Sent messages: ", formattedSent);
      }
    } catch (error) {
      console.error("Error fetching sent messages", error);
    }

    try {
      const inboxResponse = await fetch(
        `${Base_url_lab_messages}personal-received`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
        }
      );

      if (inboxResponse.ok) {
        const inbox = await inboxResponse.json();
        const formattedInbox = inbox.map(item => ({
          sender: `${item.sender.firstName} ${item.sender.lastName}`,
          title: item.subject,
          message: item.content,
          date: item.timestamp.split('T')[0]
        }));
        setDataInbox(formattedInbox);
        console.log("Inbox messages: ", formattedInbox);
      }
    } catch (error) {
      console.error("Error fetching inbox messages", error);
    }
  };

  const handleInbox = () => {
    setShowInbox(true);
  };

  const handleSent = () => {
    setShowInbox(false);
  };

  return (
    <Card
      className="message-hub-card ms-lg-5"
      style={{ border: "none", maxWidth: "85rem", height: "100%" }}
    >
      <Row className="message-hub-row my-4">
        <Col style={{ width: "20rem", alignItems: "center", display: "flex" }}>
          <Button
            className={`message-hub-button ${showInbox ? "active" : ""}`}
            onClick={handleInbox}
          >
            Inbox
          </Button>
          <Button
            className={`message-hub-button ${!showInbox ? "active" : ""}`}
            onClick={handleSent}
          >
            Sent
          </Button>
        </Col>
      </Row>
      <Row>
        <Col style={{ border: "none", maxWidth: "85rem" }}>
          {showInbox ? (
            <MessageHubInbox data={dataInbox} />
          ) : (
            <MessageHubSent data={dataSent} />
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default MessageHub;
