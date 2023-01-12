import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap";
import { RegistrationService } from "services";
import { Header } from "../layout";
import { Link } from "react-router-dom";
import { CgPen, CgTrash } from "react-icons/cg";
import { format } from "date-fns";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const Participant = () => {
  const [participant, setParticipant] = useState([]);

  useEffect(() => {
    const getAllParticipant = async () => {
      try {
        const response = await RegistrationService.getRegister();
        setParticipant(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllParticipant();
  }, []);

  const deleteParticipant = (id) => {
    RegistrationService.deleteRegister(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exportToPDF = () => {
    const data = participant.map((peserta) => [
      peserta.traineeName,
      peserta.email,
      peserta.phoneNumber,
      peserta.company,
      peserta.trainingMethod,
      peserta.training,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Participant List";
    const headers = [
      [
        "Nama Trainee",
        "Email",
        "Nomor Handphone",
        "Perusahaan/Organisasi",
        "Metode Training",
        "Training Pilihan",
      ],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("Participant.pdf");
  };

  const headers = [
    { label: "Nama Trainee", key: "traineeName" },
    { label: "Email", key: "email" },
    { label: "Nomor Handphone", key: "phoneNumber" },
    { label: "Perusahaan/Organisasi", key: "company" },
    { label: "Metode Training", key: "trainingMethod" },
    { label: "Training Pilihan", key: "training" },
  ];

  return (
    <Header>
      <h1 className="font-weight-bolder">Participant</h1>
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
                  data={participant}
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
                  {/* <th>No Order</th> */}
                  <th>Nama Pelanggan</th>
                  <th>Email</th>
                  <th>No HP / WA</th>
                  <th>Institusi</th>
                  <th>Mode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Actions</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tfoot>
                <tr>
                  {/* <th>No Order</th> */}
                  <th>Nama Pelanggan</th>
                  <th>Email</th>
                  <th>No HP / WA</th>
                  <th>Institusi</th>
                  <th>Mode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Actions</th>
                  {/* <th>Status</th> */}
                </tr>
              </tfoot>
              <tbody>
                {participant.map((peserta) => (
                  <tr key={peserta.id}>
                    <td>{peserta.traineeName}</td>
                    <td>{peserta.email}</td>
                    <td>{peserta.phoneNumber}</td>
                    <td>{peserta.company}</td>
                    <td>{peserta.trainingMethod}</td>
                    <td>{peserta.training}</td>
                    <td>
                      <div className="d-inline-flex">
                        {/* <Link
                          className="btn btn-outline-info"
                          to={`/edit-training/${peserta.id}`}
                        >
                          <CgPen />
                        </Link> */}
                        {/* <button className='btn btn-outline-info' onClick={() => editFreelancer(freelancer.id)}>
                          <CgPen />
                        </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteParticipant(peserta.id)}
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

export default Participant;
