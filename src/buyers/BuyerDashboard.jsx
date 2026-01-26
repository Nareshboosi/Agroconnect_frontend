


import { useNavigate } from "react-router-dom";
import MarketPricesTable from "../shared/MarketPricesTable";

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Browse Crops", color: "bg-green-600", path: "/buyer/browse" },
    { title: "My Orders", color: "bg-blue-600", path: "/buyer/orders" },
    { title: "Cart", color: "bg-purple-600", path: "/buyer/cart" },
  ];

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-gray-800">
        Buyer Dashboard
      </h2>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(card => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`${card.color} text-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition`}
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm mt-2 opacity-90">
              Go to {card.title.toLowerCase()}
            </p>
          </div>
        ))}
      </div>

      {/* MARKET PRICES */}
      <MarketPricesTable />
    </div>
  );
};

export default BuyerDashboard;

