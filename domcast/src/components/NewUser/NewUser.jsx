import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Card,
  Modal,
} from "react-bootstrap";
import { Base_url_users } from "../../functions/UsersFunctions";
import { Base_url_skills } from "../../functions/UsersFunctions";
import { Base_url_interests } from "../../functions/UsersFunctions";
import ProgressBarComponent from "../ProgressBar/ProgressBar";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import { userStore } from "../../stores/UserStore.jsx";
import { useStore } from "zustand";
import { Typeahead } from "react-bootstrap-typeahead";
import "./NewUser.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [skillsList, setSkillsList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState("private");
  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];

  const [photoPreview, setPhotoPreview] = useState(defaultProfilePic);
  const { user, setUser } = useStore(userStore);
  const token = user.sessionToken;
  const idUser = user.id;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(Base_url_skills, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
            id: idUser,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSkillsList(data);
          console.log("Skills fetched:", data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchInterests = async () => {
      try {
        const response = await fetch(Base_url_interests, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
            id: idUser,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setInterestsList(data);
          console.log("Interests fetched:", data);
        }
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchSkills();
    fetchInterests();
  }, []);

  const handleAddCustomSkill = (newSkill) => {
    // Update skillsList state to include the new custom skill
    setSkillsList([...skillsList, { name: customSkill }]);
    
    // Update user skills
    setUser({ ...user, skills: [...user.skills, customSkill] });

    // Close the modal
    setShowSkillModal(false);    setShowSkillModal(false);

    setCustomSkill("");
    setInputValue("");
  };

  const handleAddCustomInterest = (newInterest) => {
    // Update interestsList state to include the new custom interest
    setInterestsList([...interestsList, { name: customInterest }]);

    // Update user interests
    setUser({ ...user, interests: [...user.interests, customInterest] });

    // Close the modal
    setShowInterestModal(false);

    setCustomInterest("");
    setInputValue("");
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleTypeaheadChange = (labelKey, selected) => {
    const trimmedInputValue = inputValue.trim();

    if (
      trimmedInputValue.length > 0 &&
      selected.length > 0 &&
      selected[selected.length - 1].startsWith('Add "')
    ) {
      if (labelKey === "skills") {
        setCustomSkill(trimmedInputValue);
        setShowSkillModal(true);
      } else {
        setCustomInterest(trimmedInputValue);
        setShowInterestModal(true);
      }
    } else {
      if (labelKey === "skills") {
        setUser({ ...user, skills: selected });
      } else {
        setUser({ ...user, interests: selected });
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setPhotoPreview(photoUrl);
      setUser({ ...user, photo: photoUrl });
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    if (user.photo !== defaultProfilePic) {
      const photoFile = document.getElementById("fileInput").files[0];
      if (photoFile) {
        formData.append("photo", photoFile);
      }
    }

    try {
      const response = await fetch(`${Base_url_users}/confirm`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User confirmed:", data);
      } else {
        console.error("Failed to confirm user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

  const handleCancel = () => {
    setUser({
      firstName: "",
      lastName: "",
      lab: "",
      bio: "",
      nickname: "",
      privacy: "",
      skills: [],
      interests: [],
      photo: defaultProfilePic,
    });
    setSkillsList([]);
    setInterestsList([]);
    setVisible("private");
    setStep(1);
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
                  src={photoPreview}
                  alt="Profile"
                  style={{
                    width: "7.5rem",
                    height: "7.5rem",
                    borderRadius: "50%",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="fileInput"
                  style={{ display: "none" }}
                />
                <Button
                  onClick={() => document.getElementById("fileInput").click()}
                  className="btn-upload"
                  style={{
                    backgroundColor: "var(--color-blue-01)",
                    borderColor: "var(--color-blue-01)",
                    color: "var(--color-white)",
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Choose Profile Photo
                </Button>
              </Card>{" "}
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
            <span
              className="d-block text-center"
              style={{
                fontSize: "0.8rem",
                fontStyle: "italic",
                color: "var(--color-blue-02)",
                fontWeight: "bold",
              }}
            >
              * Required fields
            </span>
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
              <Row style={{ width: "25rem", height: "2rem", alignContent: "center"  }}>
                <Col style={{ display: "flex", justifyContent: "right"}}>
                  <h6 className="me-3 h6-privacy">Privacy: </h6>
                </Col>
                <Col style={{ display: "flex", justifyContent: "left" }}>
                  <Form.Check
                    type="switch"
                    id="privacy"
                    label={`${visible === "public" ? "Public" : "Private"}`}
                    checked={visible === "public"}
                    onChange={() =>
                      setVisible(visible === "public" ? "private" : "public")
                    }
                    className="check-slider-privacy"
                  />{" "}
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
                <Col style={{ display: "flex", justifyContent: "center" }}>
                  <Typeahead
                    id="skills-typeahead"
                    labelKey="name"
                    multiple
                    options={skillsList
                      .map((skill) => skill.name || skill)
                      .concat(
                        inputValue ? [`Add "${inputValue}" as a skill`] : []
                      )}
                    selected={user.skills}
                    onInputChange={handleInputChange}
                    onChange={(selected) =>
                      handleTypeaheadChange("skills", selected)
                    }
                    placeholder="Choose your skills..."
                    className="mb-3"
                    style={{ width: "25rem" }}
                  />
                </Col>
              </Row>
            </Card>
            <Card
              className="justify-content-center align-items-center mt-3"
              style={{ border: "none" }}
            >
              <Row className="mb-2" style={{ justifyContent: "center" }}>
                <Col style={{ display: "flex", justifyContent: "center" }}>
                  <Typeahead
                    id="interests-typeahead"
                    labelKey="name"
                    multiple
                    options={interestsList
                      .map((interest) => interest.name || interest)
                      .concat(
                        inputValue ? [`Add "${inputValue}" as an interest`] : []
                      )}
                    selected={user.interests}
                    onInputChange={handleInputChange}
                    onChange={(selected) =>
                      handleTypeaheadChange("interests", selected)
                    }
                    placeholder="Choose your interests..."
                    className="mb-3"
                    style={{ width: "25rem" }}
                  />
                </Col>
              </Row>
            </Card>
            <Card className="my-5 mx-3" style={{ border: "none" }}>
              <Row style={{ justifyContent: "center", gap: "3rem" }}>
                <Button
                  onClick={handleCancel}
                  className="btn-cancel"
                  style={{ width: "10rem" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="btn-save"
                  style={{ width: "10rem" }}
                >
                  Save
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
    <>
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)}>
        <Modal.Header closeButton className="mt-2 p-4">
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Add Custom Skill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter custom skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="mb-3 mx-5"
            style={{ width: "22.5rem" }}
          />
          <Form.Select
            controlId="floatingSkill"
            style={{ width: "22.5rem" }}
            className="mb-3 mx-5"
          >
            <option value="" disabled selected>
              Choose skill category
            </option>
            <option>Knowledge</option>
            <option>Software</option>
            <option>Hardware</option>
            <option>Tools</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSkillModal(false)}
            className="modal-skill-interest-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddCustomSkill}
            className="modal-skill-interest-save-btn"
          >
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showInterestModal}
        onHide={() => setShowInterestModal(false)}
      >
        <Modal.Header closeButton className="mt-2 p-4">
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Add Custom Interest
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter custom interest"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            className="mb-3 mx-5"
            style={{ width: "22.5rem" }}
          />
          <Form.Select
            controlId="floatingInterest"
            style={{ width: "22.5rem" }}
            className="mb-3 mx-5"
          >
            <option value="" disabled selected>
              Choose interest category
            </option>
            <option>Themes</option>
            <option>Causes</option>
            <option>Fields of expertise</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowInterestModal(false)}
            className="modal-skill-interest-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddCustomInterest}
            className="modal-skill-interest-save-btn"
          >
            Add Interest
          </Button>
        </Modal.Footer>
      </Modal>

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
    </>
  );
};

export default NewUser;
