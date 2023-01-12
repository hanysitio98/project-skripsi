import { axiosInstance } from 'setup';

const EmailService = {

  sendEmail(details: {}) {
    return axiosInstance.post(`/sendMail`, details);
  }
}

export default EmailService;