import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { session } from '../api/auth/authApi';
import Clock from './Clock';

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
                    <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" />
                    </svg>
                    <div className="relative w-12 h-12 rounded-full border border-aaa overflow-hidden">
                        <img src="/user.png" alt="Your Image" className="object-cover scale-100" />
                    </div>
                    <div>
                        <p className='text-aaa font-semibold'>{data?.firstname} {data?.lastname}</p>
                        <p className='text-gray-400 text-sm text-right'>Admin</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Topbar
