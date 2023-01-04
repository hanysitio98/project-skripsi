import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { TrainingService } from 'services';
import { Header } from '../layout';

const PriceList = () => {

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
    }

    getAllTraining();

  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <Header>
      <Row className="g-3 align-items-center justify-content-between">
        <Col className="col-8">
          <h1 className="font-weight-bolder">Price List</h1>
        </Col>
      </Row>

      <div className="card shadow mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" >
              <thead>
                <tr>
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Metode Pelatihan</th>
                  <th>Harga/pax (Excl. Tax)</th>
                  <th>Tax 11%</th>
                  <th>PP 2%</th>
                  <th>Harga/pax (Incl. Tax)</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Metode Pelatihan</th>
                  <th>Harga/pax (Excl. Tax)</th>
                  <th>Tax 11%</th>
                  <th>PP 2%</th>
                  <th>Harga/pax (Incl. Tax)</th>
                </tr>
              </tfoot>
              <tbody>
                {trainings.map(training =>
                  <tr key={training.id}>
                    <td>{training.trainingCode}</td>
                    <td>{training.trainingName}</td>
                    <td>{training.trainingMethod}</td>
                    <td>{rupiah(training.priceExcludeTax)}</td>
                    <td>{rupiah(training.incomeTax)}</td>
                    <td>{rupiah(training.vatTax)}</td>
                    <td>{rupiah(training.priceIncludeTax)}</td>
                  </tr>

                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Header >
  )
}

export default PriceList;