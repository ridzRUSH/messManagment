const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Mess System</h2>

      <div className="menu">
        <p>🏠 Dashboard</p>
        <p>📊 Expenses</p>
      </div>

      {/* FIXED bottom */}
      <div className="bottom">
        <p>❓ Support</p>
        <p>🚪 Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;