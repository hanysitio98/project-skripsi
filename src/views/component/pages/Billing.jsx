import { Button, Col, Form, Row } from 'react-bootstrap';
import { FiDownload } from "react-icons/fi";
import { Header } from '../layout';

const Billing = () => {

  return (
    <Header>
        <Row className="g-3 align-items-center justify-content-between">
          <Col className="col-8">
            <h1 className="font-weight-bolder">Billing</h1>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="col-3">
            {/* <Button>
              <span>
                <CgMathPlus />
                Add Event
              </span>
            </Button> */}
            <Form.Control aria-label="Default select example"
              as="select">
              <option>No. Invoice</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Control>
          </Col>
          <Col className="col-3">
            <Form.Control aria-label="Default select example"
              as="select">
              <option>Invoice Date</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Control>
          </Col>

          <Col className="col-6">
            <Button>
              <span>
                <FiDownload />
                Excel
              </span>
            </Button>
          </Col>
        </Row>

        <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Billing</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" >
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Pelanggan</th>
                  <th>Status</th>
                  <th>Institusi</th>
                  <th>Mode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Pelanggan</th>
                  <th>Status</th>
                  <th>Institusi</th>
                  <th>Mode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                </tr>
              </tfoot>
              <tbody>
                {/* {freelancers.map(freelancer =>
                  <tr key={freelancer.freelancerId}>
                    <td>{freelancer.freelancerId}</td>
                    <td>{freelancer.freelancerNumber}</td>
                    <td>{freelancer.freelancerName}</td>
                    <td>{freelancer.idCard}</td>
                    <td>
                      <div className='d-inline-flex'>
                        <CgPushDown />
                        {freelancer.freelancerImage}
                      </div>
                    </td>
                    <td>
                      <div className='d-inline-flex'>
                        <CgPushDown />
                        {freelancer.cv}
                      </div>
                    </td>
                    <td>
                      <div className='d-inline-flex'>
                        <Link className='btn btn-outline-info' to={`/edit-freelancer/${freelancer.freelancerId}`}>
                          <CgPen />
                        </Link>
                        <button className='btn btn-outline-danger' onClick={() => deleteFreelancer(freelancer.freelancerId)}
                          style={{ marginLeft: "10px" }}>
                          <CgTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                )} */}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Header>
  )

}

export default Billing;