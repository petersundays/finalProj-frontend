import React from "react";
import { Card, Button } from "react-bootstrap";
import "./UserCard.css";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

const UserCard = (id, profilePic, firstName, lastName, lab, visible) => {
  const navigate = useNavigate();

  const viewProfile = () => {
    navigate(`/user/view/${id}`);
  };

  const handleSendMessage = () => {
    // show modal message
};

  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={profilePic} />
        <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        <Card.Text>{lab}</Card.Text>
        {!visible === false ? (
          <Card.Text>This profile is private</Card.Text>
        ) : (
          <Button variant="primary" onClick={viewProfile} className="mt-3">
            View Profile
          </Button>
        )}
        <Button variant="primary" onClick={handleSendMessage} className="mt-3">
          Send Message
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
