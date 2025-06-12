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
import { e as exportExpenses } from "./expensesApi-Bq0211JH.js";
import { u as updateUserStatus, f as fetchUsers } from "./usersApi-BU81reWI.js";
import "./utils-QRJGL1kX.js";
import "./index.esm-DNsBvjPq.js";
import "./PrimaryButton-CmvA-Oa3.js";
import "./axios-DSoLq97m.js";
const ManageUsers = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [limit, setLimit] = reactExports.useState(10);
  const [status, setStatus] = reactExports.useState("active");
  const [toDeactivate, setToDeactivate] = reactExports.useState(null);
  const [toActive, setToActive] = reactExports.useState(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = reactExports.useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = reactExports.useState(false);
  const [isSeeMore, setIsSeeMore] = reactExports.useState({});
  const [isExportModalOpen, setIsExportModalOpen] = reactExports.useState(false);
  const { data: rows, refetch } = useQuery({
    queryKey: ["users", search, page, limit, status],
    queryFn: () => fetchUsers({ search, page, limit, status })
  });
  const updateStatus = useMutation({
    mutationFn: updateUserStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setIsActiveModalOpen(false);
      setIsDeactivateModalOpen(false);
      refetch();
      showToast(
        `User Successfully ${data?.expense?.status === "active" ? "Restored" : "Deactivated"}!`,
        `User has been successfully ${data?.expense?.status === "active" ? "restored" : "deactivated"}.`,
        "success"
      );
      setToDeactivate(null);
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
  const handleOpenDeactivateModal = (id) => {
    setIsDeactivateModalOpen(true);
    setToDeactivate(id);
  };
  const handleDeactivate = () => {
    updateStatus.mutate({
      id: toDeactivate,
      status: "inactive"
    });
    setIsDeactivateModalOpen(false);
  };
  const handleActive = () => {
    updateStatus.mutate({
      id: toActive,
      status: "active"
    });
    setIsDeactivateModalOpen(false);
  };
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "ID",
        name: "id",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: value });
        }
      },
      {
        label: "Name",
        name: "firstname",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            value,
            " ",
            row.lastname
          ] });
        }
      },
      {
        label: "Username",
        name: "username",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value });
        }
      },
      {
        label: "Role",
        name: "role",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: row.roles?.[0]?.name ? row.roles[0].name.charAt(0).toUpperCase() + row.roles[0].name.slice(1) : "N/A" });
        }
      },
      {
        label: "Created At",
        name: "created_at",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: hooks(value).format("DD MMM YYYY h:mm A") });
        }
      },
      {
        label: "Action",
        name: "id",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate("/manage-users/view", { state: row }), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "none", stroke: "currentColor", "stroke-width": "1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "stroke-linecap": "round", d: "M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => navigate("/manage-users/update", { state: row }), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_bgCarrier", "stroke-width": "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_tracerCarrier", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { id: "SVGRepo_iconCarrier", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z", fill: "#48494A" }) })
            ] }) }),
            row.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenDeactivateModal(value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14px", height: "14px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3.5m8.5 7l-5-5m0 5l5-5" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenActiveModal(value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14px", height: "14px", viewBox: "0 0 1024 1024", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.7 371.7 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1c-.4.2-.8.3-1.2.5c-44.7 18.9-84.8 46-119.3 80.6a373.4 373.4 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 888.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8c2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3M512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521M880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8" }) }) })
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
      { header: "Expenses ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 15 },
      { header: "Expense Type", key: "type", width: 15 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Description", key: "description", width: 35 },
      { header: "Created At", key: "created_at", width: 15 }
    ];
    let overall = 0;
    let data = toExport?.map((row) => {
      overall += parseFloat(row.amount);
      return {
        id: row.id,
        name: row.first_name + row.last_name,
        type: row.expense_type,
        amount: "₱" + row.amount,
        description: row.description,
        created_at: hooks(row.created_at).format("L")
      };
    });
    data = [...data, {
      id: "",
      name: "",
      type: "",
      amount: "",
      description: "",
      created_at: ""
    }, {
      id: "",
      name: "",
      type: "OVERALL TOTAL",
      amount: "₱" + overall,
      description: "",
      created_at: ""
    }];
    exportToExcel({ data, headers, filename: `${status}-expenses-${start_date}-to-${end_date}` });
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
        exportFunction: exportExpenses
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isDeactivateModalOpen,
        title: "Deactivate User",
        onClose: () => setIsDeactivateModalOpen(false),
        handleFunction: () => handleDeactivate(),
        message: "Are you sure you want to deactivate this user?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isActiveModalOpen,
        title: "Restore User",
        onClose: () => setIsActiveModalOpen(false),
        handleFunction: () => handleActive(),
        message: "Are you sure you want to restore this user?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Manage Users", description: "Showing all users" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopButtons, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LinkPrimaryButton, { text: "Create", to: "create" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-2 text-center text-lg text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("active"), className: `${checkIfActive("active")} w-24 py-2 cursor-pointer`, children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setStatus("deactivated"), className: `${checkIfActive("deactivated")} w-24 py-2 cursor-pointer`, children: "Deactivated" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          handleFetchData: handleSearch
        }
      ) })
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
  ManageUsers as default
};
