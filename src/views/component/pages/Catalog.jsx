import { useEffect, useState } from "react";
import {
  Card,
  Carousel,
  Col,
  Container,
  Navbar,
  Row,
  Tab,
  Tabs
} from "react-bootstrap";

import { GoCalendar, GoClock, GoTag } from "react-icons/go";

import { format } from "date-fns";
import { logo2x, trainingimage1, trainingimage3 } from "images";
import { TiLocation } from "react-icons/ti";
import { TrainingService } from "services";

export const APP_BASE_URL = "http://localhost:8080";

const Catalog = () => {
  const [trainings, setTrainings] = useState([]);
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const [doneTrainings, setDoneTrainings] = useState([]);
  const [nextTrainings, setNextTrainings] = useState([]);

  const currentDate = new Date().toISOString();
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    const getAllTraining = async () => {
      try {
        const response = await TrainingService.getAllTraining();

        const ongoing = response.data.filter((training) => {
          return (
            training.endDate > currentDate && training.startDate < currentDate
          );
        });
        setOngoingTrainings(ongoing);

        const done = response.data.filter((training) => {
          return training.endDate < currentDate;
        });
        setDoneTrainings(done);

        const next = response.data.filter((training) => {
          return (
            training.endDate > currentDate && training.startDate > currentDate
          );
        });
        setNextTrainings(next);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(currentDate);

    getAllTraining();
  }, []);

  return (
    <>
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
      <Container fluid className="p-3">
        {/* <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
           <img src={logo4Best} />
        </button>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href=""
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
            
            </a>
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            ></div>
          </li>
        </ul>
      </nav> */}

        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={trainingimage1}
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src={trainingimage3}
              alt="Second slide"
            />
            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={trainingimage1}
              alt="Third slide"
            />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="text-center mb-5">
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* <Container> */}

        <Tabs defaultActiveKey="first">
          <Tab
            eventKey="first"
            title="NEXT TRAININGS"
            tabClassName="font-weight-bold text-info "
          >
            <Row className="p-5">
              {nextTrainings.map((training) => (
                <Col className="min-vh-50 col-sm-7 col-3 ">
                  <a href={`/event-detail/${training.id}`}>
                    <Card
                      style={{
                        backgroundColor: "white",
                        boxShadow:
                          ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
                      }}
                      className="h-100"
                    >
                      <Card.Img
                        variant="top"
                        src={`${APP_BASE_URL}/api/images/${training.catalogImage}`}
                      />
                      <Card.Body>
                        <h5>{training.trainingName}</h5>
                        <div className="mb-2">
                          <div>
                            <TiLocation className="mr-2" />{" "}
                            <span>{training.trainingMethod}</span>
                          </div>
                          <div>
                            <GoCalendar className="mr-2" />{" "}
                            <span>
                              {format(
                                new Date(training.startDate),
                                "dd MMM yyyy"
                              )}{" "}
                              -{" "}
                              {format(
                                new Date(training.endDate),
                                "dd MMM yyyy"
                              )}
                            </span>
                          </div>
                          <div>
                            <GoClock className="mr-2" />{" "}
                            <span>
                              {" "}
                              {format(
                                new Date(training.startTime),
                                "h:mm aa"
                              )}{" "}
                              - {format(new Date(training.endTime), "h:mm aa")}
                            </span>
                          </div>
                          <div>
                            <GoTag className="mr-2" />{" "}
                            <span>{rupiah(training.priceIncludeTax)}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </Tab>
          <Tab
            eventKey="second"
            title="ONGOING TRAININGS"
            tabClassName="font-weight-bold text-info"
          >
            <Row className="p-5">
              {ongoingTrainings.map((training) => (
                <Col className="min-vh-50 col-sm-7 col-3 ">
                  {/* <a href={`/event-detail/${training.id}`}> */}
                  <Card
                    style={{
                      backgroundColor: "white",
                      boxShadow:
                        ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
                    }}
                    className="h-100"
                  >
                    <Card.Img
                      variant="top"
                      src={`${APP_BASE_URL}/api/images/${training.catalogImage}`}
                    />
                    <Card.Body>
                      <h5>{training.trainingName}</h5>
                      <div className="mb-2">
                        <div>
                          <TiLocation className="mr-2" />{" "}
                          <span>{training.trainingMethod}</span>
                        </div>
                        <div>
                          <GoCalendar className="mr-2" />{" "}
                          <span>
                            {format(
                              new Date(training.startDate),
                              "dd MMM yyyy"
                            )}{" "}
                            -{" "}
                            {format(new Date(training.endDate), "dd MMM yyyy")}
                          </span>
                        </div>
                        <div>
                          <GoClock className="mr-2" />{" "}
                          <span>
                            {" "}
                            {format(
                              new Date(training.startTime),
                              "h:mm aa"
                            )} - {format(new Date(training.endTime), "h:mm aa")}
                          </span>
                        </div>
                        <div>
                          <GoTag className="mr-2" />{" "}
                          <span>{rupiah(training.priceIncludeTax)}</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* </a> */}
                </Col>
              ))}
            </Row>
          </Tab>

          <Tab
            eventKey="third"
            title="TRAININGS DONE"
            tabClassName="font-weight-bold text-info"
          >
            <Row className="p-5">
              {doneTrainings.map((training) => (
                <Col className="min-vh-50 col-sm-7 col-3 ">
                  {/* <a href={`/event-detail/${training.id}`}> */}
                  <Card
                    style={{
                      backgroundColor: "white",
                      boxShadow:
                        ".15rem .15rem .15rem .15rem rgba(58,59,69,.15)",
                    }}
                    className="h-100"
                  >
                    <Card.Img
                      variant="top"
                      src={`${APP_BASE_URL}/api/images/${training.catalogImage}`}
                    />
                    <Card.Body>
                      <h5>{training.trainingName}</h5>
                      <div className="mb-2">
                        <div>
                          <TiLocation className="mr-2" />{" "}
                          <span>{training.trainingMethod}</span>
                        </div>
                        <div>
                          <GoCalendar className="mr-2" />{" "}
                          <span>
                            {format(
                              new Date(training.startDate),
                              "dd MMM yyyy"
                            )}{" "}
                            -{" "}
                            {format(new Date(training.endDate), "dd MMM yyyy")}
                          </span>
                        </div>
                        <div>
                          <GoClock className="mr-2" />{" "}
                          <span>
                            {" "}
                            {format(
                              new Date(training.startTime),
                              "h:mm aa"
                            )} - {format(new Date(training.endTime), "h:mm aa")}
                          </span>
                        </div>
                        <div>
                          <GoTag className="mr-2" />{" "}
                          <span>{rupiah(training.priceIncludeTax)}</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* </a> */}
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>

        {/* 
      </Container> */}
      </Container>
    </>
  );
};

export default Catalog;
