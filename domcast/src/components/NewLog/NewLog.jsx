import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import './NewLog.css';

const NewLog = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    associatedTask: ''
  });

  const [newAssociatedTask, setNewAssociatedTask] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAssociatedTask = () => {
    if (newAssociatedTask) {
      setFormData({ ...formData, associatedTask: newAssociatedTask });
      setNewAssociatedTask('');
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
              placeholder="Title"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingAssociatedTask" label="Associated Task" className="mb-3">
            <Typeahead
              id="associatedTask"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setNewAssociatedTask(selected[0]);
                }
              }}
              options={['Task1', 'Task2', 'Task3']} // Example options
              placeholder="Choose an associated task"
              selected={newAssociatedTask ? [newAssociatedTask] : []}
            />
            <Button variant="primary" onClick={handleAddAssociatedTask} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleAdd}>
            Add Log
          </Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewLog;
