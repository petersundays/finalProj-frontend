import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Badge,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "./TaskEdit.css";

const TaskEdit = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    state: "",
    owner: "",
    startDate: "",
    endDate: "",
    dependsOnTask: [],
    prerequisiteForTask: [],
    stakeholders: [],
  });

  const [newDependsOnTask, setNewDependsOnTask] = useState("");
  const [newPrerequisiteForTask, setNewPrerequisiteForTask] = useState("");
  const [newStakeholder, setNewStakeholder] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDependsOnTask = () => {
    if (newDependsOnTask) {
      setFormData((prevState) => ({
        ...prevState,
        dependsOnTask: [...prevState.dependsOnTask, newDependsOnTask],
      }));
      setNewDependsOnTask("");
    }
  };

  const handleRemoveDependsOnTask = (task) => {
    setFormData((prevState) => ({
      ...prevState,
      dependsOnTask: prevState.dependsOnTask.filter(
        (item) => item !== task
      ),
    }));
  };

  const handleAddPrerequisiteForTask = () => {
    if (newPrerequisiteForTask) {
      setFormData((prevState) => ({
        ...prevState,
        prerequisiteForTask: [...prevState.prerequisiteForTask, newPrerequisiteForTask],
      }));
      setNewPrerequisiteForTask("");
    }
  };

  const handleRemovePrerequisiteForTask = (task) => {
    setFormData((prevState) => ({
      ...prevState,
      prerequisiteForTask: prevState.prerequisiteForTask.filter(
        (item) => item !== task
      ),
    }));
  };

  const handleAddStakeholder = () => {
    if (newStakeholder) {
      setFormData((prevState) => ({
        ...prevState,
        stakeholders: [...prevState.stakeholders, newStakeholder],
      }));
      setNewStakeholder("");
    }
  };

  const handleRemoveStakeholder = (stakeholder) => {
    setFormData((prevState) => ({
      ...prevState,
      stakeholders: prevState.stakeholders.filter(
        (item) => item !== stakeholder
      ),
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <FloatingLabel
            controlId="floatingTitle"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingDescription"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingState"
            label="State"
            className="mb-3"
          >
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
          <FloatingLabel
            controlId="floatingOwner"
            label="Owner"
            className="mb-3"
          >
            <Typeahead
              id="owner"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setFormData({ ...formData, owner: selected[0] });
                }
              }}
              options={["Owner1", "Owner2", "Owner3"]} // Example options
              placeholder="Owner"
              selected={formData.owner ? [formData.owner] : []}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingStartDate"
            label="Start Date"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="DDMMYYYY"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingEndDate"
            label="End Date"
            className="mb-3"
          >
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
          <FloatingLabel
            controlId="floatingDependsOnTask"
            label="Depends On Task"
            className="mb-3"
          >
            <Typeahead
              id="dependsOnTask"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setNewDependsOnTask(selected[0]);
                }
              }}
              options={["Task1", "Task2", "Task3"]} // Example options
              placeholder="Choose depends on..."
              selected={newDependsOnTask ? [newDependsOnTask] : []}
            />
            <Button
              variant="primary"
              onClick={handleAddDependsOnTask}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.dependsOnTask.map((task, index) => (
              <Badge key={index} pill bg="primary" className="me-1">
                {task}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleRemoveDependsOnTask(task)}
                >
                  x
                </Button>
              </Badge>
            ))}
          </div>
          <FloatingLabel
            controlId="floatingPrerequisiteForTask"
            label="Is Prerequisite For Task"
            className="mb-3"
          >
            <Typeahead
              id="prerequisiteForTask"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setNewPrerequisiteForTask(selected[0]);
                }
              }}
              options={["Task1", "Task2", "Task3"]} // Example options
              placeholder="Choose prerequisite for..."
              selected={newPrerequisiteForTask ? [newPrerequisiteForTask] : []}
            />
            <Button
              variant="primary"
              onClick={handleAddPrerequisiteForTask}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.prerequisiteForTask.map((task, index) => (
              <Badge key={index} pill bg="secondary" className="me-1">
                {task}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleRemovePrerequisiteForTask(task)}
                >
                  x
                </Button>
              </Badge>
            ))}
          </div>
          <FloatingLabel
            controlId="floatingStakeholders"
            label="Other Stakeholders"
            className="mb-3"
          >
            <Typeahead
              id="stakeholders"
              onChange={(selected) => {
                if (selected.length > 0) {
                  setNewStakeholder(selected[0]);
                }
              }}
              options={["Stakeholder1", "Stakeholder2", "Stakeholder3"]} // Example options
              placeholder="Choose other stakeholders"
              selected={newStakeholder ? [newStakeholder] : []}
            />
            <Button
              variant="primary"
              onClick={handleAddStakeholder}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.stakeholders.map((stakeholder, index) => (
              <Badge key={index} pill bg="success" className="me-1">
                {stakeholder}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleRemoveStakeholder(stakeholder)}
                >
                  x
                </Button>
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

export default TaskEdit;
