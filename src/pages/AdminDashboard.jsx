import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "All Users", color: "bg-indigo-600", path: "/admin/users" },
    { title: "All Crops", color: "bg-green-700", path: "/admin/crops" },
    { title: "Market Prices", color: "bg-green-700", path: "/admin/market" },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`${card.color} text-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition`}
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm mt-2 opacity-90">
              Manage {card.title.toLowerCase()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
