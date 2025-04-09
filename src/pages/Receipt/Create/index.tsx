import { ErrorMessage, Field, Formik, FormikValues, Form } from "formik"
import React, { useEffect, useRef, useState } from "react"
import * as Yup from 'yup'
import Header from "../../../components/Header"
import TopButtons from "../../../components/TopButtons"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../../providers/ToastContext"
import { useMutation, useQuery } from "@tanstack/react-query"
import AddItemModal from "../../../components/ItemType/AddItemModal"
import { addItemType, deleteItemType, fetchItemType, updateItemType } from "../../../api/item/itemApi"
import DropdownWithSearch from "../../../components/DropdownWithSearch"
import { createReceipt } from "../../../api/receipt/receiptApi"
import SizeSelector from "../../../components/SizeSelector"
import Modal from "../../../components/Modal"
import UpdateItemModal from "../../../components/ItemType/UpdateItemModal"

const CreateReceipt: React.FC = () => {
    const navigate = useNavigate()
    const { showToast } = useToast()
    const formRef = useRef<any>()
    const [addItemModalOpen, setIsAddItemModalOpen] = useState<boolean>(false)
    const [updateItemModalOpen, setIsUpdateItemModalOpen] = useState<boolean>(false)
    const [isDeleteTypeModalOpen, setIsDeleteTypeModalOpen] = useState<boolean>(false)
    const [selectedItemType, setSelectedItemType] = useState<any>(null)

    const { data: itemTypes } = useQuery({
        queryKey: ['item-types'],
        queryFn: fetchItemType,
    });

    const createReceiptMutation = useMutation({
        mutationFn: (values: any) => createReceipt(values),
        onError: (error: any) => {
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
            navigate("/receipt", { replace: true })
        },
    });

    const addItem = useMutation({
        mutationFn: addItemType,
        onError: (error: any) => {
            showToast(
                error?.response?.data?.message,
                "",
                "error"
            );
        },
        onSuccess: () => {
            showToast(
                'Item Type Successfully Added',
                'Item Type has been successfully added.',
                'success'
            );
            setIsAddItemModalOpen(false);
        },
    });

    const updateItem = useMutation({
        mutationFn: updateItemType,
        onError: (error: any) => {
            showToast(
                error?.response?.data?.message,
                "",
                "error"
            );
        },
        onSuccess: () => {
            showToast(
                'Item Type Successfully Updated',
                'Item Type has been successfully updated.',
                'success'
            );
            setIsUpdateItemModalOpen(false);
        },
    });

    const deleteItem = useMutation({
        mutationFn: deleteItemType,
        onError: (error: any) => {
            showToast(
                error?.response?.data?.message,
                "",
                "error"
            );
        },
        onSuccess: () => {
            showToast(
                'Item Type Successfully Deleted',
                'Item Type has been successfully deleted.',
                'success'
            );
            setIsDeleteTypeModalOpen(false);
        },
    });

    const handleSave = () => {
        if (formRef?.current) {
            formRef.current?.submitForm()
        }
    }

    const validationSchema = Yup.object().shape({
        source: Yup.string().required('Please input the Source') as any,
        issuanceDirective: Yup.string().required('Please input the Issuance Directive') as any,
        receipt_date: Yup.string().required('Please input the Receipt Date ') as any,
        inventory: Yup.array().of(
            Yup.object().shape({
                id: Yup.string().nullable(),
                name: Yup.string().required('Please input the Name'),
                sizeType: Yup.string().required('Please input the Size Type '),
                item: Yup.object().shape({
                    location: Yup.string().required('Please input the Inventory Location'),
                    quantity: Yup.number().required('Please input the Inventory Quantity'),
                    price: Yup.number().required('Please input the Inventory Price'),
                    amount: Yup.number().required('Please input the Inventory Amount'),
                    unit: Yup.string().required('Please input the Inventory Unit'),
                    size: Yup.string().required('Please input the Inventory Size'),
                    expiryDate: Yup.string(),
                })
            })
        ),
    });

    const initialValues = {
        source: '',
        issuanceDirective: '',
        receipt_date: '',
        inventory: [
            {
                id: '',
                name: '',
                sizeType: '',
                item: {
                    location: '',
                    quantity: 1,
                    price: 0,
                    amount: 0,
                    unit: '',
                    size: 'none',
                    expiryDate: ''
                }
            }
        ]
    };

    const handleRefetch = (refetchFn: () => void) => {
        refetchFn();
    };

    const handleDeleteItemType = () => {
        deleteItem.mutate(selectedItemType.id)
    }

    const defaultSizeMap = {
        numerical: "5",
        standard: "S",
        length: "XXS",
        fit: "5R",
        expanded: "52",
        roman: "I",
        none: "none"
    };

    return (
        <>
            <Modal
                isOpen={isDeleteTypeModalOpen}
                title={'Delete Item Type'}
                onClose={() => setIsDeleteTypeModalOpen(false)}
                handleFunction={() => handleDeleteItemType()}
                message={`Are you sure you want to delete this item type ${selectedItemType?.name}? This action cannot be undone.`}
            />
            <AddItemModal
                isOpen={addItemModalOpen}
                onClose={() => setIsAddItemModalOpen(false)}
                handleFunction={(e) => addItem.mutate(e)}
            />
            <UpdateItemModal
                data={selectedItemType}
                isOpen={updateItemModalOpen}
                onClose={() => setIsUpdateItemModalOpen(false)}
                handleFunction={(e) => updateItem.mutate(e)}
            />
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Create Receipt'} description={'Receipt'} />
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
                            receipt_date: values.receipt_date ? `${values.receipt_date}T00:00:00.000Z` : null,
                            inventory: values.inventory.map((inv: any) => ({
                                ...inv,
                                item: {
                                    ...inv.item,
                                    amount: inv.item.price * inv.item.quantity,
                                    expiryDate: inv.item?.expiryDate ? `${inv.item.expiryDate}T00:00:00.000Z` : null
                                }
                            }))
                        };
                        createReceiptMutation.mutate(formattedValues);
                    }}
                >
                    {({ values, setFieldValue }) => {
                        const totalAmount = values.inventory.reduce((sum: number, inv: { item: { price: number, quantity: number } }) => {
                            return sum + (inv?.item?.price * inv?.item?.quantity || 0);
                        }, 0);

                        const updateAmount = (index: number, price: number, quantity: number) => {
                            const amount = price * quantity;
                            setFieldValue(`inventory.${index}.item.amount`, amount);
                        };

                        return (
                            <Form className="w-full">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h1 className="text-lg">Receipt Details</h1>
                                    <div className="w-full grid grid-cols-2 gap-1 mb-5">
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="receipt_date">Receipt Date</label>
                                            <Field
                                                type="date"
                                                name="receipt_date"
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="receipt_date" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col py-3">
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
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="source">Source</label>
                                            <Field
                                                as="input"
                                                name="source"
                                                placeholder="Source"
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="source" component="div" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <h1 className="text-lg">Item Details</h1>
                                        <div onClick={() => setIsAddItemModalOpen(true)} className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <p>Add Item Type</p>
                                        </div>
                                    </div>
                                    {values.inventory.map((inventory: any, index: number) => {
                                        return (
                                            <div key={index} className="w-full grid grid-cols-12 gap-1 bg-gray-50 px-6 py-2 my-2 rounded-lg">
                                                <div className="flex h-auto flex-col py-3 col-span-6">
                                                    <label className="pb-2" htmlFor={`inventory[${index}].name`}>Item Name</label>
                                                    <DropdownWithSearch
                                                        formikSelectedValue={values?.inventory[index]?.name}
                                                        _index={index}
                                                        placeholder="Item Name"
                                                        name={`inventory[${index}].name`}
                                                        fetchNames={fetchItemType}
                                                        setFieldValue={setFieldValue}
                                                        refetchData={handleRefetch}
                                                        setSelectedValue={(value: { sizeType: string, unit: string, name: string, size: string }) => {
                                                            setFieldValue(`inventory[${index}].name`, '');
                                                            setFieldValue(`inventory[${index}].item.unit`, value.unit);
                                                            setFieldValue(`inventory[${index}].item.size`, defaultSizeMap[value.sizeType as keyof typeof defaultSizeMap] || "none");
                                                            setFieldValue(`inventory[${index}].sizeType`, value.sizeType);
                                                            setFieldValue(`inventory[${index}].name`, value.name);
                                                        }}
                                                        onUpdate={(option: object) => {
                                                            setSelectedItemType(option)
                                                            setIsUpdateItemModalOpen(true)
                                                        }}
                                                        onDelete={(option: object) => {
                                                            setSelectedItemType(option)
                                                            setIsDeleteTypeModalOpen(true)
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <SizeSelector inventory={inventory} index={index} />
                                                <div className="flex h-auto flex-col py-3 col-span-2">
                                                    <label className="pb-2" htmlFor={`inventory[${index}].item.quantity`}>Qty</label>
                                                    <Field
                                                        as="input"
                                                        type="number"
                                                        name={`inventory[${index}].item.quantity`}
                                                        placeholder="Qty"
                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                    />
                                                    <div className="h-6">
                                                        <ErrorMessage className="text-red-400" name={`inventory[${index}].item.quantity`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="flex h-auto flex-col py-3 col-span-2">
                                                    <label className="pb-2" htmlFor={`inventory[${index}].item.unit`}>UoM</label>
                                                    <Field
                                                        as="input"
                                                        name={`inventory[${index}].item.unit`}
                                                        placeholder="UoM"
                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                        disabled
                                                    />
                                                    <div className="h-6">
                                                        <ErrorMessage className="text-red-400" name={`inventory[${index}].item.unit`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="flex h-auto flex-col py-3 col-span-3">
                                                    <label className="pb-2" htmlFor={`inventory[${index}].item.location`}>Location</label>
                                                    <Field
                                                        as="input"
                                                        name={`inventory[${index}].item.location`}
                                                        placeholder="Location"
                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                    />
                                                    <div className="h-6">
                                                        <ErrorMessage className="text-red-400" name={`inventory[${index}].item.location`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="flex h-auto flex-col py-3 col-span-3">
                                                    <label className="pb-2" htmlFor={`inventory[${index}].item.expiryDate`}>Expiry Date <span className="text-gray-500">(Optional)</span></label>
                                                    <Field
                                                        type="date"
                                                        name={`inventory[${index}].item.expiryDate`}
                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                    />
                                                    <div className="h-6">
                                                        <ErrorMessage className="text-red-400" name={`inventory[${index}].item.expiryDate`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="flex h-auto flex-col py-3 col-span-3">
                                                    <label className="pb-2" htmlFor={`inventory[${index}].item.price`}>U/Price</label>
                                                    <Field
                                                        as="input"
                                                        type="number"
                                                        name={`inventory[${index}].item.price`}
                                                        placeholder="₱00.00"
                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const newPrice = parseFloat(e.target.value);
                                                            setFieldValue(`inventory.${index}.item.price`, newPrice);
                                                            updateAmount(index, newPrice, inventory.item.quantity);
                                                        }}
                                                    />
                                                    <div className="h-6">
                                                        <ErrorMessage className="text-red-400" name={`inventory[${index}].item.price`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="flex h-auto flex-col py-3 col-span-3">
                                                    <label className="pb-2" htmlFor={`inventory[${index}].item.amount`}>T/Amount</label>
                                                    <Field
                                                        as="input"
                                                        type="number"
                                                        name={`inventory[${index}].item.amount`}
                                                        placeholder="₱00.00"
                                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                        disabled={true}
                                                        value={inventory?.item?.price * inventory?.item?.quantity}
                                                    />
                                                    <div className="h-6">
                                                        <ErrorMessage className="text-red-400" name={`inventory[${index}].item.amount`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-5 col-span-3">
                                                    <div className="py-6">
                                                        <div
                                                            onClick={() => {
                                                                if (values.inventory.length > 1) {
                                                                    const updatedinventory = [...values.inventory];
                                                                    updatedinventory.splice(index, 1);
                                                                    setFieldValue('inventory', updatedinventory);
                                                                }
                                                            }}
                                                            className={`flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventory.length > 1 && 'hover:text-red-400'} cursor-pointer`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                            <p>Remove Item</p>
                                                        </div>
                                                    </div>
                                                    <div className="py-6">
                                                        <div onClick={() => setFieldValue('inventory', [...values.inventory, {
                                                            id: '',
                                                            name: '',
                                                            sizeType: '',
                                                            item: {
                                                                location: '',
                                                                quantity: 1,
                                                                price: 0,
                                                                amount: 0,
                                                                unit: '',
                                                                size: 'none',
                                                                expiryDate: ''
                                                            }
                                                        }])} className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                            <p>Add Item</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="flex flex-row-reverse py-1">
                                        GT/Amount: ₱{totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </div >
        </>
    )
}

export default CreateReceipt
