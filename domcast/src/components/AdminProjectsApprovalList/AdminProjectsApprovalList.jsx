import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import OthersProjCardLogged from "../OthersProjCardLogged/OthersProjCardLogged";
import "./AdminProjectsApprovalList.css";
import { Base_url_lab, Base_url_projects } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AdminProjectsApprovalList = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [labsEnum, setLabsEnum] = useState([]);
  const [stateEnum, setStateEnum] = useState([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const loggedUser = userStore((state) => state.loggedUser);

  useEffect(() => {
    const handleFetchProjects = async () => {
      await fetchProjects();
      await fetchEnum();
    };

    handleFetchProjects();
  },[]);
  const visibleCards = cards.slice(0, visibleRows * 3);

  const fetchEnum = async () => {
    try {
      const labsEnumResponse = await fetch(`${Base_url_lab}enum-unconfirmed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const labsEnumData = await labsEnumResponse.json();
      setLabsEnum(labsEnumData);

      const stateEnumResponse = await fetch(`${Base_url_projects}state-enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const stateEnumData = await stateEnumResponse.json();
      setStateEnum(stateEnumData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const projectsResponse = await fetch(`${Base_url_projects}applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
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
  
  const handleShowMore = () => {
    setVisibleRows(visibleRows + 2);
  };
 
  return (
    <Card className="mt-5" style={{ border: "none" }}>
      <Row className="mb-3">
        {visibleCards.map((card, index) => (
          <Col key={index} className="mb-3">
            <OthersProjCardLogged id = {card.id} 
                                  title = {card.name} 
                                  lab = {labsEnum.find((lab) => lab.id === card.labId)?.name} 
                                  description={card.description}
                                  vacancies = {card.vacancies}
                                  state = {stateEnum.find((state) => state.intValue === card.state)?.name}
                                  applications = {"true"}
            />
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

export default AdminProjectsApprovalList;
