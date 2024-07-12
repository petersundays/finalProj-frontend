import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Table, Modal } from "react-bootstrap";
import "./ProjectPrivate.css";
import { userStore } from "../../../stores/UserStore";
import ProjectEdit from "../../ProjectEdit/ProjectEdit";
import TaskListGantt from "../../TaskList/TaskListGantt/TaskListGantt";
import TaskListMobile from "../../TaskList/TaskListMobile/TaskListMobile";
import {
  Base_url_projects,
  Base_url_lab,
} from "../../../functions/UsersFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function ProjectPrivate() {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);
  const { t } = useTranslation();
  const { id } = useParams();
  const [projectPrivate, setProjectPrivate] = useState({});
  const [labsEnum, setLabsEnum] = useState([]);
  const [stateEnum, setStateEnum] = useState([]);
  const [userEnum, setUserEnum] = useState([]);
  const [maxMembers, setMaxMembers] = useState(0);
  const [selectedUserRoleChange, setSelectedUserRoleChange] = useState("");
  const [userToChangeRole, setUserToChangeRole] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const userList = userStore((state) => state.userList);
  const currentState = 0;
  const [stateValue, setStateValue] = useState(0);
  const [isProjectFetched, setIsProjectFetched] = useState(false);
  const privateProjectId = projectPrivate.id;


  useEffect(() => {
    if (!isProjectFetched) {
      fetchProject();
      fetchData();
    }
  }, [id, isProjectFetched]);

  const fetchProject = async () => {
    try {
      const urlPrivProj = new URL(`${Base_url_projects}private`);
      urlPrivProj.searchParams.append("id", id);

      const projectResponse = await fetch(urlPrivProj, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      const projectData = await projectResponse.json();
      setProjectPrivate(projectData);
      setIsProjectFetched(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const labsEnumResponse = await fetch(`${Base_url_lab}enum-unconfirmed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const labsEnumData = await labsEnumResponse.json();
      setLabsEnum(labsEnumData);

      const stateEnumResponse = await fetch(`${Base_url_projects}state-enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const stateEnumData = await stateEnumResponse.json();
      setStateEnum(stateEnumData);
    } catch (error) {
      console.error(error);
    }

    try {
      const userEnumResponse = await fetch(`${Base_url_projects}user-enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      const userEnumData = await userEnumResponse.json();
      setUserEnum(userEnumData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetMaxMembers = (e) => {
    const { value } = e.target;
    setMaxMembers(value);
    defineMaxMembers();
  };

  const defineMaxMembers = async () => {
    try {
      const urlMaxMembers = new URL(`${Base_url_projects}max-members`);
      urlMaxMembers.searchParams.append("projectId", projectPrivate.id);
      urlMaxMembers.searchParams.append("maxMembers", maxMembers);

      const maxMemberResponse = await fetch(urlMaxMembers, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (maxMemberResponse.ok) {
        toast.success(t("Max members updated successfully"));
      } else {
        toast.error(t("Error updating max members"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = () => {
    console.log("projectPrivate", projectPrivate);
    navigate(`/domcast/project/edit/${id}`, {
      state: { projectPrivate, labsEnum, stateEnum },
    });
  };

  const onPlanner = () => {
    if (window.screen.width > 768) {
      return <TaskListGantt id={id} />;
    } else {
      return <TaskListMobile id={id} />;
    }
  };

  const openChat = () => {
    console.log("open chat");
  };

  const changeRole = async () => {
    console.log("projectId", projectPrivate.id);
    console.log("userId", userToChangeRole);
    console.log("role", selectedUserRoleChange);

    try {
      const urlChangeRole = new URL(`${Base_url_projects}role`);
      urlChangeRole.searchParams.append("projectId", projectPrivate.id);
      urlChangeRole.searchParams.append("userId", userToChangeRole);
      urlChangeRole.searchParams.append("role", selectedUserRoleChange);

      const changeRoleResponse = await fetch(urlChangeRole, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (changeRoleResponse.ok) {
        const projectResponse = await changeRoleResponse.json();
        setProjectPrivate(projectResponse);
        fetchProject();
        toast.success(t("Role changed successfully"));
      } else {
        toast.error(t("Error changing role"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeMember = async () => {
    console.log("projectId", projectPrivate.id);
    console.log("userId", userToChangeRole);

    try {
      const urlRemoveMember = new URL(`${Base_url_projects}remove-user`);
      urlRemoveMember.searchParams.append("projectId", projectPrivate.id);
      urlRemoveMember.searchParams.append("userId", userToChangeRole);

      const removeMemberResponse = await fetch(urlRemoveMember, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (removeMemberResponse.ok) {
        // map the projectUsers and remove the user with the id===userToChangeRole from that array
        projectPrivate.projectUsers = projectPrivate.projectUsers.filter(
          (user) => user.id !== userToChangeRole
        );
        fetchProject();
        toast.success(t("Member removed successfully"));
      } else {
        toast.error(t("Error removing member"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStateEnum = stateEnum.filter((state) => {
    switch (currentState) {
      case 2: // READY
      case 5: // FINISHED
        return false;
      case 3: // APPROVED
        return state.intValue === 4; // IN_PROGRESS
      case 6: // CANCELLED
        return state.intValue === 1; // PLANNING
      case 4: // IN_PROGRESS
        return state.intValue === 5 || state.intValue === 6; // FINISHED or CANCELLED
      default:
        return true;
    }
  });

  const updateProjectState = async () => {
    const urlUpdateState = new URL(`${Base_url_projects}state`);
    urlUpdateState.searchParams.append("id", projectPrivate.id);
    urlUpdateState.searchParams.append("newState", stateValue);

    try {
      const updateStateResponse = await fetch(urlUpdateState, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (updateStateResponse.ok) {
        setProjectPrivate({
          ...projectPrivate,
          state: projectPrivate.state,
        });
        toast.success(t("State updated successfully"));
      } else {
        toast.error(t("Error updating state"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Row>
        <Col style={{ width: "30rem" }}>
          <Card style={{ border: "none" }}>
            {projectPrivate && labsEnum.length > 0 && stateEnum.length > 0 && (
              <Card.Body className="p-3">
                <Card.Title className="my-5">{projectPrivate.name}</Card.Title>
                <Card.Subtitle className="my-2 text-muted">
                  <Row>
                    <Col md={2}>
                      <h6
                        style={{
                          fontWeight: "bold",
                          color: "var(--color-yellow-02)",
                        }}
                      >
                        Lab:
                      </h6>
                    </Col>
                    {projectPrivate.labId && (
                      <Col md={6}>
                        {
                          labsEnum.find(
                            (lab) => lab.id === projectPrivate.labId
                          )?.name
                        }
                      </Col>
                    )}
                  </Row>
                </Card.Subtitle>
                <Card.Text>
                  <Row>
                    <Col md={2}>
                      <h6
                        style={{
                          fontWeight: "bold",
                          color: "var(--color-yellow-02)",
                        }}
                      >
                        State:
                      </h6>
                    </Col>
                    {projectPrivate.state && (
                      <Col md={6}>
                        {
                          stateEnum.find(
                            (state) => state.intValue === projectPrivate.state
                          )?.name
                        }
                      </Col>
                    )}
                  </Row>
                </Card.Text>
                <Card.Text>
                  <Row>
                    <Col md={2}>
                      <h6
                        style={{
                          fontWeight: "bold",
                          color: "var(--color-yellow-02)",
                        }}
                      >
                        Description & Motivation:
                      </h6>
                    </Col>
                    {projectPrivate.description && (
                      <Col md={6}>{projectPrivate.description}</Col>
                    )}
                  </Row>
                </Card.Text>
                <Card.Text>
                  <Row>
                    <Col md={2}>
                      <h6
                        style={{
                          fontWeight: "bold",
                          color: "var(--color-yellow-02)",
                        }}
                      >
                        Start Date:
                      </h6>
                    </Col>
                    {projectPrivate.projectedStartDate && (
                      <Col md={6}>
                        {projectPrivate.projectedStartDate.split("T")[0]}
                      </Col>
                    )}
                  </Row>
                </Card.Text>
                <Card.Text>
                  <Row>
                    <Col md={2}>
                      <h6
                        style={{
                          fontWeight: "bold",
                          color: "var(--color-yellow-02)",
                        }}
                      >
                        End Date:
                      </h6>
                    </Col>
                    {projectPrivate.deadline && (
                      <Col md={6}>{projectPrivate.deadline.split("T")[0]}</Col>
                    )}
                  </Row>
                </Card.Text>
                <Row className="my-2">
                  <Col md={2}>
                    <h6
                      style={{
                        fontWeight: "bold",
                        color: "var(--color-yellow-02)",
                      }}
                    >
                      Team:
                    </h6>
                  </Col>
                  <Col md={6}>
                    {(projectPrivate.projectUsers || [])
                      .sort((a, b) => a.role - b.role)
                      .map((projectUser, index) => (
                        <span
                          key={index}
                          style={{
                            color:
                              projectUser.role === 1 || projectUser.role === 2
                                ? "var(--color-blue-01)"
                                : "var(--color-blue-03)",

                            fontWeight:
                              projectUser.role === 1 || projectUser.role === 2
                                ? "bold"
                                : "normal",
                          }}
                          className="mx-1"
                        >
                          {projectUser.firstName} {projectUser.lastName}
                          {index < projectPrivate.projectUsers.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col md={2}>
                    <h6
                      style={{
                        fontWeight: "bold",
                        color: "var(--color-yellow-02)",
                      }}
                    >
                      Keywords:
                    </h6>
                  </Col>
                  <Col md={6}>
                    {(projectPrivate.keywords || []).map((keyword, index) => (
                      <span
                        key={index}
                        style={{ color: "var(--color-blue-03)" }}
                        className="mx-1"
                      >
                        {keyword.name}
                        {index < projectPrivate.keywords.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col md={2}>
                    <h6
                      style={{
                        fontWeight: "bold",
                        color: "var(--color-yellow-02)",
                      }}
                    >
                      Skills:
                    </h6>
                  </Col>
                  <Col md={6}>
                    {(projectPrivate.skills || []).map((skill, index) => (
                      <span
                        key={index}
                        style={{ color: "var(--color-blue-03)" }}
                        className="mx-1"
                      >
                        {skill.name}
                        {index < projectPrivate.keywords.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col md={2}>
                    <h6
                      style={{
                        fontWeight: "bold",
                        color: "var(--color-yellow-02)",
                      }}
                    >
                      Compon.:
                    </h6>
                  </Col>
                  {projectPrivate.resources && (
                    <Col md={6}>
                      {projectPrivate.resources
                        .filter((resource) => resource.type === 1)
                        .map((asset, index) => (
                          <span
                            key={index}
                            style={{ color: "var(--color-blue-03)" }}
                            className="mx-1"
                          >
                            {asset.name}
                            {index < projectPrivate.keywords.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                    </Col>
                  )}
                </Row>
                {projectPrivate.resources && (
                  <Row className="my-2">
                    <Col md={2}>
                      <h6
                        style={{
                          fontWeight: "bold",
                          color: "var(--color-yellow-02)",
                        }}
                      >
                        Resources:
                      </h6>
                    </Col>
                    <Col md={6}>
                      {projectPrivate.resources
                        .filter((resource) => resource.type === 2)
                        .map((asset, index) => (
                          <span
                            key={index}
                            style={{ color: "var(--color-blue-03)" }}
                            className="mx-1"
                          >
                            {asset.name}
                            {index < projectPrivate.keywords.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                    </Col>
                  </Row>
                )}
              </Card.Body>
            )}
          </Card>
        </Col>
        {projectPrivate && labsEnum.length > 0 && stateEnum.length > 0 && (
          <Col style={{ width: "20rem" }}>
            {projectPrivate.projectUsers &&
              labsEnum.length > 0 &&
              stateEnum.length > 0 && (
                <Row className="d-flex justify-content-center mt-4">
                  <Col md={3}>
                    {projectPrivate &&
                      projectPrivate.projectUsers &&
                      (projectPrivate.projectUsers.type === 1 ||
                        projectPrivate.projectUsers.type === 2) && (
                        <Button
                          variant="secondary me-4"
                          style={{
                            width: "10rem",
                            color: "var(--color-coal",
                            backgroundColor: "var(--color-yellow-01",
                          }}
                          onClick={onEdit}
                          className="mt-3 me-2"
                        >
                          Edit project infos
                        </Button>
                      )}
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="secondary"
                      style={{
                        width: "10rem",
                        color: "var(--color-coal",
                        backgroundColor: "var(--color-yellow-01",
                      }}
                      onClick={onPlanner}
                      className="mt-3"
                    >
                      Planner
                    </Button>
                  </Col>
                </Row>
              )}
            <Row className="d-flex justify-content-center mt-4">
              {projectPrivate &&
                projectPrivate.projectUsers &&
                projectPrivate.projectUsers.type === 2 &&
                projectPrivate.mainManager && (
                  <Col md={3}>
                    <Button
                      variant="secondary"
                      style={{
                        width: "10rem",
                        color: "var(--color-coal",
                        backgroundColor: "var(--color-yellow-01",
                      }}
                      onClick={() => setShowUserModal(true)}
                    >
                      Add members
                    </Button>
                  </Col>
                )}{" "}
              <Col md={3}>
                <Button
                  variant="secondary"
                  style={{
                    width: "10rem",
                    color: "var(--color-coal",
                    backgroundColor: "var(--color-yellow-01",
                  }}
                  onClick={openChat}
                >
                  Chat
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="secondary"
                  style={{
                    width: "10rem",
                    color: "var(--color-coal",
                    backgroundColor: "var(--color-yellow-01",
                  }}
                  onClick={navigate("/domcast//logs/list", { state: { privateProjectId } })}
                >
                  Log List
                </Button>
              </Col>
            </Row>
            {projectPrivate && labsEnum.length > 0 && stateEnum.length > 0 && (
              <Row className="d-flex justify-content-center mt-5">
                <Col md={3}>
                  <Form.Select
                    value={projectPrivate.state}
                    onChange={(e) => setStateValue(e.target.value)}
                    style={{ width: "10rem" }}
                  >
                    <option value="" disabled>
                      Update state
                    </option>
                    {filteredStateEnum.map((state) => (
                      <option key={state.intValue} value={state.intValue}>
                        {state.name.replace("_", " ")}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Button
                    variant="primary"
                    style={{
                      width: "10rem",
                      color: "var(--color-white",
                      backgroundColor: "var(--color-blue-01",
                    }}
                    onClick={updateProjectState}
                    className="me-2"
                  >
                    Update state
                  </Button>
                </Col>
              </Row>
            )}

            {projectPrivate.projectUsers &&
              userEnum.length > 0 &&
              projectPrivate.projectUsers.type === 2 && (
                <Row className="d-flex justify-content-center mt-5">
                  <Col md={3}>
                    <Form.Select
                      value={userToChangeRole}
                      onChange={(e) => setUserToChangeRole(e.target.value)}
                      style={{ width: "10rem" }}
                    >
                      {projectPrivate.projectUsers
                        .filter(
                          (user) =>
                            user !== projectPrivate.mainManager &&
                            !(user.id === projectPrivate.mainManager.id)
                        )
                        .map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      value={selectedUserRoleChange}
                      onChange={(e) =>
                        setSelectedUserRoleChange(e.target.value)
                      }
                      style={{ width: "10rem" }}
                    >
                      <option value="" disabled>
                        Role
                      </option>
                      {userEnum
                        .filter((role) => role.id === 2 || role.id === 3)
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Button
                      variant="primary"
                      style={{
                        width: "10rem",
                        color: "var(--color-white",
                        backgroundColor: "var(--color-blue-01",
                      }}
                      onClick={changeRole}
                      className="me-2"
                    >
                      Change role
                    </Button>
                  </Col>
                </Row>
              )}
            {projectPrivate.projectUsers &&
              userEnum.length > 0 &&
              projectPrivate.projectUsers.type === 2 && (
                <Row className="d-flex justify-content-center mt-5">
                  <Col md={3}>
                    <Form.Select
                      value={userToChangeRole}
                      onChange={(e) => setUserToChangeRole(e.target.value)}
                      style={{ width: "10rem" }}
                    >
                      {projectPrivate.projectUsers
                        .filter(
                          (user) =>
                            user !== projectPrivate.mainManager &&
                            !(user.id === projectPrivate.mainManager.id)
                        )
                        .map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Button
                      variant="primary"
                      style={{
                        width: "10rem",
                        color: "var(--color-white",
                        backgroundColor: "var(--color-blue-01",
                      }}
                      onClick={removeMember}
                      className="me-2"
                    >
                      Remove member
                    </Button>
                  </Col>
                </Row>
              )}
            {projectPrivate.projectUsers && (
              <Row className="d-flex justify-content-center mt-5">
                <Table striped bordered hover>
                  <thead style={{}}>
                    <tr>
                      <th>User name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectPrivate.candidates.map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            style={{
                              width: "10rem",
                              color: "var(--color-white",
                              backgroundColor: "var(--color-blue-01",
                            }}
                            onClick={() => {
                              console.log("accept user");
                            }}
                          >
                            Accept
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {projectPrivate.invited.map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>
                          <span className="text-muted">Invited</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            )}
            {projectPrivate && projectPrivate.projectUsers.type === 2 &&
              projectPrivate.mainManager && ( 
                <Row className="d-flex justify-content-center mt-5">
                  <Col md={3} className="d-flex justifiy-content-end">
                    <Form.Control
                      type="number"
                      value={maxMembers}
                      onChange={handleSetMaxMembers}
                      className="ms-5"
                      style={{ width: "5rem" }}
                    />
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="secondary"
                      style={{
                        width: "10rem",
                        color: "var(--color-white",
                        backgroundColor: "var(--color-blue-01",
                      }}
                      onClick={defineMaxMembers}
                    >
                      Set max members
                    </Button>
                  </Col>
                </Row>
              )}
          </Col>
        )}
      </Row>
      {projectPrivate && labsEnum.length > 0 && stateEnum.length > 0 && (
        <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Invite user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User name</th>
                  <th>Invite</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        style={{
                          width: "10rem",
                          color: "var(--color-white",
                          backgroundColor: "var(--color-blue-01",
                        }}
                        onClick={() => {
                          console.log("invite user");
                        }}
                      >
                        Invite
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ProjectPrivate;
