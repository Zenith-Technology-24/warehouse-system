import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth/authApi";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { siteConfig } from "../../constants/site";
import { useToast } from "../../providers/ToastContext";
import LoginWallpaper from "../../components/LoginWallpaper";

const VALIDATION_SCHEMA = {
    username: Yup.string().required(),
    password: Yup.string().required(),
}

const Login: React.FC = () => {
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState<string>('password')
    const loginRequest = useMutation({
        mutationFn: login,
        onError: () => {
            alert('Account not found. Please try again.');
        },
        onSuccess: (data: any) => {
            localStorage.setItem('user', JSON.stringify(data));

            showToast(
                "Logged In Successfully!",
                "",
                'success'
            );

            navigate('/');
        },
    });

    const schema = useFormik({
        validateOnMount: false,
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object(VALIDATION_SCHEMA),
        onSubmit(values) {
            loginRequest.mutate(values)
        }
    })

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            schema.handleSubmit()
        }
    };

    return (
        <div className="grid grid-cols-2 h-screen">
            <LoginWallpaper />
            <div className="m-auto">
                <div className="flex flex-col bg-white border border-green-50 w-[500px] py-4 px-6 rounded-2xl">
                    <div className="flex w-full py-6 justify-center">
                        <img className="w-36" src={siteConfig.logo} />
                    </div>
                    <div className="w-full p-2">
                        <span className="text-aaa-text font-lato text-2xl font-[550]">Hi, Welcome back!</span>
                    </div>
                    <div className="w-full p-2">
                        <span className="text-aaa-text font-lato text-sm font-normal">Sign in to your Warehouse Inventory System account.</span>
                    </div>
                    <div>
                        <div className=" mb-5">
                            <label htmlFor="username" className="block mb-2 text-aaa-text font-lato text-sm font-normal">Username</label>
                            <input
                                name="username"
                                value={schema.values.username}
                                onChange={schema.handleChange}
                                onKeyDown={handleKeyDown}
                                type="username"
                                id="username"
                                className="!bg-zinc-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:!ring-aaa focus:outline-none active:!border-aaa active:!ring-aaa focus:!border-aaa block w-full p-2.5"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-aaa-text font-lato text-sm font-normal">Password</label>
                            <div className="relative">
                                <input
                                    type={passwordType}
                                    autoComplete="current-password"
                                    name="password"
                                    placeholder="********"
                                    value={schema.values.password}
                                    onKeyDown={handleKeyDown}
                                    onChange={schema.handleChange}
                                    id="password"
                                    className="bg-zinc-50 border-2 border-gray-300 text-gray-500 text-sm rounded-lg focus:!ring-aaa focus:outline-none focus:!border-aaa active:!border-aaa active:!ring-aaa block w-full p-2.5 pr-10"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {
                                        passwordType === 'password' ? (
                                            <svg onClick={() => setPasswordType('text')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                            </svg>
                                        ) : (
                                            <svg onClick={() => setPasswordType('password')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-700 cursor-pointer">
                                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                            </svg>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mx-1 mb-5 text-sm text-gray-900 font-normal">
                            <div>
                                <input id="green-checkbox" type="checkbox" value="" className="outline-none" />
                                <label htmlFor="green-checkbox" className="ms-2">Remember me</label>
                            </div>
                            <p>Forgot Password?</p>
                        </div>
                        <div className="w-full">
                            <button type='submit' onClick={schema.handleSubmit as any} className="text-white bg-aaa opacity-90 hover:opacity-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login