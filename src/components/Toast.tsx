import React from 'react';

interface ToastProps {
    title: string
    message: string
    type: 'success' | 'error' | 'info'
    onClose: () => void
}

const iconMap = {
    success: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

    ),
    error: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    ),
    info: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

    ),
};

const Toast: React.FC<ToastProps> = ({ title, message, type, onClose }) => {
    return (
        <div className="fixed top-4 right-4 flex items-center bg-white border border-gray-300 rounded-xl shadow-lg py-2 px-4 !z-[9999]">
            <div className='pb-5'>
                <div>
                    <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-auto bg-gray-100 rounded-full p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className='flex flex-row items-center pr-10'>
                    <div className="mr-3 bg-gray-100 rounded p-2">
                        {iconMap[type]()}
                    </div>
                    <div className="flex-grow space-y-1">
                        <p className='text-lg'>{title}</p>
                        <p className="text-sm text-gray-500">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
