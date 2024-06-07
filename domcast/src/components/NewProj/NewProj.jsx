import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel, Badge } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import "./NewProj.css";

const NewProj = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    lab: '',
    description: '',
    startDate: '',
    duration: '',
    team: [],
    keywords: [],
    skills: [],
    assets: [],
  });

  const [newTeam, setNewTeam] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newAsset, setNewAsset] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTeam = () => {
    if (newTeam) {
      setFormData({ ...formData, team: [...formData.team, newTeam] });
      setNewTeam('');
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword) {
      setFormData({ ...formData, keywords: [...formData.keywords, newKeyword] });
      setNewKeyword('');
    }
  };

  const handleAddSkill = () => {
    if (newSkill) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill('');
    }
  };

  const handleAddAsset = () => {
    if (newAsset) {
      setFormData({ ...formData, assets: [...formData.assets, newAsset] });
      setNewAsset('');
    }
  };

  const handleCreate = () => {
    onCreate(formData);
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
          <FloatingLabel controlId="floatingLab" label="Lab" className="mb-3">
            <Form.Select
              name="lab"
              value={formData.lab}
              onChange={handleChange}
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
          <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
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
          <FloatingLabel controlId="floatingDuration" label="Duration" className="mb-3">
            <Form.Control
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingTeam" label="Team" className="mb-3">
            <Form.Control
              type="text"
              name="newTeam"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddTeam} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.team.map((member, index) => (
              <Badge key={index} pill bg="primary" className="me-1">
                {member}
              </Badge>
            ))}
          </div>

          <FloatingLabel controlId="floatingKeywords" label="Keywords" className="mb-3">
            <Form.Control
              type="text"
              name="newKeyword"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddKeyword} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.keywords.map((keyword, index) => (
              <Badge key={index} pill bg="secondary" className="me-1">
                {keyword}
              </Badge>
            ))}
          </div>

          <FloatingLabel controlId="floatingSkills" label="Skills" className="mb-3">
            <Form.Control
              type="text"
              name="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddSkill} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.skills.map((skill, index) => (
              <Badge key={index} pill bg="success" className="me-1">
                {skill}
              </Badge>
            ))}
          </div>

          <FloatingLabel controlId="floatingAssets" label="Assets" className="mb-3">
            <Form.Control
              type="text"
              name="newAsset"
              value={newAsset}
              onChange={(e) => setNewAsset(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddAsset} className="mt-2">
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.assets.map((asset, index) => (
              <Badge key={index} pill bg="warning" className="me-1">
                {asset}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleCreate}>
            Create Project
          </Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">
            Cancel
          </Button>
          <Button variant="info" className="ms-2">
            Planner
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProj;
