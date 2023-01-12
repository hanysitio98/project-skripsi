import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Row,
  Modal,
  Toast,
  Alert,
} from "react-bootstrap";
import JsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { TrainingService } from "services";
import { Header } from "../layout";
import { format } from "date-fns";
import autoTable from "jspdf-autotable";

const TrainingHistory = () => {
  const [trainings, setTrainings] = useState([]);

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

    getAllTraining();
  }, []);

  const exportToPDF = () => {
    const data = trainings.map((training) => [
      training.trainingCode,
      training.trainingName,
      training.trainingMethod,
      training.endDate,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Freelancer List";
    const headers = [["Kode Training", "Nama Training", "Metode Training", "Tanggal Selesai Acara"]];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("training-history.pdf");
  };

  const headers = [
    { label: "Kode Training", key: "trainingCode" },
    { label: "Nama Training", key: "trainingName" },
    { label: "Metode Training", key: "trainingMethod" },
    { label: "Tanggal Selesai Acara", key: "endDate" },
  ];

  return (
    <Header>
      <h1 className="font-weight-bolder">Training History</h1>
      <div className="d-flex pl-3">
        <Row>
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
                  filename="Training-history.csv"
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
                  <th>Metode Training</th>
                  <th>Tanggal Berakhir Acara</th>
                  {/* <th>Jumlah Peserta</th> */}
                  {/* <th>Report</th>
                  <th>Link Dokumentasi</th>
                  <th>Link Recording</th> */}
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Metode Training</th>
                  <th>Tanggal Berakhir Acara</th>
                  {/* <th>Jumlah Peserta</th> */}
                  {/* <th>Report</th>
                  <th>Link Dokumentasi</th>
                  <th>Link Recording</th> */}
                </tr>
              </tfoot>
              {trainings.map((training) => (
                <tbody>
                  {training.endDate < currentDate && (
                    <tr key={training.id}>
                      <td>{training.trainingCode}</td>
                      <td>{training.trainingName}</td>
                      <td>{training.trainingMethod}</td>
                      <td>
                        {format(new Date(training.endDate), "dd MMM yyyy")}
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default TrainingHistory;
