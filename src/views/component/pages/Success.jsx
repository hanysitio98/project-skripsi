import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { logo2x, gopay } from "images";
import { EmailService, RegistrationService } from "services";

const SuccessPage = () => {
  const [registration, setRegistration] = useState({});
  const [recipient, setRecipient] = useState();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      RegistrationService.getRegisterById(id)
        .then((response) => {
          setRegistration(response.data);
          setRecipient(response.data.email);
          console.log(response.data);
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

  const sendToEmail = (e) => {
    e.preventDefault();

    const msgBody = "Hey, ini email pesanan anda";
    const subject = "T4Best - Informasi Pesanan Pelatihan";
    const details = {
      recipient,
      msgBody,
      subject,
    };
    const response = EmailService.sendEmail(details);
    console.log(response.data);
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

      <section className="h-100 p-5">
        <Container className="p-5">
          <Row className="p-5">
            <Col>
              <Card className="rounded-3" border="info">
                <Card.Body>
                  <h5 className="font-weight-bold pb-3">
                    Informasi Pesanan Pelatihan :{" "}
                  </h5>
                  <Form>
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Nama Peserta
                      </Form.Label>

                      <Form.Label column sm={8}>
                        {registration.traineeName}
                      </Form.Label>
                      {/* <Form.Text sm={8}>{registration.traineeName}</Form.Text> */}
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Nama Pelatihan
                      </Form.Label>
                      <Form.Label column sm={8}>
                        {registration.training}
                      </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Metode Pembayaran
                      </Form.Label>
                      <Form.Label column sm={8} className="p">
                        {registration.paymentMethod} -{" "}
                        {rupiah(registration.amount)}
                      </Form.Label>
                    </Form.Group>

                    <Form.Group className="pb-0" as={Row}>
                      <Form.Label column sm={2}>
                        Link Zoom
                      </Form.Label>
                      <Form.Label column sm={8}>
                        <a href="">
                          https://zoom.us/j/93307529932?pwd=L001eFJzOVJLMmlpK0tGTG12R0M5UT09
                        </a>
                      </Form.Label>
                    </Form.Group>

                    <small className="font-italic">
                      * mohon simpan informasi pesanan anda, terima kasih!
                    </small>
                    <small className="font-italic">
                      * mohon simpan informasi pesanan anda, terima kasih!
                    </small>
                  </Form>

                  {/* <Button
                    className="btn btn-outline-info"
                    onClick={sendToEmail}
                  >
                    Kirim ke email
                  </Button> */}
                  {/* <div>Nama Peserta : {registration.traineeName}</div>
                  <div>Nama Pelatihan : {registration.training}</div>
                  <div>
                    {registration.paymentMethod} - {rupiah(registration.amount)}
                  </div>
                  <div className="text-primary">
                    https://zoom.us/j/93307529932?pwd=L001eFJzOVJLMmlpK0tGTG12R0M5UT09
                  </div> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
    // <Row className="p-5">
    //   <Col className="p-5 col-12 text-center mb-4">
    //     <div className="p-5">

    //     </div>
    //   </Col>
    // </Row>
  );
};

export default SuccessPage;
