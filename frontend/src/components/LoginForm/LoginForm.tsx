import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { sendOtp } from "../../api/auth";
import { verifyOtp } from "../../api/auth";
import { useToast } from "../../contextAPI/ToastContext";
import   { useAuth } from "../../contextAPI/AuthContext.tsx";
import { ROLES } from "../../api/types";
import axios, { AxiosError } from "axios";

type Role = "STUDENT" | "WARDEN" | "MESS_SECRETARY" | "MESS_SUPERVISOR" | "CARE_TAKER" ;

const API = "http://localhost:5000/api";

const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof AxiosError) {
    return err.response?.data?.message || fallback;
  }
  return fallback;
};

const roles = [
  { label: "Student", value: "STUDENT" },
  { label: "Mess Secretary", value: "MESS_SECRETARY" },
  { label: "Care Taker", value: "CARE_TAKER" },
  { label: "Mess Supervisor", value: "MESS_SUPERVISOR" },
  { label: "Warden", value: "WARDEN" }
] as const;

const LoginForm = () => {
  const { email, setEmail, otp, setOtp, role, setRole, login } = useAuth();
  const [tempToken, setTempToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSendOtp = async () => {
    if (!email) {
      showToast("Please enter a valid email.", "error");
      return;
    }

    try {
      const response = await sendOtp(email, role ?? ROLES.STUDENT);
      setTempToken(response.data.token);
      showToast("OTP sent successfully. Check your email.", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to send OTP. Make sure role and email are correct.", "error");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !tempToken) {
      showToast("Request OTP first and enter the code.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyOtp(otp, tempToken, role ?? ROLES.STUDENT);
      const { token, role: verifiedRole, user } = response.data;

      console.log(user);

      await login({ token, role: verifiedRole, user });
      showToast("Login successful.", "success");

      if (verifiedRole === ROLES.WARDEN) {
        navigate("/warden");
      } else if (verifiedRole === ROLES.MESS_SECRETARY) {
        navigate("/mess-secretary");
      } else if (verifiedRole === ROLES.CARE_TAKER ) {
        navigate("/care-taker");
      } else if (verifiedRole === ROLES.MESS_SUPERVISOR ) {
        navigate("/mess-supervisor");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      showToast("OTP verification failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }

    try {
      const res = await axios.post(`${API}/users/verify-otp`, { email, otp });
      console.log("Verified:", res.data);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Login successful");
    } catch (err: unknown) {
      console.error(err);
      alert(getErrorMessage(err, "Invalid OTP"));
    }
  };

  // 👉 Resend OTP
  const handleResendOtp = () => {
    handleSendOtp();
  };

  return (
    <div className="login-card">
      <h2>Sign In</h2>
      <p>Access your dining dashboard and meal plans</p>

      <label htmlFor="email">College Email</label>
      <input
        id="email"
        type="email"
        placeholder="user@uohyd.ac.in"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Role</label>
      <select value={role ?? "STUDENT"} onChange={(e) => setRole(e.target.value as "STUDENT" | "MESS_SECRETARY" | "CARE_TAKER" | "MESS_SUPERVISOR" | "WARDEN") }>
        {roles.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <button className="primary-btn" onClick={handleSendOtp}>
        Send OTP →
      </button>

      <div className="divider">VERIFICATION</div>

      <label htmlFor="otp">Enter 6-digit Code</label>
      <input
        id="otp"
        type="text"
        maxLength={6}
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="primary-btn" onClick={handleVerifyOtp} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify & Continue"}
      </button>

      <p className="resend" onClick={handleResendOtp} style={{ cursor: "pointer" }}>
        ⟳ Resend OTP
      </p>
    </div>
  );
};

export default LoginForm;