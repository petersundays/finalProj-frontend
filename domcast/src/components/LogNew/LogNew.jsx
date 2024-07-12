import React, { useState } from "react";
import { Card, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Base_url_record } from "../../functions/UsersFunctions.jsx";
import "./LogNew.css";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function LogNew({ onAdd, onCancel, projectPrivateId }) {
  const { t } = useTranslation();
  const loggedUser = userStore((state) => state.loggedUser);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (description === "") {
      toast.error(t("Please write the log"));
      return;
    } else {
      try {
        const urlRecord = new URL(Base_url_record);
        urlRecord.searchParams.append("projectId", projectPrivateId);

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
          navigate(`/domcast/myproject/view/${projectPrivateId}`);
        } else {
          toast.error(t("Error adding log"));
        }
      } catch (error) {
        toast.error(t("Error adding log"));
      }
    }
  };

  return (
    <Card>
      <Row>
        <Col md={6}>
          <FloatingLabel
            controlId="floatingDescription"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={setDescription}>
            Add Log
          </Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">
            Cancel
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default LogNew;
