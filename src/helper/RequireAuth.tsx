import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth: React.FC = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || "null");

  return user?.token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;