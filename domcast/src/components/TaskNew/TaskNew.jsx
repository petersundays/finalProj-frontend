import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Badge,
  Card,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TaskNew.css";
import OthersProgressBar from "../OthersProgressBar/OthersProgressBar";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function TaskNew ({ onAdd, onCancel }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    owner: "",
    startDate: "",
    endDate: "",
    relatedTasks: [],
    otherStakeholders: [],
    stakeholders: [],
    dependsOn: [],
    isPrerequisiteFor: [],
  });

  const [newOwner, setNewOwner] = useState("");
  const [newRelatedTask, setNewRelatedTask] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [newStakeholder, setNewStakeholder] = useState("");
  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2"];

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
      setNewOwner("");
    }
  };

  const handleAddRelatedTask = (selected) => {
    if (selected.length > 0) {
      const dependency = document.getElementById("task-dependency").value;
      setFormData({
        ...formData,
        relatedTasks: [
          ...formData.relatedTasks,
          { name: selected[0], dependency },
        ],
      });
      setNewRelatedTask({ name: "", dependency: "" });
    }
  };

  const handleAddStakeholder = (selected) => {
    if (selected.length > 0) {
      setFormData({
        ...formData,
        otherStakeholders: [...formData.otherStakeholders, selected[0]],
      });
      setNewStakeholder("");
    }
  };

  const handleCreate = () => {
    onCreate(formData);
  };

  const onCreate = (data) => {
    onAdd(data);
  };

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card
            className="card-step01 mx-lg-3 my-lg-3"
            style={{ border: "none" }}
          >
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-md-6">
                <Card
                  className="card-step1-basic-info01"
                  style={{ border: "none" }}
                >
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
                    />
                  </FloatingLabel>
                  <Row>
                    <Col>
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
                        />
                      </FloatingLabel>
                    </Col>
                    <Col>
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
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
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
                      style={{ height: "200px", resize: "none" }}
                    />
                  </FloatingLabel>
                </Card>
              </div>
            </div>
          </Card>
        );
      case 2:
        return (
          <Card
            className="card-step01 mx-lg-3 my-lg-3"
            style={{ border: "none" }}
          >
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-md-6">
                <Card
                  className="card-step1-basic-info02 mt-xs-0"
                  style={{ border: "none" }}
                >
                  <Row>
                    <Col>
                      <FloatingLabel controlId="floatingOwner" className="mb-3">
                        <Typeahead
                          id="owner-search"
                          onChange={handleAddOwner}
                          options={[]}
                          placeholder="Search for owner..."
                          style={{ minWidth: "20rem", height: "3.5rem" }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        onClick={() => handleAddOwner([{ name: newOwner }])}
                        className="mt-2"
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FloatingLabel
                        controlId="floatingOtherStakeholders"
                        className="mb-3"
                      >
                        <Typeahead
                          id="stakeholder-search"
                          onChange={handleAddStakeholder}
                          options={[]}
                          placeholder="Search for stakeholder..."
                          style={{ minWidth: "20rem", height: "3.5rem" }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleAddStakeholder([{ name: newStakeholder }])
                        }
                        className="mt-2"
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <div>
                      {formData.otherStakeholders.map((stakeholder, index) => (
                        <Badge key={index} pill bg="secondary" className="me-1">
                          {stakeholder.name}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <Badge pill bg="secondary" className="me-1 mb-3">
                        Jose Castro
                        <span
                          variant="light"
                          size="sm"
                          className="ps-2 mb-3"
                          onClick={() => console.log("remove")}
                          style={{
                            cursor: "pointer",
                            position: "relative",
                            top: "-2px",
                          }}
                        >
                          x
                        </span>
                      </Badge>
                    </div>
                  </Row>
                </Card>
                <Card style={{ border: "none" }}>
                  <Row>
                    <Col>
                      <FloatingLabel
                        controlId="floatingRelatedTasks"
                        className="mt-3"
                      >
                        <Typeahead
                          id="related-task-search"
                          onChange={handleAddRelatedTask}
                          options={[]}
                          placeholder="Search for related task..."
                          style={{ width: "25rem", height: "3.5rem" }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <Form.Select
                        id="task-dependency"
                        className="mt-3"
                        style={{ width: "20rem", height: "3.5rem" }}
                      >
                        <option value="depends on">Depends on</option>
                        <option value="is prerequisite for">
                          Is prerequisite for
                        </option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleAddRelatedTask([{ name: newRelatedTask.name }])
                        }
                        className="mt-3"
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <div>
                      {formData.relatedTasks.map((task, index) => (
                        <Badge key={index} pill bg="primary" className="me-1">
                          {task.name} ({task.dependency})
                        </Badge>
                      ))}
                    </div>
                  </Row>
                </Card>
              </div>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  const renderProgress = () => {
    return (
      <Row className="mb-2" style={{ justifyContent: "center", gap: "2rem" }}>
        {step > 1 && (
          <Button
            onClick={prevStep}
            className="nav-btn nav-btn-prev"
            style={{
              maxWidth: "8rem",
            }}
          >
            « Previous
          </Button>
        )}
        {step < 2 && (
          <Button
            onClick={nextStep}
            className="nav-btn nav-btn-next"
            style={{
              maxWidth: "8rem",
            }}
          >
            Next »
          </Button>
        )}
      </Row>
    );
  };

  return (
    <>
      <Card
        style={{
          border: "none",
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col></Col>
          <div
            className="my-3 progress-bar-div"
            style={{ width: "30%", justifyContent: "center" }}
          >
            <OthersProgressBar step={step} steps={steps} />
          </div>
          <Col></Col>
        </Row>
        <Card style={{ border: "none" }} className="my-3">
          {renderStep()}
        </Card>
        <div className="my-2">{renderProgress()}</div>
      </Card>
    </>
  );
};

export default TaskNew;
