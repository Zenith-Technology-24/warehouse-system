import { b as useLocation, a as useNavigate, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { a as create$3, c as create$6, b as create$5, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { L as LinkSecondaryButton } from "./LinkSecondaryButton-LxANXQwB.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { a as updateExpense } from "./expensesApi-Bq0211JH.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const UpdateExpense = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formRef = reactExports.useRef();
  const updateExpenseMutation = useMutation({
    mutationFn: (values) => updateExpense(values),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      showToast(
        "Expense Update Successfully!",
        "",
        "success"
      );
      navigate("/expenses", { replace: true });
    }
  });
  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };
  const validationSchema = create$3().shape({
    expense_type: create$6().required("Expense type is required").min(1, "Too short").max(250, "Too long"),
    amount: create$5().required("Amount is required").min(0, "Amount cannot be negative").typeError("Amount be a number"),
    first_name: create$6().required("First name is required"),
    last_name: create$6().required("Last name is required"),
    description: create$6().required("Description is required")
  });
  const initialValues = {
    id: state.id,
    expense_type: state.expense_type,
    amount: state.amount,
    first_name: state.first_name,
    last_name: state.last_name,
    description: state.description
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Create Expenses", description: "Expenses" }),
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
          let newValues = values;
          if (values.expense_type === "Other") {
            newValues = {
              expense_type: values.other,
              first_name: values.first_name,
              last_name: values.last_name,
              amount: values.amount,
              description: values.description
            };
          }
          updateExpenseMutation.mutate(newValues);
        },
        children: ({ setFieldValue, values }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "expense_type", children: "Expense Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Field,
              {
                as: "select",
                name: "expense_type",
                className: `${!values.expense_type && "text-gray-500"} bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon`,
                fullWidth: true,
                variant: "outlined",
                size: "small",
                onChange: (e) => setFieldValue("expense_type", e.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, selected: true, children: "Select Expense Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Office Supplies", children: "Office Supplies" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Food", children: "Food" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Salary", children: "Salary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Transportation", children: "Transportation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "expense_type", component: "div" }) })
          ] }),
          values.expense_type === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "other", children: "Please Specify Expense" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "other",
                placeholder: "Enter Expense",
                className: "bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "other", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "amount", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "amount",
                placeholder: "₱0.00",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "amount", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "size", children: "First Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "first_name",
                placeholder: "Enter First Name",
                className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "first_name", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "inStock", children: "Last Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "input",
                name: "last_name",
                placeholder: "Enter Last Name",
                className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "last_name", component: "div" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col col-span-2 p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "cost", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                as: "textarea",
                name: "description",
                placeholder: "Enter Description",
                className: "bg-transparent border border-gray-300 p-4 mb-1 rounded-md h-32",
                fullWidth: true,
                variant: "outlined",
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "description", component: "div" }) })
          ] })
        ] }) })
      }
    ) })
  ] });
};
export {
  UpdateExpense as default
};
