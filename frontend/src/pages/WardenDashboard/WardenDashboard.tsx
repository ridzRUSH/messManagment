import { useState, useEffect } from "react";
import "./WardenDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import StatsCard from "../../components/StatsCard/StatsCard";
import {
  getMessSummary,
  getAllMessActiveCards,
  getAllStaff,
  removeStaff,
  addStaff
} from "../../api/warden";

const WardenDashboard = () => {
  const [messSummary, setMessSummary] = useState<any>(null);
  const [activeCards, setActiveCards] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [staffFormData, setStaffFormData] = useState({
    name: "",
    email: "",
    role: "",
    hostel_id: 1
  });

  useEffect(() => {
    fetchWardenData();
  }, []);

  console.log(messSummary , activeCards , staff )

  const fetchWardenData = async () => {
    try {
      setLoading(true);
      const [summaryRes, cardsRes, staffRes] = await Promise.all([
        getMessSummary(),
        getAllMessActiveCards(),
        getAllStaff()
      ]);

      setMessSummary(summaryRes.data.summary);
      setActiveCards(cardsRes.data.cards);
      setStaff(staffRes.data.staff);
    } catch (error) {
      console.error("Error fetching warden data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStaff(staffFormData);
      setStaffFormData({ name: "", email: "", role: "", hostel_id: 1 });
      setShowAddStaff(false);
      fetchWardenData();
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  const handleRemoveStaff = async (staffId: number) => {
    try {
      await removeStaff(staffId);
      fetchWardenData();
    } catch (error) {
      console.error("Error removing staff:", error);
    }
  };

  if (loading) {
    return <div className="warden-dashboard">Loading...</div>;
  }

  return (
    <div className="warden-dashboard">
      <Sidebar />

      <div className="content">
        <h1>Warden Dashboard</h1>
        <p style={{ color: "#666" }}>Manage mess operations and staff</p>

        {/* STATS SECTION */}
       {/* STATS SECTION */}
        <div className="stats-container">
            <StatsCard title="Active Mess Cards" value={String(activeCards.length)} />
            <StatsCard title="Total Staff" value={String(staff.length)} />
            <StatsCard title="Mess Active Days" value={messSummary?.active_days || "0"} />
        </div>

        {/* MESS SUMMARY */}
        <div className="card">
          <div className="card-header">
            <h3>Mess Summary</h3>
          </div>
          <div className="mess-summary-content">
            <div className="summary-stat">
              <span>Total Students:</span>
              <strong>{messSummary?.total_students || 0}</strong>
            </div>
            <div className="summary-stat">
              <span>Monthly Revenue:</span>
              <strong>${messSummary?.monthly_revenue || 0}</strong>
            </div>
            <div className="summary-stat">
              <span>Pending Payments:</span>
              <strong>${messSummary?.pending_payments || 0}</strong>
            </div>
          </div>
        </div>

        {/* STAFF MANAGEMENT */}
        <div className="card">
          <div className="card-header">
            <h3>Staff Management</h3>
            <button
              className="btn-primary"
              onClick={() => setShowAddStaff(!showAddStaff)}
            >
              {showAddStaff ? "Cancel" : "+ Add Staff"}
            </button>
          </div>

          {showAddStaff && (
            <form className="add-staff-form" onSubmit={handleAddStaff}>
              <input
                type="text"
                placeholder="Staff Name"
                value={staffFormData.name}
                onChange={(e) =>
                  setStaffFormData({ ...staffFormData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={staffFormData.email}
                onChange={(e) =>
                  setStaffFormData({ ...staffFormData, email: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Role (e.g., COOK, HELPER)"
                value={staffFormData.role}
                onChange={(e) =>
                  setStaffFormData({ ...staffFormData, role: e.target.value })
                }
                required
              />
              <button type="submit" className="btn-primary">
                Add Staff
              </button>
            </form>
          )}

          <div className="staff-list">

           
            { staff.length === 0 ? (
              <p>No staff members added yet.</p>
            ) : (
              staff.map((member: any) => (
                <div key={member.id} className="staff-item">
                  <div>
                    <strong>{member.name}</strong>
                    <p>{member.email}</p>
                    <span className="badge">{member.role}</span>
                  </div>
                  <button
                    className="btn-danger"
                    onClick={() => handleRemoveStaff(member.staff_id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ACTIVE CARDS */}
        <div className="card">
          <div className="card-header">
            <h3>Active Mess Cards</h3>
          </div>
          <div className="active-cards-list">
            {activeCards.length === 0 ? (
              <p>No active mess cards.</p>
            ) : (
              activeCards.map((card: any) => (
                <div key={card.id} className="active-card-item">
                  <div>
                    <strong>Student ID: {card.student_id}</strong>
                    <p>Open Date: {card.open_date}</p>
                    <p>Close Date: {card.close_date || "Active"}</p>
                  </div>
                  <span className="badge badge-success">Active</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
