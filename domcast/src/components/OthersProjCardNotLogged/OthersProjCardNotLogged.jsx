import React from "react";
import { Card, Button } from "react-bootstrap";
import "./OthersProjCardNotLogged.css";

const OthersProjCardNotLogged = ({ title, lab, description, state, link }) => {
  return (
    <Card className="mb-4 projcard-logged" style={{ width: "22rem" }}>
      <Card.Header
        style={{
          backgroundColor: "var(--color-yellow-01)",
          color: "var(--color-coal)",
          verticalAlign: "middle",
          height: "2.5rem",
        }}
      >
        <Card.Title       className="card-title-custom"
        >{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle
          className="mb-2"
          style={{ color: "var(--color-blue-01)" }}
        >
          {lab}
        </Card.Subtitle>
        <Card.Text
          style={{
            height: "3rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {description}
        </Card.Text>
        <div className="my-2 me-2 d-flex justify-content-between align-items-center">
          <div style={{ color: "var(--color-blue-03)" }}>
            <h6 className="h6">State: {state}</h6>
          </div>

          <Button href={link} variant="primary" className="custom-button">
            More info »
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OthersProjCardNotLogged;
