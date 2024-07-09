import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./ProjectPublic.css";
import { userStore } from "../../stores/UserStore";
import { Base_url_projects } from "../../functions/UsersFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ProjectPublic = ({ id }) => {
  const loggedUser = userStore((state) => state.loggedUser);
  const { t } = useTranslation();
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
    }
    catch (error) {
      console.error(error);
    }
  };


  return (
    <Card>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {project.workplace}
        </Card.Subtitle>
        <Card.Text>{project.state}</Card.Text>
        <Card.Text>{project.description}</Card.Text>
        <Card.Text>Start Date: {project.projectedStartDate}</Card.Text>
        <Card.Text>Duration: {project.deadline}</Card.Text>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Team:
          </h6>
          <span style={{ fontWeight: "bold", color: "var(--color-blue-01)" }}>
            {project.mainManager}
          </span>
          {project.collaborators.map((member, index) => (
            <span
              key={index}
              style={{ color: "var(--color-blue-03)" }}
              className="mx-1"
            >
              {member.name}
            </span>
          ))}
        </div>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Keywords:
          </h6>
          {project.keywords.name.map((keyword, index) => (
            <span
              key={index}
              style={{ color: "var(--color-blue-03)" }}
              className="mx-1"
            >
              {keyword.name}
            </span>
          ))}
        </div>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Skills:
          </h6>
          {project.skills.name.map((skill, index) => (
            <span
              key={index}
              style={{ color: "var(--color-blue-03)" }}
              className="mx-1"
            >
              {skill.name}
            </span>
          ))}
        </div>
        {project.vacancies > 0 ? (
        <Button variant="primary" onClick={onJoin} className="mt-3">
          Join this project
        </Button>
        ) : (
          <span className="mt-2" style={{ fontSize: "16px", fontWeight: "bold", color: "var(--color-yellow-02)"}}>
            No vacancies
          </span>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectPublic;
