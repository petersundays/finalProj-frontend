import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import './TaskView.css';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function TaskView ({ title, description, state, owner, startDate, endDate, dependsOn, prerequisiteFor, stakeholders, onEdit }) {
  const { t } = useTranslation();

  
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{state}</Card.Text>
        <Card.Text>Owner: {owner}</Card.Text>
        <Card.Text>Start Date: {startDate}</Card.Text>
        <Card.Text>End Date: {endDate}</Card.Text>
        <div>
          <h6>Depends On:</h6>
          {dependsOn.map((task, index) => (
            <Badge key={index} pill bg="primary" className="me-1">
              {task}
            </Badge>
          ))}
        </div>
        <div>
          <h6>Is Prerequisite For:</h6>
          {prerequisiteFor.map((task, index) => (
            <Badge key={index} pill bg="secondary" className="me-1">
              {task}
            </Badge>
          ))}
        </div>
        <div>
          <h6>Other Stakeholders:</h6>
          {stakeholders.map((stakeholder, index) => (
            <Badge key={index} pill bg="success" className="me-1">
              {stakeholder}
            </Badge>
          ))}
        </div>
        <Button variant="primary" onClick={onEdit} className="mt-3">
          Edit Task
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TaskView;
