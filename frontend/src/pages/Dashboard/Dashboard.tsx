import Sidebar from "../../components/Sidebar/Sidebar";
import StatsCard from "../../components/StatsCard/StatsCard";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import SpecialMealCard from "../../components/SpecialMealCard/SpecialMealCard";
import FeedbackTable from "../../components/FeedbackTable/FeedbackTable";
import MessCard from "../../components/MessCard/MessCard";

import "./Dashboard.css";

const Dashboard = () => {

  // 🔥 DUMMY DATA
  const messData = {
    month: "01",
    year: "2026",
    intervals: [
      {
        student_id: 4,
        open_date: "2026-01-21",
        close_date: "2026-01-31",
        days: 11
      },
      {
        student_id: 4,
        open_date: "2026-01-01",
        close_date: "2026-01-07",
        days: 7
      }
    ],
    summary: {
      total_active_days: "18",
      total_open_intervals: 2
    }
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="content">

        <h1>Student Dashboard</h1>
        <p style={{ color: "#666" }}>
          Welcome back, Satyabrata. Here's your dining activity.
        </p>

        {/* STATS */}
        <div className="stats-container">
          <StatsCard title="Total Spent This Month" value="$342.50" />
          <StatsCard title="Current Balance" value="$84.20" />
        </div>

        {/* GRAPH */}
        <div className="card">
          <ExpenseChart />
        </div>

        {/* LOWER SECTION */}
        <div className="row">

          <div className="card">
            <div className="card-header">
              <h3>Special Meals</h3>
              <span className="link">View Calendar</span>
            </div>

            <SpecialMealCard
              title="Festive Night Dinner"
              date="Friday, Oct 20 • 7:30 PM"
              status="Limited Slots"
            />
            <SpecialMealCard
              title="Chef's Pasta Special"
              date="Monday, Oct 23 • 12:30 PM"
              status="Open"
            />
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Feedback History</h3>
              <span className="link">Submit New</span>
            </div>

            <FeedbackTable />
          </div>

        </div>

        {/* MESS CARD */}
        <MessCard
          studentName="Satyabrata"
          messData={messData}
        />

      </div>
    </div>
  );
};

export default Dashboard;