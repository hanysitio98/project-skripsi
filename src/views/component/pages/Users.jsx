import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Card } from 'react-bootstrap';
import { Header } from '../layout';
import {
  CgMathPlus,
  CgPen,
  CgTrash,
  CgPushDown
} from "react-icons/cg";
import FreelancerService from 'services/FreelancerService.service';
import { Link, useParams } from 'react-router-dom';

const Setting = () => {

  return (
    <Header>
      <h1 className="font-weight-bolder">Users</h1>
      <div className="d-flex justify-content-end">
        <Row >
          <Col className='col-auto'>
            <Link to="/add-freelancer" className="btn btn-outline-primary btn-block">
              <span>
                <CgMathPlus className='mr-1' />
                Add User
              </span>
            </Link>
          </Col>
          <Col className='col-auto'>
            <Link to="/add-trainer" className="btn btn-outline-primary btn-block">
              <span>
                <CgPushDown className='mr-1' />
                Export
              </span>
            </Link>
          </Col>
        </Row>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Users</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" >
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Nama Karyawan</th>
                  <th>Divisi</th>
                  <th>Status</th>
                  <th>CV</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Employee ID</th>
                  <th>Nama Karyawan</th>
                  <th>Divisi</th>
                  <th>Status</th>
                  <th>CV</th>
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

export default Setting;