import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import './AdminSettings.css';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AdminSettings ({ settings, onSave }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <FloatingLabel controlId="floatingSessionTimeout" label="Session Timeout (in seconds)" className="mb-3">
            <Form.Control
              type="number"
              name="sessionTimeout"
              value={formData.sessionTimeout}
              onChange={handleChange}
              min="1"
              placeholder="Session Timeout"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingMaxMembers" label="Maximum Number of Project Members" className="mb-3">
            <Form.Control
              type="number"
              name="maxMembers"
              value={formData.maxMembers}
              onChange={handleChange}
              min="1"
              placeholder="Maximum Number of Project Members"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;
