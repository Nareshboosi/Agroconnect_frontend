import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../auth/authService";
import "./Navbar.css";

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const user = getUser();
  const finalRole = role || user?.role;

  if (!finalRole) return null;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className={`navbar ${finalRole.toLowerCase()}`}>
      {/* LEFT */}
      <div
        className="nav-left"
        onClick={() =>
          navigate(`/${finalRole.toLowerCase()}/dashboard`)
        }
      >
        AgroConnect
      </div>

      {/* RIGHT */}
      <ul className="nav-right">
        {/* Desktop links */}
        <li className="desktop-only" onClick={() =>
          navigate(`/${finalRole.toLowerCase()}/dashboard`)
        }>
          Dashboard
        </li>

        {finalRole === "FARMER" && (
          <>
            <li className="desktop-only" onClick={() => navigate("/farmer/add-crop")}>Add Crop</li>
            <li className="desktop-only" onClick={() => navigate("/farmer/my-crops")}>My Crops</li>
            <li className="desktop-only" onClick={() => navigate("/farmer/orders")}>Orders</li>
          </>
        )}

        {finalRole === "BUYER" && (
          <>
            <li className="desktop-only" onClick={() => navigate("/buyer/browse")}>Browse</li>
            <li className="desktop-only" onClick={() => navigate("/buyer/cart")}>Cart</li>
            <li className="desktop-only" onClick={() => navigate("/buyer/orders")}>Orders</li>
          </>
        )}

       {finalRole === "ADMIN" && (
  <>
    

    <li
      className="desktop-only"
      onClick={() => navigate("/admin/users")}
    >
      Users
    </li>

    <li
      className="desktop-only"
      onClick={() => navigate("/admin/crops")}
    >
      Crops
    </li>

    <li
      className="desktop-only"
      onClick={() => navigate("/admin/market")}
    >
      Market
    </li>

    <li
      className="desktop-only"
      onClick={() => navigate("/admin/orders")}
    >
      Orders
    </li>

    <li
      className="desktop-only"
      onClick={() => navigate("/admin/orders?tab=refunds")}
    >
      Refunds
    </li>
  </>
)}


        {/* Logout (always visible) */}
        <li className="logout" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
