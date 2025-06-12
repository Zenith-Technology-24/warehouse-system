import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { session } from '../api/auth/authApi';
import Clock from './Clock';
import NotificationDropdown from './NotificationDropdown';

interface Props {
    isOpen: boolean
    toggleSidebar: any
}

const Topbar: React.FC<Props> = ({ toggleSidebar }) => {
    const { data } = useQuery({
        queryKey: ["session"],
        queryFn: () => session() as any
    });

    return (
        <header className="sticky top-0 z-50 text-white bg-white shadow-md">
            <div className='h-[70px] flex items-center justify-between mx-3'>
                <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 text-black cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <Clock />
                <div className='flex flex-row gap-3'>
                    <NotificationDropdown />
                    <div className="relative w-12 h-12 rounded-full border-4 border-gray-400 overflow-hidden flex items-center justify-center bg-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-10 h-10 scale-100"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className='text-aaa font-semibold'>{data?.user?.firstname} {data?.user?.lastname}</p>
                        <p className='text-gray-400 text-sm text-right'>{data?.user?.roles?.[0].name}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Topbar
