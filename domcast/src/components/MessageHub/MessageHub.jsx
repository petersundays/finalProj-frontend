import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./MessageHub.css";
import MessageHubSent from "../MessageHubSent/MessageHubSent";
import MessageHubInbox from "../MessageHubInbox/MessageHubInbox";

const MessageHub = () => {
  const [showInbox, setShowInbox] = useState(true);

  const dataInbox = [
    {
      sender: "Sender 1",
      title: "Title 1",
      message: "Message 1",
      date: "2022-01-01",
    },
    {
      sender: "Sender 2",
      title: "Title 2",
      message: "Message 2",
      date: "2022-01-02",
    },
    {
      sender: "Sender 3",
      title: "Title 3",
      message: "Message 3",
      date: "2022-01-03",
    },
    {
      sender: "Sender 4",
      title: "Title 4",
      message: "Message 4",
      date: "2022-01-04",
    },
    {
      sender: "Sender 5",
      title: "Title 5",
      message: "Message 5",
      date: "2022-01-05",
    },
    {
      sender: "Sender 6",
      title: "Title 6",
      message: "Message 6",
      date: "2022-01-06",
    },
    {
      sender: "Sender 7",
      title: "Title 7",
      message: "Message 7",
      date: "2022-01-07",
    },
    {
      sender: "Sender 8",
      title: "Title 8",
      message: "Message 8",
      date: "2022-01-08",
    },
    {
      sender: "Sender 9",
      title: "Title 9",
      message: "Message 9",
      date: "2022-01-09",
    },
    {
      sender: "Sender 10",
      title: "Title 10",
      message: "Message 10",
      date: "2022-01-10",
    },
  ];

  const dataSent = [
    {
      receiver: "Receiver 1",
      title: "Title 1",
      message: "Message 1",
      date: "2022-01-01",
    },
    {
      receiver: "Receiver 2",
      title: "Title 2",
      message: "Message 2",
      date: "2022-01-02",
    },
    {
      receiver: "Receiver 3",
      title: "Title 3",
      message: "Message 3",
      date: "2022-01-03",
    },
    {
      receiver: "Receiver 4",
      title: "Title 4",
      message: "Message 4",
      date: "2022-01-04",
    },
    {
      receiver: "Receiver 5",
      title: "Title 5",
      message: "Message 5",
      date: "2022-01-05",
    },
    {
      receiver: "Receiver 6",
      title: "Title 6",
      message: "Message 6",
      date: "2022-01-06",
    },
    {
      receiver: "Receiver 7",
      title: "Title 7",
      message: "Message 7",
      date: "2022-01-07",
    },
    {
      receiver: "Receiver 8",
      title: "Title 8",
      message: "Message 8",
      date: "2022-01-08",
    },
    {
      receiver: "Receiver 9",
      title: "Title 9",
      message: "Message 9",
      date: "2022-01-09",
    },
    {
      receiver: "Receiver 10",
      title: "Title 10",
      message: "Message 10",
      date: "2022-01-10",
    },
    {
      receiver: "Receiver 11",
      title: "Title 11",
      message: "Message 11",
      date: "2022-01-11",
    },
    {
      receiver: "Receiver 12",
      title: "Title 12",
      message: "Message 12",
      date: "2022-01-12",
    },
    {
      receiver: "Receiver 13",
      title: "Title 13",
      message: "Message 13",
      date: "2022-01-13",
    },
    {
      receiver: "Receiver 14",
      title: "Title 14",
      message: "Message 14",
      date: "2022-01-14",
    },
    {
      receiver: "Receiver 15",
      title: "Title 15",
      message: "Message 15",
      date: "2022-01-15",
    },
    {
      receiver: "Receiver 16",
      title: "Title 16",
      message: "Message 16",
      date: "2022-01-16",
    },
    {
      receiver: "Receiver 17",
      title: "Title 17",
      message: "Message 17",
      date: "2022-01-17",
    },
    {
      receiver: "Receiver 18",
      title: "Title 18",
      message: "Message 18",
      date: "2022-01-18",
    },
    {
      receiver: "Receiver 19",
      title: "Title 19",
      message: "Message 19",
      date: "2022-01-19",
    },
    {
      receiver: "Receiver 20",
      title: "Title 20",
      message: "Message 20",
      date: "2022-01-20",
    },
  ];

  const handleInbox = () => {
    setShowInbox(true);
  };

  const handleSent = () => {
    setShowInbox(false);
  };

  return (
    <Card
      className="message-hub-card ms-5"
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
