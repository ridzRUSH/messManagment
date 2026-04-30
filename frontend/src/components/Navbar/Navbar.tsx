import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextAPI/AuthContext.tsx";
import { useToast } from "../../contextAPI/ToastContext";

import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, role } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    await logout();
    showToast("Logged out successfully.", "info");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => navigate("/")}>MessMaster Pro</h1>

      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/feedback")}>Feedback</li>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/login")}>Login</li>
      </ul>

      <div className="nav-icons">
        <span>🔔</span>
        <span>⚙️</span>
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout {role}
          </button>
        ) : (
          <div className="avatar"></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;