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
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProjectEdit.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function ProjectEdit({ onCreate, onCancel }) {
  const location = useLocation();
  const { projectPrivate, labsEnum, stateEnum } = location.state || {};

  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: projectPrivate.name,
    labId: projectPrivate.labId,
    description: projectPrivate.description,
    projectedStartDate: projectPrivate.projectedStartDate.split("T")[0],
    deadline: projectPrivate.deadline.split("T")[0],
    keywords: projectPrivate.keywords,
    skills: projectPrivate.skills,
    resources: projectPrivate.resources,
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newAsset, setNewAsset] = useState({
    name: "",
    type: "",
    quantity: "",
  });
  const [keywords, setKeywords] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddKeyword = (selected) => {
    if (selected.length > 0) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, selected[0]],
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleAddSkill = (selected) => {
    if (selected.length > 0) {
      const category = document.getElementById("skill-category").value;
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: selected[0], category }],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddAsset = (selected) => {
    if (selected.length > 0 && newAsset.quantity) {
      const asset = { ...newAsset, name: selected[0] };
      setFormData({ ...formData, assets: [...formData.assets, asset] });
      setNewAsset({ name: "", type: "", quantity: "" });
    }
  };

  const handleSave = () => {
    onCreate(formData);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <FloatingLabel
            controlId="floatingTitle"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingLab" label="Lab" className="mb-3">
            <Form.Select
              name="labId"
              value={formData.labId}
              onChange={handleChange}
              placeholder="Lab name"
            >
              <option value="">Choose Lab</option>
              <option value="Coimbra">Coimbra</option>
              <option value="Lisboa">Lisboa</option>
              <option value="Porto">Porto</option>
              <option value="Tomar">Tomar</option>
              <option value="Vila Real">Vila Real</option>
              <option value="Viseu">Viseu</option>
            </Form.Select>
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
            controlId="floatingStartDate"
            label="Start Date"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="projectedStartDate"
              value={formData.projectedStartDate}
              onChange={handleChange}
              placeholder="DDMMYYYY"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingDuration"
            label="Duration"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              placeholder="Duration in days"
            />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel
            controlId="floatingKeywords"
            label="Keywords"
            className="mb-3"
          >
            <Typeahead
              id="keyword-search"
              onChange={handleAddKeyword}
              options={[]}
              placeholder="Search for keyword..."
            />
            <Button
              variant="primary"
              onClick={() => handleAddKeyword([{ name: newKeyword }])}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.keywords.map((keyword, index) => (
              <Badge key={index} pill bg="secondary" className="me-1">
                {keyword.name}{" "}
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => handleRemoveKeyword(keyword)}
                >
                  x
                </Button>
              </Badge>
            ))}
          </div>

          <FloatingLabel
            controlId="floatingSkills"
            label="Skills"
            className="mb-3"
          >
            <Typeahead
              id="skill-search"
              onChange={handleAddSkill}
              options={[]}
              placeholder="Search for skill..."
            />
            <Form.Select id="skill-category" className="mt-2">
              <option value="Knowledge">Knowledge</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Tools">Tools</option>
            </Form.Select>
            <Button
              variant="primary"
              onClick={() => handleAddSkill([{ name: newSkill }])}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.skills.map((skill, index) => (
              <Badge key={index} pill bg="success" className="me-1">
                {skill.name}{" "}
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  x
                </Button>
              </Badge>
            ))}
          </div>

          <FloatingLabel
            controlId="floatingAssets"
            label="Assets"
            className="mb-3"
          >
            <Typeahead
              id="asset-search"
              onChange={handleAddAsset}
              options={[]}
              placeholder="Search for asset..."
            />
            <Form.Select
              id="asset-type"
              name="type"
              value={newAsset.type}
              onChange={(e) =>
                setNewAsset({ ...newAsset, type: e.target.value })
              }
              className="mt-2"
            >
              <option value="">Choose Asset</option>
              <option value="Component">Component</option>
              <option value="Resource">Resource</option>
            </Form.Select>
            <FloatingLabel
              controlId="floatingAssetQuantity"
              label="Quantity"
              className="mt-2"
            >
              <Form.Control
                type="number"
                name="quantity"
                value={newAsset.quantity}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, quantity: e.target.value })
                }
              />
            </FloatingLabel>
            <Button
              variant="primary"
              onClick={() => handleAddAsset([{ name: newAsset.name }])}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.assets.map((asset, index) => (
              <Badge key={index} pill bg="warning" className="me-1">
                {asset.name} ({asset.type} - {asset.quantity})
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleSave}>
            Edit Project
          </Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectEdit;
