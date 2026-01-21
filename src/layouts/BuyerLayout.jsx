import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <>
      <Navbar role="BUYER" />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default BuyerLayout;
