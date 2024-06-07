import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel, Badge } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import './EditTask.css';

const EditTask = ({ taskData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(taskData);
  const [newRelatedTask, setNewRelatedTask] = useState('');
  const [newStakeholder, setNewStakeholder] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRelatedTask = () => {
    if (newRelatedTask) {
      setFormData({ ...formData, dependsOn: [...formData.dependsOn, newRelatedTask] });
      setNewRelatedTask('');
    }
  };

  const handleAddPrerequisite = () => {
    if (newPrerequisite) {
      setFormData({ ...formData, prerequisiteFor: [...formData.prerequisiteFor, newPrerequisite] });
      setNewPrerequisite('');
    }
  };

  const handleAddStakeholder = () => {
    if (newStakeholder) {
      setFormData({ ...formData, stakeholders: [...formData.stakeholders, newStakeholder] });
      setNewStakeholder('');
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleRemoveItem = (key, item) => {
    setFormData({
      ...formData,
      [key]: formData[key].filter(i => i !== item),
    });
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
          <FloatingLabel controlId="floatingState" label="State" className="mb-3">
            <Form.Select
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Choose state"
            >
              <option value="">Choose state</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingOwner" label="Owner" className="mb-3">
            <Typeahead
              id="owner"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setFormData({ ...formData, owner: selected[0] });
                }
              }}
              options={['Owner1', 'Owner2', 'Owner3']} // Example options
              placeholder="Choose an owner"
              selected={formData.owner ? [formData.owner] : []}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingStartDate" label="Start Date" className="mb-3">
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="DDMMYYYY"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEndDate" label="End Date" className="mb-3">
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="DDMMYYYY"
            />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingDependsOn" label="Depends On" className="mb-3">
            <Typeahead
              id="dependsOn"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setNewRelatedTask(selected[0]);
                }
              }}
              options={['Task1', 'Task2', 'Task3']} // Example options
              placeholder="Choose related tasks"
              selected={newRelatedTask ? [newRelatedTask] : []}
            />
            <Button variant="primary" onClick={handleAddRelatedTask} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.dependsOn.map((task, index) => (
              <Badge key={index} pill bg="primary" className="me-1">
                {task}
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemoveItem('dependsOn', task)}>x</Button>
              </Badge>
            ))}
          </div>
          <FloatingLabel controlId="floatingPrerequisiteFor" label="Is Prerequisite For" className="mb-3">
            <Typeahead
              id="prerequisiteFor"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setNewPrerequisite(selected[0]);
                }
              }}
              options={['Task1', 'Task2', 'Task3']} // Example options
              placeholder="Choose prerequisite tasks"
              selected={newPrerequisite ? [newPrerequisite] : []}
            />
            <Button variant="primary" onClick={handleAddPrerequisite} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.prerequisiteFor.map((task, index) => (
              <Badge key={index} pill bg="secondary" className="me-1">
                {task}
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemoveItem('prerequisiteFor', task)}>x</Button>
              </Badge>
            ))}
          </div>
          <FloatingLabel controlId="floatingStakeholders" label="Other Stakeholders" className="mb-3">
            <Typeahead
              id="stakeholders"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setNewStakeholder(selected[0]);
                }
              }}
              options={['Stakeholder1', 'Stakeholder2', 'Stakeholder3']} // Example options
              placeholder="Choose other stakeholders"
              selected={newStakeholder ? [newStakeholder] : []}
            />
            <Button variant="primary" onClick={handleAddStakeholder} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.stakeholders.map((stakeholder, index) => (
              <Badge key={index} pill bg="success" className="me-1">
                {stakeholder}
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemoveItem('stakeholders', stakeholder)}>x</Button>
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTask;
