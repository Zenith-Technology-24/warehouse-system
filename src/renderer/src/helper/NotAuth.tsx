import { Navigate, Outlet } from "react-router-dom";

const NotAuth: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') || "null");
    return (
        user?.token ? <Navigate to={'/'} replace /> : <Outlet />
    );
}

export default NotAuth;