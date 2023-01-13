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
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { RegistrationService, TrainingService } from "services";
import { logo2x, gopay, shopeepay, ovo } from "images";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { NumericFormat } from "react-number-format";

export const APP_BASE_URL = "http://localhost:8080";

export const STEPS_AMOUNT = 2;

// const FinishSectionButton = ({ onClick, isDisabled, children }) => {
//   return (
//     // <button
//     //   onClick={onClick}
//     //   disabled={isDisabled}
//     //   type="button"
//     //   className="mt-6 bg-green-500 text-white rounded py-6 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
//     // >
//     //   {children}
//     // </button>

//     <Row className="justify-content-center">
//       <Col className="col-12 col-lg-5">
//         <button
//           onClick={onClick}
//           className="btn btn-info btn-block"
//           type="button"
//         >
//           {children}
//         </button>
//       </Col>
//     </Row>
//   );
// };

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

const Registration = () => {
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
  const [invNo, setInvNo] = useState();
  const [isPaid, setIsPaid] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [participant, setParticipant] = useState([]);
  const [formStep, setFormStep] = React.useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, setValue, isValid, isDirty },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const handleStepCompletion = (e) => {
    e.preventDefault();

    setFormStep((cur) => cur + 1);
  };

  const handleGoBackToPreviousStep = () => {
    setFormStep((cur) => cur - 1);
  };

  const isValidForm = () => {
    return traineeName.length > 0 && phoneNumber.length > 0;
  };

  const currentDate = new Date().toISOString();
  const currentDateForInv = new Date().valueOf();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setIsSuccess(false);
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleSubmitForm = () => {
    setIsSuccess(true);
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
          setIsPaid(true);
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);
          /**
           *
           * @param {string} num
           *
           * @returns {string}
           */
          const getInvNo = (num) => {
            return "INV-" + num.toString().padStart(6, "0");
          };
          setInvNo(getInvNo(currentDateForInv));
        } catch (error) {
          console.log(error);
        }
      }
    };
    console.log(formStep);

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

  const changeName = (e) => {
    e.preventDefault();

    const name = e.target.value;

    setTraineeName(name);
    /**
     *
     * @param {string} num
     *
     * @returns {string}
     */
    const getInvNo = (num) => {
      return "INV-" + num.toString().padStart(6, "0");
    };

    setInvNo(getInvNo(currentDateForInv));
  };

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
          paymentDate,
          invNo,
          paymentMethod,
          isPaid,
          startDate,
          endDate,
        };
        setLoading(true);
        const register = await RegistrationService.createRegister(data);
        console.log(register.data);
        const id = register.data.id;
        // setIsSuccess(true);
        navigate(`/success/${id}`);
        // setFormStep((cur) => cur + 1);
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
    phoneNumber,
    tertiaryEducation,
    traineeName,
    training,
    trainingMethod,
    invNo,
    paymentMethod,
    isPaid,
    startDate,
    endDate,
  ]);

  return (
    <>
      <Modal show={isSuccess} centered onHide={handleClose}>
        {/* <Modal.Header>
          <div className="text-center">
            <h5 className="font-weight-bold text-center text-info">
              Informasi Pendaftaran
            </h5>
          </div>
        </Modal.Header> */}
        <Modal.Body>
          <h5 className="font-weight-bold text-center text-info pb-4">
            Informasi Pendaftaran
          </h5>
          {/* <div>Informasi Pendaftaran</div> */}
          <div>Training selected - {trainings.trainingName}</div>
          <div className=" mb-3">
            {" "}
            {new Date(startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(endDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="mb-2">Jumlah yang perlu anda bayar : </div>
          <div className="mb-5 font-weight-bold">{rupiah(amount)}</div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-center p-3">
            <Button className="btn btn-info" onClick={onSubmit} type="submit">
              Bayar dengan {paymentMethod}
            </Button>
          </div>
        </Modal.Footer>
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
                      <form>
                        <Form.Group className="mt-3 mb-3">
                          <Form.Label className="h5 text-info">
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
                        </Form.Group>
                        {/* {formStep <= 0 && ( */}
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
                            onChange={(e) => changeName(e)}
                            placeholder="Nama Lengkap"
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
                            placeholder="email@email.com"
                          />
                          {errors.email && (
                            <small className="text-danger">
                              Email harus diisi
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Nomor Handphone (Aktif)</Form.Label>
                          {/* <NumericFormat
                            {...register("phoneNumber", {
                              required: true,
                            })}
                            className="form-control"
                            placeholder="No Handphone"
                            name="phoneNumber"
                            value={phoneNumber}
                            maxLength={13}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          ></NumericFormat> */}
                          <Form.Control
                            {...register("phoneNumber", {
                              required: true,
                            })}
                            type="number"
                            maxLength={13}
                            // onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          {errors.phoneNumber && (
                            <small className="text-danger">
                              No handphone harus diisi
                            </small>
                          )}
                        </Form.Group>

                        {/* <Form.Group className="mb-3">
                          <Form.Label>Nomor Handphone (Aktif)</Form.Label>
                          <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({ field: { name, value, onChange } }) => (
                              <NumericFormat
                                className="form-control"
                                placeholder="No Handphone"
                                name="phoneNumber"
                                value={value}
                                maxLength={13}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            )}
                          />
                          {errors.phoneNumber && (
                            <small className="text-danger">
                              No handphone harus diisi
                            </small>
                          )}
                        </Form.Group> */}

                        <Form.Group className="mb-3">
                          <Form.Label>Organisasi</Form.Label>
                          <Form.Control
                            {...register("company", {
                              required: true,
                              maxLength: 20,
                            })}
                            // onChange={(e) => setCompany(e.target.value)}
                            placeholder="Organisasi/Perusahaan"
                          />
                          {errors.company && (
                            <small className="text-danger">
                              Organisasi/Perusahaan harus diisi
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
                            type="number"
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
                        {/* <Form.Group className="mb-3">
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
                        </Form.Group> */}

                        <Row className="pb-5">
                          <Col className="col-12 py-0 ">
                            <Form.Label>Metode Pembayaran</Form.Label>
                          </Col>

                          <Col className="col-12 py-0 px-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                {...register("paymentMethod", {
                                  required: true,
                                })}
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                                value="Gopay"
                              ></input>
                              <label className="form-check-label ml-2">
                                <img src={gopay} alt="gopay" width="70" />
                              </label>
                            </div>
                          </Col>

                          <Col className="col-12 py-0 px-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                {...register("paymentMethod", {
                                  required: true,
                                })}
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                                value="OVO"
                              ></input>
                              <label className="form-check-label ml-2">
                                <img src={ovo} alt="ovo" width="70" />
                              </label>
                            </div>
                          </Col>

                          <Col className="col-12 py-0 px-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                {...register("paymentMethod", {
                                  required: true,
                                })}
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                                value="Shopeepay"
                              ></input>
                              <label className="form-check-label ml-2">
                                <img
                                  src={shopeepay}
                                  alt="shopeepay"
                                  width="70"
                                />
                              </label>
                            </div>
                          </Col>
                        </Row>

                        <Row className="justify-content-center">
                          <Col className="col-12 col-lg-5">
                            <button
                              className="btn btn-info btn-block"
                              type="button"
                              onClick={handleSubmitForm}
                            >
                              DAFTAR
                            </button>
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
    </>
  );
};

export default Registration;
