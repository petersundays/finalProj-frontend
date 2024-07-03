import React, { useState, useMemo } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./MessageHubInbox.css";

const MessageHubInbox = ({ data = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);

  const columns = useMemo(
    () => [
      { Header: "Sender", accessor: "sender" },
      { Header: "Title", accessor: "title" },
      { Header: "Date/Hour", accessor: "date" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: filteredData || [],
      initialState: { sortBy: [{ id: "date", desc: true }] },
    },
    useGlobalFilter,
    useSortBy
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setGlobalFilter(query);
  };

  const handleFilterType = (type) => {
    setFilterType(type);
    const filtered = data.filter((item) => item.type === type);
    setFilteredData(filtered.length ? filtered : data);
  };

  const handleResetFilter = () => {
    setFilteredData(data);
    setFilterType("");
    setSearchQuery("");
    setGlobalFilter("");
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col md={4}>
          <Typeahead
            id="search"
            labelKey="title"
            onChange={(selected) => handleSearch(selected[0] || "")}
            options={data ? data.map((item) => item.title) : []}
            placeholder="Search..."
            selected={searchQuery ? [searchQuery] : []}
            onInputChange={handleSearch}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            aria-label="Filter by type"
            onChange={(e) => handleFilterType(e.target.value)}
            value={filterType}
          >
            <option value="">Filter by type</option>
            <option value="message">Message</option>
            <option value="projects">Projects</option>
            <option value="system">System</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Button variant="secondary" onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </Col>
      </Row>
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "▼"
                        : "▲"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows ? rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          }) : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default MessageHubInbox;
