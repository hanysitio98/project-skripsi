import React, { useEffect, useState } from "react";
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
import { Header } from "../layout";
import { FiDownload } from "react-icons/fi";
import { RegistrationService } from "services";
import { format } from "date-fns";
import autoTable from "jspdf-autotable";

const TransactionHistory = () => {
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

  const exportToPDF = () => {
    const data = participant.map((peserta) => [
      peserta.invNo,
      peserta.traineeName,
      peserta.company,
      peserta.trainingMethod,
      peserta.training,
      peserta.paymentDate,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Transaction History";
    const headers = [
      [
        "Invoice No",
        "Nama Peserta",
        "Organisasi",
        "Metode Training",
        "Nama Training",
        "Tanggal pembayaran",
      ],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("transaction-history.pdf");
  };

  const headers = [
    { label: "Invoice No", key: "invNo" },
    { label: "Nama Peserta", key: "traineeName" },
    { label: "Organisasi", key: "company" },
    { label: "Metode Training", key: "trainingMethod" },
    { label: "Nama Training", key: "training" },
    { label: "Tanggal pembayaran", key: "paymentDate" },
  ];

  return (
    <Header>
      <Row className="g-3 align-items-center justify-content-between">
        <Col className="col-8">
          <h1 className="font-weight-bolder">Transaction History</h1>
        </Col>
      </Row>
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
                  filename="Transaction-History.csv"
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
          <h6 className="m-0 font-weight-bold text-primary">
            Transaction History
          </h6>
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
                  <th>No. Order</th>
                  <th>Nama Pelanggan</th>
                  <th>Institusi</th>
                  <th>Metode Palatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Tanggal Pembayaran</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No. Order</th>
                  <th>Nama Pelanggan</th>
                  <th>Institusi</th>
                  <th>Metode Palatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Tanggal Pembayaran</th>
                </tr>
              </tfoot>
              <tbody>
                {participant.map((peserta) => (
                  <tr key={peserta.id}>
                    <td>{peserta.invNo}</td>
                    <td>{peserta.traineeName}</td>
                    <td>{peserta.company}</td>
                    <td>{peserta.trainingMethod}</td>
                    <td>{peserta.training}</td>
                    <td>
                      {format(new Date(peserta.paymentDate), "dd MMM yyyy")}
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

export default TransactionHistory;
