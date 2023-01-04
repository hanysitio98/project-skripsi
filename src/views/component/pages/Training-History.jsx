import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Tab,
  Tabs,
  Card,
  Nav,
} from "react-bootstrap";
import { TrainingService } from "services";
import { Header } from "../layout";

const TrainingHistory = () => {
  const [trainings, setTrainings] = useState([]);

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

  return (
    <Header>
      <h1 className="font-weight-bolder">Training History</h1>

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
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Pelanggan</th>
                  <th>Jumlah Peserta</th>
                  <th>Report</th>
                  <th>Link Dokumentasi</th>
                  <th>Link Recording</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Pelanggan</th>
                  <th>Jumlah Peserta</th>
                  <th>Report</th>
                  <th>Link Dokumentasi</th>
                  <th>Link Recording</th>
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
  );
};

export default TrainingHistory;
