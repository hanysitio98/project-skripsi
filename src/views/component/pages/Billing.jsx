import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, Col, Form, Row } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import { Header } from "../layout";
import { BillingService, RegistrationService } from "services";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { AddBilling } from "../components";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import JsPDF from "jspdf";
import { AddModal } from "../components/modal";
import { CgPen, CgTrash, CgPushDown } from "react-icons/cg";

const Billing = () => {
  const [billing, setBilling] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [bill, setBill] = useState({});

  const deleteBiling = (id) => {
    BillingService.deleteBillingById(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getAllBilling = async () => {
      try {
        const response = await BillingService.getAllBilling();
        setBilling(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBilling();
  }, []);

  const dismissModalContent = () => {
    setModalContent();
    window.location.reload();
  };

  const title = <h4 className="font-weight-bold m-3">Add Billing</h4>;

  const handleAddModal = (content, onSubmit, onClose) => {
    setModalContent({
      head: title,
      children: content,
      onHide: dismissModalContent,
      onSubmit: onSubmit,
      onClose: dismissModalContent,
    });
  };

  const addProject = () => {
    handleAddModal(<AddBilling />);
  };

  const exportToPDF = () => {
    const data = billing.map((bill) => [
      bill.invoiceNumber,
      bill.pelanggan,
      bill.institusi,
      bill.metodePelatihan,
      bill.namaPelatihan,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Billing List";

    const headers = [
      [
        "Invoice Number",
        "Pelanggan",
        "Institusi",
        "Metode Pelatihan",
        "Nama Pelatihan",
      ],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("billing.pdf");
  };

  const exportToPDFbyId = (id) => {
    const rows = [];
    if (id) {
      BillingService.getBillingById(id)
        .then((response) => {
          setBill(response.data);

          const itemNew = [
            { label: "Invoice Number", key: response.data.invoiceNumber },
            { label: "Tanggal Pemabayaran", key: response.data.invoiceDate },
            { label: "Pelanggan", key: response.data.pelanggan },
            { label: "Institusi", key: response.data.institusi },
            { label: "Metode Pelatihan", key: response.data.metodePelatihan },
            { label: "Nama Pelatihan", key: response.data.namaPelatihan },
          ];

          itemNew.forEach((element) => {
            var temp = [element.label, element.key];
            rows.push(temp);
          });

          doc.text(title, marginLeft, 35);
          doc.autoTable(content);
          doc.save("billing.pdf");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Invoice";

    const headers = [["Details", "Value"]];

    let content = {
      startY: 50,
      head: headers,
      body: rows,
    };
  };

  const headers = [
    { label: "Invoice Number", key: "invoiceNumber" },
    { label: "Pelanggan", key: "pelanggan" },
    { label: "Institusi", key: "institusi" },
    { label: "Metode Pelatihan", key: "metodePelatihan" },
    { label: "Nama Pelatihan", key: "namaPelatihan" },
  ];

  return (
    <Header>
      <AddModal show={Boolean(modalContent)} {...modalContent} />

      <h1 className="font-weight-bolder mb-5">Billing</h1>
      <div className="d-flex justify-content-start pl-3">
        <Row>
          <Col className="col-6">
            <Button onClick={addProject} className="btn btn-primary btn-block">
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
                  data={billing}
                  headers={headers}
                  filename="Billing.csv"
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
          <h6 className="m-0 font-weight-bold text-primary">Billing</h6>
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
                  <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Pelanggan</th>
                  <th>Institusi</th>
                  <th>Metode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Pelanggan</th>
                  <th>Institusi</th>
                  <th>Metode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {billing.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.invoiceNumber}</td>
                    <td>{format(new Date(bill.invoiceDate), "dd MMM yyyy")}</td>
                    <td>{format(new Date(bill.dueDate), "dd MMM yyyy")}</td>
                    <td>{bill.pelanggan}</td>
                    <td>{bill.institusi}</td>
                    <td>{bill.metodePelatihan}</td>
                    <td>{bill.namaPelatihan}</td>
                    <td>
                      <div className="d-inline-flex">
                        <Link
                          className="btn btn-outline-info"
                          to={`/edit-billing/${bill.id}`}
                        >
                          <CgPen />
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteBiling(bill.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          <CgTrash />
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => exportToPDFbyId(bill.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          <CgPushDown />
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

export default Billing;
