import React, { useState } from "react";
import { Card, Table, Button, Row, Col } from "react-bootstrap";
import "./AssetList.css";

function AssetList() {
  const [visibleRows, setVisibleRows] = useState(8);

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
      <Row className="asset-list-row">
        <h2 className="asset-list-title">Asset List</h2>
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
    </Card>
  );
}

export default AssetList;
