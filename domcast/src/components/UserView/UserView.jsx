import React, { useEffect, useState } from "react";
import { userStore } from "../../stores/UserStore";
import { Card, Button, Badge, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Base_url_projects } from "../../functions/UsersFunctions";
import ModalMessage from "../ModalMessage/ModalMessage";

const UserView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("urlId:", id);
  const urlId = parseInt(id);
  const loggedUser = userStore((state) => state.loggedUser);
  const usersList = userStore((state) => state.userList);

  const [projectsOrderBy, setProjectsOrderBy] = useState("state");
  const [projectsOrderAsc, setProjectsOrderAsc] = useState(true);
  const projectsSearchQuery = useState("");
  const [projects, setProjects] = useState([]);
  const showMoreProjects = 100;

  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    if (usersList.length > 0) {
      fetchProjects();
    }
  }, [usersList]);

  const fetchProjects = async () => {
    if (!projectsSearchQuery && !projectsOrderBy && !projectsOrderAsc) {
      setProjectsOrderBy("name");
      setProjectsOrderAsc(true);
    } else {
      try {
        const user = usersList.find((user) => user.id === urlId);
        if (!user) {
          console.error("User not found");
          return;
        }
        const userId = user.id === loggedUser.id ? loggedUser.id : user.id;

        const urlProjects = new URL(`${Base_url_projects}`);
        urlProjects.searchParams.append("userId", userId);
        urlProjects.searchParams.append("orderBy", projectsOrderBy);
        urlProjects.searchParams.append("orderAsc", projectsOrderAsc);
        urlProjects.searchParams.append("pageSize", showMoreProjects);
        urlProjects.searchParams.append("pageNumber", 1);

        const projectsResponse = await fetch(urlProjects.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData.projects);
          console.log("Projects fetched:", projectsData);
        } else {
          console.error("Error fetching projects:", projectsResponse);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  };

  const editProfile = () => {
    navigate(`/user/edit/${userId}`);
  };

  const handleChangeSortBy = (e) => {
    setProjectsOrderBy(e.target.value);
  };

  const handleSearch = () => {
    fetchProjects();
  };

  const user = usersList.find((user) => user.id === urlId);
  const userId = user.id === loggedUser.id ? loggedUser.id : user.id;
  const skills =
    (loggedUser.id === user.id ? loggedUser.skills : user.skills) || [];
  const interests =
    (loggedUser.id === user.id ? loggedUser.interests : user.interests) || [];

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={user.photo} />
        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Text>{user.nickname}</Card.Text>
        <Card.Text>{user.lab}</Card.Text>
        <Card.Text>{user.bio}</Card.Text>
        {urlId === loggedUser.id && (
          <Card.Text>
            Privacy: {user.visible === true ? "Private" : "Public"}
          </Card.Text>
        )}
        <div>
          <h6>Skills:</h6>
          {skills.map((skill, index) => (
            <Badge key={index} pill bg="primary" className="me-1">
              {skill.name}
            </Badge>
          ))}
        </div>
        <div>
          <h6>Interests:</h6>
          {interests.map((interest, index) => (
            <Badge key={index} pill bg="secondary" className="me-1">
              {interest.name}
            </Badge>
          ))}
        </div>
        <div>
          <h6>Projects:</h6>
          <Row>
            <Col className="my-2 me-2" style={{ width: "15rem" }}>
              <Form.Select
                className="me-2"
                onChange={handleChangeSortBy}
                style={{ width: "15rem" }}
              >
                <option value="readyDate">Start date</option>
                <option value="state">State</option>
              </Form.Select>
            </Col>
            <Col className="my-2 me-2" style={{ width: "12rem" }}>
              <Form.Check
                type="radio"
                label="Ascending"
                name="orderDirection"
                id="orderAsc"
                checked={projectsOrderAsc === true}
                onChange={() => setProjectsOrderAsc(true)}
                className="me-2 radio-btn-custom"
                style={{ width: "12rem" }}
              />
            </Col>
            <Col className="my-2 me-2" style={{ width: "12rem" }}>
              <Form.Check
                type="radio"
                label="Descending"
                name="orderDirection"
                id="orderDesc"
                checked={projectsOrderAsc === false}
                onChange={() => setProjectsOrderAsc(false)}
                className="radio-btn-custom"
                style={{ width: "12rem" }}
              />
            </Col>
            <Col className="my-2 mx-2" style={{ width: "5rem" }}>
              <Button
                className="custom-show-more-btn mb-4"
                variant="secondary"
                onClick={handleSearch}
                style={{ width: "5rem" }}
              >
                Order
              </Button>
            </Col>
          </Row>
          {projects.map((project, index) => (
            <Card key={index} className="mb-2">
              <Card.Header>
                <Card.Title>{project.title}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>{project.lab}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </div>
        {user.id !== loggedUser.id ? (
          <Button variant="primary" onClick={openMessageModal} className="mt-3">
            Send Message
          </Button>
        ) : (
          <Button variant="primary" onClick={editProfile} className="mt-3">
            Edit Profile
          </Button>
        )}
      </Card.Body>
      <ModalMessage
        id={user.id}
        show={showMessageModal}
        handleClose={closeMessageModal}
      />
    </Card>
  );
};

export default UserView;
