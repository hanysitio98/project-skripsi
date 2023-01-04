import JsPDF from "jspdf";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { CgPen, CgPushDown, CgTrash } from "react-icons/cg";
import { Link } from "react-router-dom";
import { TrainerService } from "services";
import { AddTrainer } from "../components";
import { AddModal } from "../components/modal";
import { Header } from "../layout";

export const APP_BASE_URL = "https://63b532db63d0962b5f37a13b--zingy-frangipane-52426a.netlify.app";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [modalContent, setModalContent] = useState();

  const dismissModalContent = () => {
    setModalContent();
    window.location.reload();
  };

  const title = <h4 className="font-weight-bold m-3">Add Trainer</h4>;

  useEffect(() => {
    const getAllTrainer = async () => {
      try {
        const response = await TrainerService.getAllTrainer();
        setTrainers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTrainer();
  }, []);

  const deleteTrainer = (id) => {
    TrainerService.deleteTrainer(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddModal = (content, onSubmit, onClose) => {
    setModalContent({
      head: title,
      children: content,
      onHide: dismissModalContent,
      onSubmit: onSubmit,
      onClose: dismissModalContent,
    });
  };

  const addTrainer = () => {
    handleAddModal(<AddTrainer />);
  };

  const exportToPDF = () => {
    const data = trainers.map((trainer) => [
      trainer.id,
      trainer.trainerCode,
      trainer.trainerName,
      trainer.skill,
      trainer.isActive,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Trainer List";

    const headers = [
      ["ID Trainer", "Kode Trainer", "Nama Trainer", "Skill", "Status"],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("trainer.pdf");
  };

  const headers = [
    { label: "ID Trainer", key: "id" },
    { label: "Kode Trainer", key: "trainerCode" },
    { label: "Nama Trainer", key: "trainerName" },
    { label: "Skill", key: "skill" },
    { label: "Status", key: "isActive" },
  ];

  return (
    <Header>
      <AddModal show={Boolean(modalContent)} {...modalContent} />

      <h1 className="font-weight-bolder mb-5">Trainer</h1>
      <div className="d-flex pl-3">
        <Row>
          <Col className="col-6">
            <Button onClick={addTrainer} className="btn btn-primary btn-block">
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
                  data={trainers}
                  headers={headers}
                  filename="Trainers.csv"
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
          <h6 className="m-0 font-weight-bold text-primary">Trainer</h6>
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
                  <th>ID Trainer</th>
                  <th>Trainer Code</th>
                  <th>Nama Trainer</th>
                  <th>Keahlian Pelatihan</th>
                  <th>CV</th>
                  <th>Sertifikat Keahlian</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID Trainer</th>
                  <th>Trainer Code</th>
                  <th>Nama Trainer</th>
                  <th>Keahlian Pelatihan</th>
                  <th>CV</th>
                  <th>Sertifikat Keahlian</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
              <tbody>
                {trainers.map((trainer) => (
                  <tr key={trainer.id}>
                    <td>{trainer.id}</td>
                    <td>{trainer.trainerCode}</td>
                    <td>{trainer.trainerName}</td>
                    <td>{trainer.skill}</td>
                    <td>
                      <div className="d-inline-flex">
                        <a
                          className="btn btn-outline-info"
                          style={{ marginLeft: "10px" }}
                          href={`${APP_BASE_URL}/api/images/${trainer.cv}`}
                        >
                          <CgPushDown />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="d-inline-flex">
                        <a
                          className="btn btn-outline-info"
                          style={{ marginLeft: "10px" }}
                          href={`${APP_BASE_URL}/api/images/${trainer.competenciesCertificate}`}
                        >
                          <CgPushDown />
                        </a>
                      </div>
                    </td>
                    {trainer.isActive === "Active" ? (
                      <td>
                        <div className="badge badge-pill badge-success">
                          {trainer.isActive}
                        </div>
                      </td>
                    ) : (
                      trainer.isActive === "Non Active" && (
                        <td>
                          <div className="badge badge-pill badge-danger">
                            {trainer.isActive}
                          </div>
                        </td>
                      )
                    )}
                    <td>
                      <div className="d-inline-flex">
                        <Link
                          className="btn btn-outline-info"
                          to={`/edit-trainer/${trainer.id}`}
                        >
                          <CgPen />
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteTrainer(trainer.id)}
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

export default Trainer;
