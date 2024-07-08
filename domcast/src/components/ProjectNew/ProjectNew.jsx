import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Card,
  Modal,
} from "react-bootstrap";
import { Input, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProjectNew.css";
import OthersProgressBar from "../OthersProgressBar/OthersProgressBar";
import { userStore } from "../../stores/UserStore.jsx";
import { projectStore } from "../../stores/ProjectStore.jsx";
import {
  Base_url_admins,
  Base_url_components_resources,
  Base_url_keywords,
  Base_url_projects,
  Base_url_skills,
  Base_url_users,
  Base_url_lab,
} from "../../functions/UsersFunctions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { use } from "i18next";

const ProjectNew = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loggedUser = userStore.loggedUser;
  const usersList = userStore.users.filter((user) => user.id !== loggedUser.id);

  const [enumsFetched, setEnumsFetched] = useState(false);
  const [basicDataFetched, setBasicDataFetched] = useState(false);
  const [maxUsers, setMaxUsers] = useState(1);

  const project = projectStore((state) => state.project);
  const setProject = projectStore((state) => state.setProject);
  const clearProject = projectStore((state) => state.clearProject);

  const [keywordsList, setKeywordsList] = useState([]);
  const [keywordsInputValue, setKeywordsInputValue] = useState("");

  const [skillsList, setSkillsList] = useState([]);
  const [skillType, setSkillType] = useState(1);
  const [customSkill, setCustomSkill] = useState("");
  const [skillsInputValue, setSkillsInputValue] = useState("");
  const [showSkillModal, setShowSkillModal] = useState(false);

  const [assetsList, setAssetsList] = useState([]);
  const [assetsInputValue, setAssetsInputValue] = useState("");

  const [teamList, setTeamList] = useState([]);
  const [teamType, setTeamType] = useState(3);
  const [customTeam, setCustomTeam] = useState("");
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [skillsEnumList, setSkillsEnumList] = useState([]);
  const [labEnumList, setLabEnumList] = useState([]);
  const [projectUserEnumList, setProjectUserEnumList] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];

  useEffect(() => {
    fetchEnums();
    setEnumsFetched(true);
  }, []);

  useEffect(() => {
    if (enumsFetched) {
      fetchBasicData();
    }
  }, [enumsFetched]);

  useEffect(() => {
    if (basicDataFetched) {
      setProject({
        ...project,
        mainManager: loggedUser.id,
      });
    }
  }, [basicDataFetched]);

  const fetchEnums = async () => {
    try {
      const skillsEnumResponse = await fetch(`${Base_url_skills}enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (skillsEnumResponse.ok) {
        const skillsData = await skillsEnumResponse.json();
        setSkillsEnumList(skillsData);
        console.log("Skills fetched:", skillsData);
      } else {
        console.error("Error fetching skills:");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }

    try {
      const labsEnumResponse = await fetch(`${Base_url_lab}enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (labsEnumResponse.ok) {
        const labsData = await labsEnumResponse.json();
        setLabEnumList(labsData);
        console.log("Labs fetched:", labsData);
      } else {
        console.error("Error fetching labs:");
      }
    } catch (error) {
      console.error("Error fetching labs:", error);
    }

    try {
      const projectUserEnumResponse = await fetch(
        `${Base_url_users}user-enum`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
        }
      );
      if (projectUserEnumResponse.ok) {
        const projectUserData = await projectUserEnumResponse.json();
        setProjectUserEnumList(projectUserData);
        console.log("Project users fetched:", projectUserData);
      } else {
        console.error("Error fetching project users:");
      }
    } catch (error) {
      console.error("Error fetching project users:", error);
    }
  };

  const fetchBasicData = async () => {
    try {
      const urlAssets = Base_url_components_resources;
      urlAssets.searchParams.append("orderBy", "name");
      urlAssets.searchParams.append("orderAsc", "true");
      urlAssets.searchParams.append("pageSize", 500);
      urlAssets.searchParams.append("pageNumber", 1);

      const assetsResponse = await fetch(urlAssets, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (assetsResponse.ok) {
        const assetsData = await assetsResponse.json();
        setAssetsList(assetsData);
      } else {
        console.error("Error fetching assets");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const skillsResponse = await fetch(`${Base_url_skills}unconfirmed-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (skillsResponse.ok) {
        const skillsData = await skillsResponse.json();
        setSkillsList(skillsData);
        console.log("Skills fetched:", skillsData);
      } else {
        console.error("Error fetching skills");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }

    try {
      const keywordsResponse = await fetch(Base_url_keywords, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (keywordsResponse.ok) {
        const keywordsData = await keywordsResponse.json();
        setKeywordsList(keywordsData);
        console.log("Keywords fetched:", keywordsData);
      } else {
        console.error("Error fetching keywords");
      }
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }

    try {
      const urlUsers = new URL(Base_url_users);
      urlUsers.searchParams.append("workplace", 0);
      urlUsers.searchParams.append("orderBy", "lab");
      urlUsers.searchParams.append("orderAsc", "true");
      urlUsers.searchParams.append("pageSize", 100);
      urlUsers.searchParams.append("pageNumber", 1);

      const usersResponse = await fetch(urlUsers, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        userStore.setUsers(usersData);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const maxUsersResponse = await fetch(`${Base_url_admins}max-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (maxUsersResponse.ok) {
        const maxUsersData = await maxUsersResponse.json();
        setMaxUsers(maxUsersData);
        console.log("Max users fetched:", maxUsersData);
      } else {
        console.error("Error fetching max users");
      }
    } catch (error) {
      console.error("Error fetching max users:", error);
    }

    setBasicDataFetched(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
      if (endDate && value > endDate) {
        toast.error(t("startDateBeforeEndDate"));
      } else {
        setProject({ ...project, projectedStartDate: value });
      }
    } else if (name === "endDate") {
      setEndDate(value);
      if (startDate && value < startDate) {
        toast.error(t("endDateAfterStartDate"));
      } else {
        setProject({ ...project, deadline: value });
      }
    }
  };

  const generateKeywordsOptions = () => {
    const keywordsOptions = keywordsList.map((keyword) => keyword);
    if (keywordsInputValue.trim().length > 0) {
      const isKeywordExists = keywordsList.some(
        (keyword) =>
          keyword.toLowerCase() === keywordsInputValue.trim().toLowerCase()
      );
      if (!isKeywordExists) {
        keywordsOptions = keywordsOptions.concat(
          `Add "${keywordsInputValue}" as a new keyword`
        );
      }
    }
    return keywordsOptions;
  };

  const generateSkillOptions = () => {
    const skillOptions = skillsList.map((skill) => skill.name || skill);
    if (skillsInputValue.trim().length > 0) {
      const isSkillExist = skillsList.some(
        (skill) =>
          (skill.name || skill).toLowerCase() ===
          skillsInputValue.trim().toLowerCase()
      );
      if (!isSkillExist) {
        skillOptions = skillOptions.concat(
          `Add "${skillsInputValue}" as a skill`
        );
      }
    }
    return skillOptions;
  };

  const generateTeamOptions = () => {
    return usersList.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      ...user,
    }));
  };

  const handleKeywordInputChange = (value) => {
    setKeywordsInputValue(value);
  };

  const handleSkillsInputChange = (value) => {
    setSkillsInputValue(value);
  };

  const handleTypeAheadChange = (labelKey, selected) => {
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
        setProject({ ...project, skills: selected });
      }
    } else if (labelKey === "keywords") {
      const trimmedInputValue = keywordsInputValue.trim();
      if (
        trimmedInputValue.length > 0 &&
        selected.length > 0 &&
        selected[selected.length - 1].startsWith('Add "')
      ) {
        const newKeyword = trimmedInputValue;
        setKeywordsList([...keywordsList, newKeyword]);
        setProject({ ...project, keywords: [...project.keywords, newKeyword] });
      } else {
        setProject({ ...project, keywords: selected });
      }
    } else if (labelKey === "members") {
      if (labelKey === "members" && selected.length > 0) {
        handleShowTeamModal(selected[selected.length - 1]);
      }
    } else {
      setProject({ ...project, collaborators: selected });
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

    setProject({
      ...project,
      skillDtos: [...project.skillDtos, newSkillDto],
      skills: [...project.skills, customSkill],
    });

    setSkillsList(updatedSkillsList);
    handleTypeAheadChange("skills", [...project.skills, customSkill]);

    setShowSkillModal(false);
    setCustomSkill("");
    setSkillType("");
    setSkillsInputValue("");
  };

  const handleAddMember = () => {
    if (!selectedUser || !teamType) {
      console.log("Selected user or team type is missing");
      toast.error(t("userTypeRequired"));
      return;
    } else if (
      teamList.some((teamMember) => teamMember.id === selectedUser.id)
    ) {
      toast.error(t("userAlreadyInTeam"));
      return;
    } else if (teamList.length >= maxUsers - 1) {
      toast.error(t("maxTeamMembersReached"));
      return;
    } else {
      const newProjectTeam = { id: selectedUser.id, role: teamType };
      const updatedTeamList = [...teamList, newProjectTeam];

      setProject({
        ...project,
        projectTeam: [...project.projectTeam, newProjectTeam],
        collaborators: [...project.collaborators, selectedUser.id],
      });

      setTeamList(updatedTeamList);
      handleTypeAheadChange("members", [
        ...project.collaborators,
        selectedUser,
      ]);

      setShowTeamModal(false);
      setSelectedUser(null);
      setTeamType("");
    }
  };

  const handleAddAsset = (assetName) => {
    const asset = assetsList.find((asset) => asset.name === assetName);
    if (asset) {
      setAssetsList([...assetsList, asset]);
    }
  };

  const handleShowTeamModal = (user) => {
    setSelectedUser(user);
    setShowTeamModal(true);
  };

  const handleCloseTeamModal = () => {
    setSelectedUser(null);
    setShowTeamModal(false);
  };

  const handleSubmit = async () => {
    console.log("Here goes the handle submit");
  };

  const handleCancel = () => {
    clearProject();
    setSkillsList([]);
    setKeywordsList([]);
    setTeamList([]);
    setAssetsList([]);
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

  const formatCategoryName = (name) => {
    return name
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  /*   
-- falta fazer o handleSubmit:
|| tratado o tyhpeahead das skills e o das keywords, falta testar
|| tratado o addMember, falta testar
|| add logged.user à team list como user type 1 (useEffect)
|| # team members tratado, falta testar
|| handleDateChange tratado, falta testar
-- falta fazer o addAsset que é um modal igual ao newAsset (transformar o newAsset em um modal, colocar a lista de assets na sidebar e no offcanvas
e retirar o newAsset da sidebar e do offcanvas)
-- addAsset tem de incluir sempre a qty a adicionar:
--------- asset existe -> qty < qty na lista de assets => nova qty lista de assets = qty lista de assets - qty a adicionar
--------- asset existe -> qty > qty na lista de assets => nova qty lista de assets = qty lista de assets + (qty a adicionar - qty lista de assets)
--------- asset não existe => nova qty lista de assets = 0
---- lista de assets tem qty = total - qty usada pelos assets dos projetos (é sempre >= 0)
   */

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
                <Typeahead
                  id="keyword-search"
                  labelKey="name"
                  multiple
                  options={[generateKeywordsOptions()]}
                  selected={project.keywords}
                  onInputChange={handleKeywordInputChange}
                  onChange={(selected) =>
                    handleTypeAheadChange("keywords", selected)
                  }
                  placeholder="Search or add keyword..."
                  className="mb-3 ps-1"
                  style={{ width: "18.5rem" }}
                />
              </Col>
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
              value={project.labId}
              style={{ width: "25rem" }}
            >
              <option value="" disabled>
                {t("chooseLab*")}
              </option>
              {labEnumList.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {formatCategoryName(lab.name)}
                </option>
              ))}
            </Form.Select>
            <Row className="my-2">
              <Col>
                <FloatingLabel controlId="floatingStartDate" label="Start Date">
                  <Form.Control
                    type="date"
                    name="startDate"
                    onChange={handleDateChange}
                    style={{ width: "11.75rem" }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingEndDate" label="End Date">
                  <Form.Control
                    type="date"
                    name="endtDate"
                    onChange={handleDateChange}
                    style={{ width: "11.75rem" }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="my-2" style={{ justifyContent: "center" }}>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Typeahead
                  id="skills-typeahead"
                  labelKey="name"
                  multiple
                  options={generateSkillOptions()}
                  selected={project.skills}
                  onInputChange={handleSkillsInputChange}
                  onChange={(selected) =>
                    handleTypeAheadChange("skills", selected)
                  }
                  placeholder="Choose your skills..."
                  className="mb-3"
                  style={{ width: "25rem" }}
                />
              </Col>
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
                    max={maxUsers}
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
                      id="member-typeahead"
                      labelKey="label"
                      multiple
                      options={generateTeamOptions()}
                      selected={project.collaborators.map((collaborator) => ({
                        label: `${collaborator.firstName} ${collaborator.lastName}`,
                        ...collaborator,
                      }))}
                      onChange={(selected) =>
                        handleTypeAheadChange("members", selected)
                      }
                      placeholder="Search user..."
                      className="mb-3"
                      style={{ width: "25rem" }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Select
                    controlId="floatingMemberCategory"
                    value={teamType}
                    onChange={(e) => setTeamType(e.target.value)}
                    style={{ width: "18.5rem" }}
                  >
                    <option value="" disabled>
                      Choose member type
                    </option>
                    {projectUserEnumList
                      .filter(
                        (userEnum) => userEnum.id === 2 || userEnum.id === 3
                      )
                      .map((userEnum) => (
                        <option key={userEnum.id} value={userEnum.id}>
                          {formatCategoryName(userEnum.name)}
                        </option>
                      ))}
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
            </Card>
            <Card className="my-2 mx-3" style={{ border: "none" }}>
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
            onChange={skillsEnumList}
          >
            <option value="" disabled selected>
              Choose skill category
            </option>
            {skillsEnumList.map((category) => (
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

      <Modal show={showTeamModal} onHide={handleCloseTeamModal}>
        <Modal.Header closeButton className="mt-2 p-4">
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            {selectedUser
              ? `${selectedUser.firstName} ${selectedUser.lastName}`
              : ""}
            <p style={{ fontSize: "16px" }}>
              {" "}
              will be added to this project, please choose its role
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            controlId="floatingMemberCategory"
            value={teamType}
            onChange={(e) => setTeamType(e.target.value)}
            style={{ width: "22.5rem" }}
            className="mb-3 mx-5"
          >
            <option value="" disabled>
              Choose role
            </option>
            {projectUserEnumList
              .filter((userEnum) => userEnum.id === 2 || userEnum.id === 3)
              .map((userEnum) => (
                <option key={userEnum.id} value={userEnum.id}>
                  {formatCategoryName(userEnum.name)}
                </option>
              ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseTeamModal}
            className="modal-skill-interest-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddMember}
            className="modal-skill-interest-save-btn"
          >
            Add Member
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

export default ProjectNew;
