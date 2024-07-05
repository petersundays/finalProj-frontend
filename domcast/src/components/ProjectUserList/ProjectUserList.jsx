import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import OthersProjCardLogged from "../OthersProjCardLogged/OthersProjCardLogged.jsx";
import "./ProjectUserList.css";
import {
  Base_url_projects,
  Base_url_lab,
} from "../../functions/UsersFunctions.jsx";
import { userStore } from "../../stores/UserStore.jsx";
import { useNavigate } from "react-router-dom";

const ProjectUserList = () => {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);

  const userToken = loggedUser.sessionToken;
  const userId = loggedUser.id;

  const [cards, setCards] = useState([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [orderBy, setOrderBy] = useState("state");
  const [orderAsc, setOrderAsc] = useState(true);
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const [labList, setLabList] = useState([]);
  const [projectStateList, setProjectStateList] = useState([]);
  const [enumsFetched, setEnumsFetched] = useState(false);
  const [showMoreProjects, setShowMoreProjects] = useState(6);
  const [numberOfProjects, setNumberOfProjects] = useState(0);

  useEffect(() => {
    fetchEnums();
  }, []);

  useEffect(() => {
    if (enumsFetched) {
      fetchProjects(showMoreProjects);
    }
  }, [enumsFetched, showMoreProjects]);

  const formatName = (name) => {
    return name
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const fetchEnums = async () => {
    try {
      try {
        const labsResponse = await fetch(`${Base_url_lab}enum`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: userToken,
            id: userId,
          },
        });
        if (labsResponse.ok) {
          const labsData = await labsResponse.json();
          setLabList(labsData);
          console.log("Labs fetched:", labsData);
        }
      } catch (error) {
        console.error("Error fetching labs:", error);
      }

      try {
        const projectsResponse = await fetch(`${Base_url_projects}state-enum`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjectStateList(projectsData);
          console.log("Project states fetched:", projectsData);
        }
      } catch (error) {
        console.error("Error fetching project states:", error);
      }

      setEnumsFetched(true);
    } catch (error) {
      console.error("Error fetching enums:", error);
    }
  };

  const fetchProjects = async (showMoreProjects) => {
    if (!searchQuery && !orderBy && !orderAsc) {
      setOrderBy("name");
      setOrderAsc(true);
      console.log("searchQuery no fetchProjects 1: ", searchQuery);
    } else {
      try {
        const url = new URL(`${Base_url_projects}`);
        url.searchParams.append("userId", userId);
        url.searchParams.append("orderBy", orderBy);
        url.searchParams.append("orderAsc", orderAsc);
        if (searchQuery) {
          if (searchType === "state") {
            url.searchParams.append("state", searchQuery);
          } else if (searchType === "keyword") {
            url.searchParams.append("keyword", searchQuery);
          } else if (searchType === "skill") {
            url.searchParams.append("skill", searchQuery);
          } else {
            url.searchParams.append("name", searchQuery);
          }
        }
        url.searchParams.append("pageSize", showMoreProjects);
        url.searchParams.append("pageNumber", 1);

        const projectsResponse = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          console.log("projectsData", projectsData);
          const projectsList = projectsData.projects;
          const totalProjects = projectsData.totalProjects;
          const cardsData = projectsList.map((project) => {
            return {
              ...project,
              title: project.name,
              lab: formatName(
                labList.find((lab) => lab.id === project.labId)?.name
              ),
              description: project.description,
              state: formatName(
                projectStateList.find(
                  (stateObj) => stateObj.intValue === project.state
                )?.name
              ),
              vacancies: project.vacancies,
              link: `/project/view/${project.id}`,
            };
          });
          setCards(cardsData);
          setNumberOfProjects(totalProjects);
          console.log("Projects fetched:", cardsData);
        } else {
          console.log("Error fetching projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleShowMore = () => {
    setShowMoreProjects((prev) => prev + 6);
    setVisibleRows(visibleRows + 2);
  };

  const visibleCards = cards.slice(0, visibleRows * 3);

  return (
    <Card
      className="mt-2 card-proj-not-logged"
      style={{ border: "none", maxWidth: "100rem" }}
    >
      <Row className="mt-2 justify-content-center">
        {visibleCards.map((card, index) => (
          <Col key={index} className="my-3 mx-0">
            <OthersProjCardLogged {...card} />
          </Col>
        ))}
      </Row>
      {cards.length < numberOfProjects && (
        <div className="text-center">
          <Button
            className="custom-show-more-btn mb-3"
            onClick={handleShowMore}
            variant="secondary"
            style={{
              backgroundColor: "var(--color-blue-03)",
              borderColor: "var(--color-blue-03)",
              color: "var(--color-white)",
              fontWeight: "500",
            }}
          >
            Show More
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProjectUserList;
