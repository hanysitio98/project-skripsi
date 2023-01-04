import { useState } from 'react';
import { Col, Form, Row, Toast } from 'react-bootstrap';

import { FileUpload } from 'primereact/fileupload';
import { NumericFormat } from 'react-number-format';
import { FreelancerService } from 'services';

export const APP_BASE_URL = "https://zingy-frangipane-52426a.netlify.app";

const AddFreelancer = () => {


  const [freelancerName, setFreelancerName] = useState('');
  const [idCard, setIdCard] = useState('');
  const [cv, setCv] = useState({});
  const [freelancerImage, setFreelancerImage] = useState({});
  const [isActive, setIsActive] = useState('');
  const [show, setShow] = useState(false);


  const saveFreelancer = async (e) => {
    e.preventDefault();
    const freelancer = { freelancerName, idCard, cv, isActive, freelancerImage };
    try {
      const response = await FreelancerService.createFreelancer(freelancer);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  }

  const onUploadImage = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setFreelancerImage(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    setFreelancerImage(response.fileName);

  }

  const onUploadCv = async (event) => {
    const [file] = event.files;
    const fileObjectURL = URL.createObjectURL(file);
    setCv(fileObjectURL);
    const response = JSON.parse(event.xhr.response);
    setCv(response.fileName);

  }

  const user = JSON.parse(localStorage.getItem("user"));


  const onBeforeSend = async (event) => {
    if (user && user.token) {
      event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
    }
  }

  return (
    <>

      <Row>
        <Col>
          <Row>
            <Col>
              <div className="mb-3">
                <Form.Label className="font-weight-bold">FOTO</Form.Label>
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
              <div className="mb-3">
                <Form.Label className="font-weight-bold">CURICULUM VITAE</Form.Label>
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

          <Form >
            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">NAMA FREELANCER</Form.Label>
              <Col sm={9}>
                <Form.Control className='form-control' placeholder="Nama Freelancer"
                  name="freelancerName"
                  value={freelancerName}
                  onChange={(e) => setFreelancerName(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">ID CARD</Form.Label>
              <Col sm={9}>
                <NumericFormat
                  className='form-control'
                  placeholder='ID Card'
                  name="idCard"
                  value={idCard}
                  maxLength={16}
                  onChange={(e) => setIdCard(e.target.value)}
                >
                </NumericFormat>
              </Col>

            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">STATUS</Form.Label>
              <Col sm={9}>
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
              <button className="btn btn-block btn-primary pb-2" type="submit" onClick={(e) => saveFreelancer(e)}
              >
                Submit
              </button>
            </div>

            <div>
              <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="primary">

                <Toast.Body className="text-primary">Woohoo, Freelancer berhasil disimpan!</Toast.Body>
              </Toast>
            </div>
          </Form>
        </Col>
      </Row>
    </>

  )
}

export default AddFreelancer;