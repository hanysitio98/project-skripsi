import { FileUpload } from "primereact/fileupload";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { CgPushDown } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import FreelancerService from "services/FreelancerService.service";
import { Header } from "../layout";
export const APP_BASE_URL = "http://localhost:8080";

const EditFreelancer = () => {
  const [cv, setCv] = useState({});
  const [freelancerImage, setFreelancerImage] = useState({});
  const [freelancers, setFreelancers] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      FreelancerService.getFreelancerById(id)
        .then((response) => {
          setFreelancers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const updateFreelancer = async (e) => {
    e.preventDefault();
    try {
      const response = await FreelancerService.updateFreelancer(
        id,
        freelancers
      );
      const _freelancers = response.data;
      console.log(_freelancers);
      navigate("/freelancer");
      // setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onUploadImage = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setFreelancerImage(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _freelancers = { ...freelancers };
    _freelancers.freelancerImage = response.fileName;
    setFreelancers(_freelancers);
  };

  const onUploadCv = async (event) => {
    const [file] = event.files;
    const fileObjectURL = URL.createObjectURL(file);
    setCv(fileObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _freelancers = { ...freelancers };
    _freelancers.cv = response.fileName;
    setFreelancers(_freelancers);
  };

  const cancelEdit = () => {
    navigate(`/freelancer`);
    window.location.reload();
  };

  return (
    <Header>
      <h3 className="ml-4 font-weight-bold">Edit Freelancer</h3>
      <div className="p-5">
        <Row>
          <Col>
            <Row>
              <Col className="col-6 col-lg-4">
                <div className="mb-3">
                  <FileUpload
                    name="file"
                    chooseLabel="Pilih Gambar"
                    url={`${APP_BASE_URL}/api/uploadFile`}
                    accept="image/*"
                    onUpload={onUploadImage}
                  />
                </div>
              </Col>

              <Col>
                <Card style={{ width: "14rem" }}>
                  <Card.Header className="font-weight-bold">
                    Foto Sebelumnya
                  </Card.Header>
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-center">
                      <img
                        src={`${APP_BASE_URL}/api/images/${freelancers.freelancerImage}`}
                        alt=""
                        width="80px"
                        height="76px"
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="col-6 col-lg-4">
                <div className="mb-3">
                  <FileUpload
                    name="file"
                    chooseLabel="Pilih File"
                    url={`${APP_BASE_URL}/api/uploadFile`}
                    accept=".pdf"
                    onUpload={onUploadCv}
                  />
                </div>
              </Col>

              <Col>
                <Card style={{ width: "14rem" }}>
                  <Card.Header className="font-weight-bold">
                    CV Sebelumnya
                  </Card.Header>
                  <Card.Body className="px-3 py-5">
                    <div className="d-flex justify-content-center p-2">
                      <a href={`${APP_BASE_URL}/api/images/${freelancers.cv}`}>
                        <CgPushDown />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="col-12 col-lg-6">
                <Form>
                  <Form.Group className="pb-3">
                    <Form.Label className="font-weight-bold">
                      NAMA FREELANCER
                    </Form.Label>
                    <input
                      className="form-control"
                      placeholder="Nama Freelancer"
                      name="freelancerName"
                      value={freelancers.freelancerName}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _freelancers = { ...freelancers };
                        _freelancers.freelancerName = val;
                        setFreelancers(_freelancers);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="pb-3">
                    <Form.Label className="font-weight-bold">
                      ID CARD
                    </Form.Label>
                    <input
                      className="form-control"
                      placeholder="Id Card"
                      name="idCard"
                      value={freelancers.idCard}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _freelancers = { ...freelancers };
                        _freelancers.idCard = val;
                        setFreelancers(_freelancers);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="pb-3">
                    <Form.Label className="font-weight-bold">STATUS</Form.Label>
                    <Form.Control
                      as="select"
                      value={freelancers.isActive}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _freelancers = { ...freelancers };
                        _freelancers.isActive = val;
                        setFreelancers(_freelancers);
                      }}
                    >
                      <option>Choose</option>
                      <option value="Active">Active</option>
                      <option value="Non Active">Non Active</option>
                    </Form.Control>
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
                        onClick={(e) => updateFreelancer(e)}
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default EditFreelancer;
