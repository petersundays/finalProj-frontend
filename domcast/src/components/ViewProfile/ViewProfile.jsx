import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import './ViewProfile.css';

const ViewProfile = ({ profilePic, firstName, lastName, nickname, lab, bio, skills, interests, privacy }) => {
    const handleSendMessage = () => {
        console.log('Message sent');
    };

    return (
        <Card>
        <Card.Body>
            <Card.Img variant="top" src={profilePic} />
            <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
            <Card.Text>{nickname}</Card.Text>
            <Card.Text>{lab}</Card.Text>
            <Card.Text>{bio}</Card.Text>
            <Card.Text>Privacy: {privacy}</Card.Text>
            <div>
            <h6>Skills:</h6>
            {skills.map((skill, index) => (
                <Badge key={index} pill bg="primary" className="me-1">
                {skill.name}
                </Badge>
            ))}
            </div>
            <div>
            <h6>Interests:</h6>
            {interests.map((interest, index) => (
                <Badge key={index} pill bg="secondary" className="me-1">
                {interest.name}
                </Badge>
            ))}
            </div>
            <Button variant="primary" onClick={handleSendMessage} className="mt-3">
            Send Message
            </Button>
        </Card.Body>
        </Card>
    );
}

export default ViewProfile;