import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AdminStats.css"; 

import StatsAverages from "./StatsAverages/StatsAverages";
import StatsBarGraph from "./StatsBarGraph/StatsBarGraph";
import StatsPieChart from "./StatsPieChart/StatsPieChart";

function AdminStats() {
    return (
        <Container fluid className="main-container">
        <Row className="flex-grow-1">
            <Col className="content">
            <StatsAverages />
            <StatsBarGraph />
            <StatsPieChart />
            </Col>
        </Row>
        </Container>
    );
    }

    export default AdminStats;