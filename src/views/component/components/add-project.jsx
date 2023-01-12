import { useEffect, useState } from "react";
import { Col, Form, Row, Toast, Modal, Button } from "react-bootstrap";
import { EmployeeService } from "services";
import ProjectService from "services/ProjectService.service";
import UserService from "services/UserService.service";

const AddProject = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [client, setClient] = useState();
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState("");
  const [assignToName, setAssignTo] = useState();
  const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState([]);

  const saveProject = async (e) => {
    e.preventDefault();
    const project = {
      taskTitle,
      taskDescription,
      client,
      status,
      priority,
      assignToName,
    };
    try {
      const response = await ProjectService.createProject(project);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleClose = () => {
    setShow();
    window.location.reload();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="text-center text-primary "
      >
        <Modal.Body>
          <div className="mb-3">Berhasil menyimpan data!</div>
          <div className="d-flex justify-content-center">
            <Button className="btn btn-primary" onClick={handleClose}>
              Ok
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Row>
        <Col>
          <Form>
            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">TITLE <span className="text-danger">*</span></Form.Label>
              <input
                className="form-control"
                placeholder="Title"
                name="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">DESCRIPTION <span className="text-danger">*</span></Form.Label>
              <input
                className="form-control"
                placeholder="Deskripsi"
                name="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">CLIENT <span className="text-danger">*</span></Form.Label>
              <input
                className="form-control"
                placeholder="Client"
                name="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">ASSIGN TO <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="select"
                value={assignToName}
                onChange={(e) => setAssignTo(e.target.value)}
              >
                {employee.map((user) => (
                  <option>{user.employeeName}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label className="font-weight-bold">Priority <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Choose</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label className="font-weight-bold">STATUS <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Choose</option>
                <option value="Not Yet">Not Yet</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Done">Done</option>
              </Form.Control>
            </Form.Group>

            <div>
              <button
                className="btn btn-block btn-primary"
                type="submit"
                onClick={(e) => saveProject(e)}
              >
                Submit
              </button>
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
  );
};

export default AddProject;
