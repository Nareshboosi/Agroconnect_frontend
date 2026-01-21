import { Navigate } from "react-router-dom";
import { getToken, getRole } from "./auth/authService";

const RoleDirect = () => {
  const token = getToken();
  const role = getRole();

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role === "ADMIN") return <Navigate to="/admin" replace />;
  if (role === "FARMER") return <Navigate to="/farmer" replace />;
  if (role === "BUYER") return <Navigate to="/buyer" replace />;

  return <Navigate to="/login" replace />;
};

export default RoleDirect;
