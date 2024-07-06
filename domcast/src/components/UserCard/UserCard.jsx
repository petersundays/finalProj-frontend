import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import ModalMessage from "../ModalMessage/ModalMessage";

const UserCard = (props) => {
  const { id, photo, firstName, lastName, workplace, visible } = props;
  const navigate = useNavigate();
  
  const photoCard = photo ? photo : defaultProfilePic;
  const [showMessageModal, setShowMessageModal] = useState(false);

  const viewProfile = () => {
    navigate(`/domcast/user/view/${id}`);
  };

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
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
        <Button variant="primary" onClick={openMessageModal} className="mt-3">
          Send Message
        </Button>
      </Card.Body>
      <ModalMessage
        id={id}
        show={showMessageModal}
        handleClose={closeMessageModal}
      />
    </Card>
  );
};

export default UserCard;
