import React, { useState } from "react";
import { Modal, Form, FloatingLabel, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Base_url_components_resources } from "../../functions/UsersFunctions.jsx";
import { userStore } from "../../stores/UserStore.jsx";

function AssetNewModal({ show, onHide }) {
  const loggedUser = userStore((state) => state.loggedUser);
  const [assetType, setAssetType] = useState("Component");
  const [formData, setFormData] = useState({
    type: 1,
    name: "",
    description: "",
    partNumber: 0,
    brand: "",
    supplier: "",
    supplierContact: "",
    quantity: 1,
    notes: "",
  });

  const handleAssetChange = (type) => {
    setAssetType(type);
    setFormData({
      ...formData,
      type: type === "Component" ? 1 : 2,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAsset = async () => {
    if (
      !formData.type ||
      !formData.name ||
      !formData.description ||
      !formData.partNumber ||
      !formData.brand ||
      !formData.supplier ||
      !formData.supplierContact ||
      !formData.quantity
    ) {
      toast.error("All fields except notes are mandatory");
      return;
    }

    try {
      const assetsResponse = await fetch(Base_url_components_resources, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
        body: JSON.stringify(formData),
      });

      if (assetsResponse.ok) {
        toast.success("Asset added successfully");
        onHide();
      } else {
        toast.error("Error adding asset");
      }
    } catch (error) {
      console.error("Error adding asset", error);
      toast.error("Error adding asset");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Row className="justify-content-center my-2">
          <Modal.Title style={{ color: "var(--color-blue-03)" }}>
            Add New Asset
          </Modal.Title>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <Row className="my-4">
          <Col className="justify-content-center d-flex mb-3">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-outline-secondary btn-custom-asset ${
                  assetType === "Component" ? "active" : ""
                }`}
                onClick={() => handleAssetChange("Component")}
                style={{
                  width: "8rem",
                  height: "3rem",
                  fontWeight: "bold",
                }}
              >
                Component
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary btn-custom-asset ${
                  assetType === "Resource" ? "active" : ""
                }`}
                onClick={() => handleAssetChange("Resource")}
                style={{
                  width: "8rem",
                  height: "3rem",
                  fontWeight: "bold",
                }}
              >
                Resource
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FloatingLabel controlId="floatingName" label="Name *" className="mb-3">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingDescription" label="Description *" className="mb-3">
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPartNumber" label="Part Number *" className="mb-3">
              <Form.Control
                type="number"
                name="partNumber"
                value={formData.partNumber}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingBrand" label="Brand *" className="mb-3">
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="floatingSupplier" label="Supplier *" className="mb-3">
              <Form.Control
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSupplierContact" label="Supplier Contact *" className="mb-3">
              <Form.Control
                type="text"
                name="supplierContact"
                value={formData.supplierContact}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingQuantity" label="Quantity *" className="mb-3">
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={1}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingNotes" label="Notes" className="mb-3">
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.observations}
                onChange={handleChange}
                style={{ resize: "none" }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="justify-content-center my-1">
          <p
            className="my-1"
            style={{
              fontSize: "15px",
              color: "var(--color-blue-01)",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            All fields required (except notes)
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center my-3">
        <Button
          variant="secondary"
          onClick={onHide}
          className="modal-add-asset-cancel-btn mx-2"
          style={{ width: "8rem" }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleAddAsset}
          className="modal-add-asset-save-btn mx-2"
          style={{ width: "8rem" }}
        >
          Add Asset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AssetNewModal;
