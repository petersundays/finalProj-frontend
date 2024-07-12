import React, { useEffect, useState } from "react";
import { userStore } from "../../stores/UserStore";
import { Card, Button, Badge, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  Base_url_projects,
  Base_url_lab,
} from "../../functions/UsersFunctions";
import ModalMessage from "../ModalMessage/ModalMessage";
import defaultProfilePhoto from "../../multimedia/default-profile-pic.png";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function UserView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("urlId:", id);
  const urlId = parseInt(id);
  const loggedUser = userStore((state) => state.loggedUser);
  const usersList = userStore((state) => state.userList);
  const [performSearch, setPerformSearch] = useState(false);

  const [projectsOrderBy, setProjectsOrderBy] = useState("state");
  const [projectsOrderAsc, setProjectsOrderAsc] = useState(true);
  const projectsSearchQuery = useState("");
  const [projects, setProjects] = useState([]);
  const [projectQty, setProjectQty] = useState(0);
  const showMoreProjects = 100;
  const [labsEnum, setLabsEnum] = useState([]);
  const [stateEnum, setStateEnum] = useState([]);

  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    if (usersList.length > 0) {
      fetchProjects();
      fetchLabsEnum();
    }
  }, [usersList, performSearch, id]);

  const fetchProjects = async () => {
    if (!projectsSearchQuery && !projectsOrderBy && !projectsOrderAsc) {
      setProjectsOrderBy("name");
      setProjectsOrderAsc(true);
    } else {
      try {
        const user = usersList.find((user) => user.id === urlId);
        if (!user) {
          console.error("User not found");
          return;
        }
        const userId = user.id === loggedUser.id ? loggedUser.id : user.id;

        const urlProjects = new URL(`${Base_url_projects}`);
        urlProjects.searchParams.append("userId", userId);
        urlProjects.searchParams.append("orderBy", projectsOrderBy);
        urlProjects.searchParams.append("orderAsc", projectsOrderAsc);
        urlProjects.searchParams.append("pageSize", showMoreProjects);
        urlProjects.searchParams.append("pageNumber", 1);

        const projectsResponse = await fetch(urlProjects.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData.projects);
          setProjectQty(projectsData.totalProjects);

          console.log("Projects fetched xxx:", projectsData);
        } else {
          console.error("Error fetching projects:", projectsResponse);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  };

  const fetchLabsEnum = async () => {
    try {
      const labsEnumResponse = await fetch(`${Base_url_lab}enum-unconfirmed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const labsEnumData = await labsEnumResponse.json();
      setLabsEnum(labsEnumData);
    } catch (error) {
      console.error("Error fetching labs enum:", error);
    }

    try {
      const stateEnumResponse = await fetch(`${Base_url_projects}state-enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const stateEnumData = await stateEnumResponse.json();
      setStateEnum(stateEnumData);
      console.log("State enum fetched:", stateEnumData);
    } catch (error) {
      console.error("Error fetching state enum:", error);
    }
  };

  const goToProject = () => {
    console.log("goToProject");
  };

  const editProfile = () => {
    navigate(`/user/edit/${userId}`);
  };

  const handleChangeSortBy = (e) => {
    setProjectsOrderBy(e.target.value);
  };

  const handleSearch = () => {
    setPerformSearch(!performSearch);
  };

  const getLabName = (labId) => {
    const lab = labsEnum.find((lab) => lab.id === labId);
    const labName = lab ? lab.name : labId;

    return labName
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStateName = (stateId) => {
    const state = stateEnum.find((state) => state.intValue === stateId);
    const stateName = state ? state.name : stateId;

    return stateName
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const user = usersList.find((user) => user.id === urlId);
  const userId = user.id === loggedUser.id ? loggedUser.id : user.id;
  const skills =
    (loggedUser.id === user.id ? loggedUser.skills : user.skills) || [];
  const interests =
    (loggedUser.id === user.id ? loggedUser.interests : user.interests) || [];

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  return (
    <Row>
      <Col>
        <Row>
          <Card className="p-3" style={{ border: "none" }}>
            <Card.Body>
              <Card.Img variant="top" src={user.photo || defaultProfilePhoto} />
              <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
              <Card.Text>{user.nickname}</Card.Text>
              <Card.Text>{user.lab}</Card.Text>
              <Card.Text>{user.bio}</Card.Text>
              {urlId === loggedUser.id && (
                <Card.Text>
                  Privacy: {user.visible === true ? "Private" : "Public"}
                </Card.Text>
              )}
            </Card.Body>
            <div className="ms-4">
              <h6>Skills:</h6>
              {skills.map((skill, index) => (
                <Badge key={index} pill bg="primary" className="me-1">
                  {skill.name}
                </Badge>
              ))}
            </div>
            <div className="ms-4">
              <h6>Interests:</h6>
              {interests.map((interest, index) => (
                <Badge key={index} pill bg="secondary" className="me-1">
                  {interest.name}
                </Badge>
              ))}
            </div>
          </Card>
        </Row>
        <Row>
          <Col>
            {user.id !== loggedUser.id ? (
              <Button
                variant="primary"
                onClick={openMessageModal}
                className="mt-3 button-custom-user-view"
                style={{ width: "10rem", height: "2.5rem" }}
              >
                Send Message
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={editProfile}
                className="mt-3 button-custom-user-view"
                style={{ width: "10rem", height: "2.5rem" }}
              >
                Edit Profile
              </Button>
            )}
          </Col>
        </Row>
      </Col>
      {projects && labsEnum && stateEnum ? (
        <Col>
          <Card className="p-3" style={{ border: "none" }}>
            <div className="ms-4">
              <h6
                className="d-flex justify-content-center my-4"
                style={{ color: "var(--color-blue-01)", fontSize: "18px" }}
              >
                Projects
              </h6>
              <Row className="mb-2 d-flex justify-content-center">
                <Col md={0.5} className="my-2 me-2" style={{ width: "8rem" }}>
                  <Form.Check
                    type="radio"
                    label="Ascending"
                    name="orderDirection"
                    id="orderAsc"
                    checked={projectsOrderAsc === true}
                    onChange={() => setProjectsOrderAsc(true)}
                    className="mx-2 radio-btn-custom"
                    style={{ width: "8rem" }}
                  />
                </Col>
                <Col md={0.5} className="my-2 me-2" style={{ width: "8rem" }}>
                  <Form.Check
                    type="radio"
                    label="Descending"
                    name="orderDirection"
                    id="orderDesc"
                    checked={projectsOrderAsc === false}
                    onChange={() => setProjectsOrderAsc(false)}
                    className="mx-2 radio-btn-custom"
                    style={{ width: "8rem" }}
                  />
                </Col>
              </Row>
              <Row className="mb-4 d-flex justify-content-center">
                <Col md={0.5} className="my-2 me-2" style={{ width: "8rem" }}>
                  <Form.Select
                    className="me-2"
                    onChange={handleChangeSortBy}
                    style={{ width: "8rem" }}
                  >
                    <option value="readyDate">Start date</option>
                    <option value="state">State</option>
                  </Form.Select>
                </Col>
                <Col md={0.5} className="my-2 mx-2" style={{ width: "10rem" }}>
                  <Button
                    className="custom-show-more-btn ms-2"
                    variant="secondary"
                    onClick={handleSearch}
                    style={{ width: "8rem" }}
                  >
                    Order
                  </Button>
                </Col>
              </Row>
              {projects &&
                projects.map((project, index) => (
                  <Row className="d-flex justify-content-center">
                    <Card
                      key={index}
                      className="mb-4 py-2"
                      style={{
                        width: "20rem",
                        borderColor: "var(--color-yellow-01)",
                      }}
                    >
                      <Card.Header
                        style={{
                          color: "var(--color-coal)",
                          backgroundColor: "var(--color-yellow-01)",
                          height: "2rem",
                        }}
                      >
                        <Card.Title
                          onClick={goToProject}
                          style={{ fontSize: "15px", cursor: "pointer" }}
                        >
                          {project.name}
                        </Card.Title>
                      </Card.Header>
                      <Card.Body style={{ height: "2.5rem" }}>
                        <Row>
                          <Col>
                            <Card.Text style={{ fontSize: "15px" }}>
                              {getStateName(project.state)}
                            </Card.Text>
                          </Col>
                          <Col>
                            <Card.Text
                              className="d-flex justify-content-end"
                              style={{
                                color: "var(--color-blue-01)",
                                fontSize: "15px",
                              }}
                            >
                              {getLabName(project.labId)}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Row>
                ))}
            </div>
          </Card>
        </Col>
      ) : (
        <span>{t("loading")}</span>
      )}
      <ModalMessage
        id={user.id}
        show={showMessageModal}
        handleClose={closeMessageModal}
      />
    </Row>
  );
}

export default UserView;
