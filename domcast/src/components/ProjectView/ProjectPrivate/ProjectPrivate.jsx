import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./ProjectPrivate.css";
import { userStore } from "../../../stores/UserStore";
import {
  Base_url_projects,
  Base_url_lab,
} from "../../../functions/UsersFunctions";
import ProjectEdit from "../../ProjectEdit/ProjectEdit";
import TaskListGantt from "../../TaskList/TaskListGantt/TaskListGantt";
import TaskListMobile from "../../TaskList/TaskListMobile/TaskListMobile";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProjectPrivate = ({project,
  labsEnum,
  stateEnum }) => {
  const loggedUser = userStore((state) => state.loggedUser);
/*   const [labsEnum, setLabsEnum] = useState([]);
  const [stateEnum, setStateEnum] = useState([]);
  const [project, setProject] = useState({}); */
  const { t } = useTranslation();
  const { id } = useParams();

/*   useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
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
  };
 */
  const onEdit = () => {
    const projectUsers = project.projectUsers.map(
      (projectUser) => projectUser.id
    );
    if (
      project.mainManager.id === loggedUser.id ||
      projectUsers.includes(loggedUser.id)
    ) {
      <ProjectEdit id={id} />;
    } else {
      toast.error(t("projectPrivate.notAuthorized"));
    }
  };

  const onPlanner = () => {
    if (window.screen.width > 768) {
      return <TaskListGantt id={id} />;
    } else {
      return <TaskListMobile id={id} />;
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {labsEnum.find((lab) => lab.id === project.labId)?.name}
        </Card.Subtitle>
        <Card.Text>
          {stateEnum.find((state) => state.id === project.state)?.name}
        </Card.Text>
        <Card.Text>{project.description}</Card.Text>
        <Card.Text>
          Start Date: {project.projectedStartDate.split("T")[0]}
        </Card.Text>
        <Card.Text>Duration: {project.deadline.split("T")[0]}</Card.Text>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Team:
          </h6>
          <span style={{ fontWeight: "bold", color: "var(--color-blue-01)" }}>
            {project.mainManager.firstName} {project.mainManager.lastName}
          </span>
          {project.projectUsers.map((member, index) => (
            <span
              key={index}
              style={{ color: "var(--color-blue-03)" }}
              className="mx-1"
            >
              {member.firstName} {member.lastName}
            </span>
          ))}
        </div>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Keywords:
          </h6>
          {project.keywords.map((keyword, index) => (
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
          {project.skills.map((skill, index) => (
            <span
              key={index}
              style={{ color: "var(--color-blue-03)" }}
              className="mx-1"
            >
              {skill.name}
            </span>
          ))}
        </div>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Components:
          </h6>
          {project.resources
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
        </div>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Resources:
          </h6>
          {project.resources
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
        </div>
        {(project.mainManager || project.projectUsers.type === 2) && (
          <Button variant="primary" onClick={onEdit} className="mt-3 me-2">
            Edit project infos
          </Button>
        )}
        <Button variant="secondary" onClick={onPlanner} className="mt-3">
          Planner
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectPrivate;
