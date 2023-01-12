import React, { useState, useEffect } from "react";
import { Header } from "../layout";

import { TrainingService } from "services";
import { format } from "date-fns";

const TrainingNext = () => {
  const [trainings, setTrainings] = useState([]);

  const currentDate = new Date().toISOString();

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
      <h1 className="font-weight-bolder">Training Next Schedule</h1>

      <div className="card shadow mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="example"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Metode Pelatihan</th>
                  <th>Tanggal Pelatihan</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Kode Pelatihan</th>
                  <th>Nama Pelatihan</th>
                  <th>Metode Pelatihan</th>
                  <th>Tanggal Pelatihan</th>
                </tr>
              </tfoot>
              {trainings.map((training) => (
                <tbody>
                  {training.endDate > currentDate && (
                    <tr key={training.id}>
                      <td>{training.trainingCode}</td>
                      <td>{training.trainingName}</td>
                      <td>{training.trainingMethod}</td>
                      <td>
                        {format(new Date(training.endDate), "dd MMM yyyy")}
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default TrainingNext;
