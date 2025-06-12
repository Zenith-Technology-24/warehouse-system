import { a as useNavigate, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { c as createProduct } from "./inventoryApi-CQCigH3Z.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { a as create$3, c as create$6, b as create$5, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { L as LinkSecondaryButton } from "./LinkSecondaryButton-LxANXQwB.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const CreateProduct = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formRef = reactExports.useRef();
  const createProductMutation = useMutation({
    mutationFn: (values) => {
      return createProduct(values);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      showToast(
        "Product Created Successfully!",
        "New product has been added to the system.",
        "success"
      );
      navigate("/inventory", { replace: true });
    }
  });
  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };
  const validationSchema = create$3().shape({
    productName: create$6().required("Product Name is required").min(1, "Too short").max(250, "Too long"),
    category: create$6().required("Category is required").min(1, "Too short").max(250, "Too long"),
    size: create$6().required("Size is required"),
    inStock: create$5().required("Stock is required").min(0, "Stock cannot be negative").typeError("Stock be a number"),
    cost: create$5().required("Cost is required").min(0, "Cost cannot be negative").typeError("Cost be a number"),
    price: create$5().required("Price is required").min(0, "Price cannot be negative").typeError("Price be a number")
  });
  const initialValues = {
    productName: "",
    category: "",
    size: "",
    inStock: "",
    cost: 0,
    price: 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Create Inventory", description: "Inventory" }),
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
        onSubmit: (values, {}) => {
          createProductMutation.mutate(values);
        },
        children: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { className: " w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "productName", children: "Product Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "productName",
                placeholder: "Enter Product Name",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "productName", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "category", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "category",
                placeholder: "Enter Category",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "category", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "size", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "size",
                placeholder: "Enter size",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "size", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "inStock", children: "In Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "inStock",
                placeholder: "Enter stock",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "inStock", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "cost", children: "Cost" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "cost",
                placeholder: "Enter Cost",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "cost", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "price", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "price",
                placeholder: "Enter Price",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "price", component: "div" }) })
          ] })
        ] }) })
      }
    ) })
  ] });
};
export {
  CreateProduct as default
};
