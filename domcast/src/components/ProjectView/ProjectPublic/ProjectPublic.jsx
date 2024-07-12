import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./ProjectPublic.css";
import { userStore } from "../../../stores/UserStore";
import { Base_url_projects } from "../../../functions/UsersFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProjectPublic = ({ projectPublic }) => {
  const loggedUser = userStore((state) => state.loggedUser);
  const { t } = useTranslation();
  // const [projectPublic, setProjectPublic] = useState({});
  const { id } = useParams();

/*   useEffect(() => {
    console.log("loggedUser", loggedUser);
    fetchProject();
    console.log("project public", projectPublic);
  }, []);

   const fetchProject = async () => {
    try {
      const projectResponse = await fetch(`${Base_url_projects}public?id=${id}`, {
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
  }; */

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
        <Card.Title>{projectPublic.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {projectPublic.workplace}
        </Card.Subtitle>
        <Card.Text>{projectPublic.state}</Card.Text>
        <Card.Text>{projectPublic.description}</Card.Text>
        <Card.Text>Start Date: {projectPublic.projectedStartDate}</Card.Text>
        <Card.Text>Duration: {projectPublic.deadline}</Card.Text>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Team:
          </h6>
          <span style={{ fontWeight: "bold", color: "var(--color-blue-01)" }}>
            {projectPublic.mainManager}
          </span>
          {projectPublic.projectUsers.map((member, index) => (
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
          {projectPublic.keywords.map((keyword, index) => (
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
          {projectPublic.skills.map((skill, index) => (
            <span
              key={index}
              style={{ color: "var(--color-blue-03)" }}
              className="mx-1"
            >
              {skill.name}
            </span>
          ))}
        </div>
        {projectPublic.vacancies > 0 ? (
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
