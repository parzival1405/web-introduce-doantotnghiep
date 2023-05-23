import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_URL_SERVER });
const APISendEmail = axios.create({ baseURL: process.env.REACT_APP_URL_SERVER_SOCKET });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }
  return req;
});
// 
export const saveMedicalLetters = (formData) =>
  API.post(`api/medical_letters`, formData);
// service
export const getAllService = () => API.get("api/services");

export const getAllStaffByRole = (role) =>
  API.get(`api/users/roles?role=${role}`);

export const sendEmail = (formData) => APISendEmail.post("api/sendEmail/send",formData);
// doctor
// export const getDoctorByService = () => API.get("api/doctor");

