const SpecialMealCard = ({ title, date, status }: any) => {
  return (
    <div className="meal-card">
      <div>
        <h4>🍲 {title}</h4>
        <p>{date}</p>
      </div>

      <span className="badge">{status}</span>
    </div>
  );
};

export default SpecialMealCard;