import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel, Badge } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import "./NewTask.css";

const NewTask = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    startDate: '',
    endDate: '',
    relatedTasks: [],
    otherStakeholders: [],
  });

  const [newRelatedTask, setNewRelatedTask] = useState('');
  const [newStakeholder, setNewStakeholder] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRelatedTask = () => {
    if (newRelatedTask) {
      setFormData({ ...formData, relatedTasks: [...formData.relatedTasks, newRelatedTask] });
      setNewRelatedTask('');
    }
  };

  const handleAddStakeholder = () => {
    if (newStakeholder) {
      setFormData({ ...formData, otherStakeholders: [...formData.otherStakeholders, newStakeholder] });
      setNewStakeholder('');
    }
  };

  const handleAdd = () => {
    onAdd(formData);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingOwner" label="Owner" className="mb-3">
            <Form.Control
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingStartDate" label="Start Date" className="mb-3">
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEndDate" label="End Date" className="mb-3">
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingRelatedTasks" label="Related Tasks" className="mb-3">
            <Form.Control
              type="text"
              name="newRelatedTask"
              value={newRelatedTask}
              onChange={(e) => setNewRelatedTask(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddRelatedTask} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.relatedTasks.map((task, index) => (
              <Badge key={index} pill bg="primary" className="me-1">
                {task}
              </Badge>
            ))}
          </div>

          <FloatingLabel controlId="floatingOtherStakeholders" label="Other Stakeholders" className="mb-3">
            <Form.Control
              type="text"
              name="newStakeholder"
              value={newStakeholder}
              onChange={(e) => setNewStakeholder(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddStakeholder} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.otherStakeholders.map((stakeholder, index) => (
              <Badge key={index} pill bg="secondary" className="me-1">
                {stakeholder}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleAdd}>
            Add Task
          </Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewTask;
