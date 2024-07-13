import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import AdminSettings from "../AdminDashboard/AdminSettings/AdminSettings";
import AdminStats from "../AdminDashboard/AdminStats/AdminStats";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AdminDashboard() {
    const { t } = useTranslation();


    return (
        <div className="Layout">
        <Container fluid>
            <Row>
            <Col xs={12} className="bg-light p-0">
                <Card className="m-0 p-0">
                <Card.Body className="p-0">
                    <AdminSettings />
                    <AdminStats />
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
        </div>
    );
    }

    export default AdminDashboard;