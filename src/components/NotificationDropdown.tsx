import { useState, useRef, useEffect } from 'react';

const NotificationDropdown = ({ data }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <div className='flex flex-row gap-3 h-full m-auto items-center'>
                <div onClick={() => setOpen(!open)} className='cursor-pointer'>
                    <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" />
                    </svg>
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div ref={dropdownRef} className="absolute z-10 top-full right-0 mt-2 w-[400px] bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <div className='flex justify-between'>
                        <p className="text-sm font-semibold mb-2 text-gray-600">Notifications</p>
                        <p className="text-xs mb-2 text-gray-600 cursor-pointer">Clear All</p>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:bg-gray-100 p-2 rounded flex items-center">
                            <div className='pr-3'>
                                <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" />
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold text-gray-500'>Low Stock Alert!</p>
                                <p>Army Combat Boots, Suede, Field Use is running low! Only 5 left in stock.</p>
                            </div>
                        </li>
                        <li className="hover:bg-gray-100 p-2 rounded flex items-center">
                            <div className='pr-3'>
                                <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" />
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold text-gray-500'>Low Stock Alert!</p>
                                <p>Army Combat Boots, Suede, Field Use is running low! Only 5 left in stock.</p>
                            </div>
                        </li>
                        <li className="hover:bg-gray-100 p-2 rounded flex items-center">
                            <div className='pr-3'>
                                <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" />
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold text-gray-500'>Low Stock Alert!</p>
                                <p>Army Combat Boots, Suede, Field Use is running low! Only 5 left in stock.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
