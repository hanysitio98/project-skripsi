import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../layout";

import { FileUpload } from "primereact/fileupload";
import DatePicker from "react-datepicker";
import TrainingService from "services/TrainingService.service";

export const APP_BASE_URL = "https://63b532db63d0962b5f37a13b--zingy-frangipane-52426a.netlify.app";

const EditTraining = () => {
  const [trainings, setTrainings] = useState({});
  const [priceExcludeTax, setPriceExcludeTax] = useState();
  const [priceIncludeTax, setPriceIncludeTax] = useState();
  const [catalogImage, setCatalogImage] = useState();
  const [vatTax, setVatTax] = useState();
  const [incomeTax, setIncomeTax] = useState();
  const [dateRange, setDateRange] = useState([null, null]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      TrainingService.getTrainingById(id)
        .then((response) => {
          setTrainings(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const trainingCategorys = [
    {
      id: "1",
      category: "Programming",
    },
    {
      id: "2",
      category: "Core Network",
    },
    {
      id: "3",
      category: "Python",
    },
    {
      id: "4",
      category: "Telco Specialist",
    },
    {
      id: "5",
      category: "Data Analyst",
    },
    {
      id: "6",
      category: "Digital Marketing Specialist",
    },
    {
      id: "7",
      category: "Drive Tester",
    },
    {
      id: "8",
      category: "Content Manages",
    },
    {
      id: "9",
      category: "IT Support",
    },
  ];

  const price = (e) => {
    e.preventDefault();

    const priceExclTax = (e.target && e.target.value) || "";

    setPriceExcludeTax(priceExclTax);

    const vatTax = (priceExclTax * 11) / 100;
    const incomeTax = (priceExclTax * 2) / 100;
    const priceInclude =
      parseInt(priceExclTax) + parseInt(vatTax) + parseInt(incomeTax);

    // setVatTax(vatTax);
    // console.log(vatTax);

    // setIncomeTax(incomeTax);
    // console.log(incomeTax);

    // setPriceIncludeTax(priceInclude);
    // console.log(priceIncludeTax);

    const val = (e.target && e.target.value) || "";
    const _trainings = { ...trainings };
    _trainings.priceExcludeTax = val;
    _trainings.vatTax = vatTax;
    _trainings.incomeTax = incomeTax;
    _trainings.priceIncludeTax = priceInclude;
    setTrainings(_trainings);
  };

  const onUploadImage = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setCatalogImage(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _trainings = { ...trainings };
    _trainings.catalogImage = response.fileName;
    setTrainings(_trainings);
  };

  const updateTraining = async (e) => {
    e.preventDefault();
    try {
      const response = await TrainingService.updateTraining(id, trainings);
      const _trainings = response.data;
      console.log(_trainings);
      navigate("/training-list");
    } catch (error) {
      console.log(error);
    }
  };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-danger";
  };

  return (
    <Header>
      <h3 className="ml-4 font-weight-bold">Edit Training</h3>
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
                    Catalog Sebelumnya
                  </Card.Header>
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-center">
                      <img
                        src={`${APP_BASE_URL}/api/images/${trainings.catalogImage}`}
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
              <Col className="col-12 col-lg-6">
                <Form>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      TRAINING CODE
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Training Code"
                      name="trainingCode"
                      value={trainings.trainingCode}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _trainings = { ...trainings };
                        _trainings.trainingCode = val;
                        setTrainings(_trainings);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      TRAINING TITLE
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Title"
                      name="trainingName"
                      value={trainings.trainingName}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _trainings = { ...trainings };
                        _trainings.trainingName = val;
                        setTrainings(_trainings);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      TRAINING CATEGORY
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="trainingCategory"
                      value={trainings.trainingCategory}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _trainings = { ...trainings };
                        _trainings.trainingCategory = val;
                        setTrainings(_trainings);
                      }}
                    >
                      <option>Choose</option>
                      {trainingCategorys.map((category) => (
                        <option value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="pb-2">
                    <Form.Label className="font-weight-bold">
                      TRAINING METHOD
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={trainings.trainingMethod}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _trainings = { ...trainings };
                        _trainings.trainingMethod = val;
                        setTrainings(_trainings);
                      }}
                    >
                      <option>Choose</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="pb-3">
                    <Form.Label className="font-weight-bold">
                      SYLLABUS
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Syllabus"
                      name="syllabus"
                      value={trainings.syllabus}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _trainings = { ...trainings };
                        _trainings.syllabus = val;
                        setTrainings(_trainings);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="pb-3">
                    <Form.Label className="font-weight-bold">
                      EVENT DATE
                    </Form.Label>
                    <Row>
                      <Col sm={4}>
                        <DatePicker
                          className="form-control"
                          dateFormat="yyyy/MM/dd"
                          // showTimeSelect
                          showTimeInput
                          // selectsRange={true}
                          timeClassName={handleColor}
                          selected={Date.parse(trainings.startDate)}
                          onChange={(date) => {
                            // const val = (date.target && date.target.value) || '';
                            const _trainings = { ...trainings };
                            _trainings.startDate = date;
                            setTrainings(_trainings);
                          }}
                        />
                      </Col>
                      <Col sm={4}>
                        <DatePicker
                          className="form-control"
                          dateFormat="yyyy/MM/dd"
                          // showTimeSelect
                          showTimeInput
                          timeClassName={handleColor}
                          selected={Date.parse(trainings.endDate)}
                          onChange={(date) => {
                            // const val = (date.target && date.target.value) || '';
                            const _trainings = { ...trainings };
                            _trainings.endDate = date;
                            setTrainings(_trainings);
                          }}
                        />
                      </Col>

                      <Col sm={2}>
                        <DatePicker
                          className="form-control"
                          dateFormat="h:mm aa"
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          selected={Date.parse(trainings.startTime)}
                          onChange={(date) => {
                            // const val = (date.target && date.target.value) || '';
                            const _trainings = { ...trainings };
                            _trainings.startTime = date;
                            setTrainings(_trainings);
                          }}
                        />
                      </Col>
                      <Col sm={2}>
                        <DatePicker
                          className="form-control"
                          dateFormat="h:mm aa"
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          selected={Date.parse(trainings.endTime)}
                          onChange={(date) => {
                            // const val = (date.target && date.target.value) || '';
                            const _trainings = { ...trainings };
                            _trainings.endTime = date;
                            setTrainings(_trainings);
                          }}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="pb-3">
                    <Form.Label className="font-weight-bold">
                      REGISTRATION LIMIT DATE
                    </Form.Label>
                    <DatePicker
                      className="form-control"
                      dateFormat="yyyy/MM/dd"
                      showTimeSelect
                      timeClassName={handleColor}
                      selected={Date.parse(trainings.regLimitDate)}
                      onChange={(date) => {
                        // const val = (date.target && date.target.value) || '';
                        const _trainings = { ...trainings };
                        _trainings.regLimitDate = date;
                        setTrainings(_trainings);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      LOCATION EVENT
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Location Event"
                      name="locationEvent"
                      value={trainings.locationEvent}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || "";
                        const _trainings = { ...trainings };
                        _trainings.locationEvent = val;
                        setTrainings(_trainings);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      PRICE EXCLUDE TAX
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Location Event"
                      name="priceExcludeTax"
                      value={trainings.priceExcludeTax}
                      // onChange={(e) => {
                      //   const val = (e.target && e.target.value) || '';
                      //   const _trainings = { ...trainings };
                      //   _trainings.priceExcludeTax = val;
                      //   setTrainings(_trainings);
                      // }}
                      onChange={(e) => price(e)}
                    />
                  </Form.Group>

                  {/* <Form.Group className="pb-3">
                    <Form.Label className="font-weight-bold">STATUS</Form.Label>
                    <Form.Control as="select"
                      value={trainings.status}
                      onChange={(e) => {
                        const val = (e.target && e.target.value) || '';
                        const _trainings = { ...trainings };
                        _trainings.status = val;
                        setTrainings(_trainings);
                      }}>
                      <option>Choose</option>
                      <option value="Next">
                        Next
                      </option>
                      <option value="Ongoing">
                        Ongoing
                      </option>
                      <option value="Done">
                        Done
                      </option>
                    </Form.Control>
                  </Form.Group> */}

                  <Col className="col-12 col-lg-4 p-0">
                    <button
                      className="btn btn btn-primary btn-block"
                      type="submit"
                      onClick={(e) => updateTraining(e)}
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
  );
};

export default EditTraining;
