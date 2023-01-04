import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Navbar,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { RegistrationService, TrainingService } from "services";
import { logo2x, gopay } from "images";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

export const APP_BASE_URL = "http://localhost:8080";

const SignupSchema = yup.object().shape({
  training: yup.string(),
  amount: yup.string(),
  trainingMethod: yup.string(),
  traineeName: yup.string().required(),
  email: yup.string().required().email(),
  phoneNumber: yup.string().required(),
  company: yup.string().required(),
  participantCount: yup.string().required(),
  tertiaryEducation: yup.string().required(),
  occupation: yup.string().required(),
  paymentMethod: yup.string().required(),
});

// const signupData = {
//   training: '',
//   traineeName: '',
//   amount : '',
//   trainingMethod : '',
//   email : '',
//   phoneNumber: '',
//   company: '',
//   participantCount: '',
//   tertiaryEducation: '',
//   occupation: '',
//   paymentMethod: '',
//   paymentDate:
// }

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, setValue, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const [trainings, setTrainings] = useState({});
  const [training, setTraining] = useState("");
  const [traineeName, setTraineeName] = useState();
  const [amount, setAmount] = useState("");
  const [trainingMethod, setTrainingMethod] = useState("");
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [company, setCompany] = useState();
  const [participantCount, setParticipantCount] = useState();
  const [tertiaryEducation, setTertiaryEducation] = useState();
  const [occupation, setOccupation] = useState();
  const [paymentDate, setPaymentDate] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [participant, setParticipant] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  const currentDate = new Date().toISOString();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    navigate(`/success`);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getAllTraining = async () => {
      if (id) {
        try {
          const response = await TrainingService.getTrainingById(id);
          setTrainings(response.data);
          setTraining(response.data.trainingName);
          setTrainingMethod(response.data.trainingMethod);
          setAmount(response.data.priceIncludeTax);
        } catch (error) {
          console.log(error);
        }
      }
    };

    setPaymentDate(currentDate);

    getAllTraining();
  }, [id]);

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

  const onSubmit = useCallback(async () => {
    if (training && amount && trainingMethod) {
      try {
        const data = {
          training,
          traineeName,
          amount,
          trainingMethod,
          email,
          phoneNumber,
          company,
          participantCount,
          tertiaryEducation,
          occupation,
          paymentMethod,
          paymentDate,
        };
        setLoading(true);
        const register = await RegistrationService.createRegister(data);
        console.log(register.data);
        setIsSuccess(true);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      setLoading(false);
    }
  }, [
    amount,
    company,
    email,
    occupation,
    participantCount,
    paymentDate,
    paymentMethod,
    phoneNumber,
    tertiaryEducation,
    traineeName,
    training,
    trainingMethod,
  ]);

  return (
    <>
      <Modal
        show={isSuccess}
        onHide={handleClose}
        centered
        className="text-center text-info"
      >
        {/* <Modal.Header closeButton> */}
        {/* <Modal.Title>Modal heading</Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body>
          <h5 className="font-wight-bold mb-2">Pendaftaran berhasil!</h5>
          <div>Informasi Pendaftaran</div>
          <div className="mb-3">Training : {trainings.trainingName}</div>

          <div className="d-flex justify-content-center">
            <Button className="btn btn-info" onClick={handleClose}>
              Selesai
            </Button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer> */}
      </Modal>

      <Navbar
        bg="light"
        className="p-1"
        style={{
          boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
        }}
      >
        <Navbar.Brand href="/catalog">
          <img src={logo2x} alt="" width="170" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
Signed in as: <a href="#login">Mark Otto</a>
</Navbar.Text> */}
        </Navbar.Collapse>
      </Navbar>

      <section className="h-100">
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col md="9">
              <Card className="rounded-3" border="info">
                <Card.Header className="h5 text-center font-weight-bold text-info">
                  REGISTER
                </Card.Header>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={`${APP_BASE_URL}/api/images/${trainings.catalogImage}`}
                    height="280px"
                  />

                  <Row>
                    <Col>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mt-3 mb-3">
                          <Form.Label className="h5">
                            Training Selected
                          </Form.Label>
                          <Form.Control
                            {...register("training")}
                            plaintext
                            className="h6 font-weight-bold"
                            value={trainings.trainingName}
                          />

                          <Form.Text
                            plaintext
                            readOnly
                            disabled
                            className="font-weight-bold"
                          >
                            {" "}
                            {new Date(trainings.startDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(trainings.endDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </Form.Text>

                          <Form.Text
                            plaintext
                            readOnly
                            className="font-weight-bold"
                          >
                            {new Date(trainings.startTime).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(trainings.endTime).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Form.Text>

                          {/* <Form.Control
                            {...register("amount", { required: true })}
                            plaintext
                            className="font-weight-bold"
                            value={trainings.startDate}
                            type="hidden"
                          />

                          <Form.Control
                            {...register("amount", { required: true })}
                            plaintext
                            className="font-weight-bold"
                            value={trainings.endDate}
                            type="hidden"
                          /> */}

                          <Form.Control
                            {...register("amount", { required: true })}
                            plaintext
                            className="font-weight-bold"
                            defaultValue={trainings.priceIncludeTax}
                            value={trainings.priceIncludeTax}
                            type="hidden"
                          />

                          <Form.Control
                            plaintext
                            className="font-weight-bold"
                            {...register("trainingMethod")}
                            defaultValue={trainings.trainingMethod}
                            value={trainings.trainingMethod}
                            type="hidden"
                          />
                        </Form.Group>

                        <Form.Group className="mb-=3">
                          <Form.Label>Nama Lengkap</Form.Label>
                          <Form.Control
                            {...register("traineeName", {
                              required: {
                                value: true,
                                message: "Harus diisi",
                              },
                              maxLength: 20,
                            })}
                            onChange={(e) => setTraineeName(e.target.value)}
                          />

                          {errors.traineeName && (
                            <small className="text-danger">
                              Nama Lengkap harus diisi
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            {...register("email", {
                              required: true,
                            })}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <small className="text-danger">
                              Email harus diisi
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Nomor Handphone (Aktif)</Form.Label>
                          <Form.Control
                            {...register("phoneNumber", {
                              required: true,
                            })}
                            type="number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          {errors.phoneNumber && (
                            <small className="text-danger">
                              No handphone harus diisi
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Organisasi</Form.Label>
                          <Form.Control
                            {...register("company", {
                              required: true,
                              maxLength: 20,
                            })}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                          {errors.company && (
                            <small className="text-danger">
                              Organisasi harus diisi
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Jumlah Peserta</Form.Label>
                          <Form.Control
                            {...register("participantCount", {
                              required: {
                                value: true,
                                message: "Harus diisi",
                              },
                              maxLength: 20,
                            })}
                            onChange={(e) =>
                              setParticipantCount(e.target.value)
                            }
                          />
                          {errors.participantCount && (
                            <small className="text-danger">
                              Jumlah peserta harus diisi
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Pendidikan Terakhir</Form.Label>
                          <Form.Control
                            {...register("tertiaryEducation", {
                              required: true,
                            })}
                            as="select"
                            onChange={(e) =>
                              setTertiaryEducation(e.target.value)
                            }
                          >
                            <option>Choose...</option>
                            <option value="SMA">SMA</option>
                            <option value="D3">D3</option>
                            <option value="D4">D4/S1</option>
                            <option value="S2">S2</option>
                            <option value="Lainnya">Lainnya</option>
                          </Form.Control>
                          {errors.tertiaryEducation && (
                            <small className="text-danger">
                              Pendidikan terakhir harus dipilih
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Profesi</Form.Label>
                          <Form.Control
                            {...register("occupation", {
                              required: true,
                            })}
                            as="select"
                            onChange={(e) => setOccupation(e.target.value)}
                          >
                            <option>Choose...</option>
                            <option value="Mahasiswa">Mahasiswa</option>
                            <option value="Pegawai BUMN">Pegawai BUMN</option>
                            <option value="Pegawai Negeri Sipil">
                              Pegawai Negeri Sipil
                            </option>
                            <option value="Pegawai Swasta">
                              Pegawai Swasta
                            </option>
                            <option value="Lainnya">Lainnya</option>
                          </Form.Control>
                          {errors.occupation && (
                            <small className="text-danger">
                              Pekerjaan harus dipilih
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Metode Pembayaran</Form.Label>
                          <Form.Control
                            {...register("paymentMethod", {
                              required: true,
                            })}
                            as="select"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            <option>Choose...</option>
                            <option value="Gopay">Gopay</option>
                            <option value="OVO">OVO</option>
                            <option value="Shopeepay">Shopeepay</option>
                          </Form.Control>
                          {errors.paymentMethod && (
                            <small className="text-danger">
                              Metode Pembayaran harus dipilih
                            </small>
                          )}
                        </Form.Group>

                        <Row className="justify-content-center">
                          <Col className="col-12 col-lg-5">
                            <Button
                              className="btn btn-info btn-block"
                              type="submit"
                            >
                              DAFTAR
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section class="h-vh100 h-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
              <div class="card rounded-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                  class="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopLeftRadius: ".3rem",
                  }}
                  alt="Sample photo"
                />
                <div class="card-body p-4 p-md-5">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Registration Info
                  </h3>

                  <form class="px-md-2">
                    <div class="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1q"
                        class="form-control"
                      />
                      <label class="form-label" htmlFor="form3Example1q">
                        Name
                      </label>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="form-outline datepicker">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleDatepicker1"
                          />
                          <label
                            htmlFor="exampleDatepicker1"
                            class="form-label"
                          >
                            Select a date
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <select class="select">
                          <option value="1" disabled>
                            Gender
                          </option>
                          <option value="2">Female</option>
                          <option value="3">Male</option>
                          <option value="4">Other</option>
                        </select>
                      </div>
                    </div>

                    <div class="mb-4">
                      <select class="select">
                        <option value="1" disabled>
                          Class
                        </option>
                        <option value="2">Class 1</option>
                        <option value="3">Class 2</option>
                        <option value="4">Class 3</option>
                      </select>
                    </div>

                    <div class="row mb-4 pb-2 pb-md-0 mb-md-5">
                      <div class="col-md-6">
                        <div class="form-outline">
                          <input
                            type="text"
                            id="form3Example1w"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example1w">
                            Registration code
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-success btn-lg mb-1">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Registration;
