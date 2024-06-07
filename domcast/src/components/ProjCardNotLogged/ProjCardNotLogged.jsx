import React from "react";
import { Card, Button} from "react-bootstrap";
import "./ProjCardNotLogged.css";

const ProjCardNotLogged = ({ title, subtitle, description, link }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Button href={link} variant="primary" className="mt-3">
          More info...
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjCardNotLogged;