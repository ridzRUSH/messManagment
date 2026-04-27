import { motion } from "framer-motion";
import { Egg, Banana } from "lucide-react";

type Props = {
  studentName: string;
  messData: any;
};

const MessCard = ({ studentName, messData }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      style={styles.card}
    >
      <h2>🍽 Mess Card</h2>

      <p><strong>{studentName}</strong></p>

      {/* 🔥 REAL DATA */}
      <p>
        Days Active: {messData.summary.total_active_days}
      </p>

      <p>
        Intervals: {messData.summary.total_open_intervals}
      </p>

      {/* 🔥 INTERVAL LIST */}
      <div style={styles.sub}>
        <p>Active Periods</p>

        {messData.intervals.map((item: any, index: number) => (
          <div key={index} style={styles.item}>
            📅 {item.open_date} → {item.close_date} ({item.days} days)
          </div>
        ))}
      </div>

      {/* 🔥 KEEP YOUR ICON UI */}
      <div style={styles.sub}>
        <p>Subscriptions</p>

        <div style={styles.item}>
          <Egg size={18} />
          <span>Egg: Active</span>
        </div>

        <div style={styles.item}>
          <Banana size={18} />
          <span>Banana: Inactive</span>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  card: {
    background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
    color: "white",
    padding: "20px",
    borderRadius: "16px",
    marginTop: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },
  sub: {
    marginTop: "15px",
    background: "rgba(255,255,255,0.05)",
    padding: "10px",
    borderRadius: "10px"
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "5px"
  }
};

export default MessCard;