import { ErrorMessage, Field, Formik, FormikValues, Form } from "formik"
import React, { useEffect, useRef, useState } from "react"
import * as Yup from 'yup'
import Header from "../../../components/Header"
import TopButtons from "../../../components/TopButtons"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import { useLocation, useNavigate } from "react-router-dom"
import { useToast } from "../../../providers/ToastContext"
import { useMutation } from "@tanstack/react-query"
import ItemTable from "../../../components/Issuance/ItemTable"
import DropdownWithNew from "../../../components/DropdownWithNew"
import { createIssuance, updateIssuance } from "../../../api/issuance/issuanceApi"
import moment from "moment"

const UpdateIssuance: React.FC = () => {
    const { state } = useLocation()
    const [isCustomerNew, setIsCustomerNew] = useState<boolean>(false)
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
    const [total, setTotal] = useState(0);

    const navigate = useNavigate()
    const { showToast } = useToast()
    const formRef = useRef<any>()

    const updateIssuanceMutation = useMutation({
        mutationFn: (values: any) => updateIssuance({ ...values, id: state.id }),
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: () => {
            showToast(
                "Expenses Successfully Updated!",
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
        document_no: Yup.string().required('Document No is required') as any,
        directive_no: Yup.string().required('Issuance Directive Nr. is required') as any,
        issuance_date: Yup.string().required('Issuance Date is required') as any,
        expiry_date: Yup.string().required('Expiry Date is required') as any,
        endUsers: Yup.array().of(
            Yup.object().shape({
                id: Yup.string().nullable(),
                name: Yup.string().required('End User is required'),
                items: Yup.array().of(
                    Yup.object().shape({
                        inventoryId: Yup.string().nullable(),
                        itemName: Yup.string().required('Inventory Item Name is required'),
                        location: Yup.string().required('Inventory Location is required'),
                        supplier: Yup.string().required('Inventory Supplier is required'),
                        quantity: Yup.number().required('Inventory Quantity is required'),
                        price: Yup.number().required('Inventory Price is required'),
                        amount: Yup.number().required('Inventory Amount is required'),
                        unit: Yup.string().required('Inventory Unit is required'),
                        size: Yup.string().required('Inventory Size is required'),
                    })
                )
            })
        ),
    });

    const initialValues = {
        document_no: state?.documentNum || '',
        directive_no: state?.directiveNo || '',
        issuance_date: state?.issuanceDate ? moment(state?.issuanceDate).format('YYYY-MM-DD') : '',
        expiry_date: state?.expiryDate ? moment(state?.expiryDate).format('YYYY-MM-DD') : '',
        endUsers: state?.endUsers?.map((end: any) => ({
            id: end?.id,
            name: end?.endUser?.name || '',
            items: end?.items?.map((item: any) => ({
                inventoryId: item?.id,
                itemName: item?.inventory?.itemName || '',
                location: item?.inventory?.location || '',
                supplier: item?.inventory?.supplier || '',
                quantity: item?.inventory?.quantity || 0,
                price: item?.inventory?.price || 0,
                amount: item?.inventory?.amount || 0,
                unit: item?.inventory?.unit || '',
                size: item?.inventory?.size || '',
            }))
        })) || []
    };
    
    useEffect(() => {
        setSelectedCustomer(null)
    }, [isCustomerNew])

    return (
        <>
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Update Issuance'} description={'Issuance'} />
                <TopButtons>
                    <button onClick={() => navigate(-1)} className="rounded-lg font-lato border border-aaa text-aaa p-3">
                        Cancel
                    </button>
                    <PrimaryButton text="Save" onClick={handleSave} />
                </TopButtons>
            </div>
            <div className="flex w-full h-full justify-center">
                <Formik
                    innerRef={formRef}
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    validateOnChange
                    onSubmit={(values: FormikValues) => {
                        console.log(values)
                        const formattedValues = {
                            ...values,
                            issuance_date: values.issuance_date ? `${values.issuance_date}T00:00:00.000Z` : null,
                            expiry_date: values.issuance_date ? `${values.expiry_date}T00:00:00.000Z` : null,
                        };
                        updateIssuanceMutation.mutate(formattedValues)
                    }}
                >
                    {({ values, setFieldValue }) => {
                        return (
                            <Form className="w-full">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h1 className="text-lg">Issuance Details</h1>
                                    <div className="w-full grid grid-cols-2 gap-1 mb-5">
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="document_no">Document No.</label>
                                            <Field
                                                as="input"
                                                name="document_no"
                                                placeholder="Document No."
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                value={values.document_no}
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="document_no" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="directive_no">Issuance Directive Nr.</label>
                                            <Field
                                                as="input"
                                                name="directive_no"
                                                placeholder="Issuance Directive Nr."
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="directive_no" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="issuance_date">Issuance Date</label>
                                            <Field
                                                type="date"
                                                name="issuance_date"
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="issuance_date" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="expiry_date">Expiry Date</label>
                                            <Field
                                                type="date"
                                                name="expiry_date"
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="expiry_date" component="div" />
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-lg">End User & Item Details</h1>
                                    {values.endUsers.map((user: any, index: number) => {
                                        return (
                                            <div key={index} className="w-full grid grid-cols-2 gap-1 border-b mb-5">
                                                <div className="flex h-auto flex-col py-3">
                                                    <DropdownWithNew
                                                        placeholder="End User"
                                                        name={`endUser[${index}].name`}
                                                        fetchNames={null}
                                                        setFieldValue={setFieldValue}
                                                        data={user.name}
                                                        setSelectedValue={(value) => console.log("Selected:", value)}
                                                    />
                                                    <div className="h-6">
                                                        <ErrorMessage className="text-red-400" name={`endUser[${index}].name`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-5 mx-5">
                                                    <div className="py-6">
                                                        <div
                                                            onClick={() => {
                                                                if (values.endUser.length > 1) {
                                                                    const updatedEndUsers = [...values.endUser];
                                                                    updatedEndUsers.splice(index, 1);
                                                                    setFieldValue('endUser', updatedEndUsers);
                                                                }
                                                            }}
                                                            className={`flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventories?.length > 1 && 'hover:text-red-400'} cursor-pointer`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                            <p>Remove End User</p>
                                                        </div>
                                                    </div>
                                                    <div className="py-6">
                                                        <div onClick={() => setFieldValue('endUser', [...values.endUser, {
                                                            id: null,
                                                            name: '',
                                                            inventoryItems: [
                                                                {
                                                                    id: null,
                                                                    item_name: '',
                                                                    location: '',
                                                                    supplier: '',
                                                                    quantity: 1,
                                                                    price: 0,
                                                                    amount: 0,
                                                                    unit: '',
                                                                    size: '',
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
                                                <ItemTable index={index} values={values} setFieldValue={setFieldValue} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </div>
        </>
    )
}

export default UpdateIssuance
