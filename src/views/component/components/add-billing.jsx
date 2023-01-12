import { useEffect, useState } from "react";
import { Col, Form, Row, Toast, Modal, Button } from "react-bootstrap";
import { BillingService, EmployeeService } from "services";
import ProjectService from "services/ProjectService.service";
import UserService from "services/UserService.service";
import DatePicker from "react-datepicker";

const AddBilling = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [pelanggan, setPelanggan] = useState();
  const [institusi, setInstitusi] = useState("");
  const [metodePelatihan, setMetodePelatihan] = useState("");
  const [namaPelatihan, setNamaPelatihan] = useState("");
  const [show, setShow] = useState(false);

  const saveBilling = async (e) => {
    e.preventDefault();
    const bill = {
      invoiceNumber,
      invoiceDate,
      dueDate,
      pelanggan,
      institusi,
      metodePelatihan,
      namaPelatihan,
    };
    try {
      const response = await BillingService.createBilling(bill);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShow();
    window.location.reload();
  };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-danger";
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="text-center text-primary "
      >
        <Modal.Body>
          <div className="mb-3">Berhasil menyimpan data!</div>
          <div className="d-flex justify-content-center">
            <Button className="btn btn-primary" onClick={handleClose}>
              Ok
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Row>
        <Col>
          <Form>
            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                INVOICE NUMBER <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  className="form-control"
                  placeholder="Invoice Number"
                  name="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                INVOICE DATE <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  showTimeSelect
                  timeClassName={handleColor}
                  className="form-control"
                  selected={invoiceDate}
                  onChange={(date) => setInvoiceDate(date)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                DUE DATE <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  showTimeSelect
                  timeClassName={handleColor}
                  className="form-control"
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                PELANGGAN <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  className="form-control"
                  placeholder="Client"
                  name="pelanggan"
                  value={pelanggan}
                  onChange={(e) => setPelanggan(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                NAMA PELATIHAN<span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  className="form-control"
                  placeholder="Nama Pelatihan"
                  name="namaPelatihan"
                  value={namaPelatihan}
                  onChange={(e) => setNamaPelatihan(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                INSTITUSI<span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  className="form-control"
                  placeholder="Instutusi"
                  name="institusi"
                  value={institusi}
                  onChange={(e) => setInstitusi(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                METODE PELATIHAN <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  value={metodePelatihan}
                  onChange={(e) => setMetodePelatihan(e.target.value)}
                >
                  <option>Choose</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <div>
              <button
                className="btn btn-block btn-primary"
                type="submit"
                onClick={(e) => saveBilling(e)}
              >
                Submit
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddBilling;
