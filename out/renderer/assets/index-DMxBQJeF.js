import { u as useToast, a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { T as Table } from "./Table-HZ94nljW.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { M as Modal } from "./Modal-BvOOYCSa.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { h as hooks } from "./moment-B0kaSMP7.js";
import { E as ExportModal, S as Search, e as exportToExcel } from "./ExportModal-Benrqooy.js";
import { L as LinkPrimaryButton } from "./LinkPrimaryButton-C493BKNW.js";
import { e as exportSales, u as updateSalesStatus, f as fetchSales } from "./salesApi-BtYwXdgY.js";
import "./utils-QRJGL1kX.js";
import "./index.esm-DNsBvjPq.js";
import "./PrimaryButton-CmvA-Oa3.js";
import "./axios-DSoLq97m.js";
const Sales = ({ dashboardView }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [limit, setLimit] = reactExports.useState(10);
  const [status, setStatus] = reactExports.useState("all");
  const [toArchive, setToArchive] = reactExports.useState(null);
  const [toActive, setToActive] = reactExports.useState(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = reactExports.useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = reactExports.useState(false);
  const [isSeeMore, setIsSeeMore] = reactExports.useState({});
  const [isExportModalOpen, setIsExportModalOpen] = reactExports.useState(false);
  const { data: rows, refetch } = useQuery({
    queryKey: ["sales", search, page, limit, status],
    queryFn: () => fetchSales({ search, page, limit, status })
  });
  const updateStatus = useMutation({
    mutationFn: updateSalesStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setIsActiveModalOpen(false);
      setIsArchiveModalOpen(false);
      refetch();
      showToast(
        `Sales Successfully ${data?.sales?.status === "active" ? "Restored" : "Archived"}!`,
        `Sales has been successfully ${data?.sales?.status === "active" ? "restored" : "archived"}.`,
        "success"
      );
      setToArchive(null);
      setToActive(null);
    }
  });
  const handleSearch = (searchInput = "") => {
    setSearch(searchInput);
  };
  const handleChangePage = (page2) => {
    setPage(page2);
  };
  const handleOpenActiveModal = (id) => {
    setIsActiveModalOpen(true);
    setToActive(id);
  };
  const handleOpenArchiveModal = (id) => {
    setIsArchiveModalOpen(true);
    setToArchive(id);
  };
  const handleArchive = () => {
    updateStatus.mutate({
      id: toArchive,
      status: "archived"
    });
    setIsArchiveModalOpen(false);
  };
  const handleActive = () => {
    updateStatus.mutate({
      id: toActive,
      status: "active"
    });
    setIsArchiveModalOpen(false);
  };
  const toggleSeeMore = (rowId) => {
    setIsSeeMore((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId]
    }));
  };
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "Sales ID",
        name: "id",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: value });
        }
      },
      {
        label: "Customer",
        name: "customer",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                value.first_name,
                " ",
                value.last_name
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Contact Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value.contact_number })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value.address })
            ] })
          ] });
        }
      },
      {
        label: "Product",
        name: "salesInventory",
        render(row, value, rowIndex) {
          const seeMore = isSeeMore[row.id];
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "!col-span-2", children: seeMore ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: value?.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Product Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: inv.inventory.product_name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: inv.inventory.size })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: inv.quantity })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Terms" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: inv.terms })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Due Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: hooks(inv.due_date).format("D MMM YYYY") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "₱" + inv?.total_price })
                ] })
              ] })
            ] }, inv.inventory.product_name)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { onClick: () => setIsSeeMore({}), className: "cursor-pointer font-normal underline text-xs text-gray-500 hover:text-blue-500", children: "Hide" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Product Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value[0]?.inventory?.product_name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Size" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value[0]?.inventory?.size })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Quantity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value[0]?.quantity })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { onClick: () => toggleSeeMore(row.id), className: "cursor-pointer font-normal underline text-xs text-gray-500 hover:text-blue-500", children: "See more" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Terms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value[0]?.terms })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Due Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: hooks(value[0]?.due_date).format("D MMM YYYY") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "₱" + value[0]?.total_price })
              ] })
            ] })
          ] }, value[0]?.id) });
        }
      },
      {
        label: "Date",
        name: "created_at",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Created At" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: hooks(value).format("D MMM YYYY") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${row.status === "active" ? "bg-green-50 text-green-500 w-14" : "bg-gray-50 text-gray-500 w-20"} rounded-full flex flex-row items-center justify-center`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full mr-1 ${row.status === "active" ? "bg-green-500" : "bg-gray-500"}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: row.status.charAt(0).toUpperCase() + row.status.slice(1) })
              ] })
            ] })
          ] });
        }
      },
      {
        label: "Action",
        name: "id",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2", children: [
            !dashboardView && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate("/sales/view/" + value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate("/sales/update", { state: row }), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_bgCarrier", "stroke-width": "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_tracerCarrier", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_iconCarrier", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z", fill: "#48494A" }) })
            ] }) }),
            row.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenArchiveModal(value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_bgCarrier", "stroke-width": "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_tracerCarrier", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "SVGRepo_iconCarrier", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7", stroke: "#48494A", "stroke-width": "1.5", "stroke-linecap": "round" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z", stroke: "#48494A", "stroke-width": "1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 7L12 16M12 16L15 12.6667M12 16L9 12.6667", stroke: "#48494A", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })
              ] })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenActiveModal(value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_bgCarrier", "stroke-width": "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_tracerCarrier", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "SVGRepo_iconCarrier", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 21L12 12M12 12L15 15.3333M12 12L9 15.3333", stroke: "#48494A", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7", stroke: "#48494A", "stroke-width": "1.5", "stroke-linecap": "round" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z", stroke: "#48494A", "stroke-width": "1.5" })
              ] })
            ] }) })
          ] });
        }
      }
    ];
  }, [rows, isSeeMore]);
  const checkIfActive = (value) => {
    return value === status && "border-b-2 border-black";
  };
  const handleExport = ({ toExport, start_date, end_date }) => {
    const headers = [
      { header: "Sales ID", key: "id", width: 10 },
      { header: "Contact Number", key: "contact_number", width: 15 },
      { header: "Customer Name", key: "customer_name", width: 15 },
      { header: "Product Name", key: "product_name", width: 15 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "Total", key: "total", width: 15 },
      { header: "Terms", key: "terms", width: 15 },
      { header: "Due Date", key: "due_date", width: 15 },
      { header: "Created At", key: "created_at", width: 15 }
    ];
    let overall = 0;
    let data = toExport?.flatMap((row) => {
      const totalSum = row.salesInventory.reduce((sum, inventoryItem) => {
        return sum + parseFloat(inventoryItem.total_price);
      }, 0).toFixed(2);
      const inventoryRows = row.salesInventory.map((inventoryItem, index) => {
        return {
          id: index === 0 ? row.id : "",
          customer_name: index === 0 ? row.customer.first_name + " " + row.customer.last_name : "",
          contact_number: index === 0 ? row.customer.contact_number : "",
          product_name: inventoryItem.inventory.product_name,
          quantity: inventoryItem.quantity,
          total: "₱" + inventoryItem.total_price,
          terms: inventoryItem.terms,
          due_date: hooks(inventoryItem?.due_date).format("L"),
          created_at: hooks(inventoryItem?.created_at).format("L")
        };
      });
      const totalRow = {
        id: "",
        customer_name: "",
        contact_number: "",
        product_name: "",
        quantity: "Total",
        total: "₱" + totalSum,
        terms: "",
        due_date: "",
        created_at: ""
      };
      overall += parseFloat(totalSum);
      return [...inventoryRows, totalRow];
    });
    data = [...data, {
      id: "",
      customer_name: "",
      contact_number: "",
      product_name: "",
      quantity: "",
      total: "",
      terms: "",
      due_date: "",
      created_at: ""
    }, {
      id: "",
      customer_name: "",
      contact_number: "",
      product_name: "",
      quantity: "OVERALL TOTAL",
      total: "₱" + overall,
      terms: "",
      due_date: "",
      created_at: ""
    }];
    exportToExcel({ data, headers, filename: `${status}-sales-${start_date}-to-${end_date}` });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border shadow-md rounded-lg px-4 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExportModal,
      {
        search,
        status,
        isOpen: isExportModalOpen,
        onClose: () => setIsExportModalOpen(false),
        handleFunction: handleExport,
        exportFunction: exportSales
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isArchiveModalOpen,
        title: "Archive Sales",
        onClose: () => setIsArchiveModalOpen(false),
        handleFunction: () => handleArchive(),
        message: "Are you sure you want to archive this sales?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isActiveModalOpen,
        title: "Restore Sales",
        onClose: () => setIsActiveModalOpen(false),
        handleFunction: () => handleActive(),
        message: "Are you sure you want to restore this sales?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Inventory Summary", description: "Showing inventory summary" }),
      dashboardView ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/sales"), className: "rounded-lg font-lato border bg-aaa text-white p-3 m-2", children: "View More" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsExportModalOpen(true), className: "rounded-lg font-lato border-2 border-aaa text-aaa p-3", children: "Export" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LinkPrimaryButton, { text: "Create", to: "create" })
      ] })
    ] }),
    !dashboardView && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2 text-center text-lg text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("all"), className: `${checkIfActive("all")} w-24 py-2 cursor-pointer`, children: "All" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("active"), className: `${checkIfActive("active")} w-24 py-2 cursor-pointer`, children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("archived"), className: `${checkIfActive("archived")} w-24 py-2 cursor-pointer`, children: "Archived" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          handleFetchData: handleSearch
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Table,
      {
        currentPage: page,
        setCurrentPage: setPage,
        totalRows: rows?.data?.length || 1,
        columns,
        rows,
        rowsPerPage: limit,
        totalPages: rows?.totalPages,
        onPageChange: handleChangePage
      }
    )
  ] });
};
export {
  Sales as default
};
