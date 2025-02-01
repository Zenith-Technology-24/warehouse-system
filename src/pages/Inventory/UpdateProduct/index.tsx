import { useRef } from "react"
import Header from "../../../components/Header"
import { useMutation } from "@tanstack/react-query"
import { updateProduct } from "../../../api/inventory/inventoryApi"
import TopButtons from "../../../components/TopButtons"
import { useLocation, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useToast } from "../../../providers/ToastContext"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import LinkSecondaryButton from "../../../components/buttons/LinkSecondaryButton"

const UpdateProduct: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { showToast } = useToast()
    const formRef = useRef<any>()
    const updateProductMutation = useMutation({
        mutationFn: (values: any) => {
            return updateProduct({ ...values, id: state.id })
        },
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: () => {
            showToast(
                "Product Updated Successfully!",
                "Your changes have been saved.",
                'success'
            );
            navigate("/inventory", { replace: true })

        },
    });

    const handleSave = () => {
        if (formRef?.current) {
            formRef.current?.submitForm()
        }
    }

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required').min(1, 'Too short').max(250, 'Too long'),
        category: Yup.string().required('Category is required').min(1, 'Too short').max(250, 'Too long'),
        size: Yup.string().required('Size is required'),
        inStock: Yup.number()
            .required('Stock is required')
            .min(0, 'Stock cannot be negative')
            .typeError('Stock be a number'),
        cost: Yup.number()
            .required('Cost is required')
            .min(0, 'Cost cannot be negative')
            .typeError('Cost be a number'),
        price: Yup.number()
            .required('Price is required')
            .min(0, 'Price cannot be negative')
            .typeError('Price be a number'),
    });

    // Initial values for the form fields
    const initialValues = {
        productName: state.product_name,
        category: state.category,
        size: state.size,
        inStock: state.in_stock,
        cost: state.cost,
        price: state.price,
    };



    return (
        <>
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Update Inventory'} description={'Inventory'} />
                <TopButtons >
                    <LinkSecondaryButton text="Cancel" to=".." />
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
                        updateProductMutation.mutate(values)
                    }
                    }
                >
                    {() => (
                        <Form className=" w-full">
                            <div className="w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1"  >
                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="productName">Product Name</label>
                                    <Field
                                        as="input"
                                        name="productName"
                                        placeholder="Enter Product Name"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="productName" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="category">Category</label>
                                    <Field
                                        as="input"
                                        name="category"
                                        placeholder="Enter Category"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="category" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="size">Size</label>
                                    <Field
                                        as="input"
                                        name="size"
                                        placeholder="Enter size"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="size" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="inStock">In Stock</label>
                                    <Field
                                        as="input"
                                        name="inStock"
                                        placeholder="Enter stock"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="inStock" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="cost">Cost</label>
                                    <Field
                                        as="input"
                                        name="cost"
                                        placeholder="Enter Cost"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="cost" component="div" />
                                    </div>
                                </div>

                                <div className=" flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="price">Price</label>
                                    <Field
                                        as="input"
                                        name="price"
                                        placeholder="Enter Price"
                                        className="bg-transparent h-12 border  border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="price" component="div" />
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

export default UpdateProduct







