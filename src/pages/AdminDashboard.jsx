import { useNavigate } from "react-router-dom";
import {
  Users,
  Wheat,
  IndianRupee,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Users",
      desc: "Manage farmers, buyers & admins",
      icon: <Users size={28} />,
      color: "from-indigo-500 to-indigo-700",
      path: "/admin/users",
    },
    {
      title: "Crops",
      desc: "View & control crop listings",
      icon: <Wheat size={28} />,
      color: "from-green-500 to-green-700",
      path: "/admin/crops",
    },
    {
      title: "Market Prices",
      desc: "Set official market prices",
      icon: <IndianRupee size={28} />,
      color: "from-emerald-500 to-emerald-700",
      path: "/admin/market",
    },
    {
  title: "Orders",
  desc: "View orders & payments",
  icon: <ShoppingBag />,
  color: "from-blue-500 to-blue-700",
  path: "/admin/orders",
},
{
  title: "Refunds",
  desc: "Approve refund requests",
  icon: <RotateCcw />,
  color: "from-red-500 to-red-700",
  path: "/admin/orders?tab=refunds",
},
  ];

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h2>
        <p className="text-gray-500 mt-1">
          Manage users, crops, prices, orders & refunds
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`cursor-pointer bg-gradient-to-r ${card.color}
              text-white rounded-xl p-6 shadow-md
              hover:scale-105 transition-transform`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {card.title}
                </h3>
                <p className="text-sm opacity-90">
                  {card.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INFO STRIP */}
      <div className="mt-10 bg-gray-50 border rounded-xl p-5">
        <p className="text-gray-600 text-sm">
          ⚠ Admin actions affect all users. Market prices are visible to
          both farmers & buyers. Refund approvals are final.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
