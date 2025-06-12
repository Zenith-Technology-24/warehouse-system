import { b as useLocation, a as useNavigate, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { a as create$3, c as create$6, f as create$2, b as create$5, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { f as fetchCustomers, a as fetchProductNames } from "./customerApi-C6zxTxrG.js";
import { a as updateSales } from "./salesApi-BtYwXdgY.js";
import { D as DropdownWithSearch } from "./DropdownWithSearch-DzCqGmaj.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
import "./useQuery-CONvhY0t.js";
const UpdateSales = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(null);
  const [isLookingForCustomer, setIsLookingForCustomer] = reactExports.useState(false);
  const formRef = reactExports.useRef();
  const [total, setTotal] = reactExports.useState(0);
  const updateSalesMutation = useMutation({
    mutationFn: (values) => updateSales({ ...values, id: state.id, customer_id: isLookingForCustomer ? values.customer_id : state.customer.id }),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      showToast(
        "Expenses Successfully Updated!",
        "",
        "success"
      );
      navigate("/sales", { replace: true });
    }
  });
  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };
  const validationSchema = create$3().shape({
    customer_id: isLookingForCustomer && create$6().required("Customer is required"),
    customer_firstname: !isLookingForCustomer && create$6().required("Customer first name is required").min(1, "Too short").max(250, "Too long"),
    customer_lastname: !isLookingForCustomer && create$6().required("Customer last name is required").min(1, "Too short").max(250, "Too long"),
    customer_contactnumber: !isLookingForCustomer && create$6().required("Contact number is required"),
    customer_address: !isLookingForCustomer && create$6().required("Address is required").min(1, "Too short").max(250, "Too long"),
    inventories: create$2().of(
      create$3().shape({
        inventory: create$3().shape({
          id: create$5().required("Product is required")
        }),
        quantity: create$5().required("Quantity is required").min(1, "Quantity must be at least 1").typeError("Quantity must be a number"),
        total_price: create$5().required("Amount is required").min(0, "Amount cannot be negative").typeError("Amount must be a number"),
        terms: create$6().required("Terms is required").min(1, "Too short").max(250, "Too long")
      })
    )
  });
  const initialValues = {
    customer_id: null,
    customer_firstname: state.customer.first_name,
    customer_lastname: state.customer.last_name,
    customer_contactnumber: state.customer.contact_number,
    customer_address: state.customer.address,
    inventories: state.salesInventory
  };
  const calculateTotal = (inventories) => {
    return inventories.reduce((acc, item) => {
      const totalPrice = Number.parseFloat(item.total_price);
      return acc + (Number.isNaN(totalPrice) ? 0 : totalPrice);
    }, 0);
  };
  reactExports.useEffect(() => {
    setSelectedCustomer(null);
  }, [isLookingForCustomer]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Update Sales", description: "Sales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TopButtons, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate(-1), className: "rounded-lg font-lato border border-aaa text-aaa p-3", children: "Cancel" }),
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
          updateSalesMutation.mutate(isLookingForCustomer ? {
            customer_id: values.customer_id,
            inventories: values.inventories
          } : values);
        },
        children: ({ values, setFieldValue }) => {
          reactExports.useEffect(() => {
            const computedTotal = calculateTotal(values.inventories);
            setTotal(computedTotal);
          }, [values.inventories]);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-gray-200 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg", children: "Customer Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-2 gap-1 border-b mb-5 pb-10", children: [
                isLookingForCustomer ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-row py-3 item-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownWithSearch,
                    {
                      setFieldValue,
                      label: "Customer",
                      placeholder: "Search customer",
                      name: "customer_id",
                      fetchNames: fetchCustomers,
                      setSelectedValue: setSelectedCustomer
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center mx-3 mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsLookingForCustomer(false), className: "rounded-lg font-lato bg-aaa text-white p-3 px-5", children: "Back" }) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "customer_firstname", children: "Customer First Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        as: "input",
                        name: "customer_firstname",
                        placeholder: "Enter Customer First Name",
                        className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                        fullWidth: true,
                        variant: "outlined",
                        size: "small"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "customer_firstname", component: "div" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "customer_lastname", children: "Customer Last Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        as: "input",
                        name: "customer_lastname",
                        placeholder: "Enter Customer Last name",
                        className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                        fullWidth: true,
                        variant: "outlined",
                        size: "small"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "customer_lastname", component: "div" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "customer_contactnumber", children: "Contact Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        as: "input",
                        name: "customer_contactnumber",
                        placeholder: "Enter Contact Number",
                        className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                        fullWidth: true,
                        variant: "outlined",
                        size: "small"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "customer_contactnumber", component: "div" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " flex h-auto flex-col py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: "customer_address", children: "Customer Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        as: "input",
                        name: "customer_address",
                        placeholder: "Enter Address",
                        className: "bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md",
                        fullWidth: true,
                        variant: "outlined",
                        size: "small"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "customer_address", component: "div" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { onClick: () => setIsLookingForCustomer(true), className: "underline text-gray-400 text-sm hover:text-blue-500 cursor-pointer", children: "Look for an existing customer now." }) })
                ] }),
                selectedCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1 col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", children: "Customer First Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        className: "bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md",
                        value: selectedCustomer?.first_name,
                        disabled: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", children: "Customer Last Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        className: "bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md",
                        value: selectedCustomer?.last_name,
                        disabled: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", children: "Customer Contact Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        className: "bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md",
                        value: selectedCustomer?.contact_number,
                        disabled: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", children: "Customer Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        className: "bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md",
                        value: selectedCustomer?.address,
                        disabled: true
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg", children: "Product Information" }),
              values?.inventories?.map((inv, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-2 gap-1 border-b mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownWithSearch,
                    {
                      setFieldValue,
                      label: "Product",
                      placeholder: "Search Product",
                      name: `inventories[${index}].inventory.id`,
                      fetchNames: fetchProductNames,
                      forUpdate: inv.inventory,
                      _index: index,
                      values
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventories[${index}].inventory.id`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: `inventories[${index}].quantity`, children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      as: "input",
                      type: "number",
                      name: `inventories[${index}].quantity`,
                      placeholder: "Enter Quantity",
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                      fullWidth: true,
                      variant: "outlined",
                      size: "small",
                      onChange: (e) => {
                        setFieldValue(`inventories[${index}].quantity`, e.target.value);
                        values.inventories[index].inventory.price ? setFieldValue(`inventories[${index}].total_price`, values.inventories[index].inventory.price * e.target.value) : setFieldValue(`inventories[${index}].total_price`, values.inventories[index].price * e.target.value);
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventories[${index}].quantity`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: `inventories[${index}].total_price`, children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      as: "input",
                      type: "number",
                      name: `inventories[${index}].total_price`,
                      placeholder: "₱0.00",
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                      fullWidth: true,
                      variant: "outlined",
                      size: "small"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventories[${index}].total_price`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2 text-gray-500", htmlFor: `inventories[${index}].terms`, children: "Terms" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Field,
                    {
                      as: "select",
                      name: `inventories[${index}].terms`,
                      className: `${inv.terms === "" && "text-gray-400"} bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon`,
                      fullWidth: true,
                      variant: "outlined",
                      size: "small",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, selected: true, children: "Select Terms" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30 days", children: "30 days" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60 days", children: "60 days" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "90 days", children: "90 days" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "120 days", children: "120 days" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventories[${index}].terms`, component: "div" }) })
                ] })
              ] }, index)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => values.inventories?.length > 1 && setFieldValue("inventories", values.inventories.slice(0, -1)), className: `flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventories?.length > 1 && "hover:text-red-400"} cursor-pointer`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Remove Product" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setFieldValue("inventories", [...values.inventories, { id: null, quantity: 0, total_price: 0, price: 0, terms: "30 days" }]), className: "flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add Product" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row h-12 w-full bg-transparent rounded-xl justify-end items-center align-middle sticky bottom-4  mt-2 px-4 ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center h-full w-[10%] min-w-fit bg-aaa justify-start rounded-md p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold", children: `Total:      ₱${total}` }) }) })
          ] });
        }
      }
    ) })
  ] });
};
export {
  UpdateSales as default
};
