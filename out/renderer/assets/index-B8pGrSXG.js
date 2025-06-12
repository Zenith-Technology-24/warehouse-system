import { r as reactExports, b as useLocation, a as useNavigate, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as Table } from "./Table-HZ94nljW.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { h as hooks } from "./moment-B0kaSMP7.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { a as fetchOneReceipt } from "./receiptApi-DfxsCQnj.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const View = () => {
  const [gAmount, setGamount] = reactExports.useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["receipt_details", state.id],
    queryFn: () => fetchOneReceipt(state.id)
  });
  const calculateGrossTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => {
      const amount = typeof item.amount === "string" ? Number(item.amount.replace(/,/g, "")) : Number(item.amount);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  reactExports.useEffect(() => {
    if (data?.item) {
      setGamount(calculateGrossTotal(data.item));
    }
  }, [data]);
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "Item Name",
        name: "item_name",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-normal", children: value });
        }
      },
      {
        label: "Location",
        name: "location",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value });
        }
      },
      {
        label: "Size (Optional)",
        name: "size",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value });
        }
      },
      {
        label: "Stock Details",
        name: "StockDetails",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `${row?.is_consumed && "text-gray-400"}`, children: row?.quantity_string })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "UoM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: row?.unit || "N/A" })
            ] })
          ] });
        }
      },
      {
        label: "U/Price",
        name: "price",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "₱",
            value
          ] });
        }
      },
      {
        label: "T/Amount",
        name: "price",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "T/Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "₱",
              row?.amount
            ] })
          ] });
        }
      },
      {
        label: "Expiry Date",
        name: "expiryDate",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value ? hooks(value).format("DD MMM YYYY") : "N/A" });
        }
      }
    ];
  }, [state?.endUsers]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "View Receipt", description: "Receipt" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate(-1), className: "rounded-lg font-lato border border-aaa text-aaa p-3", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/receipt/update", { state }), className: "rounded-lg font-lato bg-aaa text-white p-3", children: "Update" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg py-4 px-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-md font-semibold mb-2", children: "Receipt Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Receipt Date: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(data?.receiptDate).format("DD MMM YYYY") || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Issuance Directive Nr: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: data?.issuanceDirective || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Source: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: data?.source || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Created At: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(data?.createdAt).format("DD MMM YYYY h:mm A") || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Created By: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: data?.user?.firstname + " " + data?.user?.lastname || "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-md font-semibold mb-2", children: "Item Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Table,
          {
            columns,
            rows: { data: data?.item },
            classes: "!h-0",
            gAmount
          }
        )
      ] })
    ] })
  ] });
};
export {
  View as default
};
