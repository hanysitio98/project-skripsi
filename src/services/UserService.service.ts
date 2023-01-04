import axios from 'axios';
import { axiosInstance } from 'setup';


const UserService = {

  getUser() {
    return axiosInstance.get(`/penggunas`);
  },

  createUser(user: {}) {

    return axiosInstance.post(`/penggunas`, user);

  },

  getUserById(id: string) {
    return axiosInstance.get(`/penggunas/` + id);

  },

  updateUser(id: string, user: {}) {
    return axiosInstance.put(`/penggunas/` + id, user);

  },

  deleteUser(id: string) {
    return axiosInstance.delete(`/penggunas/` + id);

  }

}

export default UserService;
