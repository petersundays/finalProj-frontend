import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProjCardLogged from "../ProjCardLogged/ProjCardLogged";

const CardGrid = ({ cards = [] }) => {
  const [visibleRows, setVisibleRows] = useState(2);

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 2);
  };

  const visibleCards = cards.slice(0, visibleRows * 3);

  return (
    <Container>
      <Row>
        {visibleCards.map((card, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4">
            <ProjCardLogged {...card} />
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
    </Container>
  );
};

export default CardGrid;
