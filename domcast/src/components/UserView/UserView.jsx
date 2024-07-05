import React, { useEffect, useState } from "react";
import { userStore } from "../../stores/UserStore";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Base_url_projects } from "../../functions/UsersFunctions";
import { Badge, Form, Row, Col } from "react-bootstrap";

const UserView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // experimentar fetchar users e fazer set na store
  const user = userStore((state) => state.users.find((user) => user.id === id));
  const loggedUser = userStore((state) => state.loggedUser);

  const [orderBy, setOrderBy] = useState("state");
  const [orderAsc, setOrderAsc] = useState(true);
  const searchQuery = useState("");
  const [projects, setProjects] = useState([]);
  const showMoreProjects = useState(100);

  const skills = user.skills;
  const interests = user.interests;

  const userId = user.id === loggedUser.id ? loggedUser.id : user.id;

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSendMessage = () => {
    // show modal message
  };

  const editProfile = () => {
    navigate(`/user/edit/${userId}`);
  };

  const handleChangeSortBy = (e) => {
    setOrderBy(e.target.value);
  };

  const handleSearch = () => {
    fetchProjects();
  };

  const fetchProjects = async () => {
    if (!searchQuery && !orderBy && !orderAsc) {
      setOrderBy("name");
      setOrderAsc(true);
      console.log("searchQuery no fetchProjects 1: ", searchQuery);
    } else {
      try {
        const url = new URL(`${Base_url_projects}`);
        url.searchParams.append("userId", userId);
        url.searchParams.append("orderBy", orderBy);
        url.searchParams.append("orderAsc", orderAsc);
        url.searchParams.append("pageSize", showMoreProjects);
        url.searchParams.append("pageNumber", 1);

        const projectsResponse = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);
          console.log("Projects fetched:", projectsData);
        } else {
          console.error("Error fetching projects:", projectsResponse);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={user.photo} />
        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Text>{user.nickname}</Card.Text>
        <Card.Text>{user.lab}</Card.Text>
        <Card.Text>{user.bio}</Card.Text>
        <Card.Text>
          Privacy: {user.visible === true ? "Public" : "Private"}
        </Card.Text>
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
                checked={orderAsc === true}
                onChange={() => setOrderAsc(true)}
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
                checked={orderAsc === false}
                onChange={() => setOrderAsc(false)}
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
          <Button
            variant="primary"
            onClick={handleSendMessage}
            className="mt-3"
          >
            Send Message
          </Button>
        ) : (
          <Button variant="primary" onClick={editProfile} className="mt-3">
            Edit Profile
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserView;
