import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { RegistrationService } from "services";
import { Header } from "../layout";
import { Link } from "react-router-dom";
import { CgPen, CgTrash } from "react-icons/cg";
import { format } from "date-fns";

const Participant = () => {
  const [participant, setParticipant] = useState([]);

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

  const deleteParticipant = (id) => {
    RegistrationService.deleteRegister(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Header>
      <Row className="g-3 align-items-center justify-content-between">
        <Col className="col-8">
          <h1 className="font-weight-bolder">Participant</h1>
        </Col>
      </Row>

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
                  {/* <th>No Order</th> */}
                  <th>Nama Pelanggan</th>
                  <th>Email</th>
                  <th>No HP / WA</th>
                  <th>Institusi</th>
                  <th>Mode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Actions</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tfoot>
                <tr>
                  {/* <th>No Order</th> */}
                  <th>Nama Pelanggan</th>
                  <th>Email</th>
                  <th>No HP / WA</th>
                  <th>Institusi</th>
                  <th>Mode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Actions</th>
                  {/* <th>Status</th> */}
                </tr>
              </tfoot>
              <tbody>
                {participant.map((peserta) => (
                  <tr key={peserta.id}>
                    <td>{peserta.traineeName}</td>
                    <td>{peserta.email}</td>
                    <td>{peserta.phoneNumber}</td>
                    <td>{peserta.company}</td>
                    <td>{peserta.trainingMethod}</td>
                    <td>{peserta.training}</td>
                    <td>
                      <div className="d-inline-flex">
                        {/* <Link
                          className="btn btn-outline-info"
                          to={`/edit-training/${peserta.id}`}
                        >
                          <CgPen />
                        </Link> */}
                        {/* <button className='btn btn-outline-info' onClick={() => editFreelancer(freelancer.id)}>
                          <CgPen />
                        </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteParticipant(peserta.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          <CgTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Participant;
