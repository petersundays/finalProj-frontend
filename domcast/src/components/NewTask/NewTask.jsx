import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel, Badge } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
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

  const [newOwner, setNewOwner] = useState('');
  const [newRelatedTask, setNewRelatedTask] = useState({ name: '', dependency: '' });
  const [newStakeholder, setNewStakeholder] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddOwner = (selected) => {
    if (selected.length > 0) {
      setFormData({ ...formData, owner: selected[0] });
      setNewOwner('');
    }
  };

  const handleAddRelatedTask = (selected) => {
    if (selected.length > 0) {
      const dependency = document.getElementById('task-dependency').value;
      setFormData({ ...formData, relatedTasks: [...formData.relatedTasks, { name: selected[0], dependency }] });
      setNewRelatedTask({ name: '', dependency: '' });
    }
  };

  const handleAddStakeholder = (selected) => {
    if (selected.length > 0) {
      setFormData({ ...formData, otherStakeholders: [...formData.otherStakeholders, selected[0]] });
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
            <Typeahead
              id="owner-search"
              onChange={handleAddOwner}
              options={[]}
              placeholder="Search for owner..."
            />
            <Button variant="primary" onClick={() => handleAddOwner([{ name: newOwner }])} className="mt-2">
              Add
            </Button>
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
            <Typeahead
              id="related-task-search"
              onChange={handleAddRelatedTask}
              options={[]}
              placeholder="Search for related task..."
            />
            <Form.Select id="task-dependency" className="mt-2">
              <option value="depends on">Depends on</option>
              <option value="is prerequisite for">Is prerequisite for</option>
            </Form.Select>
            <Button variant="primary" onClick={() => handleAddRelatedTask([{ name: newRelatedTask.name }])} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.relatedTasks.map((task, index) => (
              <Badge key={index} pill bg="primary" className="me-1">
                {task.name} ({task.dependency})
              </Badge>
            ))}
          </div>

          <FloatingLabel controlId="floatingOtherStakeholders" label="Other Stakeholders" className="mb-3">
            <Typeahead
              id="stakeholder-search"
              onChange={handleAddStakeholder}
              options={[]}
              placeholder="Search for stakeholder..."
            />
            <Button variant="primary" onClick={() => handleAddStakeholder([{ name: newStakeholder }])} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.otherStakeholders.map((stakeholder, index) => (
              <Badge key={index} pill bg="secondary" className="me-1">
                {stakeholder.name}
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
