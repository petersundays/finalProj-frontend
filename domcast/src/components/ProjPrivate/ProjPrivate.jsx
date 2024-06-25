import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import './ProjPrivate.css';

const ProjPrivate = ({ title, lab, state, description, startDate, duration, team, keywords, skills, assets, onEdit, onPlanner }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{lab}</Card.Subtitle>
        <Card.Text>{state}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Start Date: {startDate}</Card.Text>
        <Card.Text>Duration: {duration}</Card.Text>
        <div>
          <h6>Team:</h6>
          {team.map((member, index) => (
            <Badge key={index} pill bg="primary" className="me-1">
              {member}
            </Badge>
          ))}
        </div>
        <div>
          <h6>Keywords:</h6>
          {keywords.map((keyword, index) => (
            <Badge key={index} pill bg="secondary" className="me-1">
              {keyword}
            </Badge>
          ))}
        </div>
        <div>
          <h6>Skills:</h6>
          {skills.map((skill, index) => (
            <Badge key={index} pill bg="success" className="me-1">
              {skill}
            </Badge>
          ))}
        </div>
        <div>
          <h6>Assets:</h6>
          {assets.map((asset, index) => (
            <Badge key={index} pill bg="warning" className="me-1">
              {asset}
            </Badge>
          ))}
        </div>
        <Button variant="primary" onClick={onEdit} className="mt-3 me-2">
          Edit project infos
        </Button>
        <Button variant="secondary" onClick={onPlanner} className="mt-3">
          Planner
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjPrivate;
