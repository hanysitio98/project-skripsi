import axios from 'axios';
import { axiosInstance } from 'setup';


const ProjectService = {

  getProjects() {
    return axiosInstance.get(`/projects`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: "PR001",
              taskTitle: "Exhibition",
              taskDescription: "DigiersDay dan JobFair alumni peserta Digitalent Scholarship",
              client: "Kominfo",
              assignTo: "Yoga Prasetya",
              priority: "Middle",
              status: "Done"
            },
            {
              id: "PR002",
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

  createProject(project: {}) {

    return axiosInstance.post(`/projects`, project);

  },

  getProjectById(id: string) {
    return axiosInstance.get(`/projects/` + id);

  },

  updateProject(id: string, project: {}) {
    return axiosInstance.put(`/projects/` + id, project);

  },

  deleteProject(id: string) {
    return axiosInstance.delete(`/projects/` + id);

  }

}

export default ProjectService;
