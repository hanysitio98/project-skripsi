import { useEffect, useState } from "react";
import { EmployeeService } from "services";
import { Col, Row, Button } from "react-bootstrap";
import { CgPen, CgTrash } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AddModal } from "../components/modal";
import { Header } from "../layout";
import AddEmployee from "../components/add-employee";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [modalContent, setModalContent] = useState();

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployeeById(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dismissModalContent = () => {
    setModalContent();
    window.location.reload();
  };

  const title = <h4 className="font-weight-bold m-3">Add Employee</h4>;

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

  const handleAddModal = (content, onSubmit, onClose) => {
    setModalContent({
      head: title,
      children: content,
      onHide: dismissModalContent,
      onSubmit: onSubmit,
      onClose: dismissModalContent,
    });
  };

  const addEmployee = () => {
    handleAddModal(<AddEmployee />);
  };

  return (
    <Header>
      <AddModal show={Boolean(modalContent)} {...modalContent} />

      <h1 className="font-weight-bolder mb-5">Employee</h1>
      <div className="d-flex justify-content-start pl-3">
        <Row>
          <Col className="col-12">
            <Button onClick={addEmployee} className="btn btn-block btn-primary">
              {/* <span>
            <CgMathPlus className='mr-1' />
          </span> */}
              Add
            </Button>
          </Col>
        </Row>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Employee</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="example"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Posisi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Employee Name</th>
                  <th>Posisi</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {employee.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.employeeName}</td>
                    <td>{emp.position}</td>
                    <td>
                      <div className="d-inline-flex">
                        <Link
                          className="btn btn-outline-info"
                          to={`/edit-employee/${emp.id}`}
                        >
                          <CgPen />
                        </Link>
                        {/* <button className='btn btn-outline-info' onClick={() => editFreelancer(freelancer.id)}>
                      <CgPen />
                    </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteEmployee(emp.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          <CgTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Employee;
