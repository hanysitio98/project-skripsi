import { axiosInstance } from 'setup';


const RegistrationService = {

  getRegister() {
    return axiosInstance.get(`/registrations`);
  },

  createRegister(registration: {}) {

    return axiosInstance.post(`/registrations`, registration);

  },

  getRegisterById(id: string) {
    return axiosInstance.get(`/registrations/` + id);

  },

  updateRegister(id: string, registration: {}) {
    return axiosInstance.put(`/registrations/` + id, registration);

  },

  deleteRegister(id: string) {
    return axiosInstance.delete(`/registrations/` + id);

  }

}

export default RegistrationService;
