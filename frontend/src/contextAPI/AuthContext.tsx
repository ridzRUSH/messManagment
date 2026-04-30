import { createContext, useContext } from "react";
import { ROLES } from "../api/types";
export type UserRole = typeof ROLES[keyof typeof ROLES] | null;


export interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  token: string;
  setToken: (token: string) => void;
  user: Record<string, unknown> | null;
  setUser: (user: Record<string, unknown> | null) => void;
  isAuthenticated: boolean;
  login: (authData: { token: string; role: UserRole; user: Record<string, unknown> | null }) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};