import React from "react";
import { Card, Button } from "react-bootstrap";
import "./UserList.css";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../UserCard/UserCard.jsx";

function UserList() {

  // set à store com a userList fetchada
  // passar para cada card os atributos que ele precisa nos props
  
  return (
    <div>
      UserList
    </div>
  );
}

export default UserList;