import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { Outlet } from "react-router-dom";

const FarmerLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 pb-16">
      <Navbar role="FARMER" />

      <main className="w-full px-3 sm:px-6 py-6">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default FarmerLayout;
