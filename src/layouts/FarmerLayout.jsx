import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const FarmerLayout = () => {
  return (
    <>
      <Navbar role="FARMER" />
      <Outlet />
    </>
  );
};

export default FarmerLayout;
