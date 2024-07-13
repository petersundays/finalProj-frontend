import React, { useEffect, useState } from "react";
import { Card, Table, Button, Row, Col, Modal, Form, FloatingLabel } from "react-bootstrap";
import {
  Base_url_projects,
  Base_url_record,
} from "../../functions/UsersFunctions";
import { userStore } from "../../stores/UserStore";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function LogList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [privateProject, setProjectPrivate] = useState({});
  const loggedUser = userStore((state) => state.loggedUser);
  const { id } = useParams();
  const [isProjectFetched, setIsProjectFetched] = useState(false);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isProjectFetched) {
      fetchPrivateProject();
    }
  }, []);

  const fetchPrivateProject = async () => {
    const urlPrivProj = new URL(`${Base_url_projects}private`);
    urlPrivProj.searchParams.append("id", id);
    try {
      const projectResponse = await fetch(urlPrivProj, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      const projectData = await projectResponse.json();
      setProjectPrivate(projectData);
      setIsProjectFetched(true);
      console.log("projectData", projectData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    if (description === "") {
      toast.error(t("Please write the log"));
      return;
    } else {
      try {
        const urlRecord = new URL(Base_url_record);
        urlRecord.searchParams.append("projectId", id);

        const response = await fetch(urlRecord, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
          body: description,
        });

        if (response.ok) {
          toast.success(t("Log added"));
          navigate(`/domcast/logs/list/${id}`);
        } else {
          toast.error(t("Error adding log"));
        }
      } catch (error) {
        toast.error(t("Error adding log"));
      }
    }
  };

  return (
    <>
      {privateProject && privateProject.name && (
        <>
          <Row className="my-4">
            <Col className="d-flex justify-content-end mx-5">
              <Button
                variant="primary"
                onClick={showAddLogModal}
                style={{
                  backgroundColor: "var(--color-yellow-02)",
                  borderColor: "var(--color-yellow-02)",
                  width: "8rem",
                  height: "2.5rem",
                }}
              >
                {t("Add Log")}
              </Button>
            </Col>
          </Row>
          <Card style={{ border: "none" }}>
            <Card.Body>
              <Card.Title className="mb-3">
                {t("Log for project")} {privateProject.name}{" "}
              </Card.Title>
              <Table
                striped
                bordered
                hover
                className="table-logs"
                style={{ maxWidth: "60rem" }}
              >
                <thead>
                  <tr>
                    <th>{t("Author")}</th>
                    <th>{t("Description")}</th>
                  </tr>
                </thead>
                {privateProject.records && privateProject.records.length > 0 ? (
                  <tbody>
                    {privateProject.records.map((record, index) => (
                      <tr key={index}>
                        <td>
                          {record.author.firstName} {record.author.lastName}
                        </td>
                        <td>{record.content}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="2">{t("No logs found")}</td>
                    </tr>
                  </tbody>
                )}
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
      <Modal show={showAddLogModal} onHide={() => setShowAddLogModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Add Log")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingDescription"
            label={t("Description")}
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("Description")}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddLogModal(false)}>
            {t("Close")}
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            {t("Add Log")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogList;
