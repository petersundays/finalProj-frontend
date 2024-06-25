import React from "react";
import { Card, Button } from "react-bootstrap";
import "./ViewAsset.css";

const ViewAsset = ({
  name,
  description,
  partNumber,
  brand,
  supplier,
  supplierContact,
  quantity,
  notes,
  onEdit,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{partNumber}</Card.Text>
        <Card.Text>{brand}</Card.Text>
        <Card.Text>{supplier}</Card.Text>
        <Card.Text>{supplierContact}</Card.Text>
        <Card.Text>{quantity}</Card.Text>
        <Card.Text>{notes}</Card.Text>
        <Button variant="primary" onClick={onEdit} className="mt-3">
          Edit Asset
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ViewAsset;
