import { a as useNavigate, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { a as create$3, c as create$6, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { L as LinkSecondaryButton } from "./LinkSecondaryButton-LxANXQwB.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { D as DropdownWithSearch } from "./DropdownWithSearch-DzCqGmaj.js";
import { a as fetchReceiptRefs } from "./issuanceApi-CQlqxOQ2.js";
import { c as createReturnedItems } from "./returnedItemsApi-BxUpgx7f.js";
import "./utils-QRJGL1kX.js";
import "./useQuery-CONvhY0t.js";
import "./axios-DSoLq97m.js";
const CreateReturnOfItems = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [itemNames, setItemNames] = reactExports.useState([]);
  const formRef = reactExports.useRef();
  const createReturnedItemsMutation = useMutation({
    mutationFn: (values) => createReturnedItems(values),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      showToast(
        "Returned item Created Successfully!",
        "New Returned item has been added to the system.",
        "success"
      );
      navigate("/return-of-items", { replace: true });
    }
  });
  const handleSave = () => {
    console.log(formRef?.current);
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
    notes: create$6().required("Notes is required"),
    itemId: create$6().nullable().optional(),
    inventoryId: create$6().nullable().optional()
  });
  const initialValues = {
    receiptRef: "",
    itemName: "",
    size: "",
    itemId: "",
    personnel: "",
    itemSizes: [],
    sizeType: "",
    date: "",
    time: "",
    notes: "",
    inventoryId: ""
  };
  const handleRefetch = (refetchFn) => {
    refetchFn();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Create Return Of Items", description: "Return of items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LinkSecondaryButton, { to: "..", text: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { text: "Save", onClick: handleSave })
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
          const { ...filteredValues } = values;
          createReturnedItemsMutation.mutate(filteredValues);
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
                fetchNames: () => fetchReceiptRefs("all"),
                setFieldValue,
                refetchData: handleRefetch,
                setSelectedValue: (value) => {
                  const mappedItems = Object.values(
                    value?.items?.reduce((acc, { id, name, size, unit, price, inventoryId }) => {
                      if (!acc[name]) {
                        acc[name] = { id, name, size: [{ itemId: id, name: size, price }], unit, price, inventoryId };
                      } else {
                        acc[name].size.push({ name: size, price, itemId: id });
                      }
                      return acc;
                    }, {}) || {}
                  );
                  setItemNames(mappedItems);
                  setFieldValue("itemName", "");
                  setFieldValue("size", "");
                  setFieldValue("itemSizes", []);
                  setFieldValue("itemId", "");
                  setFieldValue("inventoryId", "");
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
                  setFieldValue(`sizeType`, value.sizeType || "none");
                  setFieldValue("itemSizes", value.size || []);
                  setFieldValue("inventoryId", value.inventoryId);
                  setFieldValue("size", "");
                  setFieldValue("itemId", "");
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "size", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Field,
              {
                as: "select",
                name: "size",
                placeholder: "Size",
                className: "bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon",
                onChange: (e) => {
                  const selectedSize = e.target.value;
                  const sizeObj = values.itemSizes.find(
                    (size) => size.itemId === selectedSize
                  );
                  if (sizeObj) {
                    setFieldValue("size", sizeObj.name);
                    setFieldValue("itemId", sizeObj.itemId);
                  }
                },
                disabled: values.itemSizes.length === 0,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, selected: true, children: "Select Size" }),
                  Array.isArray(values.itemSizes) && values.itemSizes.map((size, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: size.itemId, children: size.name }, `${size.name}-${index}`))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "size", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col", children: [
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
            )
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
  CreateReturnOfItems as default
};
