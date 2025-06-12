import { r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { E as ExportModal, S as Search, e as exportToExcel } from "./ExportModal-Benrqooy.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { T as Table } from "./Table-HZ94nljW.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { a as apiService } from "./axios-DSoLq97m.js";
import "./useMutation-u6SlWMfm.js";
import "./utils-QRJGL1kX.js";
import "./index.esm-DNsBvjPq.js";
import "./moment-B0kaSMP7.js";
const fetchActivityLogs = async ({ page, limit, search, date }) => {
  const { data } = await apiService.get(`/activity-log?page=${page}&limit=${limit}&search=${search}&date=${date}`);
  return data;
};
const exportActivityLogs = async ({ search, start_date, end_date }) => {
  const { data } = await apiService.post("/activity-log/export", { search, start_date, end_date });
  return data;
};
const ActivityLogs = () => {
  const [date, setDate] = reactExports.useState(null);
  const [isExportModalOpen, setIsExportModalOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("active");
  const [page, setPage] = reactExports.useState(1);
  const [limit, setLimit] = reactExports.useState(10);
  const { data: rows, refetch } = useQuery({
    queryKey: ["activityLogs", search, page, limit, date],
    queryFn: () => fetchActivityLogs({ search, page, limit, date })
  });
  const handleSearch = (searchInput = "") => {
    setSearch(searchInput);
  };
  const handleChangePage = (page2) => {
    setPage(page2);
  };
  const handleExport = ({ toExport, start_date, end_date }) => {
    const headers = [
      { header: "Activity Logs ID ", key: "id", width: 40 },
      { header: "Date", key: "date", width: 30 },
      { header: "Activity", key: "activity", width: 60 },
      { header: "Performed By", key: "performedBy", width: 40 }
    ];
    let data = toExport?.map((row) => {
      return {
        id: row.id,
        date: row.date,
        activity: row.activity,
        performedBy: `${row.performedBy.username} - ${row.performedBy.roles[0].description}`
      };
    });
    exportToExcel({ data, headers, filename: `activityLogs-${start_date}-to-${end_date}` });
  };
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "Date",
        name: "date",
        render(row, value, rowIndex) {
          const date2 = new Date(value);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-normal", children: date2.toLocaleString() });
        }
      },
      {
        label: "Activity",
        name: "activity",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-normal", children: value });
        }
      },
      {
        label: "Performed By",
        name: "performedBy",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-normal flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: value?.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-700", children: value?.roles[0].description })
          ] });
        }
      }
    ];
  }, [rows]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExportModal,
      {
        search,
        status,
        isOpen: isExportModalOpen,
        onClose: () => setIsExportModalOpen(false),
        handleFunction: handleExport,
        exportFunction: exportActivityLogs
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Activity Logs", description: "Showing all activity logs" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "activity-log-date",
            value: date === null ? "" : date,
            onChange: (e) => setDate(e.target.value),
            type: "date",
            id: "activity-log-date",
            className: "bg-transparent text-gray-500 h-12 border border-gray-300 p-4 mb-1 rounded-md",
            placeholder: "Enter Date",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            handleFetchData: handleSearch
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PrimaryButton,
          {
            onClick: () => {
              setIsExportModalOpen(true);
            },
            text: "Export"
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
  ActivityLogs as default
};
