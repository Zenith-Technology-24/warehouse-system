import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const NotAuth: React.FC = () => {
    const user = JSON.parse(Cookies.get('user') || null);
    return (
        user?.token ? <Navigate to={'/'} replace /> : <Outlet />
    );
}

export default NotAuth;