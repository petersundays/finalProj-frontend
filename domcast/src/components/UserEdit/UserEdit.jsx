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
import {
  Base_url_users,
  Base_url_skills,
  Base_url_interests,
  Base_url_lab,
} from "../../functions/UsersFunctions.jsx";
import OthersProgressBar from "../OthersProgressBar/OthersProgressBar.jsx";
import defaultProfilePic from "../../multimedia/default-profile-pic.png";
import { userStore } from "../../stores/UserStore.jsx";
import { useStore } from "zustand";
import { Typeahead } from "react-bootstrap-typeahead";
import "./UserEdit.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [skillsList, setSkillsList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [skillType, setSkillType] = useState(1);
  const [interestType, setInterestType] = useState(1);
  const [skillsInputValue, setSkillsInputValue] = useState("");
  const [interestsInputValue, setInterestsInputValue] = useState("");

  const user = useStore(userStore, (state) => state.loggedUser);
  const setUser = useStore(userStore, (state) => state.setLoggedUser);
  const photo = useStore(userStore, (state) => state.loggedPhoto);
  const setPhoto = useStore(userStore, (state) => state.setLoggedPhoto);
  const setDefaultLoggedPhoto = useStore(
    userStore,
    (state) => state.setDefaultLoggedPhoto
  );
  const clearUser = useStore(userStore, (state) => state.clearLoggedUser);

  const [labList, setLabList] = useState([]);
  const [skillCategoryList, setSkillCategoryList] = useState([]);
  const [interestCategoryList, setInterestCategoryList] = useState([]);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const [visibility, setVisibility] = useState(false);
  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];
  const [photoPreview, setPhotoPreview] = useState(photo || defaultProfilePic);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsResponse = await fetch(
          `${Base_url_skills}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: user.sessionToken,
              id: id,
            },
          }
        );
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setSkillsList(skillsData);
          console.log("Skills fetched:", skillsData);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchInterests = async () => {
      try {
        const interestsResponse = await fetch(
          `${Base_url_interests}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: user.sessionToken,
              id: id,
            },
          }
        );
        if (interestsResponse.ok) {
          const interestsData = await interestsResponse.json();
          setInterestsList(interestsData);
          console.log("Interests fetched:", interestsData);
        }
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    const fetchLabs = async () => {
      try {
        const labsResponse = await fetch(`${Base_url_lab}enum`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: user.sessionToken,
            id: id,
          },
        });
        if (labsResponse.ok) {
          const labsData = await labsResponse.json();
          setLabList(labsData);
          console.log("Labs fetched:", labsData);
        }
      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    const fetchSkillCategories = async () => {
      try {
        const skillCategoriesResponse = await fetch(
          `${Base_url_skills}enum`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: user.sessionToken,
              id: id,
            },
          }
        );
        if (skillCategoriesResponse.ok) {
          const skillCategoriesData = await skillCategoriesResponse.json();
          setSkillCategoryList(skillCategoriesData);
          console.log("Skill categories fetched:", skillCategoriesData);
        }
      } catch (error) {
        console.error("Error fetching skill categories:", error);
      }
    };

    const fetchInterestCategories = async () => {
      try {
        const interestCategoriesResponse = await fetch(
          `${Base_url_interests}enum`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: user.sessionToken,
              id: id,
            },
          }
        );
        if (interestCategoriesResponse.ok) {
          const interestCategoriesData =
            await interestCategoriesResponse.json();
          setInterestCategoryList(interestCategoriesData);
          console.log("Interest categories fetched:", interestCategoriesData);
        }
      } catch (error) {
        console.error("Error fetching interest categories:", error);
      }
    };
    
    if (!user.sessionToken) {
      clearUser();
      navigate("/");
    }

    fetchSkills();
    fetchInterests();
    fetchLabs();
    fetchSkillCategories();
    fetchInterestCategories();
  }, []);

  const formatCategoryName = (name) => {
    return name
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSkillsInputChange = (value) => {
    setSkillsInputValue(value);
  };

  const handleInterestsInputChange = (value) => {
    setInterestsInputValue(value);
  };

  const generateSkillOptions = () => {
    let options = skillsList.map((skill) => skill.name || skill);
    if (skillsInputValue.trim().length > 0) {
      const isSkillExist = skillsList.some(
        (skill) =>
          (skill.name || skill).toLowerCase() ===
          skillsInputValue.trim().toLowerCase()
      );
      if (!isSkillExist) {
        options = options.concat(`Add "${skillsInputValue}" as a skill`);
      }
    }
    return options;
  };

  const generateInterestOptions = () => {
    let options = interestsList.map((interest) => interest.name || interest);
    if (interestsInputValue.trim().length > 0) {
      const isInterestExist = interestsList.some(
        (interest) =>
          (interest.name || interest).toLowerCase() ===
          interestsInputValue.trim().toLowerCase()
      );
      if (!isInterestExist) {
        options = options.concat(`Add "${interestsInputValue}" as an interest`);
      }
    }
    return options;
  };

  const handleTypeaheadChange = (labelKey, selected) => {
    if (labelKey === "skills") {
      const trimmedInputValue = skillsInputValue.trim();
      if (
        trimmedInputValue.length > 0 &&
        selected.length > 0 &&
        selected[selected.length - 1].startsWith('Add "')
      ) {
        setCustomSkill(trimmedInputValue);
        setShowSkillModal(true);
      } else {
        setUser({ ...user, skills: selected });
      }
    } else if (labelKey === "interests") {
      const trimmedInputValue = interestsInputValue.trim();
      if (
        trimmedInputValue.length > 0 &&
        selected.length > 0 &&
        selected[selected.length - 1].startsWith('Add "')
      ) {
        setCustomInterest(trimmedInputValue);
        setShowInterestModal(true);
      } else {
        setUser({ ...user, interests: selected });
      }
    }
  };

  const handleAddCustomSkill = () => {
    if (!customSkill || !skillType) {
      console.log("Custom skill or skill type is missing");
      toast.error(t("skillNameTypeRequired"));
      return;
    }

    const newSkillDto = { name: customSkill, type: skillType };
    const updatedSkillsList = [...skillsList, newSkillDto];

    setUser({
      ...user,
      skillDtos: [...user.skillDtos, newSkillDto],
      skills: [...user.skills, customSkill],
    });

    setSkillsList(updatedSkillsList);
    handleTypeaheadChange("skills", [...user.skills, customSkill]);

    setShowSkillModal(false);
    setCustomSkill("");
    setSkillType("");
    setSkillsInputValue(""); // Clear the input value after adding
  };

  const handleAddCustomInterest = () => {
    if (!customInterest || !interestType) {
      console.log("Custom interest or interest type is missing");
      toast.error(t("interestNameTypeRequired"));
      return;
    }

    const newInterestDto = { name: customInterest, type: interestType };
    const updatedInterestsList = [...interestsList, newInterestDto];

    setUser((prevUser) => ({
      ...prevUser,
      interestDtos: [...prevUser.interestDtos, newInterestDto], // Ensure you are adding the new interest DTO correctly
      interests: [...prevUser.interests, customInterest],
    }));

    setInterestsList(updatedInterestsList);
    handleTypeaheadChange("interests", [...user.interests, customInterest]);

    setShowInterestModal(false);
    setCustomInterest("");
    setInterestType("");
    setInterestsInputValue(""); // Clear the input value after adding
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setPhotoPreview(photoUrl);
      setPhoto(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSkillCategoryChange = (e) => {
    setSkillType(e.target.value);
  };

  const handleInterestCategoryChange = (e) => {
    setInterestType(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    console.log("User data:", user);
    if (photo !== null) {
      formData.append("photo", photo);
      console.log("Photo:", photo);
    }
    console.log("Formdata:", formData);

    try {
      const response = await fetch(`${Base_url_users}confirm`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User confirmed:", data);
        toast.success(t("registrationSuccess"));
        clearUser();
        setSkillsList([]);
        setInterestsList([]);
        setVisibility("private");
        setStep(1);
        navigate("/"); // Redirect to the home page for user to login
      } else {
        const errorData = await response.json();
        console.error("Failed to confirm user:", errorData);
        toast.error(t("registrationFailure"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("registrationFailure"));
    }
  };

  const validateStep1 = () => {
    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.workplace === ""
    ) {
      console.log("Please fill in all required fields");
      toast.error(t("requiredFieldsMissing"));
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      return;
    }
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
    navigate(-1);
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
              </Card>
              <Card
                className="justify-content-center align-items-center"
                style={{ border: "none" }}
              >
                <FloatingLabel
                  controlId="floatingFirstName"
                  label={t("firstName*")}
                  className="mb-3"
                  style={{ width: "25rem" }}
                >
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={user.firstName}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingLastName"
                  label={t("lastName*")}
                  className="mb-3"
                  style={{ width: "25rem" }}
                >
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={user.lastName}
                    required
                  />
                </FloatingLabel>
                <Form.Select
                  required
                  controlId="floatingLab"
                  className="mb-3"
                  style={{ width: "25rem" }}
                  value={user.workplace}
                  onChange={(e) =>
                    setUser({ ...user, workplace: e.target.value })
                  }
                >
                  <option value="" disabled>
                    {t("chooseLab*")}
                  </option>
                  {labList.map((lab) => (
                    <option key={lab.id} value={lab.name}>
                      {formatCategoryName(lab.name)}
                    </option>
                  ))}
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
              {t("*mandatoryFields")}
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
                  name="biography"
                  type="textarea"
                  as="textarea"
                  onChange={handleChange}
                  style={{
                    height: "12.5rem",
                    resize: "none",
                    width: "24rem",
                    overflow: "auto",
                  }}
                  value={user.biography}
                />
              </FloatingLabel>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <FloatingLabel
                controlId="floatingNickname"
                label="Nickname"
                className="mb-3 ps-1"
                style={{ width: "25rem" }}
              >
                <Form.Control
                  name="nickname"
                  type="text"
                  placeholder="Nickname"
                  onChange={handleChange}
                  value={user.nickname}
                />
              </FloatingLabel>
            </Row>
            <Card
              className="justify-content-center align-items-center my-3"
              style={{ border: "none" }}
            >
              <Row
                style={{
                  width: "25rem",
                  height: "2rem",
                  alignContent: "center",
                }}
              >
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <h6 className="me-3 h6-privacy">Privacy: </h6>
                </Col>
                <Col style={{ display: "flex", justifyContent: "left" }}>
                  <Form.Check
                    type="switch"
                    id="privacy"
                    label={user.visible ? "Public" : "Private"}
                    checked={user.visible}
                    onChange={(e) =>
                      setUser({ ...user, visible: e.target.checked })
                    }
                    className="check-slider-privacy"
                  />
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
                    options={generateSkillOptions()}
                    selected={user.skills}
                    onInputChange={handleSkillsInputChange}
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
                    options={generateInterestOptions()}
                    selected={user.interests}
                    onInputChange={handleInterestsInputChange}
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
            onChange={handleSkillCategoryChange}
          >
            <option value="" disabled selected>
              Choose skill category
            </option>
            {skillCategoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {formatCategoryName(category.name)}
              </option>
            ))}
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
            onChange={handleInterestCategoryChange}
          >
            <option value="" disabled selected>
              Choose interest category
            </option>
            {interestCategoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {formatCategoryName(category.name)}
              </option>
            ))}
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
          <OthersProgressBar step={step} steps={steps} />
        </div>

        <div style={{ paddingTop: "2.5rem" }}>
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

export default UserEdit;
