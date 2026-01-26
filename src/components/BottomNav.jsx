import { useNavigate } from "react-router-dom";
import { getUser } from "../auth/authService";
import "./BottomNav.css";

const BottomNav = () => {
  const navigate = useNavigate();
  const user = getUser();

  if (!user) return null;

  const role = user.role;

  // ❌ Admin does NOT get bottom nav
  if (role === "ADMIN") return null;

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate(`/${role.toLowerCase()}/dashboard`)}>
        🏠
        <span>Home</span>
      </button>

      {role === "FARMER" && (
        <>
          <button onClick={() => navigate("/farmer/add-crop")}>
            🌱
            <span>Add</span>
          </button>

          <button onClick={() => navigate("/farmer/my-crops")}>
            🌾
            <span>Crops</span>
          </button>

          <button onClick={() => navigate("/farmer/orders")}>
            📦
            <span>Orders</span>
          </button>
        </>
      )}

      {role === "BUYER" && (
        <>
          <button onClick={() => navigate("/buyer/browse")}>
            🔍
            <span>Browse</span>
          </button>

          <button onClick={() => navigate("/buyer/cart")}>
            🛒
            <span>Cart</span>
          </button>

          <button onClick={() => navigate("/buyer/orders")}>
            📦
            <span>Orders</span>
          </button>
        </>
      )}
    </nav>
  );
};

export default BottomNav;
