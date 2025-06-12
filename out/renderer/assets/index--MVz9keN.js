import { a as useNavigate, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { a as create$3, c as create$6, f as create$2, b as create$5, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { L as LinkSecondaryButton } from "./LinkSecondaryButton-LxANXQwB.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { u as useQuery } from "./useQuery-CONvhY0t.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { A as AddItemModal, U as UpdateItemModal, f as fetchItemType, S as SizeSelector, a as addItemType, u as updateItemType, d as deleteItemType } from "./UpdateItemModal-C5QxgpV1.js";
import { D as DropdownWithSearch } from "./DropdownWithSearch-DzCqGmaj.js";
import { c as createReceipt } from "./receiptApi-DfxsCQnj.js";
import { M as Modal } from "./Modal-BvOOYCSa.js";
import "./utils-QRJGL1kX.js";
import "./axios-DSoLq97m.js";
const CreateReceipt = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formRef = reactExports.useRef();
  const [addItemModalOpen, setIsAddItemModalOpen] = reactExports.useState(false);
  const [updateItemModalOpen, setIsUpdateItemModalOpen] = reactExports.useState(false);
  const [isDeleteTypeModalOpen, setIsDeleteTypeModalOpen] = reactExports.useState(false);
  const [selectedItemType, setSelectedItemType] = reactExports.useState(null);
  useQuery({
    queryKey: ["item-types"],
    queryFn: fetchItemType
  });
  const createReceiptMutation = useMutation({
    mutationFn: (values) => createReceipt(values),
    onError: (error) => {
      showToast(
        error?.response?.data?.message,
        "",
        "error"
      );
    },
    onSuccess: () => {
      showToast(
        "Receipt Successfully Created!",
        "",
        "success"
      );
      navigate("/receipt", { replace: true });
    }
  });
  const addItem = useMutation({
    mutationFn: addItemType,
    onError: (error) => {
      showToast(
        error?.response?.data?.message,
        "",
        "error"
      );
    },
    onSuccess: () => {
      showToast(
        "Item Type Successfully Added",
        "Item Type has been successfully added.",
        "success"
      );
      setIsAddItemModalOpen(false);
    }
  });
  const updateItem = useMutation({
    mutationFn: updateItemType,
    onError: (error) => {
      showToast(
        error?.response?.data?.message,
        "",
        "error"
      );
    },
    onSuccess: () => {
      showToast(
        "Item Type Successfully Updated",
        "Item Type has been successfully updated.",
        "success"
      );
      setIsUpdateItemModalOpen(false);
    }
  });
  const deleteItem = useMutation({
    mutationFn: deleteItemType,
    onError: (error) => {
      showToast(
        error?.response?.data?.message,
        "",
        "error"
      );
    },
    onSuccess: () => {
      showToast(
        "Item Type Successfully Deleted",
        "Item Type has been successfully deleted.",
        "success"
      );
      setIsDeleteTypeModalOpen(false);
    }
  });
  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };
  const validationSchema = create$3().shape({
    source: create$6().required("Please input the Source"),
    issuanceDirective: create$6().required("Please input the Issuance Directive"),
    receipt_date: create$6().required("Please input the Receipt Date "),
    inventory: create$2().of(
      create$3().shape({
        id: create$6().nullable(),
        name: create$6().required("Please input the Name"),
        sizeType: create$6().required("Please input the Size Type "),
        item: create$3().shape({
          location: create$6().required("Please input the Inventory Location"),
          quantity: create$5().required("Please input the Inventory Quantity"),
          price: create$5().required("Please input the Inventory Price"),
          amount: create$5().required("Please input the Inventory Amount"),
          unit: create$6().required("Please input the Inventory Unit"),
          size: create$6().required("Please input the Inventory Size"),
          expiryDate: create$6()
        })
      })
    )
  });
  const initialValues = {
    source: "",
    issuanceDirective: "",
    receipt_date: "",
    inventory: [
      {
        id: "",
        name: "",
        sizeType: "",
        item: {
          location: "",
          quantity: 1,
          price: 0,
          amount: 0,
          unit: "",
          size: "none",
          expiryDate: ""
        }
      }
    ]
  };
  const handleRefetch = (refetchFn) => {
    refetchFn();
  };
  const handleDeleteItemType = () => {
    deleteItem.mutate(selectedItemType.id);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: isDeleteTypeModalOpen,
        title: "Delete Item Type",
        onClose: () => setIsDeleteTypeModalOpen(false),
        handleFunction: () => handleDeleteItemType(),
        message: `Are you sure you want to delete this item type ${selectedItemType?.name}?`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddItemModal,
      {
        isOpen: addItemModalOpen,
        onClose: () => setIsAddItemModalOpen(false),
        handleFunction: (e) => addItem.mutate(e)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpdateItemModal,
      {
        data: selectedItemType,
        isOpen: updateItemModalOpen,
        onClose: () => setIsUpdateItemModalOpen(false),
        handleFunction: (e) => updateItem.mutate(e)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Create Receipt", description: "Receipt" }),
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
          const formattedValues = {
            ...values,
            receipt_date: values.receipt_date ? `${values.receipt_date}T00:00:00.000Z` : null,
            inventory: values.inventory.map((inv) => ({
              ...inv,
              item: {
                ...inv.item,
                amount: inv.item.price * inv.item.quantity,
                expiryDate: inv.item?.expiryDate ? `${inv.item.expiryDate}T00:00:00.000Z` : null
              }
            }))
          };
          createReceiptMutation.mutate(formattedValues);
        },
        children: ({ values, setFieldValue }) => {
          const totalAmount = values.inventory.reduce((sum, inv) => {
            return sum + (inv?.item?.price * inv?.item?.quantity || 0);
          }, 0);
          const updateAmount = (index, price, quantity) => {
            const amount = price * quantity;
            setFieldValue(`inventory.${index}.item.amount`, amount);
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-gray-200 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg", children: "Receipt Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-2 gap-1 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "receipt_date", children: "Receipt Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    type: "date",
                    name: "receipt_date",
                    className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "receipt_date", component: "div" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "issuanceDirective", children: "Issuance Directive Nr." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    as: "input",
                    name: "issuanceDirective",
                    placeholder: "Issuance Directive Nr.",
                    className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                    fullWidth: true,
                    variant: "outlined",
                    size: "small"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "issuanceDirective", component: "div" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "source", children: "Source" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    as: "input",
                    name: "source",
                    placeholder: "Source",
                    className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                    fullWidth: true,
                    variant: "outlined",
                    size: "small"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "source", component: "div" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg", children: "Item Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setIsAddItemModalOpen(true), className: "flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add Item Type" })
              ] })
            ] }),
            values.inventory.map((inventory, index) => {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-12 gap-1 bg-gray-50 px-6 py-2 my-2 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `inventory[${index}].name`, children: "Item Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownWithSearch,
                    {
                      formikSelectedValue: values?.inventory[index]?.name,
                      _index: index,
                      placeholder: "Item Name",
                      name: `inventory[${index}].name`,
                      fetchNames: fetchItemType,
                      setFieldValue,
                      refetchData: handleRefetch,
                      setSelectedValue: (value) => {
                        setFieldValue(`inventory[${index}].name`, "");
                        setFieldValue(`inventory[${index}].item.unit`, value.unit);
                        setFieldValue(`inventory[${index}].item.size`, defaultSizeMap[value.sizeType] || "none");
                        setFieldValue(`inventory[${index}].sizeType`, value.sizeType);
                        setFieldValue(`inventory[${index}].name`, value.name);
                      },
                      onUpdate: (option) => {
                        setSelectedItemType(option);
                        setIsUpdateItemModalOpen(true);
                      },
                      onDelete: (option) => {
                        setSelectedItemType(option);
                        setIsDeleteTypeModalOpen(true);
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SizeSelector, { inventory, index }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `inventory[${index}].item.quantity`, children: "Qty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      as: "input",
                      type: "number",
                      name: `inventory[${index}].item.quantity`,
                      placeholder: "Qty",
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventory[${index}].item.quantity`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `inventory[${index}].item.unit`, children: "UoM" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      as: "input",
                      name: `inventory[${index}].item.unit`,
                      placeholder: "UoM",
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                      disabled: true
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventory[${index}].item.unit`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `inventory[${index}].item.location`, children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      as: "input",
                      name: `inventory[${index}].item.location`,
                      placeholder: "Location",
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventory[${index}].item.location`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "pb-2", htmlFor: `inventory[${index}].item.expiryDate`, children: [
                    "Expiry Date ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "(Optional)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      type: "date",
                      name: `inventory[${index}].item.expiryDate`,
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventory[${index}].item.expiryDate`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `inventory[${index}].item.price`, children: "U/Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      as: "input",
                      type: "number",
                      name: `inventory[${index}].item.price`,
                      placeholder: "₱00.00",
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                      onChange: (e) => {
                        const newPrice = parseFloat(e.target.value);
                        setFieldValue(`inventory.${index}.item.price`, newPrice);
                        updateAmount(index, newPrice, inventory.item.quantity);
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventory[${index}].item.price`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `inventory[${index}].item.amount`, children: "T/Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      as: "input",
                      type: "number",
                      name: `inventory[${index}].item.amount`,
                      placeholder: "₱00.00",
                      className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                      disabled: true,
                      value: inventory?.item?.price * inventory?.item?.quantity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `inventory[${index}].item.amount`, component: "div" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-5 col-span-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      onClick: () => {
                        if (values.inventory.length > 1) {
                          const updatedinventory = [...values.inventory];
                          updatedinventory.splice(index, 1);
                          setFieldValue("inventory", updatedinventory);
                        }
                      },
                      className: `flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventory.length > 1 && "hover:text-red-400"} cursor-pointer`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Remove Item" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setFieldValue("inventory", [...values.inventory, {
                    id: "",
                    name: "",
                    sizeType: "",
                    item: {
                      location: "",
                      quantity: 1,
                      price: 0,
                      amount: 0,
                      unit: "",
                      size: "none",
                      expiryDate: ""
                    }
                  }]), className: "flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add Item" })
                  ] }) })
                ] })
              ] }, index);
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse py-1", children: [
              "GT/Amount: ₱",
              totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ] })
          ] }) });
        }
      }
    ) })
  ] });
};
export {
  CreateReceipt as default
};
