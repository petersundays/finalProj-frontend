import React from "react";
import "./TaskListMobile.css";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function TaskListMobile() {
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <Col>
          <h3>Project Gantt Chart</h3>
          <h5>State: Active</h5>
          <h5>Lab: Lisbon</h5>
          <h5>Mobile</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskListMobile;
