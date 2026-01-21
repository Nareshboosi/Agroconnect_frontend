import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../auth/authService";
import "./Navbar.css";

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  // 🔒 fallback safety
  const user = getUser();
  const finalRole = role || user?.role;

  if (!finalRole) return null; // ⛔ do not render navbar without role

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className={`navbar ${finalRole.toLowerCase()}`}>
      <div className="nav-left">
        <h2>AgroConnect</h2>
      </div>

      <ul className="nav-right">
        <li onClick={() => navigate(`/${finalRole.toLowerCase()}/dashboard`)}>
          Dashboard
        </li>

        {finalRole === "FARMER" && (
          <>
            <li onClick={() => navigate("/farmer/add-crop")}>Add Crop</li>
            <li onClick={() => navigate("/farmer/my-crops")}>My Crops</li>
            <li onClick={() => navigate("/farmer/orders")}>Orders</li>
          </>
        )}

        {finalRole === "BUYER" && (
          <>
            <li onClick={() => navigate("/buyer/browse")}>Browse</li>
            <li onClick={() => navigate("/buyer/orders")}>Orders</li>
            <li onClick={() => navigate("/buyer/cart")}>Cart</li>
          </>
        )}

        {finalRole === "ADMIN" && (
          <>
            <li onClick={() => navigate("/admin/market")}>
              Market Prices
            </li>
            <li onClick={() => navigate("/admin/crops")}>Crops</li>
            <li onClick={() => navigate("/admin/users")}>Users</li>
          </>
        )}

        <li className="logout" onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;


// const Navbar = ({ role }) => {
//   const navigate = useNavigate();

//   // 🔒 fallback safety
//   const user = getUser();
//   const finalRole = role || user?.role;

//   if (!finalRole) return null; // ⛔ do not render navbar without role

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo" onClick={() => navigate(`${basePath}/dashboard`)}>
//         AgroConnect
//       </h2>

//       <ul className="nav-links">
//         <li onClick={() => navigate(`${basePath}/dashboard`)}>Dashboard</li>

//         {role === "ADMIN" && (
//           <>
//             <li onClick={() => navigate("/admin/users")}>Users</li>
//             <li onClick={() => navigate("/admin/crops")}>Crops</li>
//             <li onClick={() => navigate("/admin/market")}>Market Prices</li>
//           </>
//         )}

//         {role === "BUYER" && (
//           <>
//             <li onClick={() => navigate("/buyer/market")}>Market</li>
//             <li onClick={() => navigate("/buyer/orders")}>Orders</li>
//           </>
//         )}

//         {role === "FARMER" && (
//           <>
//             <li onClick={() => navigate("/farmer/add-crop")}>Add Crop</li>
//             <li onClick={() => navigate("/farmer/my-crops")}>My Crops</li>
//             <li onClick={() => navigate("/farmer/orders")}>Orders</li>
//           </>
//         )}
//       </ul>

//       <button onClick={handleLogout}>Logout</button>
//     </nav>
//   );
// };

// export default Navbar;
