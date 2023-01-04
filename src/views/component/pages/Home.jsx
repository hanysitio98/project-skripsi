import { useEffect, useState } from "react";
import { Card, CardDeck, Col, Row } from "react-bootstrap";
import { CgCopy, CgUserList } from "react-icons/cg";
import { Header } from "../layout";

import { format } from "date-fns";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FcDataSheet, FcFaq, FcSelfie } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  FreelancerService, ProjectService, RegistrationService, TrainerService, TrainingService
} from "services";

const Home = () => {
  const [linkCatalog, setLinkCatalog] = useState(
    "https://zingy-frangipane-52426a.netlify.app/catalog"
  );
  const [copied, setCopied] = useState(false);
  const [projects, setProjects] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [participants, setParticipants] = useState([]);

  const currentDate = new Date().toISOString();

  const otherCopy = () => setCopied(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await ProjectService.getProjects();
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);

  useEffect(() => {
    const getAllTraining = async () => {
      try {
        const response = await TrainingService.getAllTraining();
        setTrainings(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTraining();
  }, []);

  useEffect(() => {
    const getAllTrainer = async () => {
      try {
        const response = await TrainerService.getAllTrainer();
        setTrainers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTrainer();
  }, []);

  useEffect(() => {
    const getAllFreelancer = async () => {
      try {
        const response = await FreelancerService.getAllFreelancer();
        setFreelancers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllFreelancer();
  }, []);

  useEffect(() => {
    const getAllParticipant = async () => {
      try {
        const response = await RegistrationService.getRegister();
        setParticipants(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllParticipant();
  }, []);

  return (
    <Header>
      {/* Link Katalog */}
      <Card
        className="mb-3"
        style={{
          backgroundColor: "white",
          boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
        }}
      >
        <Card.Body>
          <h5 className="text-primary mb-3 font-weight-bold">Link Katalog</h5>
          <button className="btn btn-block btn-outline-primary">
            {linkCatalog}
          </button>
          <div className="mt-3 d-flex justify-content-end">
            <CopyToClipboard onCopy={otherCopy} text={linkCatalog}>
              <button className="btn btn-outline-primary">
                <CgCopy />
              </button>
            </CopyToClipboard>
          </div>
        </Card.Body>
      </Card>

      {/* End */}

      {/* Jumlah Training */}

      <CardDeck className="my-3">
        <Card
          style={{
            backgroundColor: "white",
            boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
          }}
        >
          <Card.Body>
            <Row>
              <Col>
                <p
                  className="text-primary font-weight-bold"
                  style={{ fontSize: "1.3rem" }}
                >
                  Trainings
                </p>
                <h4>{trainings.length}</h4>
              </Col>

              <Col>
                <div className="d-flex justify-content-end">
                  <FcDataSheet style={{ fontSize: "2rem" }} />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card
          style={{
            backgroundColor: "white",
            boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
          }}
        >
          <Card.Body>
            <Row>
              <Col>
                <p
                  className="text-success font-weight-bold"
                  style={{ fontSize: "1.3rem" }}
                >
                  Trainee
                </p>
                <h4>{participants.length}</h4>
              </Col>
              <Col>
                <div className=" d-flex justify-content-end ">
                  <FcFaq style={{ fontSize: "2rem" }} />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card
          style={{
            backgroundColor: "white",
            boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
          }}
        >
          <Card.Body>
            <Row>
              <Col>
                <p
                  className="text-danger font-weight-bold"
                  style={{ fontSize: "1.3rem" }}
                >
                  Trainers
                </p>
                <h4>{trainers.length}</h4>
              </Col>
              <Col>
                <div className=" d-flex justify-content-end text-danger ">
                  <CgUserList style={{ fontSize: "2rem" }} />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card
          style={{
            backgroundColor: "white",
            boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
          }}
        >
          <Card.Body>
            <Row>
              <Col>
                <p
                  className="text-warning font-weight-bold"
                  style={{ fontSize: "1.3rem" }}
                >
                  Freelancers
                </p>
                <h4>{freelancers.length}</h4>
              </Col>
              <Col>
                <div className=" d-flex justify-content-end">
                  <FcSelfie style={{ fontSize: "2rem" }} />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </CardDeck>

      {/* End */}

      {/* On Going Training */}

      <Card
        className="mb-3"
        style={{
          backgroundColor: "white",
          boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
        }}
      >
        <Card.Body>
          <h5 className="text-primary mb-3 font-weight-bold">
            On Going Trainings
          </h5>
          <CardDeck>
            {trainings.map((training) => (
              <div>
                {currentDate > new Date(training.startDate).toISOString() &&
                  currentDate < new Date(training.endDate).toISOString() && (
                    <Card
                      style={{
                        backgroundColor: "white",
                        boxShadow:
                          ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
                      }}
                    >
                      <Card.Header className="font-weight-bold">
                        {training.trainingName}
                      </Card.Header>
                      <Card.Body>
                        {format(new Date(training.startDate), "dd MMM yyyy")} -{" "}
                        {format(new Date(training.endDate), "dd MMM yyyy")}
                      </Card.Body>
                    </Card>
                  )}
              </div>
            ))}
          </CardDeck>
        </Card.Body>
      </Card>

      {/* End */}

      {/* Project */}

      <Card
        style={{
          backgroundColor: "white",
          boxShadow: ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
        }}
      >
        <Card.Body>
          <h5 className="text-primary mb-3 font-weight-bold">Projects</h5>

          <div className="card shadow mt-4">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Client</th>
                      <th>Assign To</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td>{project.taskTitle}</td>
                        <td>{project.taskDescription}</td>
                        <td>{project.client}</td>
                        <td>{project.assignTo.nama}</td>
                        {project.priority === "Low" ? (
                          <td>
                            <div className="badge badge-pill badge-success">
                              {project.isActive}
                            </div>
                          </td>
                        ) : project.priority === "Medium" ? (
                          <td>
                            <div className="badge badge-pill badge-warning">
                              {project.priority}
                            </div>
                          </td>
                        ) : (
                          project.priority === "High" && (
                            <td>
                              <div className="badge badge-pill badge-danger">
                                {project.priority}
                              </div>
                            </td>
                          )
                        )}
                        {/* <td>{project.status}</td> */}

                        {project.status === "Done" ? (
                          <td>
                            <div className="badge badge-pill badge-success">
                              {project.status}
                            </div>
                          </td>
                        ) : project.status === "Ongoing" ? (
                          <td>
                            <div className="badge badge-pill badge-warning">
                              {project.status}
                            </div>
                          </td>
                        ) : (
                          project.status === "Not Yet" && (
                            <td>
                              <div className="badge badge-pill badge-danger">
                                {project.status}
                              </div>
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* End */}
    </Header>
  );
};
export default Home;
