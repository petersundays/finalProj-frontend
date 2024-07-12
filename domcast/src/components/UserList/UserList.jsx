import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./UserList.css";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import UserCard from "../UserCard/UserCard";
import { Base_url_users } from "../../functions/UsersFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function UserList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const storeUsersList = userStore((state) => state.userList);
  const loggedUser = userStore((state) => state.loggedUser);
  const usersList = storeUsersList.filter((user) => user.id !== loggedUser.id);

  const [visibleRows, setVisibleRows] = useState(2);
  const [showMoreUsers, setShowMoreUsers] = useState(6);
  const visibleCards = usersList.slice(0, visibleRows * 3);

  useEffect(() => {
    fetchUsers();
  }
  , []);

  const fetchUsers = async () => {
    try {
      const urlUsers = Base_url_users;
      urlUsers.searchParams.append("workplace", 0);
      urlUsers.searchParams.append("orderBy", "lab");
      urlUsers.searchParams.append("orderAsc", "true");
      urlUsers.searchParams.append("pageSize", 100);
      urlUsers.searchParams.append("pageNumber", 1);

      const usersResponse = await fetch(urlUsers, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (usersResponse.ok) {
        const data = await usersResponse.json();
        userStore.setState({ userList: data });
      } else {
        console.log("Error fetching users");
      }
    }
    catch (error) {
      console.log("Error fetching users", error);
    }
  };
      

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
          <Button variant="primary" className="custom-show-more-btn my-2" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </Card>
  );
}

export default UserList;
