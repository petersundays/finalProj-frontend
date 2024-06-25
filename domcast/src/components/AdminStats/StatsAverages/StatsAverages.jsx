import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './StatsAverages.css';

const StatsAverages = ({ avgMembers, avgExecutionTime, avgTasks }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h5>Average number of members per project: {avgMembers}</h5>
          <h5>Average project execution time (in days): {avgExecutionTime}</h5>
          <h5>Average tasks per project: {avgTasks}</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default StatsAverages;
