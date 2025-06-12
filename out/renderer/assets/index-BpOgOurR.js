import { u as useToast, b as useLocation, a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as Table } from "./Table-HZ94nljW.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { h as hooks } from "./moment-B0kaSMP7.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { b as fetchOneIssuance, d as withdrawIssuance, g as pendingIssuance } from "./issuanceApi-CQlqxOQ2.js";
import { M as Modal } from "./Modal-BvOOYCSa.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const View = () => {
  const { showToast } = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isWithdrawnModalOpen, setIsWithdrawnModalOpen] = reactExports.useState(false);
  const [toWithdrawn, setToWithdrawn] = reactExports.useState(null);
  const [isPendingModalOpen, setIsPendingModalOpen] = reactExports.useState(false);
  const [toPending, setToPending] = reactExports.useState(null);
  const [inventoryId, setInventoryId] = reactExports.useState(null);
  const { data, refetch } = useQuery({
    queryKey: ["receipt_details", state.id],
    queryFn: () => fetchOneIssuance(state.id)
  });
  const withdraw = useMutation({
    mutationFn: withdrawIssuance,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data2) => {
      refetch();
      showToast(
        `Item Successfully Withdrawn!`,
        `Item has been successfully Withdrawn.`,
        "success"
      );
      setToWithdrawn(null);
      setInventoryId(null);
    }
  });
  const pending = useMutation({
    mutationFn: pendingIssuance,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data2) => {
      refetch();
      showToast(
        `Item Successfully Return to Pending!`,
        `Item has been successfully Return to Pending.`,
        "success"
      );
      setToPending(null);
      setInventoryId(null);
    }
  });
  const calculateGrossTotal = (endUser) => {
    if (!endUser.inventory) return 0;
    return endUser.inventory.reduce((total, inventory) => {
      const amount = typeof inventory.item.amount === "string" ? Number(inventory.item.amount.replace(/,/g, "")) : Number(inventory.item.amount);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  reactExports.useEffect(() => {
    if (data?.endUsers) {
      calculateGrossTotal(data.endUsers);
    }
  }, [data]);
  const handleWithdrawn = () => {
    withdraw.mutate({
      id: toWithdrawn,
      inventoryId
    });
    setIsWithdrawnModalOpen(false);
  };
  const handlePending = () => {
    pending.mutate({
      id: toPending,
      inventoryId
    });
    setIsPendingModalOpen(false);
  };
  const handleOpenWithdrawnModal = (id, inventoryId2) => {
    setIsWithdrawnModalOpen(true);
    setToWithdrawn(id);
    setInventoryId(inventoryId2);
  };
  const handleOpenPendingModal = (id, inventoryId2) => {
    setIsPendingModalOpen(true);
    setToPending(id);
    setInventoryId(inventoryId2);
  };
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "Item Name",
        name: "name",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: row?.item?.name });
        }
      },
      {
        label: "Receipt Ref",
        name: "receiptRef",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: row?.item?.receiptRef });
        }
      },
      {
        label: "Stock Details",
        name: "StockDetails",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Size (Optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: row?.item?.size })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: row?.item?.quantity })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "U/I" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: row?.item?.unit })
            ] })
          ] });
        }
      },
      {
        label: "T/Amount",
        name: "price",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "U/Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "₱",
                row?.item?.price
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "T/Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "₱",
                row?.item?.amount
              ] })
            ] })
          ] });
        }
      },
      {
        label: "Status",
        name: "status",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `
                                    ${value === "withdrawn" && "bg-green-50 text-green-500 w-20"} 
                                    ${value === "pending" && "bg-yellow-50 text-yellow-500 w-20"}
                                    ${value === "archived" && "bg-gray-50 text-gray-500 w-20"} 
                                    rounded-full flex items-center justify-center mx-3`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-2 h-2 rounded-full mr-1 
                                        ${value === "withdrawn" && "bg-green-500"}
                                        ${value === "pending" && "bg-yellow-500"}
                                        ${value === "archived" && "bg-gray-500"}
                                    `
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: value?.charAt(0).toUpperCase() + value?.slice(1) })
              ]
            }
          );
        }
      },
      {
        label: "Action",
        name: "issuanceDetailId",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: row?.status === "withdrawn" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenPendingModal(value, row?.id), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenWithdrawnModal(value, row?.id), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", color: "currentColor", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m18.935 13.945l-.67-3.648c-.29-1.576-.435-2.364-1.008-2.83S15.86 7 14.213 7H9.787c-1.647 0-2.47 0-3.044.467c-.573.466-.718 1.254-1.008 2.83l-.67 3.648c-.6 3.271-.901 4.907.024 5.98C6.014 21 7.724 21 11.142 21h1.716c3.418 0 5.128 0 6.053-1.074s.625-2.71.024-5.98" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 10.5V17m-2.5-2l2.5 2.5l2.5-2.5m6.5-4a1.5 1.5 0 0 0 .414-.305C22 10.089 22 9.11 22 7.152s0-2.936-.586-3.544S19.886 3 18 3H6c-1.886 0-2.828 0-3.414.608S2 5.195 2 7.152s0 2.936.586 3.543q.18.188.414.305" })
          ] }) }) }) });
        }
      }
    ];
  }, [state?.endUsers]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isWithdrawnModalOpen,
        title: "Move Pending Item to Withdrawn",
        onClose: () => setIsWithdrawnModalOpen(false),
        handleFunction: () => handleWithdrawn(),
        message: "Are you sure you want to change the status of this item from Pending to Withdrawn?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isPendingModalOpen,
        title: "Move Withdrawn Item to Pending",
        onClose: () => setIsPendingModalOpen(false),
        handleFunction: () => handlePending(),
        message: "Are you sure you want to change the status of this item from Withdrawn to Pending?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "View Issuance", description: "Issuance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate(-1), className: "rounded-lg font-lato border border-aaa text-aaa p-3", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: data?.issuanceStatus === "withdrawn", onClick: () => navigate("/issuance/update", { state }), className: `rounded-lg font-lato ${data?.issuanceStatus === "withdrawn" ? "opacity-50" : "opacity-100"} bg-aaa text-white p-3`, children: "Update" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg py-4 px-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-md font-semibold mb-2", children: "Issuance Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Document No: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: data?.documentNo || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Issuance Directive Nr: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: data?.issuanceDirective || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Issuance Date: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(data?.issuanceDate).format("DD MMM YYYY") || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Validity Date: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(data?.validityDate).format("DD MMM YYYY") || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Created At: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: hooks(data?.createdAt).format("DD MMM YYYY h:mm A") || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Created By: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black ml-2", children: data?.user?.firstname + " " + data?.user?.lastname + " (" + data?.user?.roles[0]?.name + ")" || "N/A" })
          ] })
        ] })
      ] }),
      data?.endUsers.map((endUser, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-md font-semibold mb-2", children: [
          "End User: ",
          endUser?.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Table,
          {
            columns,
            rows: { data: endUser?.inventory },
            classes: "!h-0",
            gAmount: calculateGrossTotal(endUser)
          }
        )
      ] }, index))
    ] })
  ] });
};
export {
  View as default
};
