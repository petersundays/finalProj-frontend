import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import OthersProjCardNotLogged from "../OthersProjCardNotLogged/OthersProjCardNotLogged.jsx";
import OthersProjCardLogged from "../OthersProjCardLogged/OthersProjCardLogged.jsx";
import "./ProjectGlobalList.css";
import {
  Base_url_projects,
  Base_url_lab,
  Base_url_skills,
  Base_url_keywords,
} from "../../functions/UsersFunctions.jsx";
import { Typeahead } from "react-bootstrap-typeahead";
import { userStore } from "../../stores/UserStore.jsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function ProjectGlobalList () {
  const { t } = useTranslation();
  const loggedUser = userStore((state) => state.loggedUser);

  const [cards, setCards] = useState([]);
  const [loggedCards, setLoggedCards] = useState([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [orderBy, setOrderBy] = useState("name");
  const [orderAsc, setOrderAsc] = useState(true);
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const [skillList, setSkillList] = useState([]);
  const [keywordList, setKeywordList] = useState([]);
  const [projectNameList, setProjectNameList] = useState([]);

  const [labList, setLabList] = useState([]);
  const [projectStateList, setProjectStateList] = useState([]);
  const [enumsFetched, setEnumsFetched] = useState(false);
  const [showMoreProjects, setShowMoreProjects] = useState(6);
  const [numberOfProjects, setNumberOfProjects] = useState(0);

  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState(null);

  useEffect(() => {
    fetchEnums();
  }, []);

  useEffect(() => {
    if (enumsFetched) {
      fetchProjects(showMoreProjects);
    }
  }, [enumsFetched, showMoreProjects]);

  const formatProjectStateName = (name) => {
    return name
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const fetchEnums = async () => {
    try {
      try {
        const labsResponse = await fetch(`${Base_url_lab}enum-unconfirmed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

      try {
        const skillsResponse = await fetch(`${Base_url_skills}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setSkillList(skillsData);
          console.log("Skills fetched:", skillsData);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }

      try {
        const keywordsResponse = await fetch(`${Base_url_keywords}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (keywordsResponse.ok) {
          const keywordsData = await keywordsResponse.json();
          setKeywordList(keywordsData);
          console.log("Keywords fetched:", keywordsData);
        }
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }

      try {
        const projectNameResponse = await fetch(`${Base_url_projects}names`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (projectNameResponse.ok) {
          const projectNameData = await projectNameResponse.json();
          setProjectNameList(projectNameData);
          console.log("Project names fetched:", projectNameData);
        }
      } catch (error) {
        console.error("Error fetching project names:", error);
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
            console.log("searchQuery no fetchProjects 2: ", searchQuery);
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
              id: project.id,
              title: project.name,
              lab: labList.find((lab) => lab.id === project.labId)?.name,
              description: project.description,
              state: formatProjectStateName(
                projectStateList.find(
                  (stateObj) => stateObj.intValue === project.state
                )?.name
              ),
              members: project.projectUsers.length,
              link: `/project/view/${project.id}`,
            };
          });
          if (!loggedUser.sessionToken) {
            setCards(cardsData);
          } else {
            setLoggedCards(cardsData);
          }
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

  const handleChangeSearchBy = (e) => {
    setSearchQuery("");
    setSearchType(e.target.value);
    setSelectedKeyword(null);
    setSelectedSkill(null);
    setSelectedProjectName(null);
  };

  const handleChangeState = (e) => {
    const selectedStateId = e.target.value;
    console.log("selectedStateId", selectedStateId);
    setSearchQuery(selectedStateId);
  };

  const handleChangeSortBy = (event) => {
    setOrderBy(event.target.value);
  };

  const handleShowMore = () => {
    setShowMoreProjects((prev) => prev + 6);
    setVisibleRows(visibleRows + 2);
  };

  const handleSearch = () => {
    setShowMoreProjects(6);
    fetchProjects(6);
  };

  const visibleCards = !loggedUser.sessionToken
    ? cards.slice(0, visibleRows * 3)
    : loggedCards.slice(0, visibleRows * 3);

  return (
    <Card
      className="mt-2 card-proj-not-logged"
      style={{ border: "none", maxWidth: "100rem" }}
    >
      <Row className="my-3 mx-5 justify-content-center align-content-center">
        <Col className="my-2 me-2" style={{ width: "15rem" }}>
          <Form.Select
            className="me-2"
            onChange={handleChangeSearchBy}
            style={{ width: "15rem" }}
          >
            <option value="name">Name</option>
            <option value="state">State</option>
            <option value="keyword">Keyword</option>
            <option value="skill">Skill</option>
          </Form.Select>
        </Col>
        <Col className="my-2 me-2" style={{ width: "15rem" }}>
          {searchType === "state" ? (
            <Form.Select
              className="me-2"
              onChange={handleChangeState}
              style={{ width: "15rem" }}
            >
              <option value="" disabled selected>
                Select state
              </option>
              {projectStateList.map((state) => (
                <option key={state.id} value={state.id}>
                  {formatProjectStateName(state.name)}
                </option>
              ))}
            </Form.Select>
          ) : searchType === "keyword" ? (
            <Typeahead
              type="text"
              options={keywordList.map((keyword) => keyword)}
              id="searchQueryIdKeyword"
              placeholder="Search"
              selected={selectedKeyword ? [selectedKeyword] : []}
              onChange={(selected) => {
                if (selected.length > 0) {
                  const foundKeyword = keywordList.find(
                    (keyword) => keyword === selected[0]
                  );
                  if (foundKeyword) {
                    setSearchQuery(foundKeyword);
                    setSelectedKeyword(foundKeyword);
                    console.log(
                      "searchQuery no typeahead keyword",
                      searchQuery
                    );
                  }
                }
              }}
              style={{ width: "15rem" }}
            />
          ) : searchType === "skill" ? (
            <Typeahead
              type="text"
              options={skillList.map((skill) => skill.name)}
              id="searchQueryIdSkill"
              placeholder="Search"
              selected={selectedSkill ? [selectedSkill.name] : []}
              onChange={(selected) => {
                if (selected.length > 0) {
                  const foundSkill = skillList.find(
                    (skill) => skill.name === selected[0]
                  );
                  if (foundSkill) {
                    setSearchQuery(foundSkill.id);
                    setSelectedSkill(foundSkill.name);
                    console.log("searchQuery no typeahead skill", searchQuery);
                  }
                }
              }}
              style={{ width: "15rem" }}
            />
          ) : (
            <Typeahead
              type="text"
              options={projectNameList.map((projectName) => projectName)}
              id="searchQueryIdProjectName"
              placeholder="Search"
              selected={selectedProjectName ? [selectedProjectName] : []}
              onChange={(selected) => {
                if (selected.length > 0) {
                  const foundProjectName = projectNameList.find(
                    (projectName) => projectName === selected[0]
                  );
                  if (foundProjectName) {
                    setSearchQuery(foundProjectName);
                    setSelectedProjectName(foundProjectName);
                    console.log(
                      "searchQuery no typeahead project name",
                      searchQuery
                    );
                  }
                }
              }}
              style={{ width: "15rem" }}
            />
          )}
        </Col>
        <Col className="my-2 me-2" style={{ width: "15rem" }}>
          <Form.Select
            className="me-2"
            onChange={handleChangeSortBy}
            style={{ width: "15rem" }}
          >
            <option value="readyDate">Start date</option>
            <option value="state">State</option>
            <option value="availablePlaces">Vacancies</option>
          </Form.Select>
        </Col>
        <Col className="my-2 me-2" style={{ width: "12rem" }}>
          <Form.Check
            type="radio"
            label="Ascending"
            name="orderDirection"
            id="orderAsc"
            checked={orderAsc === true}
            onChange={() => setOrderAsc(true)}
            className="me-2 radio-btn-custom"
            style={{ width: "12rem" }}
          />
        </Col>
        <Col className="my-2 me-2" style={{ width: "12rem" }}>
          <Form.Check
            type="radio"
            label="Descending"
            name="orderDirection"
            id="orderDesc"
            checked={orderAsc === false}
            onChange={() => setOrderAsc(false)}
            className="radio-btn-custom"
            style={{ width: "12rem" }}
          />
        </Col>
        <Col className="my-2 mx-2" style={{ width: "5rem" }}>
          <Button
            className="custom-show-more-btn mb-4"
            variant="secondary"
            onClick={handleSearch}
            style={{ width: "5rem" }}
          >
            Go
          </Button>
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        {visibleCards.map((card, index) => (
          <Col key={index} className="my-3 mx-0">
            {!loggedUser.sessionToken ? (
              <OthersProjCardNotLogged {...card} />
            ) : (
              <OthersProjCardLogged {...card} />
            )}
          </Col>
        ))}
      </Row>
      {(cards.length || loggedCards.length) < numberOfProjects && (
        <div className="text-center">
          <Button
            className="custom-show-more-btn mb-4"
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

export default ProjectGlobalList;
