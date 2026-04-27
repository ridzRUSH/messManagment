import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ChiefWardenPanel from "./pages/ChiefWardenPanel/ChiefWardenPanel";
//import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
//import SupervisorPanel from "./pages/SupervisorPanel/SupervisorPanel";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Wrapper for layout control
const AppContent = () => {
  const location = useLocation();

  // ✅ Define all dashboard-type routes
  const dashboardRoutes = [
    "/admin",
    "/chief-warden",
    "/student",
    "/supervisor"
  ];

  // Check if current route is a dashboard page
  const isDashboardPage = dashboardRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {/* Hide Navbar on dashboard pages */}
      {!isDashboardPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/chief-warden" element={<ChiefWardenPanel />} />
        {/* <Route path="/student" element={<StudentDashboard />} />
        <Route path="/supervisor" element={<SupervisorPanel />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Hide Footer on dashboard pages */}
      {!isDashboardPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
