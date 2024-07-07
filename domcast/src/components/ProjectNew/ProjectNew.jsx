import React, { useEffect, useState } from "react";
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
import "./ProjectNew.css";
import OthersProgressBar from "../OthersProgressBar/OthersProgressBar";
import { userStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import {
  Base_url_components_resources,
  Base_url_keywords,
  Base_url_projects,
  Base_url_skills,
  Base_url_users,
  Base_url_lab,
} from "../../functions/UsersFunctions";

const ProjectNew = () => {
  const navigate = useNavigate();
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
  const loggedUser = userStore.loggedUser;
  const membersList = userStore.users.map((user) => user.name);
  const [enumsFetched, setEnumsFetched] = useState(false);

  const [skillsList, setSkillsList] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [assetsList, setAssetsList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [skillsEnumList, setSkillsEnumList] = useState([]);
  const [labEnumList, setLabEnumList] = useState([]);
  const [projectUserEnumList, setProjectUserEnumList] = useState([]);

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

  const fetchEnums = async () => {
    try {
      const skillsEnumResponse = await fetch(
        `${Base_url_skills}unconfirmed-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      const labsEnumResponse = await fetch(`${Base_url_lab}enum-unconfirmed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

    // falta fetch de max users
  };

  const handleAddMember = (memberName) => {
    const member = userStore.users.find((user) => user.name === memberName);
    if (member) {
      setTeamList([...teamList, member]);
    }
  };

  const handleRemoveMember = (memberName) => {
    const member = userStore.users.find((user) => user.name === memberName);
    if (member) {
      setTeamList(teamList.filter((user) => user.id !== member.id));
    }
  };

  const handleAddSkill = (skillName) => {
    const skill = skillsList.find((skill) => skill.name === skillName);
    if (skill) {
      setSkillsList([...skillsList, skill]);
    }
  };

  const handleRemoveSkill = (skillName) => {
    const skill = skillsList.find((skill) => skill.name === skillName);
    if (skill) {
      setSkillsList(skillsList.filter((skill) => skill.id !== skill.id));
    }
  };

  const handleAddKeyword = (keywordName) => {
    const keyword = keywordsList.find(
      (keyword) => keyword.name === keywordName
    );
    if (keyword) {
      setKeywordsList([...keywordsList, keyword]);
    }
  };

  const handleRemoveKeyword = (keywordName) => {
    const keyword = keywordsList.find(
      (keyword) => keyword.name === keywordName
    );
    if (keyword) {
      setKeywordsList(
        keywordsList.filter((keyword) => keyword.id !== keyword.id)
      );
    }
  };

  const handleAddAsset = (assetName) => {
    const asset = assetsList.find((asset) => asset.name === assetName);
    if (asset) {
      setAssetsList([...assetsList, asset]);
    }
  };

  const handleRemoveAsset = (assetName) => {
    const asset = assetsList.find((asset) => asset.name === assetName);
    if (asset) {
      setAssetsList(assetsList.filter((asset) => asset.id !== asset.id));
    }
  };

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

  // falta retirar os badges, fazer o handleSubmit, fazer os typeaheads como o userRegistration

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
              {keywordsList.map((keyword, index) => (
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
              {labEnumList.map((lab) => (
                <option key={lab.id} value={lab.name}>
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
                  {skillsEnumList.map((skill) => (
                    <option key={skill.id} value={skill.name}>
                      {formatCategoryName(skill.name)}
                    </option>
                  ))}
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
              {skillsList.map((skill, index) => (
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
                    {projectUserEnumList
                      .filter((user) => user.id === 2 || user.id === 3)
                      .map((user) => (
                        <option key={user.id} value={user.name}>
                          {formatCategoryName(user.name)}
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
              <Row className="my-2 mb-4">
                {membersList.map((member, index) => (
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
                  {assetsList.map((asset, index) => (
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
                  onClick={handleCancel}
                  className="btn-cancel"
                  style={{ width: "10rem" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
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
  );
};

export default ProjectNew;
