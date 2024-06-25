import React from "react";
import { Card, Button } from "react-bootstrap";
import "./OthersProjCardLogged.css";

const OthersProjCardLogged = ({ title, lab, description, members, state, link }) => {
  return (
    <Card className="mb-4 projcard-logged" style={{ width: "22rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{lab}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="h6">Members: {members}</h6>
          </div>
          <div>
            <h6 className="h6">State: {state}</h6>
          </div>
        </div>
        <Button href={link} variant="primary" className="mt-3">
          More info »
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OthersProjCardLogged;
