import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AdminStats.css";

import AdminStatsAverages from "./AdminStatsAverages/AdminStatsAverages";
import AdminStatsBarGraph from "./AdminStatsBarGraph/AdminStatsBarGraph";
import AdminStatsPieChart from "./AdminStatsPieChart/AdminStatsPieChart";

function AdminStats() {
  return (
    <Container fluid className="main-container">
      <Row className="flex-grow-1">
        <Col className="content">
          <AdminStatsAverages />
          <AdminStatsBarGraph />
          <AdminStatsPieChart />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminStats;
