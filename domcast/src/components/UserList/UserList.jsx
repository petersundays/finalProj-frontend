import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./UserList.css";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import UserCard from "../UserCard/UserCard";

function UserList() {
  const navigate = useNavigate();
  const storeUsersList = userStore((state) => state.userList);
  const loggedUser = userStore((state) => state.loggedUser);
  const usersList = storeUsersList.filter((user) => user.id !== loggedUser.id);

  const [visibleRows, setVisibleRows] = useState(2);
  const [showMoreUsers, setShowMoreUsers] = useState(6);
  const visibleCards = usersList.slice(0, visibleRows * 3);

  console.log("usersList:", usersList);
  console.log("visibleCards:", visibleCards);
  console.log("Sample user:", usersList[0]);

  const handleShowMore = () => {
    setShowMoreUsers((prev) => prev + 6);
    setVisibleRows(visibleRows + 2);
  };

  return (
    <Card
      className="mt-2 card-users-list"
      style={{ border: "none", maxWidth: "100rem" }}
    >
      <Row className="mt-2 justify-content-center">
        {visibleCards.map((card, index) => {
          console.log("Card object before spread:", card); // Debugging statement
          return (
            <Col key={index} className="my-3 mx-0">
              <UserCard key={card.id} {...card} />
            </Col>
          );
        })}
      </Row>
      {visibleCards.length < usersList.length && (
        <div className="text-center">
          <Button variant="primary" onClick={handleShowMore} className="mt-3">
            Show More
          </Button>
        </div>
      )}
    </Card>
  );
}

export default UserList;
