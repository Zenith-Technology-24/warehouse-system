import { j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
const Modal = ({ title, isOpen, onClose, handleFunction, message }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center !z-[9999]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 min-w-[500px] max-w-[700px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium text-center text-gray-800 mb-4", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-6 text-center", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "grow border-aaa hover:border-aaa text-aaa py-2 px-3 rounded-lg text-sm",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleFunction,
          className: "grow bg-aaa hover:border-aaa text-white py-2 px-3 rounded-lg text-sm",
          children: "Confirm"
        }
      )
    ] })
  ] }) });
};
export {
  Modal as M
};
