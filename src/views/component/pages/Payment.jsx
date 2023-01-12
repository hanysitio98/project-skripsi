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
import { CgChevronLeft } from "react-icons/cg";

export const APP_BASE_URL = "http://localhost:8080";

const Payment = ({ value }) => {
  const [trainings, setTrainings] = useState({});
 
  const [paymentMethod, setPaymentMethod] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [participant, setParticipant] = useState([]);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, setValue, isValid, isDirty }
  } = useForm({
    // resolver: yupResolver(SignupSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const handleClose = () => {
    navigate(`/success`);
  };
  const handleShow = () => setShow(true);

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
      try {
        const data = {
          paymentMethod
        };
        const register = await RegistrationService.createRegister(data);
        console.log(register.data);
        setIsSuccess(true);
      } catch (error) {
        console.log(error);
      }
  }, [paymentMethod]);

  return (
    <>
      <Modal
        show={isSuccess}
        onHide={handleClose}
        centered
        className="text-center text-info"
      >
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
      </Modal>

      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                isDisabled={!isValid}
              >
                BAYAR
              </Button>
            </Col>
          </Row>
        </form>
      </section>
    </>
  );
};

export default Payment;
