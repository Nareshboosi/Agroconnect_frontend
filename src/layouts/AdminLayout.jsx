import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminBottomNav from "../components/AdminBottomNav";

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full pb-16">
      {/* TOP NAV */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="w-full px-3 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* MOBILE BOTTOM NAV */}
      <AdminBottomNav />
    </div>
  );
};

export default AdminLayout;
