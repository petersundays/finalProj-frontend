import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ToggleButtonGroup, ToggleButton, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetNew.css';

const AssetNew = ({ onSave, onCancel }) => {
    const [assetType, setAssetType] = useState('Component');
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      partNumber: '',
      brand: '',
      supplier: '',
      supplierContact: '',
      quantity: '',
      notes: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSave = () => {
      onSave(formData);
    };
  
    const handleCancel = () => {
      onCancel();
    };
  
    return (
      <Container>
        <Row className="mb-3">
          <Col>
            <ToggleButtonGroup
              type="radio"
              name="assetType"
              value={assetType}
              onChange={(value) => setAssetType(value)}
            >
              <ToggleButton id="tbg-radio-1" value="Component">
                Component
              </ToggleButton>
              <ToggleButton id="tbg-radio-2" value="Resource">
                Resource
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPartNumber" label="Part Number" className="mb-3">
              <Form.Control
                type="text"
                name="partNumber"
                value={formData.partNumber}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingBrand" label="Brand" className="mb-3">
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="floatingSupplier" label="Supplier" className="mb-3">
              <Form.Control
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSupplierContact" label="Supplier Contact" className="mb-3">
              <Form.Control
                type="text"
                name="supplierContact"
                value={formData.supplierContact}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingQuantity" label="Quantity" className="mb-3">
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={0}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingNotes" label="Notes" className="mb-3">
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                style={{ resize: 'none' }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleCancel} className="ms-2">
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default AssetNew;
  