import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Wheat,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";

const AdminBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Home",
      icon: <Home size={20} />,
      path: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      label: "Crops",
      icon: <Wheat size={20} />,
      path: "/admin/crops",
    },
    {
      label: "Orders",
      icon: <ShoppingBag size={20} />,
      path: "/admin/orders",
    },
    {
      label: "Refunds",
      icon: <RotateCcw size={20} />,
      path: "/admin/orders?tab=refunds",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow md:hidden">
      <div className="flex justify-around py-2">
        {items.map((item) => {
          const active = location.pathname + location.search === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center text-xs ${
                active
                  ? "text-green-700 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default AdminBottomNav;
