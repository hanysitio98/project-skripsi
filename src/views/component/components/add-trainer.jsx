import { FileUpload } from 'primereact/fileupload';
import { useState } from 'react';
import { Col, Form, Row, Toast } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TrainerService from 'services/TrainerService.service';

export const APP_BASE_URL = "http://localhost:8080";


const AddTrainer = () => {

  const [trainerName, setTrainerName] = useState('');
  const [trainerCode, setTrainerCode] = useState('');
  const [skill, setSkill] = useState('');
  const [competenciesCertificate, setCompetenciesCertificate] = useState('')
  const [cv, setCv] = useState('');
  const [isActive, setIsActive] = useState('');
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const saveTrainer = async (e) => {
    e.preventDefault()

    const trainer = {
      trainerCode,
      trainerName,
      skill,
      cv,
      competenciesCertificate,
      isActive
    };

    try {
      await TrainerService.createTrainer(trainer);
      setShow(true);
    } catch (error) {
      console.log(error);
    }

  }

  const onUploadCv = async (event) => {
    const [file] = event.files;
    const fileObjectURL = URL.createObjectURL(file);
    setCv(fileObjectURL);
    const response = JSON.parse(event.xhr.response);
    setCv(response.fileName);

  }

  const onUploadCC = async (event) => {
    const [file] = event.files;
    const fileObjectURL = URL.createObjectURL(file);
    setCompetenciesCertificate(fileObjectURL);
    const response = JSON.parse(event.xhr.response);
    setCompetenciesCertificate(response.fileName);

  }

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>
              <div className="mb-3">
                <Form.Label>CV</Form.Label>
                <FileUpload
                  name="file"
                  url={`${APP_BASE_URL}/api/uploadFile`}
                  accept=".pdf"
                  onUpload={onUploadCv}
                  chooseLabel="Pilih File"
                />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <Form.Label>Competencies Certificate</Form.Label>
                <FileUpload
                  name="file"
                  url={`${APP_BASE_URL}/api/uploadFile`}
                  accept=".pdf"
                  onUpload={onUploadCC}
                  chooseLabel="Pilih File"
                />
              </div>
            </Col>
          </Row>

          <Form>
            <Form.Group as={Row} controlId="formHorizontalCode">
              <Form.Label column sm={2}>
                Trainer Code
              </Form.Label>
              <Col sm={10}>
                <Form.Control name="trainerCode"
                  placeholder='Trainer Code'
                  value={trainerCode}
                  onChange={(e) => setTrainerCode(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalNama">
              <Form.Label column sm={2}>
                Nama
              </Form.Label>
              <Col sm={10}>
                <Form.Control placeholder="Nama"
                  name="trainerName"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalSkill">
              <Form.Label column sm={2}>
                Skill
              </Form.Label>
              <Col sm={10}>
                <Form.Control placeholder="Skill"
                  name="skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalStatus" className="pb-3" >
              <Form.Label column sm={2}>
                Status
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="select"
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)} >
                  <option>Choose</option>
                  <option value="Active">
                    Active
                  </option>
                  <option value="Non Active">
                    Non Active
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>
            <div>
              <button className="btn btn-block btn-primary pb-2" type="submit" onClick={(e) => saveTrainer(e)}
              >
                Submit
              </button>
            </div>

            <div>
              <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="primary">
                <Toast.Body className="text-primary">Woohoo, Trainer berhasil disimpan!</Toast.Body>
              </Toast>
            </div>
          </Form>
        </Col>
      </Row>

    </>

  )
}

export default AddTrainer;