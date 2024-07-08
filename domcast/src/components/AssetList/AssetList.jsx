import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import "./AssetList.css";
import { toast } from "react-toastify";
import { Base_url_components_resources } from "../../functions/UsersFunctions";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";
import AssetNewModal from "../AssetNew/AssetNewModal";
 

function AssetList() {
  const navigate = useNavigate();
  const loggedUser = userStore((state) => state.loggedUser);
  const [visibleRows, setVisibleRows] = useState(8);
  const [showAssetNewModal, setShowAssetNewModal] = useState(false);
  const [assetType, setAssetType] = useState("Component");
  const [formData, setFormData] = useState({
    type: 1,
    name: "",
    description: "",
    partNumber: 0,
    brand: "",
    supplier: "",
    supplierContact: 0,
    quantity: 0,
    observations: "",
  });

  const handleAssetChange = (type) => {
    setAssetType(type);
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
      toast.error("mandatoryFieldsError");
      return;
    } else {
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
          setShowAssetNewModal(false);
        } else {
          toast.error("Error adding asset");
        }
      }
      catch (error) {
        console.error("Error adding asset", error);
        toast.error("Error adding asset");
      }
    }
  };

  const data = [
    {
      name: "Asset 1",
      type: "Component",
      brand: "Brand 1",
      supplier: "Supplier 1",
      quantity: 1,
    },
    {
      name: "Asset 2",
      type: "Component",
      brand: "Brand 2",
      supplier: "Supplier 2",
      quantity: 2,
    },
    {
      name: "Asset 3",
      type: "Resource",
      brand: "Brand 3",
      supplier: "Supplier 3",
      quantity: 3,
    },
    {
      name: "Asset 4",
      type: "Resource",
      brand: "Brand 4",
      supplier: "Supplier 4",
      quantity: 4,
    },
    {
      name: "Asset 5",
      type: "Resource",
      brand: "Brand 5",
      supplier: "Supplier 5",
      quantity: 5,
    },
    {
      name: "Asset 6",
      type: "Component",
      brand: "Brand 6",
      supplier: "Supplier 6",
      quantity: 6,
    },
    {
      name: "Asset 7",
      type: "Component",
      brand: "Brand 7",
      supplier: "Supplier 7",
      quantity: 7,
    },
    {
      name: "Asset 8",
      type: "Component",
      brand: "Brand 8",
      supplier: "Supplier 8",
      quantity: 8,
    },
    {
      name: "Asset 9",
      type: "Resource",
      brand: "Brand 9",
      supplier: "Supplier 9",
      quantity: 9,
    },
    {
      name: "Asset 10",
      type: "Resource",
      brand: "Brand 10",
      supplier: "Supplier 10",
      quantity: 10,
    },
    {
      name: "Asset 11",
      type: "Component",
      brand: "Brand 11",
      supplier: "Supplier 11",
      quantity: 11,
    },
    {
      name: "Asset 12",
      type: "Resource",
      brand: "Brand 12",
      supplier: "Supplier 12",
      quantity: 12,
    },
    {
      name: "Asset 13",
      type: "Resource",
      brand: "Brand 13",
      supplier: "Supplier 13",
      quantity: 13,
    },
    {
      name: "Asset 14",
      type: "Component",
      brand: "Brand 14",
      supplier: "Supplier 14",
      quantity: 14,
    },
    {
      name: "Asset 15",
      type: "Component",
      brand: "Brand 15",
      supplier: "Supplier 15",
      quantity: 15,
    },
    {
      name: "Asset 16",
      type: "Resource",
      brand: "Brand 16",
      supplier: "Supplier 16",
      quantity: 16,
    },
    {
      name: "Asset 17",
      type: "Component",
      brand: "Brand 17",
      supplier: "Supplier 17",
      quantity: 17,
    },
    {
      name: "Asset 18",
      type: "Component",
      brand: "Brand 18",
      supplier: "Supplier 18",
      quantity: 18,
    },
    {
      name: "Asset 19",
      type: "Resource",
      brand: "Brand 19",
      supplier: "Supplier 19",
      quantity: 19,
    },
    {
      name: "Asset 20",
      type: "Resource",
      brand: "Brand 20",
      supplier: "Supplier 20",
      quantity: 20,
    },
  ];

  const handleShowMore = () => {
    setVisibleRows((prev) => Math.min(prev + 8, data.length));
  };

  return (
    <Card
      className="asset-list-card ms-lg-5 my-5"
      style={{ border: "none", maxWidth: "85rem", height: "80%" }}
    >
      <Row className="asset-list-row mb-2">
        <Col className="d-flex justify-content-start ms-lg-3">
          <h2
            className="asset-list-title"
            style={{ color: "var(--color-blue-03)" }}
          >
            Asset List
          </h2>
        </Col>
        <Col className="d-flex justify-content-end me-lg-3">
          <Button
            className="custom-add-asset-btn"
            style={{ width: "8rem" }}
            onClick={() => setShowAssetNewModal(true)}
          >
            Add Asset
          </Button>
        </Col>
      </Row>
      <Col className="mb-3" style={{ border: "none", maxWidth: "85rem" }}>
        <Table className="asset-list-table my-3">
          <thead>
            <tr>
              <th className="asset-list-header">Name</th>
              <th className="asset-list-header">Type</th>
              <th className="asset-list-header">Brand</th>
              <th className="asset-list-header">Supplier</th>
              <th className="asset-list-header">Qty.</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, visibleRows).map((item, index) => (
              <tr key={index} className="asset-list-row">
                <td
                  className="asset-list-cell"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </td>
                <td
                  className="asset-list-cell"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.type}
                </td>
                <td
                  className="asset-list-cell"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.brand}
                </td>
                <td
                  className="asset-list-cell"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.supplier}
                </td>
                <td
                  className="asset-list-cell"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {visibleRows < data.length && (
          <div className="d-flex justify-content-center mb-3">
            <Button
              className="custom-show-more-btn my-2"
              onClick={handleShowMore}
              style={{
                backgroundColor: "var(--color-blue-03)",
                borderColor: "var(--color-blue-03)",
                color: "var(--color-white)",
                fontWeight: "500",
              }}
            >
              Show More
            </Button>
          </div>
        )}
      </Col>

      <AssetNewModal
        show={showAssetNewModal}
        onHide={() => setShowAssetNewModal(false)}
      />
    </Card>
  );
}

export default AssetList;
