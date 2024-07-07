import React, { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import "../MessageHub/MessageHub.css";

const MessageHubInbox = ({ data }) => {
  const [visibleRows, setVisibleRows] = useState(10);

  const handleShowMore = () => {
    setVisibleRows((prev) => Math.min(prev + 10, data.length));
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
            <tr key={index} className="message-hub-row">
              <td className="message-hub-cell">{item.sender}</td>
              <td className="message-hub-cell">{item.title}</td>
              <td className="message-hub-cell">{item.message}</td>
              <td className="message-hub-cell">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {visibleRows < data.length && (
        <div className="d-flex justify-content-center mb-3">
          <Button className="message-hub-button mt-2" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MessageHubInbox;
