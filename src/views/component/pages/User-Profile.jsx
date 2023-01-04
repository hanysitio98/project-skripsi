import React, { useEffect, useState } from 'react';
import { Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UserService } from 'services';
import { Header } from '../layout';

const UserProfile = () => {

  const [userById, setUserById] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      UserService.getUserById(id).then((response) => {
        setUserById(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id]);

  return (
    <Header>
      <h1 className="font-weight-bolder mb-3 ">Profile</h1>

      <div className="col-12 col-lg-6">
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Username
                </Form.Label>
                <Col sm="10">
                  <div>yoga</div>
                  {/* <div>{userById.id}</div> */}
                </Col>
              </Form.Group>

              <Form.Group controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Fulname
                </Form.Label>
                <Col sm="10">
                  <div>Yoga Prasetya</div>
                  {/* <div>{userById.nama}</div> */}
                </Col>
              </Form.Group>

              <Form.Group controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <div>yogaprasetya@gmail.com</div>
                  {/* <div>{userById.email}</div> */}
                </Col>
              </Form.Group>

              <Link className="btn btn-outline-primary mt-4" to={`/change-password/${userById.id}`}>
                Change Password
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>

    </Header >
  )
}

export default UserProfile;