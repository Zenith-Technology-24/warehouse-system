import { r as reactExports, j as jsxRuntimeExports, u as useToast, a as useNavigate } from "./index-BwJeGL0w.js";
import { T as Table } from "./Table-HZ94nljW.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { e as exportInventory, u as updateInventoryStatus, f as fetchInventory } from "./inventoryApi-CQCigH3Z.js";
import { M as Modal } from "./Modal-BvOOYCSa.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { E as ExportModal, S as Search, e as exportToExcel } from "./ExportModal-Benrqooy.js";
import { S as StockStatusComponent } from "./StockStatus-YzT6b0F0.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
import "./index.esm-DNsBvjPq.js";
import "./moment-B0kaSMP7.js";
const Filter = ({ listItems, filterString, setFilterString }) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const dropdownRef = reactExports.useRef(null);
  const buttonRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: buttonRef,
        className: "flex text-gray-500 gap-2 border p-3 cursor-pointer",
        onClick: () => setIsOpen(!isOpen),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M4.5 7h15M7 12h10m-7 5h4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: filterString !== "" ? filterString : "Filter" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: dropdownRef, className: "border p-3 right-0 absolute mt-1 w-36 bg-white text-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-7", children: listItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "li",
      {
        onClick: () => {
          setFilterString(item);
          setIsOpen(false);
        },
        className: "whitespace-nowrap hover:text-gray-900 cursor-pointer",
        children: item
      },
      index
    )) }) })
  ] });
};
const Inventory = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [limit, setLimit] = reactExports.useState(10);
  const [status, setStatus] = reactExports.useState("active");
  const [toArchive, setToArchive] = reactExports.useState(null);
  const [toActive, setToActive] = reactExports.useState(null);
  const [filterString, setFilterString] = reactExports.useState("");
  const [isArchiveModalOpen, setIsArchiveModalOpen] = reactExports.useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = reactExports.useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = reactExports.useState(false);
  const { data: rows, refetch } = useQuery({
    queryKey: ["inventory", search, page, limit, status, filterString],
    queryFn: () => fetchInventory({ search, page, limit, status, filter: filterString })
  });
  const listItems = ["All", "High Stock", "Mid Stock", "Low Stock", "Out of Stock"];
  const updateStatus = useMutation({
    mutationFn: updateInventoryStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setIsActiveModalOpen(false);
      setIsArchiveModalOpen(false);
      refetch();
      showToast(
        `Inventory Successfully ${data?.inventory?.status === "active" ? "Restored" : "Archived"}!`,
        `Inventory has been successfully ${data?.inventory?.status === "active" ? "restored" : "archived"}.`,
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
      status: "archive"
    });
    setIsArchiveModalOpen(false);
  };
  const handleActive = () => {
    updateStatus.mutate({
      id: toActive,
      status: "unarchive"
    });
    setIsArchiveModalOpen(false);
  };
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "Item Name",
        name: "name",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-normal", children: value });
        }
      },
      {
        label: "T/Qty",
        name: "totalQuantity",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: value });
        }
      },
      {
        label: "UoM",
        name: "unit",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: row?.unit });
        }
      },
      {
        label: "GT/Amount",
        name: "grandTotalAmount",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: value && "₱" + value });
        }
      },
      {
        label: "Stock Level",
        name: "stockLevel",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(StockStatusComponent, { status: value });
        }
      },
      {
        label: "Action",
        name: "id",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate("/inventory/view", { state: row }), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", stroke: "currentColor", "stroke-width": "1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "stroke-linecap": "round", d: "M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" })
            ] }) }) }),
            row.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenArchiveModal(value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_bgCarrier", "stroke-width": "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_tracerCarrier", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "SVGRepo_iconCarrier", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7", stroke: "#48494A", "stroke-width": "1.5", "stroke-linecap": "round" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z", stroke: "#48494A", "stroke-width": "1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 7L12 16M12 16L15 12.6667M12 16L9 12.6667", stroke: "#48494A", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })
              ] })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenActiveModal(value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
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
  }, [rows]);
  const checkIfActive = (value) => {
    return value === status && "border-b-2 border-black";
  };
  const handleExport = ({ toExport, start_date, end_date }) => {
    const headers = [
      { header: "Item Name", key: "name", width: 40 },
      { header: "Size", key: "size", width: 40 },
      { header: "Total Quantity", key: "totalQuantity", width: 40 },
      { header: "Pending Quantity", key: "pendingQuantity", width: 40 },
      { header: "Available Quantity", key: "availableQuantity", width: 40 },
      { header: "UoM", key: "unit", width: 40 },
      { header: "Stock Status", key: "stockLevel", width: 15 },
      { header: "Total Amount", key: "grandTotalAmount", width: 15 }
    ];
    let gtAmount = 0;
    let tQty = 0;
    let data = toExport?.map((row) => {
      gtAmount += parseInt(row.grandTotalAmount);
      tQty += row.totalQuantity;
      const sizes = [
        ...new Set(
          row.receipts?.flatMap(
            (receipt) => receipt.item?.map((i) => i.size) || []
          )
        )
      ];
      return {
        name: row.name,
        size: sizes.join(", ") || "N/A",
        totalQuantity: row.totalQuantity,
        pendingQuantity: row.pendingQuantity,
        availableQuantity: row.availableQuantity,
        unit: row.unit,
        stockLevel: row.stockLevel,
        grandTotalAmount: row.grandTotalAmount
      };
    });
    data = [...data, {
      name: "",
      size: "",
      totalQuantity: "",
      pendingQuantity: "",
      availableQuantity: "",
      unit: "",
      stockLevel: "",
      grandTotalAmount: ""
    }, {
      name: "GT/AMOUNT : ",
      size: gtAmount.toLocaleString(),
      totalQuantity: "",
      pendingQuantity: "",
      availableQuantity: "",
      unit: "",
      stockLevel: "",
      grandTotalAmount: ""
    }, {
      name: "T/Qty : ",
      size: tQty,
      totalQuantity: "",
      pendingQuantity: "",
      availableQuantity: "",
      unit: "",
      stockLevel: "",
      grandTotalAmount: ""
    }];
    exportToExcel({ data, headers, filename: `${status}-inventory-${start_date}-to-${end_date}` });
    setIsExportModalOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExportModal,
      {
        search,
        status,
        isOpen: isExportModalOpen,
        onClose: () => setIsExportModalOpen(false),
        handleFunction: handleExport,
        exportFunction: exportInventory
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isArchiveModalOpen,
        title: "Archive Inventory",
        onClose: () => setIsArchiveModalOpen(false),
        handleFunction: () => handleArchive(),
        message: "Are you sure you want to archive this Inventory?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isActiveModalOpen,
        title: "Restore Inventory",
        onClose: () => setIsActiveModalOpen(false),
        handleFunction: () => handleActive(),
        message: "Are you sure you want to restore this Inventory?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Inventory", description: "Showing all Inventories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopButtons, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsExportModalOpen(true), className: "rounded-lg font-lato border-2 bg-aaa text-white p-3", children: "Export" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2 text-center text-lg text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("active"), className: `${checkIfActive("active")} w-24 py-2 cursor-pointer`, children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("archived"), className: `${checkIfActive("archived")} w-24 py-2 cursor-pointer`, children: "Archived" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Filter,
          {
            listItems,
            filterString,
            setFilterString
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            handleFetchData: handleSearch
          }
        )
      ] })
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
  Inventory as default
};
