import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import './AdminSettings.css';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Base_url_admins } from '../../../functions/UsersFunctions';
import { userStore } from '../../../stores/UserStore';

function AdminSettings ({ settings }) {
  const { t } = useTranslation();
  const loggedUser = userStore((state) => state.loggedUser);

  const [formData, setFormData] = useState(settings);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [maxMembers, setMaxMembers] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      await getTimeout();
      await getMaxMembers();
    };

    fetchData();

  }, []);

  const handleTimeoutChange = (event) => {
    setSessionTimeout(event.target.value);
  };

  const handleMaxMembersChange = (event) => {
    setMaxMembers(event.target.value);
  };

  const handleSave = async () => {
    await saveSessionTimout();
    await saveMaxMembers();
  };

  const getTimeout = async () => {
    const url = new URL(`${Base_url_admins}session-timeout`);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (response.ok) {
        const systemTimeout = await response.json();
        setSessionTimeout(systemTimeout);
        
      } else {
        console.log("Error getting session timeout");
      }
    } catch (error) {
      console.error("Error getting session timeout", error);
    }
    
  };

  const getMaxMembers = async () => {
    const url = new URL(`${Base_url_admins}max-members`);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (response.ok) {
        const systemMaxMembers = await response.json();
        setMaxMembers(systemMaxMembers);
        
      } else {
        console.log("Error getting max members");
      }
    } catch (error) {
      console.error("Error getting max members", error);
    }
    
  };

  const saveSessionTimout = async () => {
    const url = new URL(`${Base_url_admins}session-timeout`);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          timeout: sessionTimeout,
        },
      });

      if (response.ok) {
        console.log("Session timeout set");
        
      } else {
        console.log("Error setting session timeout");
      }
    } catch (error) {
      console.error("Error setting session timeout", error);
    }
    
  };


  const saveMaxMembers = async () => {
    const url = new URL(`${Base_url_admins}project-max-members`);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          maxMembers: maxMembers,
        },
      });

      if (response.ok) {
        console.log("Max members set");
        
      } else {
        console.log("Error getting max members");
      }
    } catch (error) {
      console.error("Error getting max members", error);
    }
    
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <FloatingLabel controlId="floatingSessionTimeout" label="Session Timeout (in minutes)" className="mb-3">
            <Form.Control
              type="number"
              name="sessionTimeout"
              value={sessionTimeout}
              onChange={handleTimeoutChange}
              min="1"
              placeholder="Session Timeout"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingMaxMembers" label="Maximum Number of Project Members" className="mb-3">
            <Form.Control
              type="number"
              name="maxMembers"
              value={maxMembers}
              onChange={handleMaxMembersChange}
              min="1"
              placeholder="Maximum Number of Project Members"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button style={{ backgroundColor: "var(--color-blue-01)"}} onClick={handleSave}>
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;
