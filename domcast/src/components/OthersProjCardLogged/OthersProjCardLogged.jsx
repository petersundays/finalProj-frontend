import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./OthersProjCardLogged.css";
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
  applications,
}) => {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);
  const [projectPrivate, setProjectPrivate] = useState({});
  const [projectPublic, setProjectPublic] = useState({});
  const [labsEnum, setLabsEnum] = useState([]);
  const [stateEnum, setStateEnum] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchProject();
    fetchData();
  }, []);

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
      console.log("projectData em cada card", projectData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
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
  };

  const handleApproval = async (projectId, answer) => {
    await approveProject(projectId, answer);
  };

  const approveProject = async (projectId, answer) => {
    const url = new URL(`${Base_url_projects}approve`);
    url.searchParams.append("id", projectId);
    url.searchParams.append("newState", answer);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (response.ok) {
        const data = await response.text();
        toast.success(data);
      } else {
        console.log("Error sending your answer");
        toast.error("Error sending your answer");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending your answer");
    }
  };

  const goToProject = async () => {
    // check if loggedUser is the main manager or a collaborator of the projectPublic

    if (
      projectPublic.mainManager.id === loggedUser.id ||
      projectPublic.projectUsers.some((user) => user.id === loggedUser.id)
    ) {
      navigate(`/domcast/myproject/view/${projectPublic.id}`);
    } else {
      navigate(`/domcast/project/view/${projectPublic.id}`);
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
        {applications && (
          <>
            <Button
              variant="tertiary"
              style={{ color: "var(--color-green-01)" }}
              onClick={() => handleApproval(id, 3)}
            >
              - Approve -
            </Button>
            <Button
              variant="tertiary"
              style={{ color: "var(--color-red-01)" }}
              onClick={() => handleApproval(id, 1)}
            >
              - Decline -
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default OthersProjCardLogged;
