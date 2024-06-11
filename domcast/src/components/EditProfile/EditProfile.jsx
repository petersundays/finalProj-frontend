import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  FormSelect,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditProfile.css";
import { Typeahead } from "react-bootstrap-typeahead";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";

const EditProfile = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nickname: "",
    lab: "",
    bio: "",
    skills: [],
    interests: [],
    privacy: "private",
  });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [privacy, setPrivacy] = useState("private");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = (selected) => {
    if (selected.length > 0) {
      const category = document.getElementById("skills-category").value;
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: selected[0], category }],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddInterest = (selected) => {
    if (selected.length > 0) {
      const category = document.getElementById("interests-category").value;
      setFormData({
        ...formData,
        interests: [...formData.interests, { name: selected[0], category }],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <div className="text-center mb-3">
            <img
              src={defaultProfilePic}
              alt="Default Profile"
              className="img-fluid rounded-circle"
              width="150"
            />
            <Button variant="secondary" className="mt-2">
              Edit Profile Photo
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FloatingLabel
            controlId="floatingFirstName"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingLastName"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </FloatingLabel>
          <span className="d-block mb-3">Email: email@email.com</span>
          <FloatingLabel
            controlId="floatingNickname"
            label="Nickname"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Nickname"
            />
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
        <Col md={6}>
          <FloatingLabel controlId="floatingBio" label="Bio" className="mb-3">
            <Form.Control
              as="textarea"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              style={{ resize: "none" }}
              placeholder="Bio"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSkills"
            label="Skills"
            className="mb-3"
          >
            <Typeahead
              id="skills-search"
              onChange={handleAddSkill}
              options={[]}
              placeholder="Search for skill..."
            />
            <FormSelect id="skills-category" className="mt-2">
              <option>Choose a category</option>
              <option>Knowledge</option>
              <option>Software</option>
              <option>Hardware</option>
              <option>Tools</option>
            </FormSelect>
            <Button
              variant="primary"
              onClick={() => handleAddSkill([{ name: newSkill }])}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.skills &&
              formData.skills.map((skill, index) => (
                <Badge key={index} pill bg="primary" className="me-1">
                  {skill.name}{" "}
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    x
                  </Button>
                </Badge>
              ))}
          </div>
          <FloatingLabel
            controlId="floatingInterests"
            label="Interests"
            className="mb-3"
          >
            <Typeahead
              id="interests-search"
              onChange={handleChange}
              options={[]}
              placeholder="Search for interest..."
            />
            <FormSelect id="interests-category" className="mt-2">
              <option>Choose a category</option>
              <option>Themes</option>
              <option>Causes</option>
              <option>Fields of Expertise</option>
            </FormSelect>
            <Button
              variant="primary"
              onClick={() => handleAddInterest([{ name: newInterest }])}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.interests &&
              formData.interests.map((interest, index) => (
                <Badge key={index} pill bg="primary" className="me-1">
                  {interest.name}{" "}
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleRemoveInterest(interest)}
                  >
                    x
                  </Button>
                </Badge>
              ))}
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Privacy</Form.Label>
            <div className="d-flex">
              <Button
                variant={privacy === "private" ? "primary" : "secondary"}
                onClick={() => setPrivacy("private")}
                className="me-2"
              >
                Private
              </Button>
              <Button
                variant={privacy === "public" ? "primary" : "secondary"}
                onClick={() => setPrivacy("public")}
              >
                Public
              </Button>
            </div>
          </Form.Group>
          <Button variant="primary" onClick={handleSave} className="me-2">
            Edit profile
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
