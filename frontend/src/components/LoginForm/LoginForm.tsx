import React, { useContext } from "react";
import "./LoginForm.css";
import { AuthContext } from "../../contextAPI/AuthContext";
import { sendOtp, verifyOtp } from "../../api/auth";

const LoginForm = () => {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { email, setEmail, otp, setOtp } = auth;

  // 👉 Send OTP
  const handleSendOtp = async () => {
    try {
      const res = await sendOtp(email, "user");
      console.log("OTP sent:", res.data);
      alert("OTP sent successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to send OTP");
    }
  };

  // 👉 Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);
      console.log("Verified:", res.data);
      alert("Login successful");
    } catch (err) {
      console.log(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-card">
      <h2>Sign In</h2>
      <p>Access your dining dashboard and meal plans</p>

      <label>College Email</label>
      <input
        type="email"
        placeholder="user@uohyd.ac.in"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ✅ SEND OTP BUTTON CONNECTED */}
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

      {/* ✅ VERIFY OTP BUTTON CONNECTED */}
      <button className="primary-btn" onClick={handleVerifyOtp}>
        Verify & Continue
      </button>

      <p className="resend">⟳ Resend OTP</p>
    </div>
  );
};

export default LoginForm;