import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import "./ModalMessage.css";
import { userStore } from "../../stores/UserStore.jsx";
import { Base_url_messages } from "../../functions/UsersFunctions.jsx";

function ModalMessage({ id, show, handleClose }) {
  const loggedUser = userStore((state) => state.loggedUser);
  const storeUserList = userStore((state) => state.userList);
  const otherUser = storeUserList.find((user) => user.id === id);
  const otherUserName = otherUser.firstName + " " + otherUser.lastName;

  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");

  const handleSend = async (event) => {
    event.preventDefault();
    const message = {
      subject: subject,
      content: messageText,
    };

    try {
      const urlMessages = new URL(Base_url_messages);
      urlMessages.searchParams.append("receiver", id); 
      const response = await fetch(urlMessages, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
        body: JSON.stringify(message),
      });
      if (response.ok) {
        console.log("Message sent");
        handleClose();
      } else {
        console.log("Message failed to send");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="mt-2 p-4">
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          <h3 className="my-2" style={{ color: "var(--color-blue-03" }}>
            {otherUserName}
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <Form>
          <Form.Group className="mb-3 mx-5" controlId="message">
            <FloatingLabel controlId="floatingSubjectId" label="Subject" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Subject"
                style={{
                  width: "23rem",
                  resize: "none",
                  overflow: "auto",
                  border: "1px solid var(--color-blue-01)",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingMessageId" label="Message" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Message"
                style={{
                  width: "23rem",
                  height: "20rem",
                  resize: "none",
                  overflow: "auto",
                  border: "1px solid var(--color-blue-01)",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => {
                  setMessageText(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          variant="secondary"
          className="modal-message-cancel-btn mx-2"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="modal-message-send-btn mx-2"
          onClick={handleSend}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMessage;
