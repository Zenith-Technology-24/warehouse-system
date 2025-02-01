import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth: React.FC = () => {
    const location = useLocation();
    const user = JSON.parse(Cookies.get('user') || null);
    return (
        user?.token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;