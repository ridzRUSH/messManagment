import axiosInstance from "./axiosInstance";
import type { UserRole } from "./types";

<<<<<<< Updated upstream
export const sendOtp = (email: string, role: UserRole) => {
  return axiosInstance.post("/users/send-otp", { email, role });
=======
import axios from "axios";

const API = "http://localhost:5000/api";

export const sendOtp = (email : string, role : "STUDENT" | "WARDEN" | "MESS_SECRATERY" | "SUPERVISOR") => {
  console.log(email , role)
  return axios.post(`${API}/users/send-otp`, { email, role });
>>>>>>> Stashed changes
};

export const verifyOtp = (otp: string, token: string, role: UserRole) => {
  return axiosInstance.post("/users/verify-otp", { otp, token, role });
};

export const logout = () => {
  return axiosInstance.post("/users/logout");
};