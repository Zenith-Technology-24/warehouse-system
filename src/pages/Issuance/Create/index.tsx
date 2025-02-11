import { ErrorMessage, Field, Formik, FormikValues, Form } from "formik"
import React, { useEffect, useRef, useState } from "react"
import * as Yup from 'yup'
import Header from "../../../components/Header"
import TopButtons from "../../../components/TopButtons"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../../providers/ToastContext"
import { useMutation } from "@tanstack/react-query"
import { fetchProductNames } from "../../../api/product/productApi"
import { createSales } from "../../../api/sales/salesApi"
import DropdownWithSearch from "../../../components/DropdownWithSearch"
import { fetchCustomers } from "../../../api/customers/customerApi"
import ItemTable from "../../../components/Issuance/ItemTable"

const CreateIssuance: React.FC = () => {
    const [isCustomerNew, setIsCustomerNew] = useState<boolean>(false)
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
    const [total, setTotal] = useState(0);

    const navigate = useNavigate()
    const { showToast } = useToast()
    const formRef = useRef<any>()

    const createSalesMutation = useMutation({
        mutationFn: (values: any) => createSales(values),
        onError: (error: any) => {
            showToast(
                error?.response?.data?.message,
                "",
                "error"
            );
        },
        onSuccess: () => {
            showToast(
                "Expenses Successfully Created!",
                "",
                "success"
            );
            navigate("/sales", { replace: true })
        },
    });

    const handleSave = () => {
        if (formRef?.current) {
            formRef.current?.submitForm()
        }
    }

    const validationSchema = Yup.object().shape({
        customer_id: !isCustomerNew && Yup.string().required('Customer is required') as any,
        customer_firstname: isCustomerNew && Yup.string().required('Customer first name is required').min(1, 'Too short').max(250, 'Too long') as any,
        customer_lastname: isCustomerNew && Yup.string().required('Customer last name is required').min(1, 'Too short').max(250, 'Too long') as any,
        customer_contactnumber: isCustomerNew && Yup.string().required('Contact number is required') as any,
        customer_address: isCustomerNew && Yup.string().required('Address is required').min(1, 'Too short').max(250, 'Too long') as any,
        inventories: Yup.array().of(
            Yup.object().shape({
                inventory: Yup.array().of(
                    Yup.object().shape({
                        id: Yup.number().required('Product is required')
                    })
                ),
                quantity: Yup.number()
                    .required('Quantity is required')
                    .min(1, 'Quantity must be at least 1')
                    .typeError('Quantity must be a number'),
                total_price: Yup.number()
                    .required('Amount is required')
                    .min(0, 'Amount cannot be negative')
                    .typeError('Amount must be a number'),
                terms: Yup.string()
                    .required('Terms is required')
                    .min(1, 'Too short')
                    .max(250, 'Too long'),
            })
        )
    });

    const initialValues = {
        customer_id: null,
        customer_firstname: '',
        customer_lastname: '',
        customer_contactnumber: '',
        customer_address: '',
        inventories: [
            {
                id: null,
                quantity: 0,
                total_price: 0,
                price: 0,
                terms: '30 days'
            }
        ],
        documentNo: ''
    };

    const calculateTotal = (inventories: any[]) => {
        return inventories.reduce((acc, item) => {
            const totalPrice = Number.parseFloat(item.total_price);
            return acc + (Number.isNaN(totalPrice) ? 0 : totalPrice);
        }, 0);
    };
    useEffect(() => {
        setSelectedCustomer(null)
    }, [isCustomerNew])

    return (
        <>
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Create Issuance'} description={'Issuace'} />
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
                        createSalesMutation.mutate(isCustomerNew ? values : {
                            customer_id: values.customer_id,
                            inventories: values.inventories
                        })
                    }}
                >
                    {({ values, setFieldValue }) => {

                        useEffect(() => {
                            const computedTotal = calculateTotal(values.inventories);
                            setTotal(computedTotal);
                        }, [values.inventories]);
                        return (
                            <Form className="w-full">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h1 className="text-lg">Issuance Details</h1>
                                    <div className="w-full grid grid-cols-2 gap-1 mb-5">
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="firs_tname">Document No.</label>
                                            <Field
                                                as="input"
                                                type='number'
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
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="firs_tname">Issuance Directive Nr.</label>
                                            <Field
                                                as="input"
                                                name="issuanceDirectiveNr"
                                                placeholder="Issuance Directive Nr."
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="issuanceDirectiveNr" component="div" />
                                            </div>
                                        </div>
                                        <div className="flex h-auto flex-col py-3">
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
                                        <div className="flex h-auto flex-col py-3">
                                            <label className="pb-2" htmlFor="issuanceDate">Expiry Date</label>
                                            <Field
                                                type="date"
                                                name="expiryDate"
                                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="expiryDate" component="div" />
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-lg">End User & Item Details</h1>
                                    <div className="w-full grid grid-cols-2 gap-1 border-b mb-5">
                                        <div className="flex h-auto flex-col py-3">
                                            <DropdownWithSearch
                                                setFieldValue={setFieldValue}
                                                label="End User"
                                                placeholder="End User"
                                                name='endUser'
                                                fetchNames={fetchProductNames}
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name='endUser' component="div" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-5 mx-5">
                                            <div onClick={() => values.inventories?.length > 1 && setFieldValue('inventories', values.inventories.slice(0, -1))} className={`flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventories?.length > 1 && 'hover:text-red-400'} cursor-pointer`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <p>Remove End User</p>
                                            </div>
                                            <div onClick={() => setFieldValue('inventories', [...values.inventories, { id: null, quantity: null, total_price: null, terms: '30 days' }])} className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                                <p>Add End User</p>
                                            </div>
                                        </div>
                                        <ItemTable setFieldValue={setFieldValue} />
                                    </div>
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

export default CreateIssuance
