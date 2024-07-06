import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";


const UserCard = (props) => {
  const {
    id,
    photo,
    firstName,
    lastName,
    workplace,
    visible
  } = props;
  console.log("UserCard props:", { id, photo, firstName, lastName, workplace, visible });

  const navigate = useNavigate();

const photoCard = photo ? photo : defaultProfilePic;

  const viewProfile = () => {
    navigate(`/user/view/${id}`);
  };

  const handleSendMessage = () => {
    // show modal message
};

  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={photoCard} />
        <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
        <Card.Text>{workplace}</Card.Text>
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
