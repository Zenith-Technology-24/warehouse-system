import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { session } from "../api/auth/authApi";

const RequireAuth: React.FC = () => {
  const location = useLocation();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await session()
        setIsValid(true);
      } catch (err) {
        localStorage.removeItem("user");
        setIsValid(false);
      }
    };

    checkSession();
  }, []);

  if (isValid === null) return null; 

  return isValid ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
