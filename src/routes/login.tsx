import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from '../axios';
import {
    Outlet,
    Link,
    useLoaderData,
    Form,
} from "react-router-dom";
import logo from "../assets/logo.svg"


export async function action({ request }: any) {
    const formData = await request.formData();
    const details = Object.fromEntries(formData);
    const contact = await axios.post('auth/login', details);
    return { contact };
}

export default function Login() {


    // const mutation = useMutation(
    //      (loginData) => {
    //         const response =  axios.post('/login', loginData);
    //         return response.data;
    //     },
    //     {
    //         onSuccess: (data:any) => {
    //             // Handle successful login (e.g., save token, redirect, etc.)
    //             console.log('Login successful:', data);
    //         },
    //         onError: (error:any) => {
    //             // Handle login error
    //             console.error('Login failed:', error);
    //         },
    //     }
    // );



    const handleSubmit = (e: any) => {
        console.log('e', e)

        e.preventDefault();
    };


    return (
        <div className=" flex h-full w-full bg-white justify-center items-center ">
            <div className="flex flex-col bg-white shadow-lg shadow-[#4CAF5026] w-1/3 h-[45vh]  min-w-[50vh] p-4 rounded-2xl">
                <div className="flex w-full p-2">
                    <img src={logo} />
                </div>
                <div className="w-full p-2">
                    <span className="text-[#48494A] font-lato text-2xl font-[550]">Hi, Welcome back!</span>
                </div>
                <div className="w-full p-2">
                    <span className="text-[#48494A] font-lato text-sm font-normal">Sign in to your AAA account.</span>
                </div>
                <Form method='post' className="mx-auto w-full p-2">
                    <div className=" mb-5">
                        <label htmlFor="email" className="block mb-2 text-[#48494A] font-lato text-sm font-normal">Email Address</label>
                        <input type="email" id="email" className="!bg-zinc-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!ring-emerald-500 active:!border-emerald-500 active:!ring-emerald-500 focus:!border-emerald-500 block w-full p-2.5" placeholder="Enter Email Address" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-[#48494A] font-lato text-sm font-normal">Password</label>
                        <input type="password" autoComplete="current-password" id="password" className="bg-zinc-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!ring-emerald-500 focus:!border-emerald-500 active:!border-emerald-500 active:!ring-emerald-500 block w-full p-2.5" required />
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Remember me</label>
                    </div>
                    <button type="submit" onSubmit={handleSubmit} className="text-white bg-[#4CAF50] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign In</button>
                </Form>
            </div>

        </div>
    );
}