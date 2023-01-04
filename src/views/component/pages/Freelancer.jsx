import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Row
} from "react-bootstrap";
import { CgPen, CgPushDown, CgTrash } from "react-icons/cg";
import { Header } from "../layout";

import JsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { FreelancerService } from "services";
import { AddFreelancer } from "../components";
import { AddModal } from "../components/modal";

export const APP_BASE_URL = "http://localhost:8080";

const Freelancer = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [modalContent, setModalContent] = useState();

  const deleteFreelancer = (id) => {
    FreelancerService.deleteFreelancer(id)
      .then((response) => {
        // getAllFreelancer();
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

  const title = <h4 className="font-weight-bold m-3">Add Freelancer</h4>;

  useEffect(() => {
    const getAllFreelancer = async () => {
      try {
        const response = await FreelancerService.getAllFreelancer();
        setFreelancers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllFreelancer();
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

  const addFreelancer = () => {
    handleAddModal(<AddFreelancer />);
  };

  const exportToPDF = () => {
    const data = freelancers.map((freelancer) => [
      freelancer.id,
      freelancer.freelancerName,
      freelancer.idCard,
      freelancer.isActive,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Freelancer List";
    const headers = [["ID Freelancer", "Nama Freelancer", "ID Card", "Status"]];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("freelancer.pdf");
  };

  const headers = [
    { label: "ID Freelancer", key: "id" },
    { label: "Nama Freelancer", key: "freelancerName" },
    { label: "ID Card", key: "idCard" },
    { label: "Status", key: "isActive" },
  ];

  return (
    <Header>
      <AddModal show={Boolean(modalContent)} {...modalContent} />

      <h1 className="font-weight-bolder mb-5">Freelancer</h1>
      <div className="d-flex pl-3">
        <Row>
          <Col className="col-6">
            <Button
              onClick={addFreelancer}
              className="btn btn-primary btn-block"
            >
              Add
            </Button>
          </Col>
          <Col className="col-6">
            <Dropdown as={ButtonGroup}>
              <Button className="btn btn-primary btn-block">Export</Button>

              <Dropdown.Toggle
                split
                className="btn btn-primary"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu className="primary">
                <Dropdown.Item
                  onClick={exportToPDF}
                  className="font-weight-bold"
                >
                  PDF
                </Dropdown.Item>
                <CSVLink
                  data={freelancers}
                  headers={headers}
                  filename="Freelancers.csv"
                  className="dropdown-item font-weight-bold"
                >
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Freelancer</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered dt-responsive nowrap"
              id="example"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>ID Freelancer</th>
                  <th>Nama</th>
                  <th>KTP</th>
                  <th>Pas Poto</th>
                  <th>CV</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID Freelancer</th>
                  <th>Nama</th>
                  <th>KTP</th>
                  <th>Pas Poto</th>
                  <th>CV</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
              <tbody>
                {freelancers.map((freelancer) => (
                  <tr key={freelancer.id}>
                    <td>{freelancer.id}</td>
                    <td>{freelancer.freelancerName}</td>
                    <td>{freelancer.idCard}</td>
                    <td>
                      <div className="d-inline-flex">
                        {/* <img src={freelancerImage} alt="" width="55px" /> */}

                        <img
                          src={`${APP_BASE_URL}/api/images/${freelancer.freelancerImage}`}
                          alt=""
                          width="55px"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-inline-flex">
                        <a
                          className="btn btn-outline-primary"
                          style={{ marginLeft: "10px" }}
                          href={`${APP_BASE_URL}/api/images/${freelancer.cv}`}
                        >
                          <CgPushDown />
                        </a>
                      </div>
                    </td>
                    {freelancer.isActive === "Active" ? (
                      <td>
                        <div className="badge badge-pill badge-success">
                          {freelancer.isActive}
                        </div>
                      </td>
                    ) : (
                      freelancer.isActive === "Non Active" && (
                        <td>
                          <div className="badge badge-pill badge-danger">
                            {freelancer.isActive}
                          </div>
                        </td>
                      )
                    )}

                    <td>
                      <div className="d-inline-flex">
                        <Link
                          className="btn btn-outline-info"
                          to={`/edit-freelancer/${freelancer.id}`}
                        >
                          <CgPen />
                        </Link>
                        {/* <button className='btn btn-outline-info' onClick={() => editFreelancer(freelancer.id)}>
                          <CgPen />
                        </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteFreelancer(freelancer.id)}
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

export default Freelancer;
