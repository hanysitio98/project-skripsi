import { axiosInstance } from 'setup';


const TrainerService = {

  getAllTrainer() {
    return axiosInstance.get(`/trainers`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: "TR001",

            },
            {
              id: "TR002",
              taskTitle: "Training",
              taskDescription: "5G Network Engineer Offline Training di Jakarta",
              client: "Politeknik Elektronika Negeri Surabaya (PENS)",
              assignTo: "Yoga Prasetya",
              priority: "Middle",
              status: "Done"
            },
            {
              id: "PR003",
              taskTitle: "Training",
              taskDescription: "Junior Network Administrator Offline Training",
              client: "SMK Telkom Purwokerto",
              assignTo: "Yoga Prasetya",
              priority: "Middle",
              status: "Done"
            },
            {
              id: "PR004",
              taskTitle: "Training",
              taskDescription: "Internet of Things (IoT) Introduction dan Perkembangan Teknologi 4.0",
              client: "PT. KDDI",
              assignTo: "Yoga Prasetya",
              priority: "Middle",
              status: "Ongoing"
            },
            {
              id: "PR005",
              taskTitle: "Training",
              taskDescription: "Design dan Perancangan Jaringan FTTx",
              client: "PT. Tower Bersama Group (TBG)",
              assignTo: "Yoga Prasetya",
              priority: "Middle",
              status: "Ongoing"
            }
          ]
        })
      })
    })
  },

  createTrainer(trainer: {}) {

    return axiosInstance.post(`/trainers`, trainer);
  },

  getTrainerById(id: string) {

    return axiosInstance.get(`/trainers/` + id);
  },

  updateTrainer(id: string, trainer: {}) {

    return axiosInstance.put(`/trainers/` + id, trainer);
  },

  deleteTrainer(id: string) {

    return axiosInstance.delete(`/trainers/` + id);
  }

}

export default TrainerService;
