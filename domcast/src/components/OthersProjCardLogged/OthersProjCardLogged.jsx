import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./OthersProjCardLogged.css";
import ProjectPrivate from "../ProjectView/ProjectPrivate/ProjectPrivate";
import ProjectPublic from "../ProjectView/ProjectPublic/ProjectPublic";
import { userStore } from "../../stores/UserStore";
import { Base_url_projects } from "../../functions/UsersFunctions";

const OthersProjCardLogged = ({
  id,
  title,
  lab,
  description,
  vacancies,
  state,
}) => {
  const loggedUser = userStore((state) => state.loggedUser);
  const [project, setProject] = useState({});

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
    const projectResponse = await fetch(`${Base_url_projects}public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: loggedUser.sessionToken,
        id: loggedUser.id,
      },
    });
    const projectData = await projectResponse.json();
    setProject(projectData);
    }
    catch (error) {
      console.error(error);
    }
  };



  const goToProject = () => {
    // check if loggedUser is the main manager or a collaborator of the project
    if (project.mainManager.id === loggedUser.id || project.collaborators.some((collaborator) => collaborator.id === loggedUser.id)) {
      <ProjectPrivate id={id} />;
    } else {
      <ProjectPublic id={id} />;
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
        <Button variant="primary" className="custom-button" onClick={goToProject}>
          More info »
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OthersProjCardLogged;
