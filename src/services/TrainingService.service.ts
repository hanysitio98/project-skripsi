import { axiosInstance } from 'setup';


const TrainingService = {

  getAllTraining() {
    return axiosInstance.get(`/trainings`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: "TRA001",
              trainingCode: "001",
              trainingName: "Introduction to Internet of Things",
              trainingCategory: "Telecomunication",
              eventDate: "November 18th , 2022",
              status: "Done"
            },
            {
              id: "TRA002",
              trainingCode: "002",
              trainingName: "Software Developer",
              trainingCategory: "ICT",
              eventDate: "November 23rd, 2022",
              status: "Done"
            },
            {
              id: "TRA003",
              trainingCode: "003",
              trainingName: "CMS Website Developer with WordPress CMS",
              trainingCategory: "ICT",
              eventDate: "December 7th, 2022",
              status: "Done"
            },
            {
              id: "TRA004",
              trainingCode: "004",
              trainingName: "Content Manager for Digital Marketing",
              trainingCategory: "Bussiness Development",
              eventDate: "December 18th, 2022",
              status: "Ongoing"
            },
            {
              id: "TRA005",
              trainingCode: "005",
              trainingName: "Front End Developer",
              trainingCategory: "ICT",
              eventDate: "January 8th, 2023",
              status: "Not Yet"
            },
          ]
        })
      })
    })
  },

  createTraining(training: {}) {

    return axiosInstance.post(`/trainings`, training);
  },

  getTrainingById(id: string) {

    return axiosInstance.get(`/trainings/` + id);
  },

  updateTraining(id: string, training: {}) {

    return axiosInstance.put(`/trainings/` + id, training);
  },

  deleteTraining(id: string) {

    return axiosInstance.delete(`/trainings/` + id);
  }

}

export default TrainingService;
