import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap";
import { CgPen, CgTrash } from "react-icons/cg";
import { Link } from "react-router-dom";
import { TrainingService } from "services";
import { AddTraining } from "../components";
import { AddModal } from "../components/modal";
import { Header } from "../layout";
import JsPDF from "jspdf";
import { CSVLink } from "react-csv";
import autoTable from "jspdf-autotable";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [modalContent, setModalContent] = useState();

  const dismissModalContent = () => {
    setModalContent();
    window.location.reload();
  };

  const title = <h4 className="font-weight-bold m-3">Add Training</h4>;

  const deleteTraining = (id) => {
    TrainingService.deleteTraining(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const currentDate = new Date().toISOString();

  useEffect(() => {
    const getAllTraining = async () => {
      try {
        const response = await TrainingService.getAllTraining();
        setTrainings(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(currentDate);

    getAllTraining();
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

  const addTraining = () => {
    handleAddModal(<AddTraining />);
  };

  const exportToPDF = () => {
    const data = trainings.map((training) => [
      training.trainingCode,
      training.trainingName,
      training.trainingMethod,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Training List";
    const headers = [["Kode Training", "Nama Training", "Metode Training"]];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("Training.pdf");
  };

  const headers = [
    { label: "Kode Training", key: "trainingCode" },
    { label: "Nama Training", key: "trainingName" },
    { label: "Metode Training", key: "trainingMethod" },
  ];

  return (
    <Header>
      <AddModal show={Boolean(modalContent)} {...modalContent} />

      <h1 className="font-weight-bolder mb-5">Training List</h1>
      <div className="d-flex justify-content-start pl-3">
        <Row>
          <Col className="col-6">
            <Button onClick={addTraining} className="btn btn-primary btn-block">
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
                  data={trainings}
                  headers={headers}
                  filename="Training.csv"
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
          <h6 className="m-0 font-weight-bold text-primary">Training List</h6>
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
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Jenis Pelatihan</th>
                  <th>Tanggal Acara</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Jenis Pelatihan</th>
                  <th>Tanggal Acara</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
              <tbody>
                {trainings.map((training) => (
                  <tr key={training.id}>
                    <td>{training.trainingCode}</td>
                    <td>{training.trainingName}</td>
                    <td>{training.trainingMethod}</td>
                    <td>
                      {format(new Date(training.startDate), "dd MMM yyyy")} -
                      {format(new Date(training.endDate), "dd MMM yyyy")}
                    </td>
                    {/* {
                      (training.status === 'Done') ?
                        <td>
                          <div className="badge badge-pill badge-success">
                            {training.status}
                          </div>
                        </td>
                        : (training.status === 'Ongoing') ?
                          <td>

                            <div className='badge badge-pill badge-warning'>
                              {training.status}
                            </div>
                          </td>
                          : (training.status === 'Next') &&
                          <td>

                            <div className='badge badge-pill badge-danger'>
                              {training.status}
                            </div>
                          </td>
                    } */}

                    {training.endDate < currentDate ? (
                      <td>
                        <div className="badge badge-pill badge-success">
                          DONE
                        </div>
                      </td>
                    ) : currentDate > training.startDate &&
                      currentDate < training.endDate ? (
                      <td>
                        <div className="badge badge-pill badge-warning">
                          ONGOING
                        </div>
                      </td>
                    ) : (
                      training.endDate > currentDate && (
                        <td>
                          <div className="badge badge-pill badge-danger">
                            NEXT
                          </div>
                        </td>
                      )
                    )}

                    <td>
                      <div className="d-inline-flex">
                        <Link
                          className="btn btn-outline-info"
                          to={`/edit-training/${training.id}`}
                        >
                          <CgPen />
                        </Link>
                        {/* <button className='btn btn-outline-info' onClick={() => editFreelancer(freelancer.id)}>
                          <CgPen />
                        </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteTraining(training.id)}
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

export default TrainingList;
