import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userStore } from "../../stores/UserStore";

function ProjectChat() {
  const { t } = useTranslation();
  const { id } = useParams();
  // a chat component that allows messages from several users
  return (
    <Card>
      <Card.Body>
        <Card.Title>Chat</Card.Title>
        <Card.Text>Chat with other users</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProjectChat;
