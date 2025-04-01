import { ErrorMessage, Field, Formik, FormikValues, Form } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Header from "../../../components/Header";
import TopButtons from "../../../components/TopButtons";
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../../providers/ToastContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DropdownWithNew from "../../../components/DropdownWithNew";
import {
  fetchOneIssuance,
  fetchReceiptRefs,
  updateIssuance,
} from "../../../api/issuance/issuanceApi";
import { fetchEndUsers } from "../../../api/users/usersApi";
import DropdownWithSearch from "../../../components/DropdownWithSearch";
import moment from "moment";

interface MappedItem {
  id: string;
  name: string;
  size: Array<{ name: string; price: number }>;
  unit: string;
  price: number;
  inventoryId: string;
}

const UpdateIssuance: React.FC = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formRef = useRef<any>();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [itemNamesMap, setItemNamesMap] = useState<Record<string, any>>({});

  const { data: receiptRefs } = useQuery({
    queryKey: ["receipt-list"],
    queryFn: () => fetchReceiptRefs() as any,
  });

  const { data } = useQuery({
    queryKey: ["receipt_details", state.id],
    queryFn: () => fetchOneIssuance(state.id),
  });

  useEffect(() => {
    if (data) {
      setInitialValues({
        documentNo: data?.documentNo,
        issuanceDirective: data?.issuanceDirective,
        issuanceDate: moment(data?.issuanceDate).format("YYYY-MM-DD"),
        validityDate: moment(data?.validityDate).format("YYYY-MM-DD"),
        endUsers: data?.endUsers?.map((user: any, index: number) => ({
          id: user?.id,
          name: user?.name,
          inventory: user?.inventory?.map((inv: any, _index: number) => {
            const matchItem = receiptRefs?.find(
              (ref: { name: string }) => ref.name === inv?.item?.receiptRef
            );
            const mappedItems = Object.values(
              matchItem?.items?.reduce(
                (
                  acc: {
                    [key: string]: {
                      id: string;
                      name: string;
                      size: Array<{ name: string; price: number }>;
                      unit: string;
                      price: number;
                      inventoryId: string;
                    };
                  },
                  {
                    id,
                    name,
                    size,
                    unit,
                    price,
                    inventoryId,
                  }: {
                    id: string;
                    name: string;
                    size: string;
                    unit: string;
                    price: number;
                    inventoryId: string;
                  }
                ) => {
                  if (!acc[name]) {
                    acc[name] = {
                      id,
                      name,
                      size: [{ name: size, price }],
                      unit,
                      price,
                      inventoryId,
                    };
                  } else {
                    acc[name].size.push({ name: size, price });
                  }
                  return acc;
                },
                {}
              ) || {}
            );
            const item = (mappedItems as MappedItem[])?.find(
              (item) => item?.name === inv?.item?.name
            );
            setItemNamesMap((prev) => ({
              ...prev,
              [`${index}-${_index}`]: mappedItems,
            }));
            return {
              id: inv?.id,
              receiptRef: inv?.item?.receiptRef,
              name: inv?.item?.name,
              itemSizes: item?.size,
              size: inv?.item?.size,
              unit: inv?.item?.unit,
              quantity: inv?.item?.quantity,
              price: inv?.item?.price,
              amount: inv?.item?.amount,
              itemId: inv?.item?.itemId,
            };
          }),
        })),
      });
    }
  }, [state, data, receiptRefs]);

  const updateIssuanceMutation = useMutation({
    mutationFn: (values: any) => updateIssuance(values),
    onError: (error: any) => {
      showToast(error?.response?.data?.message, "", "error");
    },
    onSuccess: () => {
      showToast("Issuance Successfully Updated!", "", "success");
      setInitialValues(null);
      queryClient.invalidateQueries(["receipt_details", state.id] as any);
      navigate("/issuance", { replace: true });
    },
  });

  const handleSave = () => {
    if (formRef?.current) {
      formRef.current?.submitForm();
    }
  };

  const validationSchema = Yup.object().shape({
    documentNo: Yup.string().required("Document No is required") as any,
    issuanceDirective: Yup.string().required(
      "Issuance Directive Nr. is required"
    ) as any,
    issuanceDate: Yup.string().required("Issuance Date is required") as any,
    validityDate: Yup.string().required("Validity Date is required") as any,
    endUsers: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().nullable(),
        name: Yup.string().required("End User is required"),
        inventory: Yup.array().of(
          Yup.object().shape({
            id: Yup.string().nullable(),
            itemId: Yup.string().nullable().optional(),
            receiptRef: Yup.string().required("Receipt Ref is required") as any,
            name: Yup.string().required("Item Name is required"),
            quantity: Yup.string().required("Inventory Quantity is required"),
            price: Yup.number().required("Inventory Price is required"),
            amount: Yup.number().required("Inventory Amount is required"),
            unit: Yup.string().required("Inventory Unit is required"),
            size: Yup.string(),
          })
        ),
      })
    ),
  });

  const handleRefetch = (refetchFn: () => void) => {
    refetchFn();
  };

  if (!initialValues) {
    return <div>No Data Available</div>;
  }

  return (
    <>
      <div className="flex flex-row justify-between pb-4">
        <Header title={"Update Issuance"} description={"Issuance"} />
        <TopButtons>
          <LinkSecondaryButton to=".." text="Cancel" />
          <PrimaryButton text="Save" onClick={handleSave} />
        </TopButtons>
      </div>
      <div className="flex w-full h-full justify-center">
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange
          onSubmit={(values: FormikValues) => {
            console.log(values);
            const formattedValues = {
              id: state.id,
              ...values,
              issuanceDate: values.issuanceDate
                ? `${values.issuanceDate}T00:00:00.000Z`
                : null,
              validityDate: values.validityDate
                ? `${values.validityDate}T00:00:00.000Z`
                : null,
            };
            updateIssuanceMutation.mutate(formattedValues);
          }}
        >
          {({ values, setFieldValue }) => {
            const totalAmount = values.endUsers.reduce(
              (sum: number, user: { inventory: any }) => {
                return (
                  sum +
                  user.inventory.reduce(
                    (invSum: number, inv: { amount: number }) => {
                      return invSum + parseFloat(inv?.amount);
                    },
                    0
                  )
                );
              },
              0
            );

            const updateAmount = (
              index: number,
              _index: number,
              quantity: number
            ) => {
              const amount =
                values.endUsers[index].inventory[_index].price * quantity;
              setFieldValue(
                `endUsers.${index}.inventory.${_index}.amount`,
                amount
              );
            };

            return (
              <Form className="w-full">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h1 className="text-lg">Issuance Details</h1>
                  <div className="w-full grid grid-cols-2 gap-1 mb-5">
                    <div className="flex h-auto flex-col py-3">
                      <label className="pb-2" htmlFor="documenNo">
                        Document No.
                      </label>
                      <Field
                        as="input"
                        name="documentNo"
                        placeholder="Document No."
                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          className="text-red-400"
                          name="documentNo"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="flex h-auto flex-col py-3">
                      <label className="pb-2" htmlFor="issuanceDirective">
                        Issuance Directive Nr.
                      </label>
                      <Field
                        as="input"
                        name="issuanceDirective"
                        placeholder="Issuance Directive Nr."
                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          className="text-red-400"
                          name="issuanceDirective"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="flex h-auto flex-col py-3">
                      <label className="pb-2" htmlFor="issuanceDate">
                        Issuance Date
                      </label>
                      <Field
                        type="date"
                        name="issuanceDate"
                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          className="text-red-400"
                          name="issuanceDate"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="flex h-auto flex-col py-3">
                      <label className="pb-2" htmlFor="validityDate">
                        Validity Date
                      </label>
                      <Field
                        type="date"
                        name="validityDate"
                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          className="text-red-400"
                          name="validityDate"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>

                  <h1 className="text-lg">End User & Item Details</h1>
                  {values.endUsers.map((user: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-full grid grid-cols-2 gap-1 mb-5"
                      >
                        <div className="flex h-auto flex-col">
                          <DropdownWithNew
                            placeholder="End User"
                            id={`endUsers[${index}].id`}
                            name={`endUsers[${index}].name`}
                            fetchNames={fetchEndUsers}
                            setFieldValue={setFieldValue}
                            data={user.name}
                            setSelectedValue={(value: string) =>
                              console.log("Selected:", value)
                            }
                          />
                          <div className="h-6">
                            <ErrorMessage
                              className="text-red-400"
                              name={`endUsers[${index}].name`}
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row gap-5 mx-5">
                          <div className="pt-4">
                            <div
                              onClick={() => {
                                if (values.endUsers.length > 1) {
                                  const updatedEndUsers = [...values.endUsers];
                                  updatedEndUsers.splice(index, 1);
                                  setFieldValue("endUsers", updatedEndUsers);
                                }
                              }}
                              className={`flex flex-row gap-2 items-center text-sm text-red-300 ${
                                values.inventories?.length > 1 &&
                                "hover:text-red-400"
                              } cursor-pointer`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                              <p>Remove End User</p>
                            </div>
                          </div>
                          <div className="pt-4">
                            <div
                              onClick={() =>
                                setFieldValue("endUsers", [
                                  ...values.endUsers,
                                  {
                                    id: "",
                                    name: "",
                                    inventory: [
                                      {
                                        id: "",
                                        itemId: "",
                                        receiptRef: "",
                                        name: "",
                                        size: "",
                                        unit: "",
                                        quantity: 1,
                                        price: 0,
                                        amount: 0,
                                      },
                                    ],
                                  },
                                ])
                              }
                              className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                              <p>Add End User</p>
                            </div>
                          </div>
                        </div>
                        {user?.inventory?.map(
                          (inventory: any, _index: number) => {
                            return (
                              <div
                                key={_index}
                                className="w-full col-span-2 gap-1 bg-gray-50 px-6 py-2 my-2 rounded-lg border grid grid-cols-2"
                              >
                                <div className="flex h-auto flex-col py-3 col-span-2">
                                  <label
                                    className="pb-2"
                                    htmlFor={`endUsers[${index}].inventory[${_index}].receiptRef`}
                                  >
                                    Receipt Ref
                                  </label>
                                  <DropdownWithSearch
                                    formikSelectedValue={
                                      values?.endUsers[index]?.inventory[_index]
                                        .receiptRef
                                    }
                                    _index={_index}
                                    placeholder="Receipt Ref"
                                    name={`endUsers[${index}].inventory[${_index}].receiptRef`}
                                    fetchNames={fetchReceiptRefs}
                                    setFieldValue={setFieldValue}
                                    refetchData={handleRefetch}
                                    forUpdate={inventory?.receiptRef}
                                    setSelectedValue={(value: any) => {
                                      const mappedItems = Object.values(
                                        value?.items?.reduce(
                                          (
                                            acc: {
                                              [key: string]: {
                                                id: string;
                                                name: string;
                                                size: Array<{
                                                  name: string;
                                                  price: number;
                                                  id: string;
                                                  itemId: string;
                                                }>;
                                                unit: string;
                                                price: number;
                                                inventoryId: string;
                                              };
                                            },
                                            {
                                              id,
                                              name,
                                              size,
                                              unit,
                                              price,
                                              inventoryId,
                                            }: {
                                              id: string;
                                              name: string;
                                              size: string;
                                              unit: string;
                                              price: number;
                                              inventoryId: string;
                                            }
                                          ) => {
                                            if (!acc[name]) {
                                              acc[name] = {
                                                id,
                                                name,
                                                size: [
                                                  { name: size, price, id, itemId: id },
                                                ],
                                                unit,
                                                price,
                                                inventoryId,
                                              };
                                            } else {
                                              acc[name].size.push({
                                                name: size,
                                                price,
                                                id,
                                                itemId: id
                                              });
                                            }
                                            return acc;
                                          },
                                          {}
                                        ) || {}
                                      );
                                      console.log(mappedItems);
                                      setItemNamesMap((prev) => ({
                                        ...prev,
                                        [`${index}-${_index}`]: mappedItems,
                                      }));
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].name`,
                                        ""
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].size`,
                                        ""
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].quantity`,
                                        1
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].price`,
                                        0
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].amount`,
                                        0
                                      );
                                    }}
                                  />
                                  <div className="h-6">
                                    <ErrorMessage
                                      className="text-red-400"
                                      name={`endUsers[${index}].inventory[${_index}].receiptRef`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                  <label
                                    className="pb-2"
                                    htmlFor={`endUsers[${index}].inventory[${_index}].name`}
                                  >
                                    Item Name
                                  </label>
                                  <DropdownWithSearch
                                    formikSelectedValue={
                                      values?.endUsers[index]?.inventory[_index]
                                        ?.name
                                    }
                                    _index={index}
                                    placeholder="Item Name"
                                    name={`endUsers[${index}].inventory[${_index}].name`}
                                    fetchNames={() =>
                                      itemNamesMap[`${index}-${_index}`] || []
                                    }
                                    setFieldValue={setFieldValue}
                                    refetchData={handleRefetch}
                                    forUpdate={inventory?.name}
                                    setSelectedValue={(value: any) => {
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].itemSizes`,
                                        value?.size
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].size`,
                                        value?.size[0]?.name
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].itemId`,
                                        value?.id
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].id`,
                                        value?.inventoryId
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].unit`,
                                        value?.unit
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].price`,
                                        value?.price
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].amount`,
                                        value?.price *
                                          values?.endUsers[index].inventory[
                                            _index
                                          ].quantity
                                      );
                                    }}
                                  />
                                  <div className="h-6">
                                    <ErrorMessage
                                      className="text-red-400"
                                      name={`endUsers[${index}].inventory[${_index}].name`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                  <label
                                    className="pb-2"
                                    htmlFor={`endUsers[${index}].inventory[${_index}].size`}
                                  >
                                    Size
                                  </label>
                                  <Field
                                    as="select"
                                    name={`endUsers[${index}].inventory[${_index}].size`}
                                    placeholder="Size"
                                    className="bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                      const selectedSize = e.target.value;
                                      const price = values.endUsers[
                                        index
                                      ].inventory[_index].itemSizes.find(
                                        (size: { id: string }) =>
                                          size.id === selectedSize
                                      )?.price;
                                      const itemId = values.endUsers[
                                        index
                                      ].inventory[_index].itemSizes.find(
                                        (size: { id: string }) =>
                                          size.id === selectedSize
                                      )?.itemId;
                                      console.log(values.endUsers[
                                        index
                                      ].inventory[_index].itemSizes.find(
                                        (size: { id: string }) =>
                                          size.id === selectedSize
                                      ));
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].size`,
                                        selectedSize
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].itemId`,
                                        itemId
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].price`,
                                        price
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory[${_index}].amount`,
                                        price *
                                          values.endUsers[index].inventory[
                                            _index
                                          ].quantity
                                      );
                                    }}
                                  >
                                    {values.endUsers[index].inventory[
                                      _index
                                    ].itemSizes?.map(
                                      (size: { id: string; name: string }) => (
                                        <option key={size.id} value={size.id}>
                                          {size.name}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                  <div className="h-6">
                                    <ErrorMessage
                                      className="text-red-400"
                                      name={`endUsers[${index}].inventory[${_index}].size`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                  <label
                                    className="pb-2"
                                    htmlFor={`endUsers[${index}].inventory[${_index}].quantity`}
                                  >
                                    Qty
                                  </label>
                                  <Field
                                    as="input"
                                    type="number"
                                    name={`endUsers[${index}].inventory[${_index}].quantity`}
                                    placeholder="Qty"
                                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const newQuantity = parseFloat(
                                        e.target.value
                                      );
                                      setFieldValue(
                                        `endUsers[${index}].inventory.${_index}.quantity`,
                                        newQuantity
                                      );
                                      updateAmount(index, _index, newQuantity);
                                    }}
                                  />
                                  <div className="h-6">
                                    <ErrorMessage
                                      className="text-red-400"
                                      name={`endUsers[${index}].inventory[${_index}].quantity`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                  <label
                                    className="pb-2"
                                    htmlFor={`endUsers[${index}].inventory[${_index}].unit`}
                                  >
                                    UoM
                                  </label>
                                  <Field
                                    as="input"
                                    name={`endUsers[${index}].inventory[${_index}].unit`}
                                    placeholder="UoM"
                                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                    disabled
                                  />
                                  <div className="h-6">
                                    <ErrorMessage
                                      className="text-red-400"
                                      name={`endUsers[${index}].inventory[${_index}].unit`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                  <label
                                    className="pb-2"
                                    htmlFor={`endUsers[${index}].inventory[${_index}].price`}
                                  >
                                    Price
                                  </label>
                                  <Field
                                    as="input"
                                    name={`endUsers[${index}].inventory[${_index}].price`}
                                    placeholder="Price"
                                    disabled
                                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                  />
                                  <div className="h-6">
                                    <ErrorMessage
                                      className="text-red-400"
                                      name={`endUsers[${index}].inventory[${_index}].price`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                  <label
                                    className="pb-2"
                                    htmlFor={`endUsers[${index}].inventory[${_index}].amount`}
                                  >
                                    Amount
                                  </label>
                                  <Field
                                    as="input"
                                    type="number"
                                    name={`endUsers[${index}].inventory[${_index}].amount`}
                                    placeholder="Amount"
                                    disabled
                                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                  />
                                  <div className="h-6">
                                    <ErrorMessage
                                      className="text-red-400"
                                      name={`endUsers[${index}].inventory[${_index}].amount`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-row gap-5">
                                  <div className="py-6">
                                    <div
                                      onClick={() => {
                                        if (
                                          values.endUsers[index].inventory
                                            .length > 1
                                        ) {
                                          const updatedInventory = [
                                            ...values.endUsers[index].inventory,
                                          ];
                                          updatedInventory.splice(_index, 1);
                                          setFieldValue(
                                            `endUsers[${index}].inventory`,
                                            updatedInventory
                                          );
                                        }
                                      }}
                                      className={`flex flex-row gap-2 items-center text-sm text-red-300 ${
                                        values.endUsers[index].inventory
                                          .length > 1 && "hover:text-red-400"
                                      } cursor-pointer`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                      <p>Remove Item</p>
                                    </div>
                                  </div>
                                  <div
                                    onClick={() =>
                                      setFieldValue(
                                        `endUsers[${index}].inventory`,
                                        [
                                          ...values.endUsers[index].inventory,
                                          {
                                            id: "",
                                            receiptRef: "",
                                            name: "",
                                            sizeType: "",
                                            item: {
                                              location: "",
                                              size: "",
                                              unit: "",
                                              quantity: 1,
                                              price: 0,
                                              amount: 0,
                                            },
                                          },
                                        ]
                                      )
                                    }
                                    className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                      />
                                    </svg>
                                    <p>Add Item</p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-row-reverse py-1">
                  GT/Amount: ₱
                  {totalAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UpdateIssuance;
