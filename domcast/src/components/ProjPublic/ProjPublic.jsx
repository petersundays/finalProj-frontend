import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import './ProjPublic.css';

const ProjPublic = ({ title, lab, state, description, team, keywords, skills, onJoin }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{lab}</Card.Subtitle>
        <Card.Text>{state}</Card.Text>
        <Card.Text>{description}</Card.Text>
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
        <Button variant="primary" onClick={onJoin} className="mt-3">
          Join this project
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjPublic;
