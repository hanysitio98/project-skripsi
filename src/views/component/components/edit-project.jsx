import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../layout'

import ProjectService from 'services/ProjectService.service';
import UserService from 'services/UserService.service';

const EditProject = () => {

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    if (id) {
      ProjectService.getProjectById(id).then((response) => {
        setProjects(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id]);

  useEffect(() => {

    const getUsers = async () => {
      try {
        const response = await UserService.getUser();
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();

  }, []);

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await ProjectService.updateProject(id, projects);
      const _projects = response.data;
      console.log(_projects);
      navigate("/project")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Header>
      <h3 className="ml-4 font-weight-bold">Edit Project</h3>
      <div className="p-5">

        <Row>
          <Col className="col-12 col-lg-6">
            <Form>
              <Form.Group>
                <Form.Label className="font-weight-bold">TITLE</Form.Label>
                <input className='form-control' placeholder="Title"
                  name="title"
                  value={projects.taskTitle}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || '';
                    const _projects = { ...projects };
                    _projects.title = val;
                    setProjects(_projects);
                  }} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">DESCRIPTION</Form.Label>
                <input className='form-control' placeholder="Deskripsi"
                  name="description"
                  value={projects.taskDescription}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || '';
                    const _projects = { ...projects };
                    _projects.description = val;
                    setProjects(_projects);
                  }} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">CLIENT</Form.Label>
                <input className='form-control' placeholder="Client"
                  name="client"
                  value={projects.client}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || '';
                    const _projects = { ...projects };
                    _projects.skill = val;
                    setProjects(_projects);
                  }} />
              </Form.Group>

              <Form.Group className="pb-2">
                <Form.Label className="font-weight-bold">ASSIGN TO</Form.Label>
                <Form.Control as="select"
                  value={projects.assignTo}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || '';
                    const _projects = { ...projects };
                    _projects.assignTo = val;
                    setProjects(_projects);
                  }}
                >
                  {users.map(user =>
                    <option>{user.id}</option>)}

                </Form.Control>
              </Form.Group>

              <Form.Group className="pb-3">
                <Form.Label className="font-weight-bold">PRIORITY</Form.Label>
                <Form.Control as="select"
                  value={projects.priority}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || '';
                    const _projects = { ...projects };
                    _projects.priority = val;
                    setProjects(_projects);
                  }}>
                  <option>Choose</option>
                  <option value="Low">
                    Low
                  </option>
                  <option value="Medium">
                    Medium
                  </option>
                  <option value="HIgh">
                    HIgh
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="pb-3">
                <Form.Label className="font-weight-bold">STATUS</Form.Label>
                <Form.Control as="select"
                  value={projects.status}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || '';
                    const _projects = { ...projects };
                    _projects.status = val;
                    setProjects(_projects);
                  }}>
                  <option>Choose</option>
                  <option value="Not Yet">
                    Not Yet
                  </option>
                  <option value="Ongoing">
                    Ongoing
                  </option>
                  <option value="Done">
                    Done
                  </option>
                </Form.Control>
              </Form.Group>

              <Col className="col-12 col-lg-4 p-0">
                <button className="btn btn btn-primary btn-block" type="submit" onClick={(e) => updateProject(e)}
                >
                  Submit
                </button>
              </Col>

            </Form>
          </Col>
        </Row>

      </div>
    </Header>
  )
}

export default EditProject;