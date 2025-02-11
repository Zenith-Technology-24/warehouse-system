import { useEffect, useState } from "react"
import Header from "../../components/Header"
import TopButtons from "../../components/TopButtons"
import { useFormik } from "formik"
import * as Yup from 'yup'
import SettingsProfile from "../../components/SettingsProfile"
import SettingsPassword from "../../components/SettingsPassword"
import { useMutation, useQuery, } from "@tanstack/react-query"
import { session } from "../../api/auth/authApi"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import { updateUser } from "../../api/auth/user/userApi"
import { useToast } from "../../providers/ToastContext"


const Settings: React.FC = () => {
    const { showToast } = useToast()
    const [status, setStatus] = useState<string>('profile')
    const { data, refetch } = useQuery({
        queryKey: ["session"],
        queryFn: () => session(),
    })

    const VALIDATION_SCHEMA = {
        first_name: status === 'profile' && Yup.string().required('First name is required') as any,
        last_name: status === 'profile' && Yup.string().required('Last name is required') as any,
        username: status === 'profile' && Yup.string().required('Username is required') as any,
        current_password: status === 'password' && Yup.string().required('Current password is required') as any,
        new_password: status === 'password' && Yup.string().required('New password is required') as any,
        confirm_password: status === 'password' && Yup.string().required('Confirm password is required') as any,
    }

    const schema = useFormik({
        validateOnMount: false,
        initialValues: {
            first_name: data?.user?.firstname,
            last_name: data?.user?.lastname,
            username: data?.user?.username,
            current_password: '',
            new_password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object(VALIDATION_SCHEMA),
        onSubmit(values) {
            updateProfileMutation.mutate({ ...values, id: data?.user?.id })
        }
    })

    useEffect(() => {
        schema.setFieldValue('first_name', data?.user?.firstname)
        schema.setFieldValue('last_name', data?.user?.lastname)
        schema.setFieldValue('username', data?.user?.username)
    }, [data])

    const updateProfileMutation = useMutation({
        mutationFn: (values: any) => updateUser(values),
        onError: (error: any) => {
            console.error(error)
            showToast(
                "User Updated Unsuccessfully!",
                error.response.data.message,
                'error'
            );
        },
        onSuccess: () => {
            showToast(
                "User Updated Successfully!",
                "User profile has been updated to the system.",
                'success'
            );
            refetch()
        },
    });

    const checkIfActive = (value: string) => {
        return value === status && 'border-b-2 border-black'
    }

    return (
        <>
            <div className="flex flex-row justify-between">
                <Header title={'Settings'} description={'Manage your account settings'} />
                <TopButtons >
                    <PrimaryButton text="Save" onClick={schema.handleSubmit as any} />
                </TopButtons>
            </div>
            <div className="flex flex-row gap-2 text-center text-lg text-gray-500">
                <div onClick={() => setStatus('profile')} className={`${checkIfActive('profile')} w-24 py-2 cursor-pointer`}>Profile</div>
                <div onClick={() => setStatus('password')} className={`${checkIfActive('password')} w-24 py-2 cursor-pointer`}>Password</div>
            </div>
            <div>
                {
                    status === 'profile' ? (
                        <SettingsProfile schema={schema} />
                    ) : (
                        <SettingsPassword schema={schema} />
                    )
                }
            </div>
        </>
    )
}

export default Settings