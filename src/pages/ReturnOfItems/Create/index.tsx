/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react"
import Header from "../../../components/Header"
import { useMutation } from "@tanstack/react-query"
import TopButtons from "../../../components/TopButtons"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useToast } from "../../../providers/ToastContext"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import DropdownWithSearch from "../../../components/DropdownWithSearch"
import { fetchReceiptRefs } from "../../../api/issuance/issuanceApi"
import { createReturnedItems } from "../../../api/returnedItems/returnedItemsApi"

const CreateReturnOfItems: React.FC = () => {
    const navigate = useNavigate();
    const { showToast } = useToast()
    const [itemNames, setItemNames] = useState<any[]>([])
    const formRef = useRef<any>();

    const createReturnedItemsMutation = useMutation({
        mutationFn: (values: any) => createReturnedItems(values),
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: () => {
            showToast(
                "Returned item Created Successfully!",
                "New Returned item has been added to the system.",
                'success'
            );
            navigate("/return-of-items", { replace: true })
        },
    });

    const handleSave = () => {
        console.log(formRef?.current);
        if (formRef?.current) {
            formRef.current?.submitForm()
        }
    }

    const validationSchema = Yup.object().shape({
        receiptRef: Yup.string().required('Receipt ref is required'),
        itemName: Yup.string().required('Item name is required'),
        size: Yup.string().required('Size is required'),
        personnel: Yup.string().required('Personnel is required'),
        sizeType: Yup.string(),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
        notes: Yup.string().required('Notes is required'),
        itemId: Yup.string().nullable().optional(),
        inventoryId: Yup.string().nullable().optional(),
    });

    const initialValues = {
        receiptRef: '',
        itemName: '',
        size: '',
        itemId: '',
        personnel: '',
        itemSizes: [],
        sizeType: '',
        date: '',
        time: '',
        notes: '',
        inventoryId: '',
    };

    const handleRefetch = (refetchFn: () => void) => {
        refetchFn();
    };

    return (
        <>
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Create Return Of Items'} description={'Return of items'} />
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
                        const { ...filteredValues } = values;
                        createReturnedItemsMutation.mutate(filteredValues);
                    }
                    }
                >
                    {({ setFieldValue, values }) => (
                        <Form className=" w-full">
                            <div className="w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1"  >
                                <div className="flex h-auto flex-col py-3">
                                    <label className="pb-2" htmlFor='receiptRef'>Receipt Ref</label>
                                    <DropdownWithSearch
                                        formikSelectedValue={values?.receiptRef}
                                        placeholder="Receipt Ref"
                                        name='receiptRef'
                                        fetchNames={() => fetchReceiptRefs("all")}
                                        setFieldValue={setFieldValue}
                                        refetchData={handleRefetch}
                                        setSelectedValue={(value: any) => {
                                            const mappedItems = Object.values(
                                                value?.items?.reduce((acc: { [key: string]: { id: string, name: string, size: Array<{ name: string, itemId: string, price: number }>, unit: string, price: number, inventoryId: string } }, { id, name, size, unit, price, inventoryId }: { id: string, name: string, size: string, unit: string, price: number, inventoryId: string }) => {
                                                    if (!acc[name]) {
                                                        acc[name] = { id, name, size: [{ itemId: id, name: size, price }], unit, price, inventoryId };
                                                    } else {
                                                        acc[name].size.push({ name: size, price, itemId: id });
                                                    }
                                                    return acc;
                                                }, {}) || {}
                                            );
                                            setItemNames(mappedItems);
                                            // Reset item selection when receipt changes
                                            setFieldValue('itemName', '');
                                            setFieldValue('size', '');
                                            setFieldValue('itemSizes', []);
                                            setFieldValue('itemId', '');
                                            setFieldValue('inventoryId', '');
                                        }}
                                    />
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                    <label className="pb-2" htmlFor='itemName'>Item Name</label>
                                    <DropdownWithSearch
                                        formikSelectedValue={values?.itemName}
                                        placeholder="Item Name"
                                        name='itemName'
                                        fetchNames={() => itemNames || []}
                                        setFieldValue={setFieldValue}
                                        refetchData={handleRefetch}
                                        setSelectedValue={(value: { sizeType: string, inventoryId: string, unit: string, name: string, size: Array<{ name: string, itemId: string, price: number }> }) => {
                                            setFieldValue(`sizeType`, value.sizeType || 'none');
                                            setFieldValue('itemSizes', value.size || []);
                                            setFieldValue("inventoryId", value.inventoryId);
                                            
                                            // Reset size when item changes
                                            setFieldValue('size', '');
                                            setFieldValue('itemId', '');
                                        }}
                                    />
                                </div>
                                <div className="flex h-auto flex-col">
                                    <label className="pb-2" htmlFor='size'>Size</label>
                                    <Field as="select"
                                        name='size'
                                        placeholder="Size"
                                        className="bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            const selectedSize = e.target.value;
                                            
                                            const sizeObj = values.itemSizes.find(
                                                (size: { name: string, itemId: string }) => size.itemId === selectedSize
                                            );
                                            
                                            if (sizeObj) {
                                                setFieldValue('size', sizeObj.name);
                                                setFieldValue('itemId', sizeObj.itemId);
                                            }
                                        }}
                                        disabled={values.itemSizes.length === 0}
                                    >
                                        <option value="" disabled selected>Select Size</option>
                                        {Array.isArray(values.itemSizes) && values.itemSizes.map((size: { name: string, itemId: string }, index: number) => (
                                            <option key={`${size.name}-${index}`} value={size.itemId}>
                                                {size.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name='size' component="div" />
                                    </div>
                                </div>
                                <div className=" flex h-auto flex-col">
                                    <label className="pb-2" htmlFor="personnel">Personnel</label>
                                    <Field
                                        as="input"
                                        name="personnel"
                                        placeholder="Personnel"
                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                </div>
                                <div className="flex h-auto flex-col py-3">
                                    <label className="pb-2" htmlFor="date">Return Date</label>
                                    <Field
                                        type="date"
                                        name="date"
                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="date" component="div" />
                                    </div>
                                </div>

                                <div className="flex h-auto flex-col py-3">
                                    <label className="pb-2" htmlFor="time">Return Time</label>
                                    <Field
                                        type="time"
                                        name="time"
                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="time" component="div" />
                                    </div>
                                </div>
                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="notes">Notes</label>
                                    <Field
                                        as="input"
                                        name="notes"
                                        placeholder="Notes"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="notes" component="div" />
                                    </div>
                                </div>
                            </div>
                        </Form >
                    )}
                </Formik >
            </div >
        </>
    )
}

export default CreateReturnOfItems