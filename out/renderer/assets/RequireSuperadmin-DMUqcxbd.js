import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, O as Outlet } from "./index-BwJeGL0w.js";
const RequireSuperadmin = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  reactExports.useEffect(() => {
    if (user?.user?.roles?.[0]?.name !== "superadmin") {
      navigate(-1);
    }
  }, [user, navigate]);
  return user?.user?.roles?.[0]?.name === "superadmin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : null;
};
export {
  RequireSuperadmin as default
};
