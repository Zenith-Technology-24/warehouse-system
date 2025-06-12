import { f as useQueryClient, a as useNavigate, b as useLocation, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { a as create$3, c as create$6, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { L as LinkSecondaryButton } from "./LinkSecondaryButton-LxANXQwB.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { D as DropdownWithSearch } from "./DropdownWithSearch-DzCqGmaj.js";
import { a as fetchReceiptRefs } from "./issuanceApi-CQlqxOQ2.js";
import { a as fetchOneReturnedItems, b as updateReturnedItems } from "./returnedItemsApi-BxUpgx7f.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const UpdateReturnOfItems = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showToast } = useToast();
  const [initialValues, setInitialValues] = reactExports.useState(null);
  const [itemNames, setItemNames] = reactExports.useState("");
  const formRef = reactExports.useRef();
  const { data } = useQuery({
    queryKey: ["returned-item", state.id],
    queryFn: () => fetchOneReturnedItems(state.id)
  });
  const { data: receiptRefs } = useQuery({
    queryKey: ["receipt-list"],
    queryFn: () => fetchReceiptRefs("all")
  });
  reactExports.useEffect(() => {
    if (data) {
      const matchItem = receiptRefs?.find((ref) => ref.name === data?.receiptRef);
      const mappedItems = Object.values(
        matchItem?.items?.reduce((acc, { id, name, size, unit, price, inventoryId }) => {
          if (!acc[name]) {
            acc[name] = { id, name, size: [{ name: size, price }], unit, price, inventoryId };
          } else {
            acc[name].size.push({ name: size, price });
          }
          return acc;
        }, {}) || {}
      );
      const item = mappedItems?.find((item2) => item2?.name === data.itemName);
      setItemNames(mappedItems);
      setInitialValues({
        id: data?.id,
        receiptRef: data?.receiptRef,
        itemName: data?.itemName,
        size: data?.size,
        itemSizes: item?.size,
        personnel: data?.personnel,
        date: data?.date,
        time: data?.time,
        notes: data?.notes
      });
    }
  }, [state, data, receiptRefs]);
  const updateReturnedItemsMutation = useMutation({
    mutationFn: (values) => updateReturnedItems(values),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      showToast(
        "Returned item Updated Successfully!",
        "Returned item has been updated to the system.",
        "success"
      );
      setInitialValues(null);
      queryClient.invalidateQueries(["returned-item", state.id]);
      navigate("/return-of-items", { replace: true });
    }
  });
  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };
  const validationSchema = create$3().shape({
    receiptRef: create$6().required("Receipt ref is required"),
    itemName: create$6().required("Item name is required"),
    size: create$6().required("Size is required"),
    personnel: create$6().required("Personnel is required"),
    sizeType: create$6(),
    date: create$6().required("Date is required"),
    time: create$6().required("Time is required"),
    notes: create$6().required("Notes is required")
  });
  const handleRefetch = (refetchFn) => {
    refetchFn();
  };
  const defaultSizeMap = {
    numerical: "5",
    standard: "S",
    length: "XXS",
    fit: "5R",
    expanded: "52",
    roman: "I",
    none: "none"
  };
  if (!initialValues) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No Data Available" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Update Return Of Items", description: "Return of items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LinkSecondaryButton, { to: "..", text: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { text: "Update", onClick: handleSave })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full h-full justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Formik,
      {
        innerRef: formRef,
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
          const { itemSizes, ...filteredValues } = values;
          updateReturnedItemsMutation.mutate(filteredValues);
        },
        children: ({ setFieldValue, values }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { className: " w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "receiptRef", children: "Receipt Ref" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DropdownWithSearch,
              {
                formikSelectedValue: values?.receiptRef,
                placeholder: "Receipt Ref",
                name: "receiptRef",
                fetchNames: () => {
                  fetchReceiptRefs("all");
                },
                setFieldValue,
                refetchData: handleRefetch,
                setSelectedValue: (value) => {
                  const mappedItems = Object.values(
                    value?.items?.reduce((acc, { id, name, size, unit, price, inventoryId }) => {
                      if (!acc[name]) {
                        acc[name] = { id, name, size: [{ name: size, price }], unit, price, inventoryId };
                      } else {
                        acc[name].size.push({ name: size, price });
                      }
                      return acc;
                    }, {}) || {}
                  );
                  setItemNames(mappedItems);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "itemName", children: "Item Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DropdownWithSearch,
              {
                formikSelectedValue: values?.itemName,
                placeholder: "Item Name",
                name: "itemName",
                fetchNames: () => itemNames || [],
                setFieldValue,
                refetchData: handleRefetch,
                setSelectedValue: (value) => {
                  setFieldValue(`size`, defaultSizeMap[value.sizeType] || "none");
                  setFieldValue(`sizeType`, value.sizeType);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "size", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "select",
                name: "size",
                placeholder: "Size",
                className: "bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon",
                onChange: (e) => {
                  const selectedSize = e.target.value;
                  setFieldValue("size", selectedSize);
                },
                children: values?.itemSizes?.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: size.id, children: size.name }, size.id))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "size", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "personnel", children: "Personnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "personnel",
                placeholder: "Personnel",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "personnel", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "date", children: "Return Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                type: "date",
                name: "date",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "date", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "time", children: "Return Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                type: "time",
                name: "time",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "time", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "notes", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "notes",
                placeholder: "Notes",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "notes", component: "div" }) })
          ] })
        ] }) })
      }
    ) })
  ] });
};
export {
  UpdateReturnOfItems as default
};
