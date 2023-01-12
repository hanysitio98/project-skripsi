import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../layout";

import ProjectService from "services/ProjectService.service";
import UserService from "services/UserService.service";
import { BillingService, EmployeeService } from "services";
import DatePicker from "react-datepicker";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import JsPDF from "jspdf";

const EditBilling = () => {
  const [billing, setBilling] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      BillingService.getBillingById(id)
        .then((response) => {
          setBilling(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const updateBilling = async (e) => {
    e.preventDefault();
    try {
      const response = await ProjectService.updateProject(id, billing);
      const _billing = response.data;
      console.log(_billing);
      navigate("/billing");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    navigate(`/billing`);
    window.location.reload();
  };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-danger";
  };

  const exportToPDF = () => {
    const rows = [];

    const itemNew = [
      { label: "Invoice Number", key: billing.invoiceNumber },
      { label: "Tanggal Pemabayaran", key: billing.invoiceDate },
      { label: "Pelanggan", key: billing.pelanggan },
      { label: "Institusi", key: billing.institusi },
      { label: "Metode Pelatihan", key: billing.metodePelatihan },
      { label: "Nama Pelatihan", key: billing.namaPelatihan },
    ];

    itemNew.forEach((element) => {
      var temp = [element.label, element.key];
      rows.push(temp);
    });

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

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("billing.pdf");
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
      <h3 className="ml-4 font-weight-bold">Edit Billing</h3>
      <div className="p-5">
        <Row>
          <Col className="col-12 col-lg-6">
            <Form>
              <Form.Group>
                <Form.Label className="font-weight-bold">
                  INVOICE NUMBER
                </Form.Label>
                <input
                  className="form-control"
                  placeholder="Invoice Number"
                  name="invoiceNumber"
                  value={billing.invoiceNumber}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _billing = { ...billing };
                    _billing.invoiceNumber = val;
                    setBilling(_billing);
                  }}
                />
              </Form.Group>

              <Form.Group className="pb-3">
                <Form.Label className="font-weight-bold">
                  INVOICE DATE
                </Form.Label>
                <DatePicker
                  className="form-control"
                  dateFormat="yyyy/MM/dd"
                  showTimeSelect
                  timeClassName={handleColor}
                  selected={Date.parse(billing.invoiceDate)}
                  onChange={(date) => {
                    // const val = (date.target && date.target.value) || '';
                    const _billing = { ...billing };
                    _billing.invoiceDate = date;
                    setBilling(_billing);
                  }}
                />
              </Form.Group>

              <Form.Group className="pb-3">
                <Form.Label className="font-weight-bold">DUE DATE</Form.Label>
                <DatePicker
                  className="form-control"
                  dateFormat="yyyy/MM/dd"
                  showTimeSelect
                  timeClassName={handleColor}
                  selected={Date.parse(billing.dueDate)}
                  onChange={(date) => {
                    // const val = (date.target && date.target.value) || '';
                    const _billing = { ...billing };
                    _billing.dueDate = date;
                    setBilling(_billing);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">PELANGGAN</Form.Label>
                <input
                  className="form-control"
                  placeholder="Pelanggan"
                  name="pelanggan"
                  value={billing.pelanggan}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _billing = { ...billing };
                    _billing.pelanggan = val;
                    setBilling(_billing);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold">INSTITUSI</Form.Label>
                <input
                  className="form-control"
                  placeholder="Institusi"
                  name="institusi"
                  value={billing.institusi}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _billing = { ...billing };
                    _billing.institusi = val;
                    setBilling(_billing);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold">
                  METODE PELATIHAN
                </Form.Label>
                <input
                  className="form-control"
                  placeholder="Metode Pelatihan"
                  name="metodePelatihan"
                  value={billing.metodePelatihan}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _billing = { ...billing };
                    _billing.metodePelatihan = val;
                    setBilling(_billing);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">
                  NAMA PELATIHAN
                </Form.Label>
                <input
                  className="form-control"
                  placeholder="Nama Pelatihan"
                  name="namaPelatihan"
                  value={billing.namaPelatihan}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _billing = { ...billing };
                    _billing.namaPelatihan = val;
                    setBilling(_billing);
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
                    onClick={(e) => updateBilling(e)}
                  >
                    Submit
                  </button>
                </Col>
                <Col className="col-6 col-lg-4">
                  <button
                    className="btn btn btn-primary btn-block"
                    type="submit"
                    onClick={exportToPDF}
                  >
                    Export Invoice
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

export default EditBilling;
