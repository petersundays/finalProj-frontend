import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Badge,
  Card,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "./NewUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import ProgressBarComponent from "../ProgressBar/ProgressBar";

const NewUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    lab: "",
    bio: "",
    nickname: "",
    privacy: "",
    skills: [],
    interests: [],
  });

  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [visible, setVisible] = useState("private");
  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];

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

  const handleCreate = () => {
    onCreate(formData);
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      lab: "",
      bio: "",
      nickname: "",
      privacy: "",
      skills: [],
      interests: [],
    });
    setSkills([]);
    setInterests([]);
    setVisible("private");
    setStep(1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onCreate = (formData) => {
    console.log(formData);
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="mx-lg-3 my-lg-3" style={{ border: "none" }}>
            <div className="row" style={{ justifyContent: "center" }}>
              <Card
                className="justify-content-center align-items-center my-3"
                style={{ border: "none" }}
              >
                <img
                  className="my-3"
                  src={defaultProfilePic}
                  alt="Default Profile"
                  style={{ width: "7.5rem", height: "7.5rem" }}
                />
                <p
                  className="edit-profile-pic-link mb-3"
                >
                  Edit Profile Photo
                </p>
              </Card>
              <Card
                className="justify-content-center align-items-center"
                style={{ border: "none" }}
              >
                <FloatingLabel
                  controlId="floatingFirstName"
                  label="First Name *"
                  className="mb-3"
                  style={{ width: "25rem" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingLastName"
                  label="Last Name *"
                  className="mb-3"
                  style={{ width: "25rem" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
                <Form.Select
                  required
                  controlId="floatingLab"
                  className="mb-3"
                  style={{ width: "25rem" }}
                >
                  <option value="" disabled selected>
                    Choose your Lab*
                  </option>
                  <option>Coimbra</option>
                  <option>Lisboa</option>
                  <option>Porto</option>
                  <option>Tomar</option>
                  <option>Vila Real</option>
                  <option>Viseu</option>
                </Form.Select>
              </Card>
            </div>
            <span className="d-block text-center">* Required fields</span>
          </Card>
        );
      case 2:
        return (
          <Card className="mt-3" style={{ border: "none" }}>
            <Row style={{ justifyContent: "center" }}>
              <FloatingLabel
                controlId="floatingBio"
                label="Bio"
                className="mb-3 ps-1"
                style={{ width: "25rem" }}
              >
                <Form.Control
                  as="textarea"
                  onChange={handleChange}
                  style={{
                    height: "12.5rem",
                    resize: "none",
                    width: "24rem",
                    overflow: "auto",
                  }}
                />
              </FloatingLabel>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <FloatingLabel
                controlId="floatingNickname"
                label="Nickname"
                className="mb-3 ps-1"
                style={{ width: "25rem" }}
                onChange={handleChange}
              >
                <Form.Control type="text" placeholder="Nickname" />
              </FloatingLabel>
            </Row>
            <Card
              className="justify-content-center align-items-center my-3"
              style={{ border: "none" }}
            >
              <Row style={{ justifyContent: "center", width: "17rem" }}>
                <Col style={{ width: "5rem" }}>
                  <p>Privacy</p>
                </Col>
                <Col className="mx-0" style={{ width: "5rem" }}>
                  <Button
                    onClick={() => setVisible("private")}
                    className="mx-2 visible-btn-new-user"
                    style={{
                      width: "5rem",
                      backgroundColor:
                        visible === "private"
                          ? "var(--color-blue-01)"
                          : "var(--color-white)",
                      borderColor:
                        visible === "private"
                          ? "var(--color-blue-01)"
                          : "var(--color-blue-01)",
                      color:
                        visible === "private"
                          ? "var(--color-white)"
                          : "var(--color-blue-01)",
                    }}
                  >
                    Private
                  </Button>
                </Col>
                <Col style={{ width: "5rem" }}>
                  <Button
                    onClick={() => setVisible("public")}
                    className="mx-2 visible-btn-new-user"
                    style={{
                      width: "5rem",
                      backgroundColor:
                        visible === "public"
                          ? "var(--color-blue-01)"
                          : "var(--color-white)",
                      borderColor:
                        visible === "public"
                          ? "var(--color-blue-01)"
                          : "var(--color-blue-01)",
                      color:
                        visible === "public"
                          ? "var(--color-white)"
                          : "var(--color-blue-01)",
                    }}
                  >
                    Public
                  </Button>
                </Col>
              </Row>
            </Card>
          </Card>
        );
      case 3:
        return (
          <>
              <Card
                className="justify-content-center align-items-center mt-3"
                style={{ border: "none" }}
              >
                <Row className="mb-2" style={{ justifyContent: "center" }}>
                  <FloatingLabel controlId="floatingSkillInput">
                    <Typeahead
                      id="skill-search"
                      type="text"
                      placeholder="Search or add skill..."
                      style={{ width: "25rem" }}
                      options={[]}
                    />
                  </FloatingLabel>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Col className="my-2">
                    <Form.Select
                      controlId="floatingSkillCategory"
                      style={{ width: "18.5rem" }}
                    >
                      <option value="" disabled selected>
                        Choose skill category
                      </option>
                      <option>Knowledge</option>
                      <option>Software</option>
                      <option>Hardware</option>
                      <option>Tools</option>
                    </Form.Select>
                  </Col>
                  <Col className="my-2">
                    <Button
                      onClick={handleAddSkill}
                      className="btn-add"
                      style={{ width: "5rem" }}
                    >
                      Add
                    </Button>{" "}
                  </Col>
                </Row>
                <Row className="mt-2 mb-4">
                  {skills.map((skill, index) => (
                    <Badge pill bg="secondary" key={index} className="me-2">
                      {skill}{" "}
                      <span
                        variant="light"
                        size="sm"
                        className="ps-2 mb-3"
                        onClick={() => handleRemoveSkill(skill)}
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          top: "-2px",
                        }}
                      >
                        x
                      </span>
                    </Badge>
                  ))}
                </Row>
              </Card>
            <Card
              className="justify-content-center align-items-center mt-3"
              style={{ border: "none" }}
            >
              <Row className="mb-2" style={{ justifyContent: "center" }}>
                <FloatingLabel controlId="floatingInterestInput">
                  <Typeahead
                    id="interest-search"
                    type="text"
                    style={{ width: "25rem" }}
                    placeholder="Search or add interests..."
                    options={[]}
                    onClick={handleAddInterest}
                  />
                </FloatingLabel>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <Col className="my-2">
                  <Form.Select
                    controlId="floatingInterestCategory"
                    style={{ width: "18.5rem" }}
                  >
                    <option value="" disabled selected>
                      Choose interest category
                    </option>
                    <option>Themes</option>
                    <option>Causes</option>
                    <option>Fields of Expertise</option>
                  </Form.Select>
                </Col>
                <Col className="my-2">
                  <Button
                    onClick={handleAddInterest}
                    className="btn-add"
                    style={{ width: "5rem" }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
              <Row className="mt-2 mb-4">
                {interests.map((interest, index) => (
                  <Badge pill bg="secondary" key={index} className="me-2">
                    {interest}{" "}
                    <span
                      variant="light"
                      size="sm"
                      className="ps-2 mb-3"
                      onClick={() => handleRemoveInterest(interest)}
                      style={{
                        cursor: "pointer",
                        position: "relative",
                        top: "-2px",
                      }}
                    >
                      x
                    </span>
                  </Badge>
                ))}
              </Row>
            </Card>
            <Card className="my-5 mx-3" style={{ border: "none" }}>
              <Row style={{ justifyContent: "center", gap: "3rem" }}>
                <Button
                  onClick={handleCreate}
                  className="btn-save"
                  style={{ width: "10rem" }}
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="btn-cancel"
                  style={{ width: "10rem" }}
                >
                  Cancel
                </Button>
              </Row>
            </Card>
          </>
        );
      default:
        return null;
    }
  };

  const renderProgress = () => {
    return (
      <Row className="mb-2" style={{ justifyContent: "center", gap: "2rem" }}>
        {step > 1 && (
          <Button
            onClick={prevStep}
            className="nav-btn nav-btn-prev"
            style={{
              maxWidth: "8rem",
            }}
          >
            « Previous
          </Button>
        )}
        {step < 3 && (
          <Button
            onClick={nextStep}
            className="nav-btn nav-btn-next"
            style={{
              maxWidth: "8rem",
            }}
          >
            Next »
          </Button>
        )}
      </Row>
    );
  };

  return (
    <Card
      style={{
        border: "none",
        height: "100%",
        width: "100%",
        position: "relative", // Add this to enable absolute positioning for children
      }}
    >
      <div
        className="progress-bar-div"
        style={{
          width: "30%",
          justifyContent: "center",
          position: "absolute", // Absolute positioning
          top: "2rem", // 10rem from the top
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Center align by translating half of its width
        }}
      >
        <ProgressBarComponent step={step} steps={steps} />
      </div>

      <div style={{ paddingTop: "2.5rem" }}>
        {" "}
        {/* Add paddingTop to push the content down */}
        <Card style={{ border: "none" }} className="my-3">
          {renderStep()}
        </Card>
        <div className="my-2">{renderProgress()}</div>
      </div>
    </Card>
  );
};

export default NewUser;
