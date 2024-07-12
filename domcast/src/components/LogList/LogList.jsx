import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import LogNew from "../LogNew/LogNew";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function LogList({ privateProject }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const privateProjectId = privateProject.id;

  const handleAdd = () => {
    navigate("/domcast/logs/new", { state: { privateProjectId } });
  };

  return (
    <Card>
      <Card.Header>
        {t("Logs for project")} {privateProject.name}
      </Card.Header>
      <Card.Body>
        <Card.Title>{t("Logs")}</Card.Title>
        <Card.Text>
          <Table striped bordered hover className="table-logs">
            <thead>
              <tr>
                <th>{t("Author")}</th>
                <th>{t("Description")}</th>
              </tr>
            </thead>
            <tbody>
              {privateProject.records.map((record) => (
                <tr key={record.timestamp}>
                  <td>{record.author}</td>
                  <td>{record.content}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>
        <Button variant="primary" onClick={handleAdd}>
          {t("AddLog")}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LogList;
