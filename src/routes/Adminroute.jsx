import { Navigate, Outlet } from "react-router-dom";
import { getRole } from "../auth/authService";

const AdminRoute = () => {
  return getRole() === "ADMIN" ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;
