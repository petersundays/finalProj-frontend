import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ModalMessage.css";
import { Base_url_projects } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore.jsx";
import { toast } from "react-toastify";
import { t } from "i18next";

function ModalReadMessage({ show, handleClose, message }) {

  const loggedUser = userStore((state) => state.loggedUser);

  const [dataInbox, setDataInbox] = userStore((state) => state.dataInbox);


  const handleAnswerInvitation = async (projectId, answer) => {

    await answerInvitation(projectId, answer);
    handleClose();
  
  };
  
  const answerInvitation = async (projectId, answer) => {
    
    const url = new URL(`${Base_url_projects}answer-invitation`);
    url.searchParams.append("projectId", projectId);
    url.searchParams.append("answer", answer);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (response.ok) {
        const success = await response.json();
        if (success) {
          dataInbox.find((msg) => msg.id === projectId).invitedTo = false;
          userStore.dataInbox.set(dataInbox);
          toast.success("Your answer has been sent");
        } else {
          toast.error("Error sending your answer");
        }
        
      } else {
        console.log("Error sending answer");
        toast.error("Error sending your answer");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending your answer");
    }
    
  };

return (
  message && (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton className="mt-2 p-4">
      <Modal.Title style={{ width: "100%", textAlign: "center" }}>
        <div>
        <h3 className="my-2" style={{ color: "var(--color-blue-03)" }}>
          {message.sender}
        </h3>
        <p className="my-2" style={{ color: "var(--color-blue-03)", fontSize: "small" }}>
          {message.date}
        </p>
        </div>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ textAlign: "center" }}>
      <div className="message-details" style={{ overflowWrap: 'break-word', maxWidth: '100%' }}>
        <h5 style={{ wordBreak: 'break-word' }}>Subject: {message.title}</h5>
        <p style={{ wordBreak: 'break-word' }}>Message: {message.message}</p>
      </div>
    </Modal.Body>
    <Modal.Footer className="justify-content-center">
      {message.invitedTo && 
        <>
          <Button
              variant="secondary"
              className="modal-message-cancel-btn mx-2"
              style={{ backgroundColor: "var(--color-blue-01)" }}
              onClick={() => handleAnswerInvitation(message.invitedTo, false)}
            >
            Reject
          </Button>
          <Button
              variant="secondary"
              className="modal-message-cancel-btn mx-2"
              style={{ backgroundColor: "var(--color-yellow-02)" }}
              onClick={() => handleAnswerInvitation(message.invitedTo, true)}
            >
            Accept
          </Button>
        </>
      }
      <Button
        variant="secondary"
        className="modal-message-cancel-btn mx-2"
        onClick={handleClose}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
));
}

export default ModalReadMessage;