import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./MessageHub.css";
import MessageHubSent from "../MessageHubSent/MessageHubSent";
import MessageHubInbox from "../MessageHubInbox/MessageHubInbox";
import { useTranslation } from "react-i18next";
import { Base_url_messages } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore.jsx";
import { PersonalMessageWS } from "../../websockets/PersonalMessageWS.jsx";

const MessageHub = () => {
  const loggedUser = userStore((state) => state.loggedUser);
  const { t } = useTranslation();
  const [showInbox, setShowInbox] = useState(true);

  const inboxDataFromStore = userStore((state) => state.dataInbox);

  const [dataSent, setDataSent] = useState([]);
  const [dataInbox, setDataInbox] = useState(inboxDataFromStore);

  const { ws } = PersonalMessageWS();

  const { prependToDataInbox, messageReceived } = userStore((state) => ({
    prependToDataInbox: state.prependToDataInbox,
    messageReceived: state.messageReceived,
  }));

  useEffect(() => {
    if (messageReceived) {
      const newMessage = {
        sender: `${messageReceived.sender.firstName} ${messageReceived.sender.lastName}`,
        title: messageReceived.subject,
        message: messageReceived.content,
        date: `${messageReceived.timestamp.split("T")[0]} ${messageReceived.timestamp.split("T")[1].split(":")[0]}:${messageReceived.timestamp.split("T")[1].split(":")[1]}`,
      };
      newMessage.id = messageReceived.id;
      userStore.getState().prependToDataInbox(newMessage);

    }
  }, [messageReceived]);

  useEffect(() => {
    const unsubscribe = userStore.subscribe((state) => {
      setDataInbox(state.dataInbox);
    }, (state) => state.dataInbox);
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const sentResponse = await fetch(`${Base_url_messages}/personal-sent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (sentResponse.ok) {
        const sent = await sentResponse.json();
        const formattedSent = sent.map((item) => ({
          receiver: `${item.receiver.firstName} ${item.receiver.lastName}`,
          title: item.subject,
          message: item.content,
          date: `${item.timestamp.split("T")[0]} , ${item.timestamp.split("T")[1].split(":")[0]}:${item.timestamp.split("T")[1].split(":")[1]}`,
        }));
        setDataSent(formattedSent);
        console.log("Sent messages: ", formattedSent);
      }
    } catch (error) {
      console.error("Error fetching sent messages", error);
    }

    try {
      const inboxResponse = await fetch(
        `${Base_url_messages}/personal-received`,
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
        const formattedInbox = inbox.map((item) => ({
          sender: `${item.sender.firstName} ${item.sender.lastName}`,
          title: item.subject,
          message: item.content,
          date: `${item.timestamp.split("T")[0]} , ${item.timestamp.split("T")[1].split(":")[0]}:${item.timestamp.split("T")[1].split(":")[1]}`,
        }));
        setDataInbox(formattedInbox);
        console.log("Inbox messages: ", formattedInbox);

        userStore.getState().setDataInbox(formattedInbox);      }
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
