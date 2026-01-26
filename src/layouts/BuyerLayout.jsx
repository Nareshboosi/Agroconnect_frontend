import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <div className="min-h-screen w-full pb-16">
      <Navbar role="BUYER" />

      <main className="w-full px-3 sm:px-6 py-6">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default BuyerLayout;
