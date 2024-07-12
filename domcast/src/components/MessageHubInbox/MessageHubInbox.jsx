import React, { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import "../MessageHub/MessageHub.css";
import { useTranslation } from "react-i18next";
import ModalReadMessage from "../ModalReadMessage/ModalReadMessage";
import { Base_url_messages } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore.jsx";

const MessageHubInbox = ({ data }) => {
  const loggedUser = userStore((state) => state.loggedUser);

  const { t } = useTranslation();
  const [visibleRows, setVisibleRows] = useState(10);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [message, setMessage] = useState(null);

  const todayDate = new Date().toISOString().split("T");
  const today = todayDate[0];

  const markReadAndShowMessage = async (id) => {
    await markAsRead(id);
    openMessageModal(id);
  };

  const openMessageModal = (id) => {
    setMessageId(id);
    const foundMessage = data.find((msg) => msg.id === id);
    setMessage(foundMessage);
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setMessageId(0);
    setMessage(null);
    setShowMessageModal(false);
  };

  const handleShowMore = () => {
    setVisibleRows((prev) => Math.min(prev + 10, data.length));
  };


  const markAsRead = async (id) => {
    const url = new URL(`${Base_url_messages}/mark-personal-read`);
    url.searchParams.append("message", id);
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
        const read = await response.json();
        data.find((msg) => msg.id === id).read = read;
        setMessage({ ...message, read: read });
        
      } else {
        console.log("Error marking message as read");
      }
    } catch (error) {
      console.error("Error fetching sent messages", error);
    }
    
  };


  return (
    <Card className="message-hub-card mt-2 mb-4" style={{ border: "none" }}>
      <Table className="message-hub-table">
        <thead>
          <tr>
            <th className="message-hub-header">From</th>
            <th className="message-hub-header">Title</th>
            <th className="message-hub-header">Message</th>
            <th className="message-hub-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, visibleRows).map((item, index) => (
            <tr key={index} className="message-hub-row" onClick={() => markReadAndShowMessage(item.id)}>
              <td
                className="message-hub-cell" 
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: item.read === false ? "bold" : "normal",
                }}
              >
                {item.sender}
              </td>
              <td
                className="message-hub-cell"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: item.read === false ? "bold" : "normal",
                }}
              >
                {item.title}
              </td>
              <td
                className="message-hub-cell"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: item.read === false ? "bold" : "normal",
                }}
              >
                {item.message}
              </td>
              <td 
                className="message-hub-cell"
                style={{
                  fontWeight: item.read === false ? "bold" : "normal", 
                }}
                >
                {item.date}
                </td>
              
            </tr>
          ))}
        </tbody>
      </Table>
      {visibleRows < data.length && (
        <div className="d-flex justify-content-center mb-3">
          <Button
            className="custom-show-more-btn mt-2"
            onClick={handleShowMore}
            style={{
              backgroundColor: "var(--color-blue-03)",
              borderColor: "var(--color-blue-03)",
              color: "var(--color-white)",
              fontWeight: "500",
            }}
          >
            Show More
          </Button>
        </div>
      )}
      <ModalReadMessage show={showMessageModal} handleClose={closeMessageModal} message = {message}/>
    </Card>
  );
};

export default MessageHubInbox;
