import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjCardNotLogged from "../ProjCardNotLogged/ProjCardNotLogged";
import "./CardGridNotLogged.css";

// const CardGrid = ({ cards = [] }) => {
const CardGridNotLogged = () => {
  // Hardcoded card data
  const cards = [
    {
      title: "Renewable Energy Grid",
      lab: "Porto",
      description: "Creating a smart grid for renewable energy.",
      members: "4/6",
      state: "Finished",
      link: "#",
    },
    {
      title: "Digital Twins",
      lab: "Tomar",
      description: "Developing digital twin technology for manufacturing.",
      members: "2/7",
      state: "Finished",
      link: "#",
    },
    {
      title: "Smart Home Devices",
      lab: "Lisboa",
      description: "Developing IoT devices for smart homes.",
      members: "3/4",
      state: "Planning",
      link: "#",
    },
    {
      title: "Autonomous Vehicle Project",
      lab: "Porto",
      description: "Designing autonomous vehicle systems.",
      members: "1/6",
      state: "In Progress",
      link: "#",
    },
    {
      title: "IoT for Smart Agriculture",
      lab: "Vila Real",
      description: "Using IoT devices to enhance agriculture.",
      members: "4/4",
      state: "In Progress",
      link: "#",
    },
    {
      title: "Data Analysis Platform",
      lab: "Tomar",
      description: "Building a platform for big data analysis.",
      members: "2/3",
      state: "Finished",
      link: "#",
    },
    {
      title: "Bioinformatics",
      lab: "Viseu",
      description: "Researching bioinformatics for medical research.",
      members: "2/2",
      state: "Finished",
      link: "#",
    },
    {
      title: "Environmental Monitoring",
      lab: "Vila Real",
      description: "Monitoring environmental changes using sensors.",
      members: "5/7",
      state: "Approved",
      link: "#",
    },
    {
      title: "Quantum Computing Research",
      lab: "Viseu",
      description: "Investigating applications of quantum computing.",
      members: "4/5",
      state: "Approved",
      link: "#",
    },
    {
      title: "Telemedicine Solutions",
      lab: "Coimbra",
      description: "Developing platforms for remote healthcare.",
      members: "4/4",
      state: "Approved",
      link: "#",
    },
    {
      title: "Machine Learning Algorithms",
      lab: "Lisboa",
      description: "Creating new machine learning algorithms.",
      members: "3/3",
      state: "Ready",
      link: "#",
    },
    {
      title: "AI for Healthcare",
      lab: "Coimbra",
      description: "Developing AI solutions for early diagnosis.",
      members: "3/5",
      state: "In Progress",
      link: "#",
    },
    {
      title: "Genetic Engineering",
      lab: "Tomar",
      description: "Exploring genetic engineering techniques.",
      members: "2/2",
      state: "Approved",
      link: "#",
    },
    {
      title: "Green Building Materials",
      lab: "Porto",
      description: "Researching eco-friendly building materials.",
      members: "1/2",
      state: "Approved",
      link: "#",
    },
    {
      title: "Renewable Energy Initiative",
      lab: "Lisboa",
      description: "Researching sustainable energy sources.",
      members: "2/4",
      state: "Approved",
      link: "#",
    },
    {
      title: "Digital Education Tools",
      lab: "Tomar",
      description: "Developing digital tools for education.",
      members: "1/6",
      state: "Cancelled",
      link: "#",
    },
    {
      title: "Smart City Infrastructure",
      lab: "Porto",
      description: "Implementing smart technologies in urban areas.",
      members: "5/6",
      state: "In Progress",
      link: "#",
    },
    {
      title: "Virtual Reality for Training",
      lab: "Vila Real",
      description: "Developing VR training programs.",
      members: "7/7",
      state: "In Progress",
      link: "#",
    },
    {
      title: "AI for Environmental Science",
      lab: "Viseu",
      description: "Using AI to study environmental science.",
      members: "1/4",
      state: "Finished",
      link: "#",
    },
    {
      title: "Wearable Health Devices",
      lab: "Vila Real",
      description: "Creating wearable devices for health monitoring.",
      members: "4/7",
      state: "Approved",
      link: "#",
    },
    {
      title: "Cybersecurity Enhancement",
      lab: "Tomar",
      description: "Improving security protocols for local businesses.",
      members: "1/3",
      state: "Cancelled",
      link: "#",
    },
    {
      title: "Cloud Computing Solutions",
      lab: "Viseu",
      description: "Enhancing cloud computing infrastructures.",
      members: "1/1",
      state: "In Progress",
      link: "#",
    },
    {
      title: "Robotics for Agriculture",
      lab: "Vila Real",
      description: "Automating agricultural processes with robotics.",
      members: "5/7",
      state: "In Progress",
      link: "#",
    },
    {
      title: "Blockchain for Finance",
      lab: "Coimbra",
      description: "Implementing blockchain technology in finance.",
      members: "2/5",
      state: "Planning",
      link: "#",
    },
    {
      title: "Health Informatics",
      lab: "Lisboa",
      description: "Improving health informatics systems.",
      members: "1/3",
      state: "Cancelled",
      link: "#",
    },
    {
      title: "Renewable Energy Storage",
      lab: "Coimbra",
      description: "Developing storage solutions for renewable energy.",
      members: "4/5",
      state: "Ready",
      link: "#",
    },
    {
      title: "Language Processing Tool",
      lab: "Viseu",
      description: "Creating a tool for natural language processing.",
      members: "2/2",
      state: "Ready",
      link: "#",
    },
    {
      title: "Advanced Robotics",
      lab: "Lisboa",
      description: "Researching advanced robotics applications.",
      members: "3/4",
      state: "Ready",
      link: "#",
    },
    {
      title: "Smart Transportation Systems",
      lab: "Porto",
      description: "Implementing smart transportation solutions.",
      members: "1/3",
      state: "Planning",
      link: "#",
    },
    {
      title: "Advanced Biotech Research",
      lab: "Coimbra",
      description: "Exploring new biotechnological advancements.",
      members: "3/5",
      state: "Planning",
      link: "#",
    },
  ];

  const [visibleRows, setVisibleRows] = useState(2);

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 2);
  };

  const visibleCards = cards.slice(0, visibleRows * 4);

  return (
    <Card className="mt-5" style={{ border: "none" }}>
      <Row className="mb-3">
        {visibleCards.map((card, index) => (
          <Col key={index} className="my-5">
            <ProjCardNotLogged {...card} />
          </Col>
        ))}
      </Row>
      {visibleCards.length < cards.length && (
        <div className="text-center">
          <Button
          className="custom-show-more-btn"
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

export default CardGridNotLogged;
