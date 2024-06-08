import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import './RedefinePassword.css';

const RedefinePassword = ({ onConfirm, onCancel }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    if (formData.password === formData.confirmPassword) {
      onConfirm(formData.password);
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3>Choose your new password</h3>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FloatingLabel>
          <Button variant="primary" onClick={handleConfirm} className="me-2">
            Confirm
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RedefinePassword;
