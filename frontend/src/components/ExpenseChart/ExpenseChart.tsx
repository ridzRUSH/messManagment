import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", expense: 200 },
  { month: "Feb", expense: 300 },
  { month: "Mar", expense: 250 },
  { month: "Apr", expense: 400 },
  { month: "May", expense: 350 },
  { month: "Jun", expense: 500 },
  { month: "Jul", expense: 450 },
  { month: "Aug", expense: 380 },
  { month: "Sep", expense: 420 },
  { month: "Oct", expense: 480 },
  { month: "Nov", expense: 300 },
  { month: "Dec", expense: 350 },
];

const ExpenseChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}
    >
      {/* 🔥 Title like screenshot */}
      <h3 style={{ marginBottom: "5px" }}>Personal Expense Graph</h3>
      <p style={{ fontSize: "12px", color: "#777", marginBottom: "15px" }}>
        Spending patterns over 12 months
      </p>

      {/* 🔥 Responsive chart (important) */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#f0f0f0" />

          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip />

          {/* 🔥 MAIN BAR STYLE */}
          <Bar
            dataKey="expense"
            fill="#2bb3a3"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ExpenseChart;