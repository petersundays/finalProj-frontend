import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./ProjectPublic.css";
import { userStore } from "../../../stores/UserStore";
import {
  Base_url_projects,
  Base_url_lab,
} from "../../../functions/UsersFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function ProjectPublic() {
  const loggedUser = userStore((state) => state.loggedUser);
  const { t } = useTranslation();
  const { id } = useParams();
  const [projectPublic, setProjectPublic] = useState({});
  const [labsEnum, setLabsEnum] = useState([]);
  const [stateEnum, setStateEnum] = useState([]);

  useEffect(() => {
    fetchProject();
    fetchData();
  }, [id]);

  const fetchProject = async () => {
    try {
      const urlPubProj = new URL(`${Base_url_projects}public`);
      urlPubProj.searchParams.append("id", id);

      const projectResponse = await fetch(urlPubProj, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      const projectData = await projectResponse.json();
      setProjectPublic(projectData);
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

  const onJoin = async () => {
    try {
      const response = await fetch(`${Base_url_projects}apply/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (response.ok) {
        toast.success(t("applicationSent"));
      } else {
        toast.error(t("applicationNotSent"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={{border: "none"}}>
      {projectPublic && labsEnum.length > 0 && stateEnum.length > 0 && (
        <Card.Body className="p-3">
          <Card.Title className="my-5">{projectPublic.name}</Card.Title>
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
              <Col md={3}>{projectPublic.labId}</Col>
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
              <Col md={3}>{projectPublic.state}</Col>
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
              <Col md={3}>{projectPublic.description}</Col>
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
              <Col md={3}>{projectPublic.projectedStartDate.split('T')[0]}</Col>
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
              <Col md={3}>{projectPublic.deadline.split('T')[0]}</Col>
            </Row>
          </Card.Text>
          <Row className="my-2">
            <Col md={1}>
              <h6
                style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}
              >
                Creator:
              </h6>
            </Col>
            <Col md={3}>
              {projectPublic.mainManager && (
                <span
                  style={{ fontWeight: "bold", color: "var(--color-blue-01)" }}
                >
                  {projectPublic.mainManager.firstName}{" "}
                  {projectPublic.mainManager.lastName}
                </span>
              )}
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
              {(projectPublic.keywords || []).map((keyword, index) => (
                <span
                  key={index}
                  style={{ color: "var(--color-blue-03)" }}
                  className="mx-1"
                >
                  {keyword.name}
                  {index < projectPublic.keywords.length - 1 ? ", " : ""}
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
              {(projectPublic.skills || []).map((skill, index) => (
                <span
                  key={index}
                  style={{ color: "var(--color-blue-03)" }}
                  className="mx-1"
                >
                  {skill.name}
                  {index < projectPublic.keywords.length - 1 ? ", " : ""}
                </span>
              ))}
            </Col>
          </Row>
          {projectPublic.vacancies > 0 ? (
            <Button variant="primary" onClick={onJoin} className="mt-3">
              Join this project
            </Button>
          ) : (
            <span
              className="mt-2"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "var(--color-yellow-02)",
              }}
            >
              No vacancies
            </span>
          )}
        </Card.Body>
      )}
    </Card>
  );
}

export default ProjectPublic;
