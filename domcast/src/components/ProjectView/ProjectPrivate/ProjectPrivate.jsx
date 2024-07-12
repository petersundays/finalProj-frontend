import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./ProjectPrivate.css";
import { userStore } from "../../../stores/UserStore";

import ProjectEdit from "../../ProjectEdit/ProjectEdit";
import TaskListGantt from "../../TaskList/TaskListGantt/TaskListGantt";
import TaskListMobile from "../../TaskList/TaskListMobile/TaskListMobile";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";

function ProjectPrivate () {
  const loggedUser = userStore((state) => state.loggedUser);
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const { projectPrivate, labsEnum, stateEnum } = location.state || {};

  const onEdit = () => {

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
        <Card.Title>{projectPrivate.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {labsEnum.find((lab) => lab.id === projectPrivate.labId)?.name}
        </Card.Subtitle>
        <Card.Text>
          {stateEnum.find((state) => state.id === projectPrivate.state)?.name}
        </Card.Text>
        <Card.Text>{projectPrivate.description}</Card.Text>
        <Card.Text>
          Start Date: {projectPrivate.projectedStartDate.split("T")[0]}
        </Card.Text>
        <Card.Text>Duration: {projectPrivate.deadline.split("T")[0]}</Card.Text>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Team:
          </h6>
          <span style={{ fontWeight: "bold", color: "var(--color-blue-01)" }}>
            {projectPrivate.mainManager.firstName} {projectPrivate.mainManager.lastName}
          </span>
          {projectPrivate.projectUsers.map((member, index) => (
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
          {projectPrivate.keywords.map((keyword, index) => (
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
          {projectPrivate.skills.map((skill, index) => (
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
        </div>
        <div>
          <h6 style={{ fontWeight: "bold", color: "var(--color-yellow-02)" }}>
            Resources:
          </h6>
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
        </div>
        {(projectPrivate.mainManager || projectPrivate.projectUsers.type === 2) && (
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
