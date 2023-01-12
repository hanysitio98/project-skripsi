import { useState } from "react";
import { EmployeeService } from "services";
import { Col, Form, Row, Toast, Modal, Button } from "react-bootstrap";

const AddEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [show, setShow] = useState(false);

  const saveEmployee = async (e) => {
    e.preventDefault();
    const emp = {
      employeeName,
      position,
    };
    try {
      const response = await EmployeeService.createEmployee(emp);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

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
              <Form.Label className="font-weight-bold">
                Employee Name <span className="text-danger">*</span>
              </Form.Label>
              <input
                className="form-control"
                placeholder="Employee Name"
                name="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Label className="font-weight-bold">
                Position <span className="text-danger">*</span>
              </Form.Label>
              <input
                className="form-control"
                placeholder="Position"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>

            <div>
              <button
                className="btn btn-block btn-primary"
                type="submit"
                onClick={(e) => saveEmployee(e)}
              >
                Submit
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddEmployee;
