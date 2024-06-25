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
import "./EditProj.css";

const EditProj = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    lab: "",
    description: "",
    startDate: "",
    duration: "",
    team: [],
    keywords: [],
    skills: [],
    assets: [],
  });

  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);
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

  const handleAddMember = (selected) => {
    if (selected.length > 0) {
      const role = document.getElementById("team-role").value;
      setFormData({
        ...formData,
        team: [...formData.team, { name: selected[0], role }],
      });
      setNewMember("");
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    setMembers(members.filter((member) => member !== memberToRemove));
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
          <FloatingLabel controlId="floatingLab" label="Lab" className="mb-3">
            <Form.Select
              name="lab"
              value={formData.lab}
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
              name="startDate"
              value={formData.startDate}
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
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration in days"
            />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel controlId="floatingTeam" label="Team" className="mb-3">
            <Typeahead
              id="team-search"
              onChange={handleAddMember}
              options={[]}
              placeholder="Search user..."
            />
            <Form.Select id="team-role" className="mt-2">
              <option value="Manager">Manager</option>
              <option value="Contributor">Contributor</option>
            </Form.Select>
            <Button
              variant="primary"
              onClick={() => handleAddMember([{ name: newMember }])}
              className="mt-2"
            >
              Add
            </Button>
          </FloatingLabel>
          <div>
            {formData.team.map((member, index) => (
              <Badge key={index} pill bg="primary" className="me-1">
                {member.name}{" "}
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => handleRemoveMember(member)}
                >
                  x
                </Button>
              </Badge>
            ))}
          </div>

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
};

export default EditProj;
