import React, { useEffect, useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import "./ModalMessage.css";
import { userStore } from "../../stores/UserStore.jsx";

function ModalReadMessage({ id, show, handleClose, message }) {

  /* const [message, setMessage] = useState(null);
  const dataInbox = userStore((state) => state.dataInbox);
 */
/*   useEffect(() => {
    
    const foundMessage = dataInbox.find((msg) => msg.id === id);
    setMessage(foundMessage);

  }, [id, dataInbox]); */

console.log("message in modal ", message);
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