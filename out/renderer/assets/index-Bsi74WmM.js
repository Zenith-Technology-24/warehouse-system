import { b as useLocation, a as useNavigate, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { h as hooks } from "./moment-B0kaSMP7.js";
const View = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "View Returned Item", description: "Returned Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate(-1), className: "rounded-lg font-lato border border-aaa text-aaa p-3", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/return-of-items/update", { state }), className: "rounded-lg font-lato bg-aaa text-white p-3", children: "Update" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg py-4 px-6 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "ID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.id || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Receipt Ref: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.receiptRef || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Item Name: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.itemName || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Item Size: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.size || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Returned Date & Time: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(state?.date).format("DD MMM YYYY") + " " + hooks(state?.time, "HH:mm").format("h:mm A") || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Created At: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(state?.createdAt).format("DD MMM YYYY h:mm A") || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Created By: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-black ml-2", children: [
          state?.created_by?.firstname,
          " ",
          state?.created_by?.lastname
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Personnel: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.personnel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Notes: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: state?.notes })
      ] })
    ] }) }) })
  ] });
};
export {
  View as default
};
