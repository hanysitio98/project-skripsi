import axios from 'axios';
import { axiosInstance } from 'setup';


const FreelancerService = {

  getAllFreelancer() {
    return axiosInstance.get(`/freelancers`);

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       response_code: "TR-00-00",
    //       output_schema:
    //       {
    //         message: "success",
    //         data:
    //           [
    //             {
    //               freelancer_id: "FR101",
    //               freelancer_number: "122322",
    //               freelancer_name: "Hany",
    //               id_card: "512417264141241",
    //               freelancer_image: "",
    //               cv: ""
    //             },
    //             {
    //               freelancer_id: "FR102",
    //               freelancer_number: "122322",
    //               freelancer_name: "Fira",
    //               id_card: "512417264141241",
    //               freelancer_image: "",
    //               cv: ""
    //             },
    //             {
    //               freelancer_id: "FR103",
    //               freelancer_number: "122322",
    //               freelancer_name: "Desi",
    //               id_card: "512417264141241",
    //               freelancer_image: "",
    //               cv: ""
    //             },
    //           ]
    //       }
    //     }
    //     )
    //   })
    // })
  },

  createFreelancer(freelancer: {}) {

    return axiosInstance.post(`/freelancers`, freelancer);

  },

  getFreelancerById(id: string) {
    return axiosInstance.get(`/freelancers/` + id);

  },

  updateFreelancer(id: string, freelancer: {}) {
    return axiosInstance.put(`/freelancers/` + id, freelancer);

  },

  deleteFreelancer(id: string) {
    return axiosInstance.delete(`/freelancers/` + id);

  }

}

export default FreelancerService;
