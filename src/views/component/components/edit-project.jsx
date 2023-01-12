import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../layout";

import ProjectService from "services/ProjectService.service";
import UserService from "services/UserService.service";
import { EmployeeService } from "services";

const EditProject = () => {
  const [employee, setEmployee] = useState([]);
  const [projects, setProjects] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      ProjectService.getProjectById(id)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await EmployeeService.getAllEmployee();
        setEmployee(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getEmployee();
  }, []);

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await ProjectService.updateProject(id, projects);
      const _projects = response.data;
      console.log(_projects);
      navigate("/project");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    navigate(`/project`);
    window.location.reload();
  };

  return (
    <Header>
      <h3 className="ml-4 font-weight-bold">Edit Project</h3>
      <div className="p-5">
        <Row>
          <Col className="col-12 col-lg-6">
            <Form>
              <Form.Group>
                <Form.Label className="font-weight-bold">TITLE</Form.Label>
                <input
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  value={projects.taskTitle}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _projects = { ...projects };
                    _projects.title = val;
                    setProjects(_projects);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">
                  DESCRIPTION
                </Form.Label>
                <input
                  className="form-control"
                  placeholder="Deskripsi"
                  name="description"
                  value={projects.taskDescription}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _projects = { ...projects };
                    _projects.description = val;
                    setProjects(_projects);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">CLIENT</Form.Label>
                <input
                  className="form-control"
                  placeholder="Client"
                  name="client"
                  value={projects.client}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _projects = { ...projects };
                    _projects.skill = val;
                    setProjects(_projects);
                  }}
                />
              </Form.Group>

              <Form.Group className="pb-2">
                <Form.Label className="font-weight-bold">ASSIGN TO</Form.Label>
                <Form.Control
                  as="select"
                  value={projects.assignToName}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _projects = { ...projects };
                    _projects.assignToName = val;
                    setProjects(_projects);
                  }}
                >
                  {employee.map((user) => (
                    <option>{user.employeeName}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="pb-3">
                <Form.Label className="font-weight-bold">PRIORITY</Form.Label>
                <Form.Control
                  as="select"
                  value={projects.priority}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _projects = { ...projects };
                    _projects.priority = val;
                    setProjects(_projects);
                  }}
                >
                  <option>Choose</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="pb-3">
                <Form.Label className="font-weight-bold">STATUS</Form.Label>
                <Form.Control
                  as="select"
                  value={projects.status}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _projects = { ...projects };
                    _projects.status = val;
                    setProjects(_projects);
                  }}
                >
                  <option>Choose</option>
                  <option value="Not Yet">Not Yet</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Done">Done</option>
                </Form.Control>
              </Form.Group>

              <Row className="d-flex justify-content-between">
                <Col className="col-6 col-lg-4">
                  <button
                    className="btn btn btn-primary btn-block"
                    type="submit"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </Col>
                <Col className="col-6 col-lg-4">
                  <button
                    className="btn btn btn-primary btn-block"
                    type="submit"
                    onClick={(e) => updateProject(e)}
                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default EditProject;
