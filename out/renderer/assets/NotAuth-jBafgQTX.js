import { j as jsxRuntimeExports, d as Navigate, O as Outlet } from "./index-BwJeGL0w.js";
const NotAuth = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.token ? /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
};
export {
  NotAuth as default
};
