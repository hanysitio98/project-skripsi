import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FileUpload } from "primereact/fileupload";
import { NumericFormat } from "react-number-format";
import { FreelancerService } from "services";

export const APP_BASE_URL = "http://localhost:8080";

const AddFreelancer = () => {
  const [freelancerName, setFreelancerName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [cv, setCv] = useState({});
  const [freelancerImage, setFreelancerImage] = useState({});
  const [isActive, setIsActive] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const saveFreelancer = async (e) => {
    e.preventDefault();
    const freelancer = {
      freelancerName,
      idCard,
      cv,
      isActive,
      freelancerImage,
    };
    try {
      const response = await FreelancerService.createFreelancer(freelancer);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onUploadImage = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setFreelancerImage(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    setFreelancerImage(response.fileName);
  };

  const onUploadCv = async (event) => {
    const [file] = event.files;
    const fileObjectURL = URL.createObjectURL(file);
    setCv(fileObjectURL);
    const response = JSON.parse(event.xhr.response);
    setCv(response.fileName);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const onBeforeSend = async (event) => {
    if (user && user.token) {
      event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
    }
  };

  const handleClose = () => {
    setShow();
    window.location.reload();
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
          <Row>
            <Col>
              <div>
                <Form.Label className="font-weight-bold">
                  FOTO <span className="text-danger">*</span>
                </Form.Label>
                <FileUpload
                  name="file"
                  url={`${APP_BASE_URL}/api/uploadFile`}
                  accept="image/*"
                  onBeforeSend={onBeforeSend}
                  onUpload={onUploadImage}
                  chooseLabel="Pilih Gambar"
                />
              </div>
            </Col>
            <Col>
              <div>
                <Form.Label className="font-weight-bold">
                  CURICULUM VITAE <span className="text-danger">*</span>
                </Form.Label>
                <FileUpload
                  name="file"
                  url={`${APP_BASE_URL}/api/uploadFile`}
                  accept=".pdf"
                  onBeforeSend={onBeforeSend}
                  onUpload={onUploadCv}
                  chooseLabel="Pilih File"
                />
              </div>
            </Col>
          </Row>
          <small className="text-muted font-italic">
            pilih gambar dan sertifikat kompetensi terlebih dahulu
          </small>

          <Form>
            <Form.Group className="pb-3 mt-4" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                NAMA FREELANCER <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  className="form-control"
                  placeholder="Nama Freelancer"
                  name="freelancerName"
                  value={freelancerName}
                  onChange={(e) => setFreelancerName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                ID CARD <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <NumericFormat
                  className="form-control"
                  placeholder="ID Card"
                  name="idCard"
                  value={idCard}
                  maxLength={16}
                  onChange={(e) => setIdCard(e.target.value)}
                ></NumericFormat>
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={4} className="font-weight-bold">
                STATUS <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option>Choose</option>
                  <option value="Active">Active</option>
                  <option value="Non Active">Non Active</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <div>
              <button
                className="btn btn-block btn-primary pb-2"
                type="submit"
                onClick={(e) => saveFreelancer(e)}
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

export default AddFreelancer;
