import { a as useNavigate, u as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-BwJeGL0w.js";
import { a as create$3, c as create$6, f as create$2, b as create$5, F as Formik, d as Form, e as Field, E as ErrorMessage } from "./index.esm-DNsBvjPq.js";
import { H as Header } from "./Header-BAMrndm5.js";
import { T as TopButtons } from "./TopButtons-4Eq8lDGz.js";
import { L as LinkSecondaryButton } from "./LinkSecondaryButton-LxANXQwB.js";
import { P as PrimaryButton } from "./PrimaryButton-CmvA-Oa3.js";
import { u as useMutation } from "./useMutation-u6SlWMfm.js";
import { D as DropdownWithNew } from "./DropdownWithNew-D_SJjF_g.js";
import { a as fetchReceiptRefs, c as createIssuance } from "./issuanceApi-CQlqxOQ2.js";
import { b as fetchEndUsers } from "./usersApi-BU81reWI.js";
import { D as DropdownWithSearch } from "./DropdownWithSearch-DzCqGmaj.js";
import "./utils-QRJGL1kX.js";
import "./useQuery-CONvhY0t.js";
import "./axios-DSoLq97m.js";
const CreateIssuance = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formRef = reactExports.useRef();
  const [itemNamesMap, setItemNamesMap] = reactExports.useState({});
  const createIssuanceMutation = useMutation({
    mutationFn: (values) => createIssuance(values),
    onError: (error) => {
      showToast(
        error?.response?.data?.message,
        "",
        "error"
      );
    },
    onSuccess: () => {
      showToast(
        "Issuance Successfully Created!",
        "",
        "success"
      );
      navigate("/issuance", { replace: true });
    }
  });
  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };
  const validationSchema = create$3().shape({
    documentNo: create$6().required("Please input the Document No"),
    issuanceDirective: create$6().required("Please input the Issuance Directive Nr."),
    issuanceDate: create$6().required("Please input the Issuance Date"),
    validityDate: create$6().required("Please input the Validity Date"),
    endUsers: create$2().of(
      create$3().shape({
        id: create$6().nullable(),
        name: create$6().required("Please input the End User"),
        inventory: create$2().of(
          create$3().shape({
            refId: create$6().nullable(),
            id: create$6().nullable(),
            receiptRef: create$6().required("Please input the Receipt Ref"),
            name: create$6().required("Please input the Item Name"),
            quantity: create$6().required("Please input the Inventory Quantity"),
            price: create$5().required("Please input the Inventory Price"),
            amount: create$5().required("Please input the Inventory Amount"),
            unit: create$6().required("Please input the Inventory Unit"),
            size: create$6()
          })
        )
      })
    )
  });
  const initialValues = {
    documentNo: "",
    issuanceDirective: "",
    issuanceDate: "",
    validityDate: "",
    endUsers: [
      {
        id: "",
        name: "",
        inventory: [
          {
            refId: "",
            id: "",
            receiptRef: "",
            name: "",
            size: "",
            unit: "",
            quantity: 1,
            price: 0,
            amount: 0
          }
        ]
      }
    ]
  };
  const handleRefetch = (refetchFn) => {
    refetchFn();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title: "Create Issuance", description: "Issuance" }),
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
            issuanceDate: values.issuanceDate ? `${values.issuanceDate}T00:00:00.000Z` : null,
            validityDate: values.validityDate ? `${values.validityDate}T00:00:00.000Z` : null
          };
          createIssuanceMutation.mutate(formattedValues);
        },
        children: ({ values, setFieldValue }) => {
          const updateAmount = (index, _index, quantity) => {
            const amount = values.endUsers[index].inventory[_index].price * quantity;
            setFieldValue(`endUsers.${index}.inventory.${_index}.amount`, amount);
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-gray-200 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg", children: "Issuance Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-2 mt-2 gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "documenNo", children: "Document No." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    as: "input",
                    name: "documentNo",
                    placeholder: "Document No.",
                    className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                    fullWidth: true,
                    variant: "outlined",
                    size: "small"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "documentNo", component: "div" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col", children: [
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "issuanceDate", children: "Issuance Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    type: "date",
                    name: "issuanceDate",
                    className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "issuanceDate", component: "div" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: "validityDate", children: "Validity Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    type: "date",
                    name: "validityDate",
                    className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: "validityDate", component: "div" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg", children: "End User & Item Details" }),
            values.endUsers.map((user, index) => {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-2 items-center  gap-1 mt-5 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "End User" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownWithNew,
                    {
                      placeholder: "End User",
                      id: `endUsers[${index}].id`,
                      name: `endUsers[${index}].name`,
                      fetchNames: fetchEndUsers,
                      setFieldValue,
                      data: user.name,
                      setSelectedValue: (value) => console.log("Selected:", value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row gap-5 mx-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      onClick: () => {
                        if (values.endUsers.length > 1) {
                          const updatedEndUsers = [...values.endUsers];
                          updatedEndUsers.splice(index, 1);
                          setFieldValue("endUsers", updatedEndUsers);
                        }
                      },
                      className: `flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventories?.length > 1 && "hover:text-red-400"} cursor-pointer`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Remove End User" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setFieldValue("endUsers", [...values.endUsers, {
                    id: "",
                    name: "",
                    inventory: [
                      {
                        refId: "",
                        id: "",
                        receiptRef: "",
                        name: "",
                        size: "",
                        unit: "",
                        quantity: 1,
                        price: 0,
                        amount: 0
                      }
                    ]
                  }]), className: "flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add End User" })
                  ] }) })
                ] }),
                user?.inventory?.map((inventory, _index) => {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full col-span-2 gap-4 relative bg-gray-50 px-6 py-2 my-2 rounded-lg border grid grid-cols-5 min-w-[500px] overflow-x-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row gap-5 absolute right-6 top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        onClick: () => {
                          if (values.endUsers[index].inventory.length > 1) {
                            const updatedInventory = [...values.endUsers[index].inventory];
                            updatedInventory.splice(_index, 1);
                            setFieldValue(`endUsers[${index}].inventory`, updatedInventory);
                          }
                        },
                        className: `flex text-gray-500 flex-row gap-2 items-center text-sm hover:text-gray-800 cursor-pointer`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sr-only", children: "Remove Item" })
                        ]
                      }
                    ) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-3 mt-7", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `endUsers[${index}].inventory[${_index}].receiptRef`, children: "Receipt Ref" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DropdownWithSearch,
                        {
                          formikSelectedValue: values?.endUsers[index].inventory[_index].receiptRef,
                          _index,
                          placeholder: "Receipt Ref",
                          name: `endUsers[${index}].inventory[${_index}].receiptRef`,
                          fetchNames: fetchReceiptRefs,
                          setFieldValue,
                          refetchData: handleRefetch,
                          setSelectedValue: (value) => {
                            const mappedItems = Object.values(
                              value?.items?.reduce((acc, { id, name, size, unit, price, inventoryId }) => {
                                if (!acc[name]) {
                                  acc[name] = {
                                    id,
                                    name,
                                    size: [
                                      {
                                        name: size,
                                        price,
                                        itemId: id
                                      }
                                    ],
                                    unit,
                                    price,
                                    inventoryId
                                  };
                                } else {
                                  acc[name].size.push({
                                    name: size,
                                    price,
                                    itemId: id
                                  });
                                }
                                return acc;
                              }, {}) || {}
                            );
                            setItemNamesMap((prev) => ({
                              ...prev,
                              [`${index}-${_index}`]: mappedItems
                            }));
                            setFieldValue(`endUsers[${index}].inventory[${_index}].name`, "");
                            setFieldValue(`endUsers[${index}].inventory[${_index}].size`, "");
                            setFieldValue(`endUsers[${index}].inventory[${_index}].quantity`, 1);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].price`, 0);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].amount`, 0);
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3 col-span-2 mt-7", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `endUsers[${index}].inventory[${_index}].name`, children: "Item Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DropdownWithSearch,
                        {
                          formikSelectedValue: values?.endUsers[index]?.inventory[_index].name,
                          _index: index,
                          placeholder: "Item Name",
                          name: `endUsers[${index}].inventory[${_index}].name`,
                          fetchNames: () => itemNamesMap[`${index}-${_index}`] || [],
                          setFieldValue,
                          refetchData: handleRefetch,
                          setSelectedValue: (value) => {
                            setFieldValue(`endUsers[${index}].inventory[${_index}].refId`, value?.id);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].itemSizes`, value?.size);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].size`, value?.size[0]?.name);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].id`, value?.inventoryId);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].unit`, value?.unit);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].price`, value?.price);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].amount`, value?.price * values?.endUsers[index].inventory[_index].quantity);
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "pb-2", htmlFor: `endUsers[${index}].inventory[${_index}].size`, children: [
                        "Size ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "(Optional)" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Field,
                        {
                          as: "select",
                          name: `endUsers[${index}].inventory[${_index}].itemId`,
                          placeholder: "Size",
                          className: "bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon",
                          onChange: (e) => {
                            const selectedId = e.target.value;
                            const price = values.endUsers[index].inventory[_index].itemSizes.find(
                              (size2) => size2.itemId === selectedId
                            )?.price;
                            const size = values.endUsers[index].inventory[_index].itemSizes.find(
                              (size2) => size2.itemId === selectedId
                            )?.name;
                            console.log("Selected Size:", selectedId, price, size);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].refId`, selectedId);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].size`, size);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].price`, price);
                            setFieldValue(`endUsers[${index}].inventory[${_index}].amount`, price * values.endUsers[index].inventory[_index].quantity);
                          },
                          children: values.endUsers[index].inventory[_index].itemSizes?.map((size, sizeIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: size.itemId, children: size.name }, `${size.name}-${sizeIndex}`))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `endUsers[${index}].inventory[${_index}].size`, component: "div" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `endUsers[${index}].inventory[${_index}].quantity`, children: "Qty" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Field,
                        {
                          as: "input",
                          type: "number",
                          name: `endUsers[${index}].inventory[${_index}].quantity`,
                          placeholder: "Qty",
                          className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                          onChange: (e) => {
                            const newQuantity = parseFloat(e.target.value);
                            setFieldValue(`endUsers[${index}].inventory.${_index}.quantity`, newQuantity);
                            updateAmount(index, _index, newQuantity);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `endUsers[${index}].inventory[${_index}].quantity`, component: "div" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `endUsers[${index}].inventory[${_index}].unit`, children: "UoM" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Field,
                        {
                          as: "input",
                          name: `endUsers[${index}].inventory[${_index}].unit`,
                          placeholder: "UoM",
                          className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md",
                          disabled: true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `endUsers[${index}].inventory[${_index}].unit`, component: "div" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `endUsers[${index}].inventory[${_index}].price`, children: "U/Price" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Field,
                        {
                          as: "input",
                          name: `endUsers[${index}].inventory[${_index}].price`,
                          placeholder: "Price",
                          disabled: true,
                          className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `endUsers[${index}].inventory[${_index}].price`, component: "div" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-auto flex-col py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "pb-2", htmlFor: `endUsers[${index}].inventory[${_index}].amount`, children: "T/Amount" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Field,
                        {
                          as: "input",
                          type: "number",
                          name: `endUsers[${index}].inventory[${_index}].amount`,
                          placeholder: "Amount",
                          disabled: true,
                          className: "bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { className: "text-red-400", name: `endUsers[${index}].inventory[${_index}].amount`, component: "div" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row gap- col-span-2 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setFieldValue(`endUsers[${index}].inventory`, [...values.endUsers[index].inventory, {
                      refId: "",
                      id: "",
                      receiptRef: "",
                      name: "",
                      size: "",
                      unit: "",
                      quantity: 1,
                      price: 0,
                      amount: 0
                    }]), className: "flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add Item" })
                    ] }) })
                  ] }, _index);
                })
              ] }, index);
            })
          ] }) });
        }
      }
    ) })
  ] });
};
export {
  CreateIssuance as default
};
