import React, { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import ModalMessage from "../ModalMessage/ModalMessage";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function UserCard (props) {
  const { t } = useTranslation();
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
    <Card className="profile-card-users-list">
      <Card.Body>
        <Row className="card-top-custom">
          <Col className="justify-content-center">
            <Card.Img
              variant="top"
              className="mt-1 ms-2 justify-content-center"
              style={{ width: "4rem" }}
              src={photoCard}
            />
          </Col>
          <Col style={{ width: "13rem", marginLeft: "-4rem", marginTop: "0.5rem"}}>
            <Card.Title
              className="card-title-profile-card"
              style={{ color: "var(--color-blue-02)", fontSize: "18px" }}
            >
              {`${firstName} ${lastName}`}
            </Card.Title>
            <Card.Text
              style={{ color: "var(--color-yellow-02)", fontWeight: "500" }}
            >
              {workplace}
            </Card.Text>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            {!visible === false ? (
              <Card.Text className="mt-4 profile-card-private-profile" style={{width: "7rem", fontSize: "15px"}}>Private profile</Card.Text>
            ) : (
              <Button variant="primary" onClick={viewProfile} className="mt-3 profile-card-view-profile" style={{width: "7rem"}}>
                View Profile
              </Button>
            )}
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={openMessageModal}
              className="mt-3 profile-card-send-message"
              style={{width: "7rem"}}
            >
              Message
            </Button>
          </Col>
        </Row>
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
