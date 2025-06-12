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
import { e as exportReceipt, u as updateReceiptStatus, f as fetchReceipt } from "./receiptApi-DfxsCQnj.js";
import "./utils-QRJGL1kX.js";
import "./index.esm-DNsBvjPq.js";
import "./PrimaryButton-CmvA-Oa3.js";
import "./axios-DSoLq97m.js";
const Receipt = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [limit, setLimit] = reactExports.useState(10);
  const [status, setStatus] = reactExports.useState("active");
  const [toArchive, setToArchive] = reactExports.useState(null);
  const [toWithdrawn, setToWithdrawn] = reactExports.useState(null);
  const [toActive, setToActive] = reactExports.useState(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = reactExports.useState(false);
  const [isWithdrawnModalOpen, setIsWithdrawnModalOpen] = reactExports.useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = reactExports.useState(false);
  const [isSeeMore, setIsSeeMore] = reactExports.useState({});
  const [isExportModalOpen, setIsExportModalOpen] = reactExports.useState(false);
  reactExports.useState(null);
  const { data: rows, refetch } = useQuery({
    queryKey: ["receipt", search, page, limit, status],
    queryFn: () => fetchReceipt({ search, page, limit, status })
  });
  const updateStatus = useMutation({
    mutationFn: updateReceiptStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setIsActiveModalOpen(false);
      setIsArchiveModalOpen(false);
      refetch();
      showToast(
        `Receipt Successfully ${data?.status}!`,
        `Receipt has been successfully ${data?.status}.`,
        "success"
      );
      setToArchive(null);
      setToActive(null);
      setToWithdrawn(null);
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
  const handleWithdrawn = () => {
    updateStatus.mutate({
      id: toWithdrawn,
      status: "withdrawn"
    });
    setIsWithdrawnModalOpen(false);
  };
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "Date of Receipt",
        name: "receiptDate",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-normal", children: hooks(value).format("DD MMM YYYY") }) });
        }
      },
      {
        label: "Issuance Directive Nr",
        name: "issuanceDirective",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-normal", children: value });
        }
      },
      {
        label: "T/Qty",
        name: "quantity_string",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-normal ${row?.is_consumed && "text-gray-400"}`, children: value });
        }
      },
      {
        label: "Source",
        name: "source",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-normal", children: value });
        }
      },
      {
        label: "Action",
        name: "id",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate("/receipt/view", { state: row }), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", stroke: "currentColor", "stroke-width": "1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "stroke-linecap": "round", d: "M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate("/receipt/update", { state: row }), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_bgCarrier", "stroke-width": "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_tracerCarrier", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_iconCarrier", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z", fill: "#48494A" }) })
            ] }) }),
            row.status !== "archived" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => row.issued_quantity === 0 && handleOpenArchiveModal(value), className: `p-2 rounded-full ${row.issued_quantity === 0 && "hover:bg-gray-100 cursor-pointer !opacity-100"} opacity-50 transition m-auto`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
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
  reactExports.useEffect(() => {
    console.log(rows);
  }, [rows]);
  const handleExport = ({ toExport, start_date, end_date }) => {
    const headers = [
      { header: "Receipt Date", key: "receiptDate", width: 40 },
      { header: "Issuance Directive No.", key: "issuanceDirective", width: 30 },
      { header: "Source", key: "source", width: 30 },
      { header: "Item Name", key: "itemName", width: 30 },
      { header: "Size", key: "size", width: 30 },
      { header: "Quantity", key: "quantity", width: 30 },
      { header: "UoM", key: "unit", width: 30 },
      { header: "Total Amount", key: "totalAmount", width: 30 },
      { header: "Expiry Date", key: "expiryDate", width: 30 },
      { header: "Location", key: "location", width: 30 },
      { header: "Created At", key: "createdAt", width: 30 },
      { header: "Created By", key: "createdBy", width: 30 }
    ];
    let gtAmount = 0;
    let tQty = 0;
    let data = toExport?.flatMap((row) => {
      const fullName = row.user ? `${row.user.firstname} ${row.user.lastname}` : "N/A";
      const formatDate = (dateStr) => {
        return new Intl.DateTimeFormat("en-PH", {
          timeZone: "Asia/Manila",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).format(new Date(dateStr));
      };
      const formattedReceiptDate = formatDate(row.receiptDate);
      const formattedCreatedAt = formatDate(row.createdAt);
      const receiptRows = row.item.map((item, index) => {
        gtAmount += parseFloat(item.amount);
        tQty += parseFloat(item.quantity);
        return {
          id: index === 0 ? row.id : "",
          receiptDate: index === 0 ? formattedReceiptDate : "",
          issuanceDirective: index === 0 ? row.issuanceDirective : "",
          source: index === 0 ? row.source : "",
          quantity: item.quantity,
          itemName: item.item_name,
          size: item.size,
          unit: item.unit,
          expiryDate: item.expiryDate ? hooks(item.expiryDate).format("D MMM YYYY") : "N/A",
          location: item.location,
          createdAt: formattedCreatedAt,
          createdBy: fullName,
          totalAmount: item.amount
        };
      });
      return receiptRows;
    });
    data = [...data, {
      id: "",
      receiptDate: "",
      issuanceDirective: "",
      source: "",
      quantity: "",
      itemName: "",
      size: "",
      unit: "",
      expiryDate: "",
      location: "",
      createdAt: "",
      createdBy: "",
      totalAmount: ""
    }, {
      id: "",
      receiptDate: "GT/AMOUNT : ",
      issuanceDirective: gtAmount.toLocaleString(),
      source: "",
      quantity: "",
      itemName: "",
      size: "",
      unit: "",
      expiryDate: "",
      location: "",
      createdAt: "",
      createdBy: "",
      totalAmount: ""
    }, {
      id: "",
      receiptDate: "T/Qty : ",
      issuanceDirective: tQty,
      source: "",
      quantity: "",
      itemName: "",
      size: "",
      unit: "",
      expiryDate: "",
      location: "",
      createdAt: "",
      createdBy: "",
      totalAmount: ""
    }];
    exportToExcel({ data, headers, filename: `${status}-receipt-${start_date}-to-${end_date}` });
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
        exportFunction: exportReceipt
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isArchiveModalOpen,
        title: "Archive Receipt",
        onClose: () => setIsArchiveModalOpen(false),
        handleFunction: () => handleArchive(),
        message: "Are you sure you want to archive this receipt?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isActiveModalOpen,
        title: "Restore Receipt",
        onClose: () => setIsActiveModalOpen(false),
        handleFunction: () => handleActive(),
        message: "Are you sure you want to restore this receipt?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isWithdrawnModalOpen,
        title: "Withdraw Receipt",
        onClose: () => setIsWithdrawnModalOpen(false),
        handleFunction: () => handleWithdrawn(),
        message: "Are you sure you want to withdraw this receipt?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Receipt", description: "Showing all receipts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsExportModalOpen(true), className: "rounded-lg font-lato border-2 border-aaa text-aaa p-3", children: "Export" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LinkPrimaryButton, { text: "Create", to: "create" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2 text-center text-lg text-gray-500", children: [
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
  Receipt as default
};
