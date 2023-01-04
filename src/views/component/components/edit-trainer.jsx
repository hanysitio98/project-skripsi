import { FileUpload } from 'primereact/fileupload';
import { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import {
  CgPushDown
} from "react-icons/cg";
import { useNavigate, useParams } from 'react-router-dom';
import TrainerService from 'services/TrainerService.service';
import { Header } from '../layout';
export const APP_BASE_URL = "https://zingy-frangipane-52426a.netlify.app";

const EditTrainer = () => {


  const [cv, setCv] = useState({});
  const [competenciesCertificate, setCompetenciesCertificate] = useState({});

  const [trainers, setTrainers] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    if (id) {
      TrainerService.getTrainerById(id).then((response) => {
        setTrainers(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id]);

  const updateTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await TrainerService.updateTrainer(id, trainers);
      const _trainers = response.data;
      console.log(_trainers);
      navigate("/trainer")
    } catch (error) {
      console.log(error);
    }
  }

  const onUploadCv = async (event) => {
    const [file] = event.files;
    const fileObjectURL = URL.createObjectURL(file);
    setCv(fileObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _trainers = { ...trainers };
    _trainers.cv = response.fileName;
    setTrainers(_trainers);
  }

  const onUploadCC = async (event) => {
    const [file] = event.files;
    const fileObjectURL = URL.createObjectURL(file);
    setCompetenciesCertificate(fileObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _trainers = { ...trainers };
    _trainers.competenciesCertificate = response.fileName;
    setTrainers(_trainers);
  }

  return (
    <Header>
      <h3 className="ml-4 font-weight-bold">Edit Trainer</h3>
      <div className="p-5">
        <Row>
          <Col>
            <Row>
              <Col className="col-6 col-lg-4">
                <div className="mb-3">
                  <FileUpload
                    name="file"
                    chooseLabel="Pilih CV"
                    url={`${APP_BASE_URL}/api/uploadFile`}
                    accept=".pdf"
                    onUpload={onUploadCv}
                  />
                </div>
              </Col>

              <Col>
                <Card style={{ width: '14rem' }} >
                  <Card.Header className="font-weight-bold">
                    CV Sebelumnya
                  </Card.Header>
                  <Card.Body className='p-3'>
                    <div className="d-flex justify-content-center p-4">
                      <a href={`${APP_BASE_URL}/api/images/${trainers.cv}`}>
                        <CgPushDown />
                      </a>
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
                    onUpload={onUploadCC}
                  />
                </div>
              </Col>

              <Col>
                <Card style={{ width: '14rem' }} >
                  <Card.Header className="font-weight-bold">
                    Competencies Certificate Sebelumnya
                  </Card.Header>
                  <Card.Body className='px-3 py-5'>
                    <div className="d-flex justify-content-center">
                      <a href={`${APP_BASE_URL}/api/images/${trainers.competenciesCertificate}`}>
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
                  <Form.Group>
                    <Form.Label className="font-weight-bold">TRAINER CODE</Form.Label>
                    <input className='form-control' placeholder="Trainer Code"
                      name="trainerCode"
                      value={trainers.trainerCode}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || '';
                        const _trainers = { ...trainers };
                        _trainers.trainerCode = val;
                        setTrainers(_trainers);
                      }} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="font-weight-bold">NAMA TRAINER</Form.Label>
                    <input className='form-control' placeholder="Nama Trainer"
                      name="trainerName"
                      value={trainers.trainerName}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || '';
                        const _trainers = { ...trainers };
                        _trainers.trainerName = val;
                        setTrainers(_trainers);
                      }} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="font-weight-bold">KEAHLIAN</Form.Label>
                    <input className='form-control' placeholder="Keahlian"
                      name="skill"
                      value={trainers.skill}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || '';
                        const _trainers = { ...trainers };
                        _trainers.skill = val;
                        setTrainers(_trainers);
                      }} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="font-weight-bold">STATUS</Form.Label>
                    <Form.Control as="select"
                      value={trainers.isActive}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || '';
                        const _trainers = { ...trainers };
                        _trainers.isActive = val;
                        setTrainers(_trainers);
                      }}>
                      <option>Choose</option>
                      <option value="Active">
                        Active
                      </option>
                      <option value="Non Active">
                        Non Active
                      </option>
                    </Form.Control>
                  </Form.Group>

                  <Col className="col-12 col-lg-4 p-0">
                    <button className="btn btn btn-primary btn-block" type="submit" onClick={(e) => updateTrainer(e)}
                    >
                      Submit
                    </button>
                  </Col>

                </Form>
              </Col>
            </Row>

          </Col>
        </Row>


      </div>
    </Header>
  )
}

export default EditTrainer;