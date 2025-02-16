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

const CreateSales: React.FC = () => {
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
                <Header title={'Create Sales'} description={'Sales'} />
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
                            setTotal(computedTotal); // Update total state
                        }, [values.inventories]);
                        return (
                            <Form className="w-full">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h1 className="text-lg">Customer Information</h1>
                                    <div className="w-full grid grid-cols-2 gap-1 border-b mb-5 pb-10">
                                        {
                                            isCustomerNew ? (
                                                <>
                                                    <div className="flex h-auto flex-col py-3">
                                                        <label className="pb-2 text-gray-500" htmlFor="customer_firstname">Customer First Name</label>
                                                        <Field
                                                            as="input"
                                                            name="customer_firstname"
                                                            placeholder="Enter Customer First Name"
                                                            className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"

                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                        <div className="h-6">
                                                            <ErrorMessage className="text-red-400" name="customer_firstname" component="div" />
                                                        </div>
                                                    </div>

                                                    <div className=" flex h-auto flex-col py-3">
                                                        <label className="pb-2 text-gray-500" htmlFor="customer_lastname">Customer Last Name</label>
                                                        <Field
                                                            as="input"
                                                            name="customer_lastname"
                                                            placeholder="Enter Customer Last name"
                                                            className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"

                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                        <div className="h-6">
                                                            <ErrorMessage className="text-red-400" name="customer_lastname" component="div" />
                                                        </div>
                                                    </div>

                                                    <div className=" flex h-auto flex-col py-3">
                                                        <label className="pb-2 text-gray-500" htmlFor="customer_contactnumber">Contact Number</label>
                                                        <Field
                                                            as="input"
                                                            name="customer_contactnumber"
                                                            placeholder="Enter Contact Number"
                                                            className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                        <div className="h-6">
                                                            <ErrorMessage className="text-red-400" name="customer_contactnumber" component="div" />
                                                        </div>
                                                    </div>

                                                    <div className=" flex h-auto flex-col pt-3">
                                                        <label className="pb-2 text-gray-500" htmlFor="customer_address">Address</label>
                                                        <Field
                                                            as="input"
                                                            name="customer_address"
                                                            placeholder="Enter Address"
                                                            className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"

                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                        <div className="h-6">
                                                            <ErrorMessage className="text-red-400" name="customer_address" component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="flex mb-5">
                                                        <p onClick={() => setIsCustomerNew(false)} className="underline text-gray-400 text-sm hover:text-blue-500 cursor-pointer">
                                                            Customer already exist? Find now.
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>
                                                    <div className="flex h-auto flex-row py-3 item-center">
                                                        <DropdownWithSearch
                                                            setFieldValue={setFieldValue}
                                                            label="Customer"
                                                            placeholder="Search customer"
                                                            name="customer_id"
                                                            fetchNames={fetchCustomers}
                                                            setSelectedValue={setSelectedCustomer}
                                                        />
                                                        <div className="flex items-center mx-3 mt-1.5">
                                                            <button onClick={() => setIsCustomerNew(true)} className="rounded-lg font-lato bg-aaa text-white p-3 px-5">
                                                                Create
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            selectedCustomer && (
                                                <div className="grid grid-cols-2 gap-1 col-span-2">
                                                    <div className="flex flex-col">
                                                        <label className="pb-2 text-gray-500">Customer First Name</label>
                                                        <input
                                                            className="bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                            value={selectedCustomer?.first_name}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="pb-2 text-gray-500">Customer Last Name</label>
                                                        <input
                                                            className="bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                            value={selectedCustomer?.last_name}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="pb-2 text-gray-500">Customer Contact Number</label>
                                                        <input
                                                            className="bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                            value={selectedCustomer?.contact_number}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="pb-2 text-gray-500">Customer Address</label>
                                                        <input
                                                            className="bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                            value={selectedCustomer?.address}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <h1 className="text-lg">Product Information</h1>
                                    {values.inventories.map((inv1: any, index: number) => (
                                        <div key={index} className="w-full grid grid-cols-2 gap-1 border-b mb-5">
                                            <div className="flex h-auto flex-col py-3">
                                                <DropdownWithSearch
                                                    setFieldValue={setFieldValue}
                                                    label="Product"
                                                    placeholder="Search Product"
                                                    name={`inventories[${index}].id`}
                                                    fetchNames={fetchProductNames}
                                                    _index={index}
                                                />
                                                <div className="h-6">
                                                    <ErrorMessage className="text-red-400" name={`inventories[${index}].id`} component="div" />
                                                </div>
                                            </div>
                                            <div className="flex h-auto flex-col py-3">
                                                <label className="pb-2 text-gray-500" htmlFor={`inventories[${index}].quantity`}>Quantity</label>
                                                <Field
                                                    as="input"
                                                    type='number'
                                                    name={`inventories[${index}].quantity`}
                                                    placeholder="Enter Quantity"
                                                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={((e: any) => {
                                                        setFieldValue(`inventories[${index}].quantity`, e.target.value)
                                                        setFieldValue(`inventories[${index}].total_price`, values.inventories[index].price * e.target.value)
                                                    })}
                                                />
                                                <div className="h-6">
                                                    <ErrorMessage className="text-red-400" name={`inventories[${index}].quantity`} component="div" />
                                                </div>
                                            </div>
                                            <div className="flex h-auto flex-col py-3">
                                                <label className="pb-2 text-gray-500" htmlFor={`inventories[${index}].total_price`}>Amount</label>
                                                <Field
                                                    as="input"
                                                    type='number'
                                                    name={`inventories[${index}].total_price`}
                                                    placeholder="₱0.00"
                                                    className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                />
                                                <div className="h-6">
                                                    <ErrorMessage className="text-red-400" name={`inventories[${index}].total_price`} component="div" />
                                                </div>
                                            </div>
                                            <div className="flex h-auto flex-col py-3">
                                                <label className="pb-2 text-gray-500" htmlFor={`inventories[${index}].terms`}>Terms</label>
                                                <Field
                                                    as="select"
                                                    name={`inventories[${index}].terms`}
                                                    className={`${inv.terms === '' && 'text-gray-400'} bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon`}
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                >
                                                    <option value="" disabled selected>Select Terms</option>
                                                    <option value="30 days">30 days</option>
                                                    <option value="60 days">60 days</option>
                                                    <option value="90 days">90 days</option>
                                                    <option value="120 days">120 days</option>
                                                </Field>
                                                <div className="h-6">
                                                    <ErrorMessage className="text-red-400" name={`inventories[${index}].terms`} component="div" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex flex-row gap-5">
                                        <div onClick={() => values.inventories?.length > 1 && setFieldValue('inventories', values.inventories.slice(0, -1))} className={`flex flex-row gap-2 items-center text-sm text-red-300 ${values.inventories?.length > 1 && 'hover:text-red-400'} cursor-pointer`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            <p>Remove Product</p>
                                        </div>
                                        <div onClick={() => setFieldValue('inventories', [...values.inventories, { id: null, quantity: null, total_price: null, terms: '30 days' }])} className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <p>Add Product</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row h-12 w-full bg-transparent rounded-xl justify-end items-center align-middle sticky bottom-4  mt-2 px-4 ">
                                    <div className="flex items-center h-full w-[10%] min-w-fit bg-aaa justify-start rounded-md p-4">
                                        <span className="text-white font-semibold">{`Total:      ₱${total}`}</span>
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

export default CreateSales
