/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Formik, FormikValues, Form } from "formik"
import React, { useRef, useState } from "react"
import * as Yup from 'yup'
import Header from "../../../components/Header"
import TopButtons from "../../../components/TopButtons"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../../providers/ToastContext"
import { useMutation } from "@tanstack/react-query"
import DropdownWithNew from "../../../components/DropdownWithNew"
import { createIssuance, fetchReceiptRefs } from "../../../api/issuance/issuanceApi"
import { fetchEndUsers } from "../../../api/users/usersApi"
import DropdownWithSearch from "../../../components/DropdownWithSearch"

const CreateIssuance: React.FC = () => {
    const navigate = useNavigate()
    const { showToast } = useToast()
    const formRef = useRef<any>()
    const [itemNamesMap, setItemNamesMap] = useState<Record<string, any>>({})

    const createIssuanceMutation = useMutation({
        mutationFn: (values: any) => createIssuance(values),
        onError: (error: any) => {
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
            navigate("/issuance", { replace: true })
        },
    });

    const handleSave = () => {
        if (formRef?.current) {
            formRef.current?.submitForm()
        }
    }

    const validationSchema = Yup.object().shape({
        documentNo: Yup.string().required('Please input the Document No') as any,
        issuanceDirective: Yup.string().required('Please input the Issuance Directive Nr.') as any,
        issuanceDate: Yup.string().required('Please input the Issuance Date') as any,
        validityDate: Yup.string().required('Please input the Validity Date') as any,
        endUsers: Yup.array().of(
            Yup.object().shape({
                id: Yup.string().nullable(),
                name: Yup.string().required('Please input the End User'),
                inventory: Yup.array().of(
                    Yup.object().shape({
                        refId: Yup.string().nullable(),
                        id: Yup.string().nullable(),
                        receiptRef: Yup.string().required('Please input the Receipt Ref') as any,
                        name: Yup.string().required('Please input the Item Name'),
                        quantity: Yup.string().required('Please input the Inventory Quantity'),
                        price: Yup.number().required('Please input the Inventory Price'),
                        amount: Yup.number().required('Please input the Inventory Amount'),
                        unit: Yup.string().required('Please input the Inventory Unit'),
                        size: Yup.string(),
                    })
                )
            })
        ),
    });

    const initialValues = {
        documentNo: '',
        issuanceDirective: '',
        issuanceDate: '',
        validityDate: '',
        endUsers: [
            {
                id: '',
                name: '',
                inventory: [
                    {
                        refId: '',
                        id: '',
                        receiptRef: '',
                        name: '',
                        size: '',
                        unit: '',
                        quantity: 1,
                        price: 0,
                        amount: 0
                    }
                ]
            }
        ]
    };

    const handleRefetch = (refetchFn: () => void) => {
        refetchFn();
    };

    return (
        <>
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Create Issuance'} description={'Issuance'} />
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
                        const formattedValues = {
                            ...values,
                            issuanceDate: values.issuanceDate ? `${values.issuanceDate}T00:00:00.000Z` : null,
                            validityDate: values.validityDate ? `${values.validityDate}T00:00:00.000Z` : null,
                        };
                        createIssuanceMutation.mutate(formattedValues)
                    }}
                >
                    {({ values, setFieldValue }) => {

                        const updateAmount = (index: number, _index: number, quantity: number) => {
                            const amount = values.endUsers[index].inventory[_index].price * quantity;
                            setFieldValue(`endUsers.${index}.inventory.${_index}.amount`, amount);
                        };


                        return (
                            <Form className="w-full">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h1 className="text-lg">Issuance Details</h1>
                                    <div className="w-full grid grid-cols-2 mt-2 gap-2 mb-5">
                                        <div className="flex h-auto flex-col">
                                            <label className="pb-2" htmlFor="documenNo">Document No.</label>
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
                                                <ErrorMessage className="text-red-400" name="documentNo" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col">
                                            <label className="pb-2" htmlFor="issuanceDirective">Issuance Directive Nr.</label>
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
                                                <ErrorMessage className="text-red-400" name="issuanceDirective" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col">
                                            <label className="pb-2" htmlFor="issuanceDate">Issuance Date</label>
                                            <Field
                                                type="date"
                                                name="issuanceDate"
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="issuanceDate" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col">
                                            <label className="pb-2" htmlFor="validityDate">Validity Date</label>
                                            <Field
                                                type="date"
                                                name="validityDate"
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="validityDate" component="div" />
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-lg">End User & Item Details</h1>
                                    {values.endUsers.map((user: any, index: number) => {
                                        return (
                                            <div key={index} className="w-full grid grid-cols-2 items-center  gap-1 mt-5 mb-5">
                                                <div className="flex h-auto flex-col gap-2">
                                                    <label>End User</label>
                                                    <DropdownWithNew
                                                        placeholder="End User"
                                                        id={`endUsers[${index}].id`}
                                                        name={`endUsers[${index}].name`}
                                                        fetchNames={fetchEndUsers}
                                                        setFieldValue={setFieldValue}
                                                        data={user.name}
                                                        setSelectedValue={(value: any) => console.log("Selected:", value)}
                                                    />
                                                </div>
                                                <div className="flex flex-row gap-5 mx-5">
                                                    <div className="pt-4">
                                                        <div
                                                            onClick={() => {
                                                                if (values.endUsers.length > 1) {
                                                                    const updatedEndUsers = [...values.endUsers];
                                                                    updatedEndUsers.splice(index, 1);
                                                                    setFieldValue('endUsers', updatedEndUsers);
                                                                }
                                                            }}
                                                            className={`flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventories?.length > 1 && 'hover:text-red-400'} cursor-pointer`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                            <p>Remove End User</p>
                                                        </div>
                                                    </div>
                                                    <div className="pt-4">
                                                        <div onClick={() => setFieldValue('endUsers', [...values.endUsers, {
                                                            id: '',
                                                            name: '',
                                                            inventory: [
                                                                {
                                                                    refId: '',
                                                                    id: '',
                                                                    receiptRef: '',
                                                                    name: '',
                                                                    size: '',
                                                                    unit: '',
                                                                    quantity: 1,
                                                                    price: 0,
                                                                    amount: 0
                                                                }
                                                            ]
                                                        }])} className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                            <p>Add End User</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    user?.inventory?.map((inventory: any, _index: number) => {
                                                        return (
                                                            
                                                            <div key={_index} className="w-full col-span-2 gap-4 relative bg-gray-50 px-6 py-2 my-2 rounded-lg border grid grid-cols-5 min-w-[600px] overflow-x-auto">
                                                                <div className="flex flex-row gap-5 absolute right-6 top-0">
                                                                    <div className="py-6">
                                                                        <div
                                                                            onClick={() => {
                                                                                if (values.endUsers[index].inventory.length > 1) {
                                                                                    const updatedInventory = [...values.endUsers[index].inventory];
                                                                                    updatedInventory.splice(_index, 1);
                                                                                    setFieldValue(`endUsers[${index}].inventory`, updatedInventory);
                                                                                }
                                                                            }}
                                                                            className={`flex text-gray-500 flex-row gap-2 items-center text-sm hover:text-gray-800 cursor-pointer`}>
    
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                            
                                                                            <p className="sr-only">Remove Item</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex h-auto flex-col py-3 col-span-3 mt-7">
                                                                    <label className="pb-2" htmlFor={`endUsers[${index}].inventory[${_index}].receiptRef`}>Receipt Ref</label>
                                                                    <DropdownWithSearch
                                                                        formikSelectedValue={values?.endUsers[index].inventory[_index].receiptRef}
                                                                        _index={_index}
                                                                        placeholder="Receipt Ref"
                                                                        name={`endUsers[${index}].inventory[${_index}].receiptRef`}
                                                                        fetchNames={fetchReceiptRefs}
                                                                        setFieldValue={setFieldValue}
                                                                        refetchData={handleRefetch}
                                                                        setSelectedValue={(value: any) => {
                                                                            const mappedItems = Object.values(
                                                                                value?.items?.reduce((acc: { 
                                                                                    [key: string]: { 
                                                                                        id: string, 
                                                                                        name: string, 
                                                                                        size: Array<{ name: string, price: number, itemId: string }>, 
                                                                                        unit: string, 
                                                                                        price: number, 
                                                                                        inventoryId: string 
                                                                                    } 
                                                                                }, { id, name, size, unit, price, inventoryId }: { 
                                                                                    id: string, 
                                                                                    name: string, 
                                                                                    size: string, 
                                                                                    unit: string, 
                                                                                    price: number, 
                                                                                    inventoryId: string 
                                                                                }) => {
                                                                                    if (!acc[name]) {
                                                                                        acc[name] = {
                                                                                          id,
                                                                                          name,
                                                                                          size: [
                                                                                            {
                                                                                              name: size,
                                                                                              price,
                                                                                              itemId: id,
                                                                                            },
                                                                                          ],
                                                                                          unit,
                                                                                          price,
                                                                                          inventoryId,
                                                                                        };
                                                                                      } else {
                                                                                        acc[name].size.push({
                                                                                          name: size,
                                                                                          price,
                                                                                          itemId: id,
                                                                                        });
                                                                                      }
                                                                                    return acc;
                                                                                }, {}) || {}
                                                                            );
                                                                            setItemNamesMap(prev => ({
                                                                                ...prev,
                                                                                [`${index}-${_index}`]: mappedItems
                                                                            }));
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].name`, '')
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].size`, '')
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].quantity`, 1)
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].price`, 0)
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].amount`, 0)
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="flex h-auto flex-col py-3 col-span-2 mt-7">
                                                                    <label className="pb-2" htmlFor={`endUsers[${index}].inventory[${_index}].name`}>Item Name</label>
                                                                    <DropdownWithSearch
                                                                        formikSelectedValue={values?.endUsers[index]?.inventory[_index].name}
                                                                        _index={index}
                                                                        placeholder="Item Name"
                                                                        name={`endUsers[${index}].inventory[${_index}].name`}
                                                                        fetchNames={() => itemNamesMap[`${index}-${_index}`] || []}
                                                                        setFieldValue={setFieldValue}
                                                                        refetchData={handleRefetch}
                                                                        setSelectedValue={(value: any) => {
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].refId`, value?.id);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].itemSizes`, value?.size);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].size`, value?.size[0]?.name);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].id`, value?.inventoryId);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].unit`, value?.unit)
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].price`, value?.price)
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].amount`, value?.price * values?.endUsers[index].inventory[_index].quantity)
                                                                        }}
                                                                    />
                                                                </div>
                                                               
                                                                <div className="flex h-auto flex-col py-3">
                                                                    <label className="pb-2" htmlFor={`endUsers[${index}].inventory[${_index}].size`}>Size <span className="text-gray-400">(Optional)</span></label>
                                                                    <Field as="select"
                                                                        name={`endUsers[${index}].inventory[${_index}].itemId`}
                                                                        placeholder="Size"
                                                                        className="bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon"
                                                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                            const selectedId = e.target.value;
                                                                            const price = values.endUsers[
                                                                                index
                                                                            ].inventory[_index].itemSizes.find(
                                                                                (size: { name: string, itemId: string }) =>
                                                                                size.itemId === selectedId
                                                                            )?.price;

                                                                            const size = values.endUsers[
                                                                                index
                                                                            ].inventory[_index].itemSizes.find(
                                                                                (size: { name: string, itemId: string }) =>
                                                                                size.itemId === selectedId
                                                                            )?.name;
                                                                            
                                                                            // Log them appropriately for easier tracking
                                                                            console.log("Selected Size:", selectedId, price, size);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].refId`, selectedId);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].size`, size);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].price`, price);
                                                                            setFieldValue(`endUsers[${index}].inventory[${_index}].amount`, price * values.endUsers[index].inventory[_index].quantity);
                                                                        }}
                                                                    >
                                                                        {values.endUsers[index].inventory[_index].itemSizes?.map((size: { name: string, itemId: string }, sizeIndex: number) => (
                                                                            <option key={`${size.name}-${sizeIndex}`} value={size.itemId}>{size.name}</option>
                                                                        ))}
                                                                    </Field>
                                                                    <div className="h-6">
                                                                        <ErrorMessage className="text-red-400" name={`endUsers[${index}].inventory[${_index}].size`} component="div" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex h-auto flex-col py-3">
                                                                    <label className="pb-2" htmlFor={`endUsers[${index}].inventory[${_index}].quantity`}>Qty</label>
                                                                    <Field
                                                                        as="input"
                                                                        type="number"
                                                                        name={`endUsers[${index}].inventory[${_index}].quantity`}
                                                                        placeholder="Qty"
                                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            const newQuantity = parseFloat(e.target.value);
                                                                            setFieldValue(`endUsers[${index}].inventory.${_index}.quantity`, newQuantity);
                                                                            updateAmount(index, _index, newQuantity);
                                                                        }}
                                                                    />
                                                                    <div className="h-6">
                                                                        <ErrorMessage className="text-red-400" name={`endUsers[${index}].inventory[${_index}].quantity`} component="div" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex h-auto flex-col py-3">
                                                                    <label className="pb-2" htmlFor={`endUsers[${index}].inventory[${_index}].unit`}>UoM</label>
                                                                    <Field
                                                                        as="input"
                                                                        name={`endUsers[${index}].inventory[${_index}].unit`}
                                                                        placeholder="UoM"
                                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                                        disabled
                                                                    />
                                                                    <div className="h-6">
                                                                        <ErrorMessage className="text-red-400" name={`endUsers[${index}].inventory[${_index}].unit`} component="div" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex h-auto flex-col py-3">
                                                                    <label className="pb-2" htmlFor={`endUsers[${index}].inventory[${_index}].price`}>U/Price</label>
                                                                    <Field
                                                                        as="input"
                                                                        name={`endUsers[${index}].inventory[${_index}].price`}
                                                                        placeholder="Price"
                                                                        disabled
                                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                                    />
                                                                    <div className="h-6">
                                                                        <ErrorMessage className="text-red-400" name={`endUsers[${index}].inventory[${_index}].price`} component="div" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex h-auto flex-col py-3">
                                                                    <label className="pb-2" htmlFor={`endUsers[${index}].inventory[${_index}].amount`}>T/Amount</label>
                                                                    <Field
                                                                        as="input"
                                                                        type="number"
                                                                        name={`endUsers[${index}].inventory[${_index}].amount`}
                                                                        placeholder="Amount"
                                                                        disabled
                                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                                    />
                                                                    <div className="h-6">
                                                                        <ErrorMessage className="text-red-400" name={`endUsers[${index}].inventory[${_index}].amount`} component="div" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-row gap- col-span-2 pb-3">
                                                                    <div onClick={() => setFieldValue(`endUsers[${index}].inventory`, [...values.endUsers[index].inventory, {
                                                                        refId: '',
                                                                        id: '',
                                                                        receiptRef: '',
                                                                        name: '',
                                                                        size: '',
                                                                        unit: '',
                                                                        quantity: 1,
                                                                        price: 0,
                                                                        amount: 0
                                                                    }])} className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                        </svg>
                                                                        <p>Add Item</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div >
                                        )
                                    })}
                                </div >
                            </Form >
                        )
                    }
                    }
                </Formik >
            </div >
        </>
    )
}

export default CreateIssuance
