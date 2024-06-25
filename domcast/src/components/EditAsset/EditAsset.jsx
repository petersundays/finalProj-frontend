import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditAsset.css';

const EditAsset = ({ onSave, onCancel }) => {
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

  
    return (
      <Container>
        <Row className="mb-3">
          <Col>
            <h4>Asset Category</h4>
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
                placeholder="Name"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPartNumber" label="Part Number" className="mb-3">
              <Form.Control
                type="text"
                name="partNumber"
                value={formData.partNumber}
                onChange={handleChange}
                placeholder="Part Number"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingBrand" label="Brand" className="mb-3">
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
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
                placeholder="Supplier"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSupplierContact" label="Supplier Contact" className="mb-3">
              <Form.Control
                type="text"
                name="supplierContact"
                value={formData.supplierContact}
                onChange={handleChange}
                placeholder="Supplier Contact"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingQuantity" label="Quantity" className="mb-3">
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={0}
                placeholder="Quantity"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingNotes" label="Notes" className="mb-3">
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                style={{ resize: 'none' }}
                placeholder="Notes"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="primary" onClick={handleSave}>
              Edit Asset
            </Button>
            <Button variant="secondary" onClick={onCancel} className="ms-2">
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default EditAsset;
  