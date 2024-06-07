import React from "react";
import { Card, Button} from "react-bootstrap";
import "./ProjCardLogged.css";

const ProjCardLogged = ({ title, subtitle, description, link }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="h6">Members</h6>
          </div>
          <div>
            <h6 className="h6">State</h6>
          </div>
        </div>
        <Button href={link} variant="primary" className="mt-3">
          More info...
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjCardLogged;
