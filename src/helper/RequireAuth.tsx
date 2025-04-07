import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RequireAuth: React.FC = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isTokenValid = (): boolean => {
    try {
      if (!user?.token) return false;

      const decoded: { exp: number } = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("user");
        return false;
      }

      return true;
    } catch (err) {
      console.error("Token decode error:", err);
      localStorage.removeItem("user");
      return false;
    }
  };

  return isTokenValid() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
