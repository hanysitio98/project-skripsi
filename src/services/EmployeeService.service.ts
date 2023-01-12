import { axiosInstance } from 'setup';


const EmployeeService = {

  getAllEmployee() {
    return axiosInstance.get(`/employee`);
  },

  createEmployee(employee: {}) {

    return axiosInstance.post(`/employee`, employee);

  },

  getEmployeeById(id: string) {
    return axiosInstance.get(`/employee/` + id);

  },

  updateEmployee(id: string, employee: {}) {
    return axiosInstance.put(`/employee/` + id, employee);

  },

  deleteEmployeeById(id: string) {
    return axiosInstance.delete(`/employee/` + id);

  }

}

export default EmployeeService;
