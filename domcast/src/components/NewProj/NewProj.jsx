import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Badge,
  Card,
} from "react-bootstrap";
import { Input, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./NewProj.css";
import ProgressBarComponent from "../ProgressBar/ProgressBar";

const NewProj = () => {
  const [formData, setFormData] = useState({
    title: "",
    lab: "",
    description: "",
    startDate: "",
    duration: "",
    team: [],
    keywords: [],
    skills: [],
    assets: [],
  });
  const [skills, setSkills] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [members, setMembers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];

  const onCreate = (data) => {
    console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddKeyword = () => {
    const keywordInput = document.getElementById("keywordInput").value;
    if (keywordInput && !keywords.includes(keywordInput)) {
      setKeywords([...keywords, keywordInput]);
    }
    document.getElementById("keywordInput").value = "";
  };

  const handleRemoveKeyword = (keyword) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleAddSkill = () => {
    const skillInput = document.getElementById("skillInput").value;
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
    }
    document.getElementById("skillInput").value = "";
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddMember = () => {
    const memberInput = document.getElementById("memberInput").value;
    if (memberInput && !members.includes(memberInput)) {
      setMembers([...members, memberInput]);
    }
    document.getElementById("memberInput").value = "";
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleAddAsset = () => {
    const assetInput = document.getElementById("assetInput").value;
    if (assetInput && !assets.includes(assetInput)) {
      setAssets([...assets, assetInput]);
    }
    document.getElementById("assetInput").value = "";
  };

  const handleRemoveAsset = (asset) => {
    setAssets(assets.filter((a) => a !== asset));
  };

  const handleCreate = () => {
    onCreate(formData);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      lab: "",
      description: "",
      startDate: "",
      duration: "",
      team: [],
      keywords: [],
      skills: [],
      assets: [],
    });
    setSkills([]);
    setKeywords([]);
    setMembers([]);
    setAssets([]);
    setStep(1);
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
          <Card
            className="justify-content-center align-items-center mt-3"
            style={{ border: "none" }}
          >
            <Row style={{ justifyContent: "center" }}>
              <FloatingLabel
                controlId="floatingTitle"
                label="Title"
                className="mb-3 ps-1"
                style={{ width: "25rem" }}
              >
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <FloatingLabel
                controlId="floatingBio"
                label="Description & motivation"
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
              <Col className="my-2">
                <FloatingLabel
                  controlId="floatingKeywords"
                  className="mb-3 ps-1"
                  style={{ width: "18.5rem" }}
                >
                  <Typeahead
                    id="keyword-search"
                    type="text"
                    placeholder="Search or add keyword..."
                    options={[]}
                  />
                </FloatingLabel>
              </Col>
              <Col className="my-2">
                <Button
                  onClick={handleAddKeyword}
                  className="btn-add"
                  style={{ width: "5rem" }}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <Row className="mt-2 mb-4">
              {keywords.map((keyword, index) => (
                <Badge pill bg="secondary" key={index} className="me-2">
                  {keyword}{" "}
                  <span
                    variant="light"
                    size="sm"
                    className="ps-2 mb-3"
                    onClick={() => handleRemoveKeyword(keyword)}
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
        );
      case 2:
        return (
          <Card
            className="justify-content-center align-items-center mt-3"
            style={{ border: "none" }}
          >
            <Form.Select
              controlId="floatingLab"
              className="my-2 ps-1"
              style={{ width: "25rem" }}
            >
              <option value="" disabled selected>
                Choose your Lab
              </option>
              <option>Coimbra</option>
              <option>Lisboa</option>
              <option>Porto</option>
              <option>Tomar</option>
              <option>Vila Real</option>
              <option>Viseu</option>
            </Form.Select>
            <Row className="my-2">
              <Col>
                <FloatingLabel controlId="floatingStartDate" label="Start Date">
                  <Form.Control
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    style={{ width: "11.75rem" }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingEndDate" label="End Date">
                  <Form.Control
                    type="date"
                    name="endtDate"
                    onChange={handleChange}
                    style={{ width: "11.75rem" }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="my-2" style={{ justifyContent: "center" }}>
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
        );
      case 3:
        return (
          <>
            <Card
              className="justify-content-center align-items-center mt-3"
              style={{ border: "none" }}
            >
              <Row className="my-2">
                <Col>
                  <span className="mb-3 mx-3">Maximum team members</span>
                  <Input
                    controlId="floatingTeamMembersNo"
                    type="number"
                    min="1"
                    className="mb-3 ps-1"
                    style={{ width: "5rem" }}
                  />
                </Col>
              </Row>
              <Row className="my-2">
                <Col>
                  <FloatingLabel
                    controlId="floatingMembers"
                    className="mb-3 ps-1"
                  >
                    <Typeahead
                      id="member-search"
                      type="text"
                      placeholder="Search user..."
                      style={{ width: "25rem" }}
                      options={[]}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Select
                    controlId="floatingMemberCategory"
                    style={{ width: "18.5rem" }}
                  >
                    <option value="" disabled selected>
                      Choose member type
                    </option>
                    <option>Manager</option>
                    <option>Participant</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Button
                    className="btn-add"
                    style={{ width: "5rem" }}
                    onClick={handleAddMember}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
              <Row className="my-2 mb-4">
                {members.map((member, index) => (
                  <Badge pill bg="secondary" key={index} className="me-2">
                    {member}{" "}
                    <span
                      variant="light"
                      size="sm"
                      className="ps-2 mb-3"
                      onClick={() => handleRemoveMember(member)}
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
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingAssets"
                    className="mb-3 ps-1"
                  >
                    <Typeahead
                      id="asset-search"
                      type="text"
                      placeholder="Search asset..."
                      style={{ width: "25rem" }}
                      options={[]}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="my-3" style={{ width: "25rem" }}>
                <Col>
                  <span className="my-2 mx-3">Quantity</span>
                  <Input
                    controlId="floatingAssetQuantity"
                    type="number"
                    min="1"
                    className="my-2 ps-1"
                    style={{ width: "5rem" }}
                  />
                </Col>
                <Col>
                  <Button
                    className="btn-add my-2"
                    style={{ width: "5rem" }}
                    onClick={handleAddAsset}
                  >
                    Add
                  </Button>
                  {/* if this component does not exist, a message should appear below this row saying "This asset does not exist. Do you want to create it?" with a button "Create asset" */}
                </Col>
              </Row>
              <Row className="mb-3">
                <div className="mt-2 mb-4">
                  {assets.map((asset, index) => (
                    <Badge pill bg="secondary" key={index} className="me-2">
                      {asset}{" "}
                      <span
                        variant="light"
                        size="sm"
                        className="ps-2 mb-3"
                        onClick={() => handleRemoveAsset(asset)}
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
                </div>
              </Row>
            </Card>
            <Card className="my-2 mx-3" style={{ border: "none" }}>
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

export default NewProj;
