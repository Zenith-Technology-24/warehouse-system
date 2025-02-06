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
import { createUser } from "../../../api/users/usersApi"

const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const { showToast } = useToast()
    const formRef = useRef<any>();
    const [currentType, setCurrentType] = useState<string>('password')
    const [confirmType, setConfirmType] = useState<string>('password')

    const createUserMutation = useMutation({
        mutationFn: (values: any) => createUser(values),
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: () => {
            showToast(
                "User Created Successfully!",
                "New user has been added to the system.",
                'success'
            );
            navigate("/manage-users", { replace: true })

        },
    });

    const handleSave = () => {
        if (formRef?.current) {
            formRef.current?.submitForm()
        }
    }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        password: Yup.string().required('Current password is required'),
        confirm_password: Yup.string().required('Confirm password is required'),
        role: Yup.string().required('Role is required')
    });

    const initialValues = {
        firstname: '',
        lastname: '',
        password: '',
        confirm_password: '',
        role: 'admin'
    };

    return (
        <>
            <div className="flex flex-row justify-between pb-4">
                <Header title={'Create Users'} description={'Manage Users'} />
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
                        createUserMutation.mutate(values)
                    }
                    }
                >
                    {({ setFieldValue, values }) => (
                        <Form className=" w-full">
                            <div className="w-full rounded-lg border border-gray-200 p-4 grid grid-cols-2 gap-1"  >
                                <div className="flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="firs_tname">First Name</label>
                                    <Field
                                        as="input"
                                        name="firstname"
                                        placeholder="First Name"
                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="firstname" component="div" />
                                    </div>
                                </div>

                                <div className="flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="size">Last Name</label>
                                    <Field
                                        as="input"
                                        name="lastname"
                                        placeholder="Last Name"
                                        className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"

                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="lastname" component="div" />
                                    </div>
                                </div>

                                <div className="flex flex-col p-1 relative">
                                    <label className="pb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="input"
                                            type={currentType}
                                            name="password"
                                            placeholder="Password"
                                            className="bg-transparent h-12 border border-gray-300 p-4 pr-10 rounded-md w-full"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            {
                                                currentType === 'password' ? (
                                                    <svg onClick={() => setCurrentType('text')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                                        <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                                        <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                                    </svg>
                                                ) : (
                                                    <svg onClick={() => setCurrentType('password')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                                    </svg>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="password" component="div" />
                                    </div>
                                </div>

                                <div className="flex flex-col p-1 relative">
                                    <label className="pb-2" htmlFor="confirm_password">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="input"
                                            type={confirmType}
                                            name="confirm_password"
                                            placeholder="Confirm Password"
                                            className="bg-transparent h-12 border border-gray-300 p-4 pr-10 rounded-md w-full"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            {
                                                confirmType === 'password' ? (
                                                    <svg onClick={() => setConfirmType('text')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                                        <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                                        <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                                    </svg>
                                                ) : (
                                                    <svg onClick={() => setConfirmType('password')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                                    </svg>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="confirm_password" component="div" />
                                    </div>
                                </div>

                                <div className="flex h-auto flex-col p-1">
                                    <label className="pb-2" htmlFor="firs_tname">Role</label>
                                    <Field
                                        as="input"
                                        name="role"
                                        placeholder="Role"
                                        disabled
                                        className="bg-gray-100 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                    <div className="h-6">
                                        <ErrorMessage className="text-red-400" name="role" component="div" />
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

export default CreateUser







