import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Navbar";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <AdminNavbar onLogout={logout} />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
