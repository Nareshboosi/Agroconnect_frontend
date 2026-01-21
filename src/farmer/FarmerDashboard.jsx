import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
  const navigate = useNavigate();

  const cards = [
  { title: "Add Crop", color: "bg-green-500", path: "/farmer/add-crop" },
  { title: "My Crops", color: "bg-blue-500", path: "/farmer/my-crops" },
  { title: "Orders", color: "bg-purple-500", path: "/farmer/orders" },
];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Farmer Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`${card.color} text-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition`}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-sm opacity-90 mt-2">
              Manage {card.title.toLowerCase()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FarmerDashboard;
