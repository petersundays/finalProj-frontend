import React, { useEffect, useState } from "react";
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
import { Base_url_components_resources } from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore.jsx";
import AssetNewModal from "../AssetNew/AssetNewModal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AssetList() {
  const { t } = useTranslation();
  const loggedUser = userStore((state) => state.loggedUser);
  const [visibleRows, setVisibleRows] = useState(8);
  const [showAssetNewModal, setShowAssetNewModal] = useState(false);
  const [assetList, setAssetList] = useState([]);
  const [assetsEnum, setAssetsEnum] = useState([]);
  const [showAssetViewModal, setShowAssetViewModal] = useState(false);
  const [asset, setAsset] = useState({
    id: 0,
    name: "",
    description: "",
    partNumber: 0,
    brand: "",
    supplier: "",
    supplierContact: "",
    quantity: 1,
    observations: "",
  });

  const [previousAsset, setPreviousAsset] = useState({
    id: 0,
    name: "",
    description: "",
    partNumber: 0,
    brand: "",
    supplier: "",
    supplierContact: "",
    quantity: 1,
    observations: "",
  });

  useEffect(() => {
    fetchAssets();
    console.log("Asset Enums: ", assetsEnum);
  }, [showAssetNewModal]);

  const fetchAssets = async () => {
    try {
      const assetsEnumResponse = await fetch(
        `${Base_url_components_resources}enum`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
        }
      );

      if (assetsEnumResponse.ok) {
        const assetsEnum = await assetsEnumResponse.json();
        setAssetsEnum(assetsEnum);
      } else {
        toast.error("Error fetching assets enum");
      }
    } catch (error) {
      toast.error("Error fetching assets enum");
    }

    try {
      const urlAsset = new URL(Base_url_components_resources);
      urlAsset.searchParams.append("orderBy", "name");
      urlAsset.searchParams.append("orderAsc", "true");
      urlAsset.searchParams.append("pageNumber", "1");
      urlAsset.searchParams.append("pageSize", "100");

      const assetsResponse = await fetch(urlAsset, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (assetsResponse.ok) {
        const assets = await assetsResponse.json();
        setAssetList(assets);
        console.log("Asset List: ", assets);
      } else {
        toast.error("Error fetching assets");
      }
    } catch (error) {
      toast.error("Error fetching assets");
    }
  };

  const transformName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const assetsEnumMap = assetsEnum.reduce((map, enumItem) => {
    map[enumItem.id] = transformName(enumItem.name);
    return map;
  }, {});

  const data = assetList.map((asset) => ({
    id: asset.id,
    name: asset.name,
    type: assetsEnumMap[asset.type] || asset.type, // Fallback to asset.type if not found in map
    brand: asset.brand,
    supplier: asset.supplier,
  }));

  const handleShowMore = () => {
    setVisibleRows((prev) => Math.min(prev + 8, data.length));
  };

  const handleChange = (e) => {
    setAsset({
      ...asset,
      [e.target.name]: e.target.value,
    });
  };

  // function to get the asset through the id
  const handleAssetClick = (id) => {
    const clickedAsset = assetList.find((asset) => asset.id === id);
    setPreviousAsset(clickedAsset);
    setAsset(clickedAsset);
    setShowAssetViewModal(true);
  };

  const handleSaveAsset = async () => {
    // compare previousAsset with asset, if they are the same, do not update
    if (
      JSON.stringify(previousAsset) === JSON.stringify(asset) ||
      !asset.name ||
      !asset.description ||
      !asset.partNumber ||
      !asset.brand ||
      !asset.supplier ||
      !asset.supplierContact ||
      !asset.quantity
    ) {
      try {
        const url = new URL(Base_url_components_resources);
        url.searchParams.append("id", asset.id);

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
          body: JSON.stringify(asset),
        });
        if (response.ok) {
          const newAsset = await response.json();
          setAsset(newAsset);
          toast.success("Asset updated successfully");
          setShowAssetViewModal(false);
          fetchAssets();
        } else {
          toast.error("Error updating asset");
        }
      } catch (error) {
        toast.error("Error updating asset");
      }
    }
  };

  return (
    <>
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
              </tr>
            </thead>
            <tbody>
              {data.slice(0, visibleRows).map((item, index) => (
                <tr
                  key={index}
                  className="asset-list-row"
                  onClick={() => handleAssetClick(item.id)}
                  style={{ cursor: "pointer" }}
                >
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
      <Modal
        show={showAssetViewModal}
        onHide={() => setShowAssetViewModal(false)}
        asset={asset}
      >
        <Modal.Header closeButton>
          <Row className="justify-content-center my-2">
            <Modal.Title style={{ color: "var(--color-blue-03)" }}>
              Asset
            </Modal.Title>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingName"
                label="Name *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={asset.name}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingDescription"
                label="Description *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="description"
                  value={asset.description}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPartNumber"
                label="Part Number *"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="partNumber"
                  value={asset.partNumber}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingBrand"
                label="Brand *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="brand"
                  value={asset.brand}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingSupplier"
                label="Supplier *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="supplier"
                  value={asset.supplier}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingSupplierContact"
                label="Supplier Contact *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="supplierContact"
                  value={asset.supplierContact}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingQuantity"
                label="Quantity *"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="quantity"
                  value={asset.quantity}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingNotes"
                label="Notes"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  name="observations"
                  value={asset.observations}
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
            onClick={() => setShowAssetViewModal(false)}
            className="modal-add-asset-cancel-btn mx-2"
            style={{ width: "8rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAsset}
            className="modal-add-asset-save-btn mx-2"
            style={{ width: "8rem" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssetList;
