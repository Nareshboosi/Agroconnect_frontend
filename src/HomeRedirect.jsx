import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  return <Navigate to="/redirect" />;
};

export default HomeRedirect;
