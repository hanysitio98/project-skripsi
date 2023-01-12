import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../layout";

import { EmployeeService } from "services";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await EmployeeService.updateEmployee(id, employee);
      const _employee = response.data;
      console.log(_employee);
      navigate("/employee");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    navigate(`/employee`);
    window.location.reload();
  };

  return (
    <Header>
      <h3 className="ml-4 font-weight-bold">Edit Employee</h3>
      <div className="p-5">
        <Row>
          <Col className="col-12 col-lg-6">
            <Form>
              <Form.Group>
                <Form.Label className="font-weight-bold">
                  EMPLOYEE NAME
                </Form.Label>
                <input
                  className="form-control"
                  placeholder="Employee Name"
                  name="employeeName"
                  value={employee.employeeName}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _employee = { ...employee };
                    _employee.employeeName = val;
                    setEmployee(_employee);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">POSITION</Form.Label>
                <input
                  className="form-control"
                  placeholder="Position"
                  name="position"
                  value={employee.position}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _employee = { ...employee };
                    _employee.position = val;
                    setEmployee(_employee);
                  }}
                />
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
                    onClick={(e) => updateEmployee(e)}
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

export default EditEmployee;
