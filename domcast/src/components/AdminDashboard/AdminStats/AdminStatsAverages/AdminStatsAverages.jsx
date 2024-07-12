import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AdminStatsAverages.css';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AdminStatsAverages ({ avgMembers, avgExecutionTime, avgTasks }) {
  const { t } = useTranslation();


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

export default AdminStatsAverages;
