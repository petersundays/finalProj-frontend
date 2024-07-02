import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import OthersProjCardNotLogged from "../OthersProjCardNotLogged/OthersProjCardNotLogged";
import "./ProjectListNotLogged.css";
import {
  Base_url_projects,
  Base_url_lab,
  Base_url_skills,
  Base_url_keywords,
} from "../../functions/UsersFunctions.jsx";
import { Typeahead } from "react-bootstrap-typeahead";

const ProjectListNotLogged = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [orderBy, setOrderBy] = useState("");
  const [orderAsc, setOrderAsc] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [skill, setSkill] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [labList, setLabList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [keywordList, setKeywordList] = useState([]);

  useEffect(() => {
    fetchEnums();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [searchQuery, cards]);

  const fetchEnums = async () => {
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
      const skillsResponse = await fetch(`${Base_url_skills}enum-unconfirmed`, {
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
      const keywordsResponse = await fetch(
        `${Base_url_keywords}enum-unconfirmed`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (keywordsResponse.ok) {
        const keywordsData = await keywordsResponse.json();
        setKeywordList(keywordsData);
        console.log("Keywords fetched:", keywordsData);
      }
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }

    fetchProjects();
  };

  const fetchProjects = async () => {
    if (!searchQuery && !orderBy && !orderAsc) {
      setOrderBy("name");
      setOrderAsc(true);
    } else {
      try {
        const url = new URL(`${Base_url_projects}`);
        if (orderBy) url.searchParams.append("orderBy", orderBy);
        if (orderAsc) url.searchParams.append("orderAsc", orderAsc);
        if (searchQuery) url.searchParams.append("searchQuery", searchQuery);

        const projectsResponse = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (projectsResponse.ok) {
          const data = await projectsResponse.json();
          setCards(data);
        } else {
          console.log("Error fetching projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 2);
  };

  const handleChangeSortBy = (event) => {
    setOrderBy(event.target.value);
  };

  const handleChangeSearchBy = (event) => {
    if (event.target.value === "name") {
      setName(searchQuery);
    } else if (event.target.value === "keyword") {
      setKeyword(searchQuery);
    } else if (event.target.value === "skill") {
      setSkill(searchQuery);
    } else if (event.target.value === "state") {

  const visibleCards = cards.slice(0, visibleRows * 3);

  return (
    <Card
      className="mt-2 card-proj-not-logged"
      style={{ border: "none", maxWidth: "100rem" }}
    >
      <Row className="my-3 justify-content-center">
        <Col className="col-12 col-md-6 col-lg-4">
          <Col className="my-2 mx-2" style={{ width: "7rem" }}>
            <Form.Select
              className="me-2"
              onChange={handleChangeSearchBy}
            >
              <option value="name">Name</option>
              <option value="state">State</option>
              <option value="keyword">Keyword</option>
              <option value="skill">Skill</option>
            </Form.Select>
          </Col>
          <Col className="my-2 mx-2" style={{ width: "10rem" }}>

            <Form.Select className="me-2" onChange={handleChangeState}>
              <option value="1">Planning</option>
              <option value="2">Ready</option>
              <option value="3">Approved</option>
              <option value="4">In progress</option>
              <option value="5">Finished</option>
              <option value="6">Cancelled</option>
            </Form.Select>
            <Form.Text className="col-12 col-md-6 col-lg-4">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Text>
            
          </Col>
          <Col className="my-2 mx-2" style={{ width: "5rem" }}>
            <Button className="custom-show-more-btn mb-4" variant="secondary" onClick={fetchProjects()}>
              Search
            </Button>
          </Col>
        </Col>
        <Col className="col-12 col-md-6 col-lg-4">
          <Col className="my-2 mx-2" style={{ width: "7rem" }}>
            <Form.Select
              className="me-2"
              onChange={handleChangeSortBy}
            >
              <option value="readyDate">Start date</option>
              <option value="state">State</option>
              <option value="availablePlaces">Vacancies</option>
            </Form.Select>
            <Form.Switch 
              type="checkbox" 
              id="custom-switch" 
              label="Ascending" 
              checked={orderAsc}
              onChange={() => setOrderAsc(!orderAsc)}
            />
          </Col>
          <Col className="my-2 mx-2" style={{ width: "5rem" }}>
            <Button className="custom-show-more-btn mb-4" variant="secondary" onClick={fetchProjects()}>
              Sort by
            </Button>
          </Col>
        </Col>
      </Row>
      <Row className="mb-3 mt-5 justify-content-center">
        {visibleCards.map((card, index) => (
          <Col key={index} className="my-3 mx-3">
            <OthersProjCardNotLogged {...card} />
          </Col>
        ))}
      </Row>
      {visibleCards.length < cards.length && (
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

export default ProjectListNotLogged;
