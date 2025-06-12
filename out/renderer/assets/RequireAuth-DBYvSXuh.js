import { b as useLocation, r as reactExports, j as jsxRuntimeExports, O as Outlet, d as Navigate } from "./index-BwJeGL0w.js";
import { s as session } from "./authApi-C5_1U8LT.js";
import "./axios-DSoLq97m.js";
const RequireAuth = () => {
  const location = useLocation();
  const [isValid, setIsValid] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const checkSession = async () => {
      try {
        await session();
        setIsValid(true);
      } catch (err) {
        localStorage.removeItem("user");
        setIsValid(false);
      }
    };
    checkSession();
  }, []);
  if (isValid === null) return null;
  return isValid ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
};
export {
  RequireAuth as default
};
