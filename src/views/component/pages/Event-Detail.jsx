import { useEffect, useState } from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { GoCalendar, GoClock, GoTag } from "react-icons/go";

import { logo2x } from "images";
import { TiLocation } from "react-icons/ti";
import { TrainingService } from "services";

export const APP_BASE_URL = "http://localhost:8080";

const EventDetail = () => {
  const [trainings, setTrainings] = useState({});

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

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

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
      <Container fluid className="p-6">
        <Container>
          <Card border="info">
            <Card.Header className="font-weight-bold">
              {(trainings.trainingName)}
            </Card.Header>
            <Card.Body>
                <Card.Img
                        variant="top"
                        src={`${APP_BASE_URL}/api/images/${trainings.catalogImage}`}
                        height="400px"
                      />
              <Row>
                <Col sm={4}>
                  <div>
                    <GoCalendar className="mr-2" />{" "}
                    <span className="font-weight-bold text-info">
                      {new Date(trainings.startDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}{" "}
                      -{" "}
                      {new Date(trainings.endDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </Col>

                <Col sm={3}>
                  <div>
                    <GoClock className="mr-2" />{" "}
                    <span className="font-weight-bold text-info">
                      {new Date(trainings.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(trainings.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {/* {Date(trainings.startTime)} */}
                    </span>
                  </div>
                </Col>

                <Col sm={3}>
                  <div className="ml-5">
                    <GoTag className="mr-2" />{" "}
                    <span className="font-weight-bold text-info">
                      {rupiah(trainings.priceIncludeTax)}
                    </span>
                  </div>
                </Col>

                <Col sm={2}>
                  <div>
                    <TiLocation className="mr-2" />{" "}
                    <span className="font-weight-bold text-info">
                      {trainings.trainingMethod}
                    </span>
                  </div>
                </Col>
              </Row>

              <hr></hr>

              <div className="font-weight-bold mb-3">DESCRIPTION</div>

              <div className="pb-3">{trainings.syllabus}</div>

              <div className="py-5 d-flex justify-content-center">
                <a className="btn btn-info" href={`/registration/${trainings.id}`}>
                  Daftar Pelatihan
                </a>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default EventDetail;
