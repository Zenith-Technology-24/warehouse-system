import { u as useToast, a as useNavigate, r as reactExports, e as useParams, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as Table } from "./Table-HZ94nljW.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { d as deleteSalesProduct, b as fetchOneSales } from "./salesApi-BtYwXdgY.js";
import { M as Modal } from "./Modal-BvOOYCSa.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const View = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isDeleteProductOpen, setIsDeleteProductOpen] = reactExports.useState(false);
  const { id } = useParams();
  const [page, setPage] = reactExports.useState(1);
  const limit = 5;
  const { data, refetch } = useQuery({
    queryKey: ["sales_details", id],
    queryFn: () => fetchOneSales(Number(id))
  });
  const rows = reactExports.useMemo(() => {
    return data?.salesInventory?.slice(
      (page - 1) * limit,
      page * limit
    );
  }, [data, page]);
  const totalPages = Math.ceil(data?.salesInventory.length / limit);
  const [toDelete, setToDelete] = reactExports.useState(null);
  const handleChangePage = (page2) => {
    setPage(page2);
  };
  const deleteProduct = useMutation({
    mutationFn: deleteSalesProduct,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setIsDeleteProductOpen(false);
      refetch();
      showToast(
        `Product Successfully Deleted!`,
        `Product has been successfully Deleted.`,
        "success"
      );
      setToDelete(null);
    }
  });
  const handleDeleteProduct = () => {
    if (rows?.length > 1) {
      deleteProduct.mutate({
        id: toDelete
      });
    } else {
      showToast(
        `Product Unsuccessfully Deleted!`,
        `Sales must have atleast one product left.`,
        "error"
      );
      setIsDeleteProductOpen(false);
      setToDelete(null);
    }
  };
  const handleOpenDeleteProduct = (id2) => {
    setIsDeleteProductOpen(true);
    setToDelete(id2);
  };
  const columns = reactExports.useMemo(() => {
    return [
      {
        label: "Product",
        name: "inventory",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: value.product_name });
        }
      },
      {
        label: "Quantity",
        name: "quantity",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: value });
        }
      },
      {
        label: "Amount",
        name: "total_price",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "₱",
            value
          ] });
        }
      },
      {
        label: "Terms",
        name: "terms",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: value });
        }
      },
      {
        label: "Action",
        name: "id",
        render(row, value, rowIndex) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => handleOpenDeleteProduct(value), className: "p-2 rounded-full hover:bg-gray-100 cursor-pointer transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4 text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" }) }) }) });
        }
      }
    ];
  }, [rows]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isDeleteProductOpen,
        title: "Delete Product",
        onClose: () => setIsDeleteProductOpen(false),
        handleFunction: () => handleDeleteProduct(),
        message: "Are you sure you want to delete this Product?"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Sales", description: "Showing all sales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate(-1), className: "rounded-lg font-lato border border-aaa text-aaa p-3", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/sales/update", { state: data }), className: "rounded-lg font-lato bg-aaa text-white p-3", children: "Update" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg py-4 px-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-4", children: "Customer Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mr-40 text-gray-500 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Customer First Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Customer Last Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Contact Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Address" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data?.customer.first_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data?.customer.last_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data?.customer.contact_number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data?.customer.address })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-4", children: "Product Information" }),
        data && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Table,
          {
            currentPage: page,
            setCurrentPage: setPage,
            totalRows: rows?.length || 1,
            columns,
            rows: { data: rows },
            rowsPerPage: limit,
            totalPages,
            onPageChange: handleChangePage,
            footerTableJSX: /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { className: "sticky bottom-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("th", { colSpan: columns?.length ?? 1, className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-2 ", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Sales: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal", children: `₱${data?.total ?? 0}` })
            ] }) }) }) })
          }
        )
      ] })
    ] })
  ] });
};
export {
  View as default
};
