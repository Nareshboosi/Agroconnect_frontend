import "./dashboard.css";

const Dashboard= ({ title, desc, color }) => {
  return (
    <div className="dash-card" style={{ background: color }}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default Dashboard;
