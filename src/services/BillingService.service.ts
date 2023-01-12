import { axiosInstance } from 'setup';


const BillingService = {

  getAllBilling() {
    return axiosInstance.get(`/billing`);
  },

  createBilling(billing: {}) {

    return axiosInstance.post(`/billing`, billing);

  },

  getBillingById(id: string) {
    return axiosInstance.get(`/billing/` + id);

  },

  updateBilling(id: string, billing: {}) {
    return axiosInstance.put(`/billing/` + id, billing);

  },

  deleteBillingById(id: string) {
    return axiosInstance.delete(`/billing/` + id);

  }

}

export default BillingService;