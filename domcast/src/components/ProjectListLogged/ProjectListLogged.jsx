import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import OthersProjCardLogged from "../OthersProjCardLogged/OthersProjCardLogged";
import "./ProjectListLogged.css";
import { use } from "i18next";
import { Base_url_projects } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore";

const ProjectListLogged = () => {
  const [cards, setCards] = useState([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const loggedUser = userStore((state) => state.loggedUser);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsResponse = await fetch(`${Base_url_projects}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.token,
            id: loggedUser.id,
          },
        }
        );
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setCards(projectsData);
        } else {
          console.log("Error fetching projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProjects();
  }
  , [loggedUser.token, loggedUser.id]);

  
  const handleShowMore = () => {
    setVisibleRows(visibleRows + 2);
  };

  const visibleCards = cards.slice(0, visibleRows * 3);

  return (
    <Card className="mt-5" style={{ border: "none" }}>
      <Row className="mb-3">
        {visibleCards.map((card, index) => (
          <Col key={index} className="mb-3">
            <OthersProjCardLogged {...card} />
          </Col>
        ))}
      </Row>
      {visibleCards.length < cards.length && (
        <div className="text-center">
          <Button onClick={handleShowMore} variant="secondary">
            Show More
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProjectListLogged;
