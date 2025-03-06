import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RequireSuperadmin: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || "null");

    useEffect(() => {
        if (user?.user?.roles?.[0]?.name !== 'superadmin') {
            navigate(-1);
        }
    }, [user, navigate]);

    return user?.user?.roles?.[0]?.name === 'superadmin' ? <Outlet /> : null;
}

export default RequireSuperadmin;
