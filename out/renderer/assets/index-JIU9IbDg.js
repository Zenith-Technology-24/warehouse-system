import { b as useLocation, a as useNavigate, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { h as hooks } from "./moment-B0kaSMP7.js";
const View = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "View User", description: "Manage Users" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate(-1), className: "rounded-lg font-lato border border-aaa text-aaa p-3", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/manage-users/update", { state }), className: "rounded-lg font-lato bg-aaa text-white p-3", children: "Update" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg py-4 px-6 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "ID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.id || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "First Name: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.firstname || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Last Name: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.lastname || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Role: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.roles[0]?.name || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Username: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.username || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Status:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `${state?.status === "active" ? "bg-green-50 text-green-500 w-14" : "bg-gray-50 text-gray-500 w-20"} rounded-full flex items-center justify-center`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-2 h-2 rounded-full mr-1 ${state?.status === "active" ? "bg-green-500" : "bg-gray-500"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: state?.status.charAt(0).toUpperCase() + state?.status.slice(1) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Created At: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(state?.createdAt).format("DD MMM YYYY h:mm A") || "N/A" })
      ] })
    ] }) }) })
  ] });
};
export {
  View as default
};
