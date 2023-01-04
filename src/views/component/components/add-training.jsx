import { FileUpload } from "primereact/fileupload";
import { useEffect, useState } from "react";
import { Col, Form, Row, Toast } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from "react-number-format";
import TrainingService from "services/TrainingService.service";

export const APP_BASE_URL = "https://zingy-frangipane-52426a.netlify.app";

const AddTraining = () => {
  const [trainings, setTrainings] = useState();
  const [trainingCode, setTrainingCode] = useState("");
  const [trainingName, setTrainingName] = useState("");
  const [trainingCategory, setTrainingCategory] = useState();
  const [trainingMethod, setTrainingMethod] = useState();
  const [trainingDuration, setTrainingDuration] = useState();
  const [trainer, setTrainer] = useState();
  const [syllabus, setSyllabus] = useState();
  const [catalogImage, setCatalogImage] = useState({});
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [regLimitDate, setRegLimitDate] = useState(new Date());
  const [locationEvent, setLocationEvent] = useState();
  const [status, setStatus] = useState();
  const [priceExcludeTax, setPriceExcludeTax] = useState();
  const [priceIncludeTax, setPriceIncludeTax] = useState();
  const [vatTax, setVatTax] = useState();
  const [incomeTax, setIncomeTax] = useState();
  const [show, setShow] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const getTrainings = async () => {
      try {
        const response = await TrainingService.getAllTraining();
        setTrainings(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTrainings();
  }, []);

  const saveTraining = async (e) => {
    e.preventDefault();
    const training = {
      trainingCode,
      trainingName,
      trainingCategory,
      trainingMethod,
      trainingDuration,
      trainer,
      syllabus,
      catalogImage,
      startDate,
      endDate,
      startTime,
      endTime,
      regLimitDate,
      locationEvent,
      status,
      priceExcludeTax,
      priceIncludeTax,
      vatTax,
      incomeTax,
    };
    try {
      const response = await TrainingService.createTraining(training);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-danger";
  };

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

  const onUploadImage = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setCatalogImage(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    setCatalogImage(response.fileName);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const onBeforeSend = async (event) => {
    if (user && user.token) {
      event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
    }
  };

  const price = (e) => {
    e.preventDefault();

    const priceExclTax = e.target.value;

    setPriceExcludeTax(priceExclTax);

    const vatTax = (priceExclTax * 11) / 100;
    const incomeTax = (priceExclTax * 2) / 100;
    const priceInclude =
      parseInt(priceExclTax) + parseInt(vatTax) + parseInt(incomeTax);

    setVatTax(vatTax);
    console.log(vatTax);

    setIncomeTax(incomeTax);
    console.log(incomeTax);

    setPriceIncludeTax(priceInclude);
    console.log(priceIncludeTax);
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Group className="pb-3">
            <Form.Label className="font-weight-bold">CATALOG IMAGE</Form.Label>
            <FileUpload
              name="file"
              url={`${APP_BASE_URL}/api/uploadFile`}
              accept="image/*"
              onBeforeSend={onBeforeSend}
              onUpload={onUploadImage}
              chooseLabel="Pilih Gambar"
            />
          </Form.Group>

          <Form>
            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                TRAINING CODE
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  className="form-control"
                  placeholder="Training Code"
                  name="trainingCode"
                  value={trainingCode}
                  onChange={(e) => setTrainingCode(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                TRAINING TITLE
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  className="form-control"
                  placeholder="Judul Training"
                  name="trainingName"
                  value={trainingName}
                  onChange={(e) => setTrainingName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                TRAINING CATEGORY
              </Form.Label>
              <Col sm={10}>
                {/* <Form.Control className='form-control' placeholder="Training Category"
                  name="trainingCategory"
                  value={trainingCategory}
                  onChange={(e) => setTrainingCategory(e.target.value)} /> */}
                <Form.Control as="select" value={trainingCategory}>
                  <option>Choose</option>
                  {trainingCategorys.map((category) => (
                    <option value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                TRAINING METHOD
              </Form.Label>
              <Col sm={10}>
                {/* <Form.Control className='form-control' placeholder="Training Method"
                  name="trainingMethod"
                  value={trainingMethod}
                  onChange={(e) => setTrainingMethod(e.target.value)} /> */}
                <Form.Control
                  as="select"
                  value={trainingMethod}
                  onChange={(e) => setTrainingMethod(e.target.value)}
                >
                  <option>Choose</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </Form.Control>
              </Col>
            </Form.Group>

            {/* <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">TRAINING DURATION </Form.Label>
              <Col sm={9}>
                <Form.Control className='form-control' placeholder="Training Duration"
                  name="trainingDuration"
                  value={trainingDuration}
                  onChange={(e) => setTrainingDuration(e.target.value)} />
              </Col>

            </Form.Group> */}

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                SYLLABUS
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  className="form-control"
                  placeholder="Syllabus"
                  name="syllabus"
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                EVENT DATE
              </Form.Label>
              <Col sm={6}>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  withPortal
                  className="form-control"
                  // // dateFormat="yyyy/MM/dd"
                  // // showTimeSelect
                  // // timeInputLabel="Time:"
                  // dateFormat="MM/dd/yyyy h:mm aa"
                  // // timeClassName={handleColor}
                  // selected={startDate}
                  // onChange={(date) => setStartDate(date)}
                />
              </Col>
              {/* <Col sm={3}>
                <DatePicker
                  className="form-control"
                  // dateFormat="yyyy/MM/dd"
                  // showTimeSelect
                  // timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  // showTimeInput
                  // timeClassName={handleColor}
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </Col> */}

              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                />
              </Col>
              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                REGISTRATION LIMIT DATE
              </Form.Label>
              <Col sm={10}>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  showTimeSelect
                  timeClassName={handleColor}
                  className="form-control"
                  selected={regLimitDate}
                  onChange={(date) => setRegLimitDate(date)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                LOCATION EVENT
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  className="form-control"
                  placeholder="Location Event"
                  name="locationEvent"
                  value={locationEvent}
                  onChange={(e) => setLocationEvent(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={2} className="font-weight-bold">
                Training fee (before Tax)
              </Form.Label>
              <Col sm={10}>
                {/* <Form.Control className='form-control' placeholder=""
                  name="priceExcludeTax"
                  value={priceExcludeTax}
                  onChange={(e) => price(e)} /> */}
                <NumericFormat
                  className="form-control"
                  placeholder="Training fee (before Tax)"
                  name="idCard"
                  value={priceExcludeTax}
                  maxLength={16}
                  onChange={(e) => price(e)}
                ></NumericFormat>
              </Col>
            </Form.Group>

            {/* <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">HARGA SESUDAH PAJAK </Form.Label>
              <Col sm={9}>
                <Form.Control className='form-control' placeholder=""
                  name="priceIncludeTax"
                  value={priceIncludeTax}
                  onChange={(e) => setPriceIncludeTax(e.target.value)} />
              </Col>

            </Form.Group> */}

            {/* <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">VAT TAX</Form.Label>
              <Col sm={9}>
                <Form.Control className='form-control' placeholder=""
                  name="vatTax"
                  value={vatTax}
                  onChange={(e) => setVatTax(e.target.value)} />
              </Col>

            </Form.Group> */}

            {/* <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">INCOME TAX</Form.Label>
              <Col sm={9}>
                <Form.Control className='form-control' placeholder=""
                  name="incomeTax"
                  value={incomeTax}
                  onChange={(e) => setIncomeTax(e.target.value)} />
              </Col>

            </Form.Group> */}

            {/* <Form.Group className="pb-3" as={Row}>
              <Form.Label column sm={3} className="font-weight-bold">STATUS</Form.Label>
              <Col sm={9}>
                <Form.Control as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)} >
                  <option value="Ongoing">
                    Ongoing
                  </option>
                  <option value="Next">
                    Next
                  </option>
                  <option value="Done">
                    Done
                  </option>
                </Form.Control>
              </Col>
            </Form.Group> */}

            <div>
              <button
                className="btn btn-block btn-primary"
                type="submit"
                onClick={(e) => saveTraining(e)}
              >
                Submit
              </button>
            </div>

            <div>
              <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
                bg="primary"
              >
                <Toast.Body className="text-primary">
                  Woohoo, Training berhasil disimpan!
                </Toast.Body>
              </Toast>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddTraining;
