import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
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

  useEffect(() => {
    fetchProject();
    fetchData();
  }, [id]);

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

  return (
    <Card style={{ border: "none" }}>
      {projectPrivate && labsEnum.length > 0 && stateEnum.length > 0 && (
        <Card.Body className="p-3">
          <Card.Title className="my-5">{projectPrivate.name}</Card.Title>
          <Card.Subtitle className="my-2 text-muted">
            <Row>
              <Col md={1}>
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
                <Col md={3}>
                  {
                    labsEnum.find((lab) => lab.id === projectPrivate.labId)
                      ?.name
                  }
                </Col>
              )}
            </Row>
          </Card.Subtitle>
          <Card.Text>
            <Row>
              <Col md={1}>
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
                <Col md={3}>
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
              <Col md={1}>
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
                <Col md={3}>{projectPrivate.description}</Col>
              )}
            </Row>
          </Card.Text>
          <Card.Text>
            <Row>
              <Col md={1}>
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
                <Col md={3}>
                  {projectPrivate.projectedStartDate.split("T")[0]}
                </Col>
              )}
            </Row>
          </Card.Text>
          <Card.Text>
            <Row>
              <Col md={1}>
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
                <Col md={3}>{projectPrivate.deadline.split("T")[0]}</Col>
              )}
            </Row>
          </Card.Text>
          <Row className="my-2">
            <Col md={1}>
              <h6
                style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}
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
                    {index < projectPrivate.projectUsers.length - 1 ? ", " : ""}
                  </span>
                ))}
            </Col>
          </Row>
          <Row className="my-2">
            <Col md={1}>
              <h6
                style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}
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
            <Col md={1}>
              <h6
                style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}
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
            <Col md={1}>
              <h6
                style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}
              >
                Compon.:
              </h6>
            </Col>
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
                  </span>
                ))}
            </Col>
          </Row>
          <Row className="my-2">
            <Col md={1}>
              <h6
                style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}
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
                  </span>
                ))}
            </Col>
          </Row>{" "}
          {(projectPrivate.mainManager ||
            projectPrivate.projectUsers.type === 2) && (
            <Button
              variant="primary me-4"
              style={{
                width: "10rem",
                color: "var(--color-white",
                backgroundColor: "var(--color-blue-01",
              }}
              onClick={onEdit}
              className="mt-3 me-2"
            >
              Edit project infos
            </Button>
          )}
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
        </Card.Body>
      )}
    </Card>
  );
}

export default ProjectPrivate;
