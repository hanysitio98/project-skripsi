import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Toast } from 'react-bootstrap';
import ProjectService from 'services/ProjectService.service';
import UserService from 'services/UserService.service';

const AddProject = () => {


  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [client, setClient] = useState();
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState('');
  const [assignTo, setAssignTo] = useState();
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);



  const saveProject = async (e) => {
    e.preventDefault();
    const project = { taskTitle, taskDescription, client, status, priority, assignTo };
    try {
      const response = await ProjectService.createProject(project);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

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


  return (
    <>
      <Row>
        <Col>
          <Form >
            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">TITLE</Form.Label>
              <input className='form-control' placeholder="Title"
                name="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">DESCRIPTION</Form.Label>
              <input className='form-control' placeholder="Deskripsi"
                name="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">CLIENT</Form.Label>
              <input className='form-control' placeholder="Client"
                name="client"
                value={client}
                onChange={(e) => setClient(e.target.value)} />
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">ASSIGN TO</Form.Label>
              <Form.Control as="select"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}>
                {users.map(user =>
                  <option>{user.id}</option>)}

              </Form.Control>
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label className="font-weight-bold">Priority</Form.Label>
              <Form.Control as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}>
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
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

            <div>
              <button className="btn btn-block btn-primary" type="submit" onClick={(e) => saveProject(e)}
              >
                Submit
              </button>
            </div>

            <div>
              <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="primary">
                <Toast.Body className="text-primary">Woohoo, Project berhasil disimpan!</Toast.Body>
              </Toast>
            </div>

          </Form>

          {/* <form onSubmit={handleSubmit(saveFreelancer)}>
        <Form.Group>
            <Form.Label>NAMA FREELANCER</Form.Label>
            <input className='form-control' placeholder="Nama Freelancer"
              name="freelancerName"
              {...register('freelancerName')}
              // onChange={(e) => setFreelancerName(e.target.value)} 
              />
          </Form.Group>

          <Form.Group>
            <Form.Label>ID CARD</Form.Label>
            <input className='form-control' placeholder="Id Card"
              name="idCard"
              {...register('isCard')}
              // onChange={(e) => setIdCard(e.target.value)} 
              />
          </Form.Group>

          <Form.Group>
            <Form.Label>FREELANCER NUMBER</Form.Label>
            <input className='form-control' placeholder="Id Freelancer"
              name="freelancerNumber"
              {...register('freelancerNumber')}

              // onChange={(e) => setFreelancerNumber(e.target.value)} 
              />
          </Form.Group>

          <div>
            <button className="btn btn-block btn-primary" type="submit" >
              Submit
            </button>
          </div>
        </form> */}
        </Col>
      </Row>
    </>

  )
}

export default AddProject;