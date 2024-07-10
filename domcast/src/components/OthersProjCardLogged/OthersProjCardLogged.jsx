import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./OthersProjCardLogged.css";
import ProjectPrivate from "../ProjectView/ProjectPrivate/ProjectPrivate";
import ProjectPublic from "../ProjectView/ProjectPublic/ProjectPublic";
import { userStore } from "../../stores/UserStore";
import {
  Base_url_projects,
  Base_url_lab,
} from "../../functions/UsersFunctions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const OthersProjCardLogged = ({
  id,
  title,
  lab,
  description,
  vacancies,
  state,
}) => {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);
  const [project, setProject] = useState({});
  const [labsEnum, setLabsEnum] = useState([]);
  const [stateEnum, setStateEnum] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const projectResponse = await fetch(
        `${Base_url_projects}public?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
        }
      );
      const projectData = await projectResponse.json();
      setProject(projectData);
      console.log("projectData em cada card", projectData);
    } catch (error) {
      console.error(error);
    }
  };

  const goToProject = async () => {
    // check if loggedUser is the main manager or a collaborator of the project
    const projectUsers = project.projectUsers.map(
      (projectUser) => projectUser.id
    );
    if (
      project.mainManager.id === loggedUser.id ||
      projectUsers.includes(loggedUser.id)
    ) {
      try {
        const labsEnumResponse = await fetch(`${Base_url_lab}enum`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
        });
        const labsEnumData = await labsEnumResponse.json();
        console.log("labsEnumData", labsEnumData);
        setLabsEnum(labsEnumData);
      } catch (error) {
        console.error(error);
      }

      try {
        const projectEnumResponse = await fetch(
          `${Base_url_projects}state-enum`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const projectEnumData = await projectEnumResponse.json();
        console.log("projectEnumData", projectEnumData);
        setStateEnum(projectEnumData);
      } catch (error) {
        console.error(error);
      }

      try {
        const projectResponse = await fetch(
          `${Base_url_projects}private?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: loggedUser.sessionToken,
              id: loggedUser.id,
            },
          }
        );
        const projectData = await projectResponse.json();
        setProject(projectData);
      } catch (error) {
        console.log("error", error);
        console.error(error);
      }

      navigate(`/domcast/myproject/view/${project.id}`, {
        state: {
          project,
          labsEnum,
          stateEnum,
        },
      });
    } else {
      navigate(`/domcast/project/view/${project.id}`);
    }
  };

  return (
    <Card className="mb-4 projcard-logged" style={{ width: "22rem" }}>
      <Card.Header
        style={{
          backgroundColor: "var(--color-yellow-01)",
          color: "var(--color-coal)",
          verticalAlign: "middle",
          height: "2.5rem",
        }}
      >
        <Card.Title className="card-title-custom">{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle
          className="mb-2"
          style={{ color: "var(--color-blue-01)" }}
        >
          {lab}
        </Card.Subtitle>
        <Card.Text
          style={{
            height: "3rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {description}
        </Card.Text>
        <div className="my-2 me-2 d-flex justify-content-between align-items-center">
          <div style={{ color: "var(--color-blue-03)" }}>
            <h6 className="h6">Vacancies: {vacancies <= 0 ? 0 : vacancies}</h6>
          </div>
          <div>
            <h6 className="h6">State: {state}</h6>
          </div>
        </div>
        <Button
          variant="primary"
          className="custom-button"
          onClick={goToProject}
        >
          More info »
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OthersProjCardLogged;
