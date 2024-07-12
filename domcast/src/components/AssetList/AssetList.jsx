import React, { useEffect, useState } from "react";
import { Card, Table, Button, Row, Col } from "react-bootstrap";
import "./AssetList.css";
import { Base_url_components_resources } from "../../functions/UsersFunctions";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore.jsx";
import AssetNewModal from "../AssetNew/AssetNewModal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AssetList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loggedUser = userStore((state) => state.loggedUser);
  const [visibleRows, setVisibleRows] = useState(8);
  const [showAssetNewModal, setShowAssetNewModal] = useState(false);
  const [assetList, setAssetList] = useState([]);
  const [assetsEnum, setAssetsEnum] = useState([]);

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
    name: asset.name,
    type: assetsEnumMap[asset.type] || asset.type, // Fallback to asset.type if not found in map
    brand: asset.brand,
    supplier: asset.supplier,
  }));

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
