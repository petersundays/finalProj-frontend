import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Dropdown,
  Badge,
  Container,
  InputGroup,
  Card,
} from "react-bootstrap";
import "./NewUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";

const NewUser = () => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [privacy, setPrivacy] = useState("private");
  const [step, setStep] = useState(1);

  const handleAddSkill = () => {
    const skillInput = document.getElementById("skillInput").value;
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
    }
    document.getElementById("skillInput").value = "";
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddInterest = () => {
    const interestInput = document.getElementById("interestInput").value;
    if (interestInput && !interests.includes(interestInput)) {
      setInterests([...interests, interestInput]);
    }
    document.getElementById("interestInput").value = "";
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center my-3 p-3">
            <div>
              <img
                src={defaultProfilePic}
                alt="Default Profile"
                className="img-fluid rounded-circle profile-pic-new-user"
              />
            </div>
            <div>
              <Button className="mt-4 edit-profile-btn">
                Edit Profile Photo
              </Button>
            </div>
            <FloatingLabel
              controlId="floatingNickname"
              label="Nickname"
              className="mb-3 floating-label-custom fl-nickname"
            >
              <Form.Control type="text" placeholder="Nickname" />
            </FloatingLabel>
          </div>
        );
      case 2:
        return (
          <Row className="row-step2-new-user">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingFirstName"
                label="First Name *"
                className="mb-3 floating-label-custom"
              >
                <Form.Control type="text" placeholder="First Name" required />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingLastName"
                label="Last Name *"
                className="mb-3 floating-label-custom"
              >
                <Form.Control type="text" placeholder="Last Name" required />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingLab"
                label="Lab *"
                className="mb-3 floating-label-custom"
              >
                <Form.Select required className="options-dd-lab-new-user">
                  <option disabled>Choose your Lab</option>
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
              <FloatingLabel
                controlId="floatingBio"
                label="Bio"
                className="mb-3 floating-label-custom"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Bio"
                  style={{ height: "200px" }}
                  className="bio-textarea"
                />
              </FloatingLabel>
            </Col>
            <span className="d-block mt-3 mb-5 ms-2">* Required fields</span>
          </Row>
        );
      case 3:
        return (
          <>
            <Form.Group className="mb-3 dropdowns-step3">
              <InputGroup className="mb-3">
                <FloatingLabel
                  controlId="floatingSkillInput"
                  label="Skills - type to search or add"
                  className="floating-label-custom me-5 skills-input-new-user"
                >
                  <Form.Control
                    type="text"
                    placeholder="Type to search or add"
                    id="skillInput"
                  />
                </FloatingLabel>
                <Dropdown className="me-2 dropdown-skills-new-user">
                  <Dropdown.Toggle variant="secondary dropdown-toggle-skills-new-user me-5">
                    Choose skill category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="dropdown-item-default">
                      Knowledge
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item-default">
                      Software
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item-default">
                      Hardware
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item-default">
                      Tools
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className="add-btn add-btn-skills-new-user mx-2"
                  onClick={handleAddSkill}
                >
                  Add
                </Button>
              </InputGroup>
              <div>
                {skills.map((skill, index) => (
                  <Badge pill bg="secondary" key={index} className="me-2">
                    {skill}{" "}
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
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup className="mb-3">
                <FloatingLabel
                  controlId="floatingInterestInput"
                  label="Interests - type to search or add"
                  className="floating-label-custom me-5 interests-input-new-user"
                >
                  <Form.Control
                    type="text"
                    placeholder="Type to search or add"
                    id="interestInput"
                  />
                </FloatingLabel>
                <Dropdown className="me-2 dropdown-interests-new-user">
                  <Dropdown.Toggle variant="secondary dropdown-toggle-interests-new-user me-5">
                    Choose interest category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="dropdown-item-default">
                      Themes
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item-default">
                      Causes
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item-default">
                      Fields of Expertise
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className="add-btn add-btn-interests-new-user mx-2"
                  onClick={handleAddInterest}
                >
                  Add
                </Button>
              </InputGroup>
              <div>
                {interests.map((interest, index) => (
                  <Badge pill bg="secondary" key={index} className="me-2">
                    {interest}{" "}
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
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Privacy</Form.Label>
              <div className="d-flex">
                <Button
                  variant={privacy === "private" ? "primary" : "secondary"}
                  onClick={() => setPrivacy("private")}
                  className="me-2 nav-btn privacy-btn-new-user"
                >
                  Private
                </Button>
                <Button
                  variant={privacy === "public" ? "primary" : "secondary"}
                  onClick={() => setPrivacy("public")}
                  className="nav-btn privacy-btn-new-user"
                >
                  Public
                </Button>
              </div>
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  const renderProgress = () => {
    return (
      <div className="progress-container">
        <div
          className={`step-label ${step === 1 ? "active" : ""}`}
          onClick={() => goToStep(1)}
        >
          Step 1
        </div>
        <div
          className={`step-label ${step === 2 ? "active" : ""}`}
          onClick={() => goToStep(2)}
        >
          Step 2
        </div>
        <div
          className={`step-label ${step === 3 ? "active" : ""}`}
          onClick={() => goToStep(3)}
        >
          Step 3
        </div>
      </div>
    );
  };

  return (
    <Container
      className="d-flex flex-column justify-content-between"
      style={{ height: "100%" }}
    >
      <Form>
        <Row>
          <Col md={12}>{renderStep()}</Col>
        </Row>
      </Form>
      <div className="mt-3">
        <Row className="row-bottom w-100 justify-content-between">
          {step > 1 && (
            <Col xs="auto">
              <Button onClick={prevStep} className="nav-btn nav-btn-prev">
                « Previous
              </Button>
            </Col>
          )}
          <Col>
            <div className="progress-bar-custom">{renderProgress()}</div>
          </Col>
          {step < 3 && (
            <Col xs="auto">
              <Button onClick={nextStep} className="nav-btn nav-btn-next">
                Next »
              </Button>
            </Col>
          )}
          {step === 3 && (
            <Col xs="auto">
              <Button className="nav-btn nav-btn-save">Save</Button>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default NewUser;
