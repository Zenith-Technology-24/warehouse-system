import { useRef, useState } from "react"
import Header from "../../../components/Header"
import { useMutation, useQuery } from "@tanstack/react-query"
import TopButtons from "../../../components/TopButtons"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useToast } from "../../../providers/ToastContext"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import DropdownWithSearch from "../../../components/DropdownWithSearch"
import { fetchReceiptRefs } from "../../../api/issuance/issuanceApi"
import SizeSelector from "../../../components/SizeSelector"
import { fetchItemType } from "../../../api/item/itemApi"
import { createReturnedItems } from "../../../api/returnedItems/returnedItemsApi"

const CreateReturnOfItems: React.FC = () => {
    const navigate = useNavigate();
    const { showToast } = useToast()
    const [itemNames, setItemNames] = useState<any>('')
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
        notes: Yup.string().required('Notes is required')
    });

    const initialValues = {
        receiptRef: '',
        itemName: '',
        size: '',
        personnel: '',
        sizeType: '',
        date: '',
        time: '',
        notes: ''
    };

    const handleRefetch = (refetchFn: () => void) => {
        refetchFn();
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
                        const { sizeType, ...filteredValues } = values;
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
                                        fetchNames={fetchReceiptRefs}
                                        setFieldValue={setFieldValue}
                                        refetchData={handleRefetch}
                                        setSelectedValue={(value: any) => {
                                            const mappedItems = Object.values(
                                                value?.items?.reduce((acc: { [key: string]: { id: string, name: string, size: Array<{ name: string, price: number }>, unit: string, price: number, inventoryId: string } }, { id, name, size, unit, price, inventoryId }: { id: string, name: string, size: string, unit: string, price: number, inventoryId: string }) => {
                                                    if (!acc[name]) {
                                                        acc[name] = { id, name, size: [{ name: size, price }], unit, price, inventoryId };
                                                    } else {
                                                        acc[name].size.push({ name: size, price });
                                                    }
                                                    return acc;
                                                }, {}) || {}
                                            );
                                            setItemNames(mappedItems);
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
                                        setSelectedValue={(value: { sizeType: string, unit: string, name: string, size: string }) => {
                                            setFieldValue(`size`, defaultSizeMap[value.sizeType as keyof typeof defaultSizeMap] || "none");
                                            setFieldValue(`sizeType`, value.sizeType);
                                        }}
                                    />
                                </div>
                                <SizeSelector name={'size'} inventory={values} classes="!col-span-1 !py-1" />
                                <div className=" flex h-auto flex-col p-1">
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
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="personnel" component="div" />
                                    </div>
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

                        </Form>
                    )}
                </Formik>
            </div >
        </>
    )
}

export default CreateReturnOfItems







