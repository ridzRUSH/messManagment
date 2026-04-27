const data = [
  { date: "Oct 14", meal: "Lunch", rating: "⭐⭐⭐⭐⭐", status: "Done" },
  { date: "Oct 12", meal: "Dinner", rating: "⭐⭐⭐⭐", status: "Reviewed" },
];

const FeedbackTable = () => {
  return (
    <div style={{ padding: "10px" }}>
      
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        
        {/* HEADER */}
        <thead>
          <tr style={{ textAlign: "left", color: "#666" }}>
            <th style={{ padding: "8px" }}>Date</th>
            <th style={{ padding: "8px" }}>Meal</th>
            <th style={{ padding: "8px" }}>Rating</th>
            <th style={{ padding: "8px" }}>Status</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              style={{
                borderTop: "1px solid #eee",
                transition: "0.2s"
              }}
            >
              <td style={{ padding: "10px" }}>{item.date}</td>
              <td style={{ padding: "10px" }}>{item.meal}</td>
              <td style={{ padding: "10px" }}>{item.rating}</td>

              {/* 🔥 Styled status badge */}
              <td style={{ padding: "10px" }}>
                <span
                  style={{
                    background:
                      item.status === "Done" ? "#2bb3a3" : "#888",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default FeedbackTable;