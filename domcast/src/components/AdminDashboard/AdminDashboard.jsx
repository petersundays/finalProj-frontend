import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import AdminSettings from "../AdminDashboard/AdminSettings/AdminSettings";
import AdminStats from "../AdminDashboard/AdminStats/AdminStats";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

function AdminDashboard() {
  const { t } = useTranslation();

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="Layout">
      <Container fluid>
        <Row>
          <Col xs={12} className="bg-light p-0">
            <Card className="m-0 p-4" style={{ border: "none" }}>
              <Card.Body className="p-0">
                <Row>
                  <Col>
                    <AdminSettings />
                  </Col>
                  <Col>
                    <Button
                      onClick={handlePrint}
                      className="btn btn-primary mt-3"
                      style={{
                        backgroundColor: "var(--color-blue-03)",
                        color: "white",
                        width: "8rem",
                        height: "2.5rem",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {t("Print")}
                    </Button>
                  </Col>
                </Row>
                <div ref={printRef}>
                  <AdminStats />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
