import React, { useState } from "react";
import { Form, Button, Row, Col, FloatingLabel, Dropdown, Badge, Container, InputGroup } from "react-bootstrap";
import "./NewUser.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultProfilePic from "../../multimedia/default-profile-pic.png";


const NewUser = () => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [privacy, setPrivacy] = useState("private");

  const handleAddSkill = () => {
    const skillInput = document.getElementById("skillInput").value;
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
    }
    document.getElementById("skillInput").value = "";
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddInterest = () => {
    const interestInput = document.getElementById("interestInput").value;
    if (interestInput && !interests.includes(interestInput)) {
      setInterests([...interests, interestInput]);
    }
    document.getElementById("interestInput").value = "";
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  return (
    <Container>
      <Form>
        <Row>
          {/* Coluna 1 */}
          <Col md={6}>
            <div className="text-center mb-3">
              <img src={defaultProfilePic} alt="Default Profile" className="img-fluid rounded-circle" width="150" />
              <Button variant="secondary" className="mt-2">Edit Profile Photo</Button>
            </div>
            <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
              <Form.Control type="text" placeholder="First Name" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
              <Form.Control type="text" placeholder="Last Name" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingNickname" label="Nickname" className="mb-3">
              <Form.Control type="text" placeholder="Nickname" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingLab" label="Lab" className="mb-3">
              <Form.Select>
                <option>Choose your Lab</option>
                <option>Coimbra</option>
                <option>Lisboa</option>
                <option>Porto</option>
                <option>Tomar</option>
                <option>Vila Real</option>
                <option>Viseu</option>
              </Form.Select>
            </FloatingLabel>
          </Col>

          {/* Coluna 2 */}
          <Col md={6}>

            <FloatingLabel controlId="floatingBio" label="Bio" className="mb-3">
              <Form.Control as="textarea" placeholder="Bio" style={{ height: '150px' }} />
            </FloatingLabel>

            <Form.Group className="mb-3">
              <Form.Label>Skills</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control type="text" placeholder="Type to search or add" id="skillInput" />
                <Dropdown>
                  <Dropdown.Toggle variant="secondary">Choose skill category</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Knowledge</Dropdown.Item>
                    <Dropdown.Item>Software</Dropdown.Item>
                    <Dropdown.Item>Hardware</Dropdown.Item>
                    <Dropdown.Item>Tools</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary" onClick={handleAddSkill}>Add</Button>
              </InputGroup>
              <div>
                {skills.map((skill, index) => (
                  <Badge pill bg="secondary" key={index} className="me-2">
                    {skill} <Button variant="light" size="sm" onClick={() => handleRemoveSkill(skill)}>x</Button>
                  </Badge>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Interests</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control type="text" placeholder="Type to search or add" id="interestInput" />
                <Dropdown>
                  <Dropdown.Toggle variant="secondary">Choose interest category</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Themes</Dropdown.Item>
                    <Dropdown.Item>Causes</Dropdown.Item>
                    <Dropdown.Item>Fields of Expertise</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary" onClick={handleAddInterest}>Add</Button>
              </InputGroup>
              <div>
                {interests.map((interest, index) => (
                  <Badge pill bg="secondary" key={index} className="me-2">
                    {interest} <Button variant="light" size="sm" onClick={() => handleRemoveInterest(interest)}>x</Button>
                  </Badge>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Privacy</Form.Label>
              <div className="d-flex">
                <Button variant={privacy === "private" ? "primary" : "secondary"} onClick={() => setPrivacy("private")} className="me-2">
                  Private
                </Button>
                <Button variant={privacy === "public" ? "primary" : "secondary"} onClick={() => setPrivacy("public")}>
                  Public
                </Button>
              </div>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">Save</Button>
            <Button variant="danger" className="w-100 mt-2">Cancel</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NewUser;
