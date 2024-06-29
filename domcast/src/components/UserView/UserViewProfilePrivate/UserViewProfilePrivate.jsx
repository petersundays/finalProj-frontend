import React from "react";
import { Card, Button } from "react-bootstrap";
import "./UserViewProfilePrivate.css";

const UserViewProfilePrivate = ({
  profilePic,
  firstName,
  lastName,
  nickname,
  lab,
}) => {
  const handleSendMessage = () => {
    console.log("Message sent");
  };

  return (
    <Card>
      <Card.Body>
ForgotPasswordModal        <Card.Img variant="top" src={profilePic} />
        <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        <Card.Text>{nickname}</Card.Text>
        <Card.Text>{lab}</Card.Text>
        <Card.Text>This profile is private</Card.Text>
        <Button variant="primary" onClick={handleSendMessage} className="mt-3">
          Send Message
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserViewProfilePrivate;
