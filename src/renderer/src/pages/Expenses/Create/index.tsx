import { useRef } from "react"
import Header from "../../../components/Header"
import { useMutation } from "@tanstack/react-query"
import { createProduct } from "../../../api/inventory/inventoryApi"
import TopButtons from "../../../components/TopButtons"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useToast } from "../../../providers/ToastContext"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import { createExpense } from "../../../api/expenses/expensesApi"

const CreateExpense: React.FC = () => {
    const navigate = useNavigate();
    const { showToast } = useToast()
    const formRef = useRef<any>();

    const createExpenseMutation = useMutation({
        mutationFn: (values: any) => createExpense(values),
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: () => {
            showToast(
                "Expense Created Successfully!",
                "New expense has been added to the system.",
                'success'
            );
            navigate("/expenses", { replace: true })

        },
    });

    const handleSave = () => {
        if (formRef?.current) {
            formRef.current?.submitForm()
        }
    }

    const validationSchema = Yup.object().shape({
        expense_type: Yup.string().required('Expense type is required').min(1, 'Too short').max(250, 'Too long'),
        amount: Yup.number()
            .required('Amount is required')
            .min(0, 'Amount cannot be negative')
            .max(100000000000, 'Amount cannot exceed 100 billion')
            .typeError('Amount be a number'),
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        description: Yup.string().required('Description is required')
    });

    const initialValues = {
        expense_type: null,
        amount: null,
        first_name: '',
        last_name: '',
        description: '',
    };

    return (
        <>
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Create Expenses'} description={'Expenses'} />
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
                    onSubmit={(values: FormikValues, { }) => {
                        let newValues = values
                        if (values.expense_type === 'Other') {
                            newValues = {
                                expense_type: values.other,
                                first_name: values.first_name,
                                last_name: values.last_name,
                                amount: values.amount,
                                description: values.description
                            }
                        }
                        createExpenseMutation.mutate(newValues)
                    }
                    }
                >
                    {({ setFieldValue, values }) => (
                        <Form className=" w-full">
                            <div className="w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1"  >
                                <div className="flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="expense_type">Expense Type</label>
                                    <Field
                                        as="select"
                                        name="expense_type"
                                        className={`${!values.expense_type && 'text-gray-500'} bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("expense_type", e.target.value)}
                                    >
                                        <option value="" disabled selected>Select Expense Type</option>
                                        <option value="Office Supplies">Office Supplies</option>
                                        <option value="Food">Food</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="expense_type" component="div" />
                                    </div>
                                </div>

                                {
                                    values.expense_type === 'Other' && (
                                        <div className="flex h-auto flex-col p-1">
                                            <label className="pb-2" htmlFor="other">Please Specify Expense</label>
                                            <Field
                                                as="input"
                                                name="other"
                                                placeholder="Enter Expense"
                                                className="bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md"
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                            <div className="h-6">
                                                <ErrorMessage className="text-red-400" name="other" component="div" />
                                            </div>
                                        </div>
                                    )
                                }

                                <div className="flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="amount">Amount</label>
                                    <Field
                                        as="input"
                                        name="amount"
                                        placeholder="₱0.00"
                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="amount" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="size">First Name</label>
                                    <Field
                                        as="input"
                                        name="first_name"
                                        placeholder="Enter First Name"
                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="first_name" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="inStock">Last Name</label>
                                    <Field
                                        as="input"
                                        name="last_name"
                                        placeholder="Enter Last Name"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="last_name" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col col-span-2 p-1">
                                    <label className="pb-2" htmlFor="cost">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Enter Description"
                                        className="bg-transparent border border-gray-300 p-4 mb-1 rounded-md h-32"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="description" component="div" />
                                    </div>
                                </div>

                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default CreateExpense







