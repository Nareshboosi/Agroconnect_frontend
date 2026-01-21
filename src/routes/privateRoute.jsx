import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getRole } from "../auth/authService";

const PrivateRoute = ({ allowedRoles }) => {
  

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(getRole())) {
    logoutIfExpired();
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
