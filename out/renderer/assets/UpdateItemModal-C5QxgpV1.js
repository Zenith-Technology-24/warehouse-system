import { j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { a as create$3, c as create$6, u as useFormik, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { a as apiService } from "./axios-DSoLq97m.js";
const VALIDATION_SCHEMA$1 = create$3().shape({
  name: create$6().required("Item name is required"),
  sizeType: create$6().required("Size is required"),
  unit: create$6().required("Unit is required")
});
const AddItemModal = ({ isOpen, onClose, handleFunction }) => {
  if (!isOpen) return null;
  const schema = useFormik({
    validateOnMount: false,
    initialValues: {
      name: "",
      sizeType: "none",
      unit: ""
    },
    validationSchema: VALIDATION_SCHEMA$1,
    onSubmit(values) {
      handleFunction(values);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center !z-[9999]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 min-w-[500px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium text-gray-800 mb-4", children: "Add Item Type" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-sm", children: "Item Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "name",
            value: schema.values.name,
            onChange: schema.handleChange,
            id: "name",
            className: "bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md",
            placeholder: "Enter Item Name",
            required: true
          }
        ),
        schema.errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: schema.errors.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-sm", children: "Size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            name: "sizeType",
            value: schema.values.sizeType,
            onChange: schema.handleChange,
            id: "sizeType",
            className: "bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md custom-select-icon",
            required: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "No Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "standard", children: "Standard (XS, S, M, L, XL, 2XL, 3XL)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "numerical", children: "Numeric (5-12.5)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "length", children: "Length Variants (XXS, SS, SR, SL, MS, MR, ML, LS, LR, LL)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fit", children: "Fit Variants (5R-12R, 5W-12W)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expanded", children: "Expanded Numeric (52-60)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "roman", children: "Roman Numerals (I-X)" })
            ]
          }
        ),
        schema.errors.sizeType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: schema.errors.sizeType })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-sm", children: "Default UoM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "unit",
            value: schema.values.unit,
            onChange: schema.handleChange,
            id: "uom",
            className: "bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md",
            placeholder: "Default",
            required: true
          }
        ),
        schema.errors.unit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: schema.errors.unit })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3 mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "grow border border-aaa hover:border-aaa text-aaa py-2 px-4 rounded-lg",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          onClick: schema.handleSubmit,
          className: "grow bg-aaa hover:border-aaa text-white py-2 px-4 rounded-lg",
          children: "Add Item"
        }
      )
    ] })
  ] }) });
};
const addItemType = async (data) => {
  const res = await apiService.post("/inventory/type", data);
  return res;
};
const updateItemType = async (data) => {
  const res = await apiService.put(`/inventory/item/update/${data.id}`, data);
  return res;
};
const deleteItemType = async (id) => {
  const res = await apiService.get(`/inventory/item/delete/${id}`);
  return res;
};
const fetchItemType = async () => {
  const { data } = await apiService.get("/inventory/type");
  return data;
};
const sizeOptions = [
  {
    type: "none",
    options: [{ label: "None", value: "none" }]
  },
  {
    type: "standard",
    options: [
      { label: "XS", value: "XS" },
      { label: "S", value: "S" },
      { label: "M", value: "M" },
      { label: "L", value: "L" },
      { label: "XL", value: "XL" },
      { label: "2XL", value: "2XL" },
      { label: "3XL", value: "3XL" }
    ]
  },
  {
    type: "numerical",
    options: Array.from({ length: 13 }, (_, i) => {
      const value = (i < 8 ? 5 + i * 0.5 : 9 + (i - 8) * 0.5).toFixed(1);
      return { label: value, value };
    })
  },
  {
    type: "length",
    options: ["XXS", "SS", "SR", "SL", "MS", "MR", "ML", "LS", "LR", "LL"].map((value) => ({ label: value, value }))
  },
  {
    type: "fit",
    options: [
      ...["5R", "5.5R", "6R", "6.5R", "7R", "7.5R", "8R", "8.5R", "9R", "9.5R", "10R", "10.5R", "11R", "11.5R", "12R"],
      ...["5W", "5.5W", "6W", "6.5W", "7W", "7.5W", "8W", "8.5W", "9W", "9.5W", "10W", "10.5W", "11W", "11.5W", "12W"]
    ].map((value) => ({ label: value, value }))
  },
  {
    type: "expanded",
    options: Array.from({ length: 9 }, (_, i) => {
      const value = (52 + i).toString();
      return { label: value, value };
    })
  },
  {
    type: "roman",
    options: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map((value) => ({ label: value, value }))
  }
];
function SizeSelector({ name = null, inventory, index = 0, classes }) {
  const selectedSizeType = inventory?.sizeType;
  const selectedOptions = sizeOptions.find((option) => option.type === selectedSizeType)?.options || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex h-auto flex-col py-3 col-span-2 ${classes}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "pb-2", htmlFor: name || `inventory[${index}].item.size`, children: [
      "Size ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "(Optional)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        as: "select",
        name: name || `inventory[${index}].item.size`,
        disabled: selectedSizeType === "none",
        className: "bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon",
        children: selectedOptions.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: label }, value))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventory[${index}].item.size`, component: "div" }) })
  ] });
}
const VALIDATION_SCHEMA = create$3().shape({
  id: create$6().required("ID is required"),
  name: create$6().required("Item name is required"),
  sizeType: create$6().required("Size is required"),
  unit: create$6().required("Unit is required")
});
const UpdateItemModal = ({ data, isOpen, onClose, handleFunction }) => {
  if (!isOpen) return null;
  const schema = useFormik({
    validateOnMount: false,
    initialValues: {
      id: data?.id,
      name: data?.name,
      sizeType: data?.sizeType,
      unit: data?.unit
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit(values) {
      handleFunction(values);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center !z-[9999]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 min-w-[500px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium text-gray-800 mb-4", children: "Update Item Type" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-sm", children: "Item Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "name",
            value: schema.values.name,
            onChange: schema.handleChange,
            id: "name",
            className: "bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md",
            placeholder: "Enter Item Name",
            required: true
          }
        ),
        schema.errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: schema.errors.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-sm", children: "Size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            name: "sizeType",
            value: schema.values.sizeType,
            onChange: schema.handleChange,
            id: "sizeType",
            className: "bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md custom-select-icon",
            required: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "No Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "standard", children: "Standard (XS, S, M, L, XL, 2XL, 3XL)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "numerical", children: "Numeric (5-12.5)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "length", children: "Length Variants (XXS, SS, SR, SL, MS, MR, ML, LS, LR, LL)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fit", children: "Fit Variants (5R-12R, 5W-12W)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expanded", children: "Expanded Numeric (52-60)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "roman", children: "Roman Numerals (I-X)" })
            ]
          }
        ),
        schema.errors.sizeType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: schema.errors.sizeType })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-sm", children: "Default UoM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "unit",
            value: schema.values.unit,
            onChange: schema.handleChange,
            id: "uom",
            className: "bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md",
            placeholder: "Default",
            required: true
          }
        ),
        schema.errors.unit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: schema.errors.unit })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3 mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "grow border border-aaa hover:border-aaa text-aaa py-2 px-4 rounded-lg",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          onClick: schema.handleSubmit,
          className: "grow bg-aaa hover:border-aaa text-white py-2 px-4 rounded-lg",
          children: "Update Item"
        }
      )
    ] })
  ] }) });
};
export {
  AddItemModal as A,
  SizeSelector as S,
  UpdateItemModal as U,
  addItemType as a,
  deleteItemType as d,
  fetchItemType as f,
  updateItemType as u
};
