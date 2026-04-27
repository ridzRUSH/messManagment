
import axios from "axios";

const API = "http://backend:5000/api";

export const sendOtp = (email : string, role : string) => {
  return axios.post(`${API}/users/send-otp`, { email, role });
};

export const verifyOtp = (email: string , otp: string) => {
  return axios.post(`${API}/users/verify-otp`, { email, otp });
};