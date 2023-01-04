import { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from 'services/UserService.service';
import { Header } from '../layout';


const ChangePassword = () => {

  const [userById, setUserById] = useState({});

  const navigate = useNavigate();
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

  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.updateUser(id, userById);
      const _response = response.data;
      // navigate("/signin")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Header>
      <h1 className="font-weight-bolder mb-3">Change Password</h1>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Password Baru
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  value={userById.password}
                  onChange={(e) => {
                    const val = (e.target && e.target.value)
                    const _user = { ...userById };
                    _user.password = val;
                    setUserById(_user);
                  }}>

                </Form.Control>
              </Col>
            </Form.Group>
            <div>
              <button className="btn btn btn-primary" type="submit" onClick={(e) => updatePassword(e)}
              >
                Submit
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Header>
  )
}

export default ChangePassword;