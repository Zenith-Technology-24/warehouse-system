import { j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
const getStyle = (type) => {
  switch (type) {
    case "primary":
      return "bg-[#575B421A]";
    case "inventory":
      return "bg-[#575B421A]";
    case "issued":
      return "bg-[#FFC1071A]";
    case "success":
      return "bg-[#4CAF501A]";
    case "in stock":
      return "bg-[#4CAF501A]";
    case "returned":
      return "bg-[#F443361A]";
    case "error":
      return "bg-[#F443361A]";
    case "total amount":
      return "bg-[#9A59EE1A]";
    case "pending":
      return "bg-[#FFC1071A]";
    case "received":
      return "bg-[#2196F31A]";
    case "available":
      return "bg-[#4CAF501A]";
    case "gross":
      return "bg-[#2196F31A]";
  }
};
const isActive = (active, type) => {
  if (!active) return;
  switch (type) {
    case "inventory":
      return "border border-aaa";
    case "pending":
      return "border border-[#FFC107]";
    case "available":
      return "border border-[#4CAF50]";
    case "gross":
      return "border border-[#2196F3]";
  }
};
const DashboardCard = ({ active = null, icon, title, value, type, handleClick }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: handleClick, className: `shadow-md hover:shadow-lg flex flex-col justify-start gap-2 rounded-lg items-start p-4 ${getStyle(type)} ${isActive(active, type)}`, children: [
    icon,
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 font-medium", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h1",
      {
        className: `font-medium text-gray-600 text-right ${value?.length > 7 ? "text-xl xl:text-2xl" : "text-2xl xl:text-3xl"}`,
        children: value
      }
    ),
    active != null && (active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 text-sm", children: "View Less" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 text-sm", children: "View More" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" }) })
    ] }))
  ] });
};
export {
  DashboardCard as D
};
