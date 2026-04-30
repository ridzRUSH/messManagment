import { createContext } from "react";

export const AuthContext = createContext<{
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  role: string;
  setRole: (role: "STUDENT" | "WARDEN" | "MESS_SECRATERY" | "SUPERVISOR" ) => void;
} | null>(null);