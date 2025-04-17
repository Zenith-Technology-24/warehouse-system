import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { deleteAllNotification, deleteNotification, fetchNotifications, readNotification } from '../api/notifications/notificationApi';
import { session } from '../api/auth/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../providers/ToastContext';

const NotificationDropdown = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { showToast } = useToast()
    const { data: auth } = useQuery({
        queryKey: ["session"],
        queryFn: () => session(),
    })
    const { data: notifications, refetch: refetchNotifications } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => fetchNotifications({ userId: auth?.user?.id }) as any,
        enabled: !!auth,
    });

    useEffect(() => {
        if (auth?.user?.id) {
            refetchNotifications();
        }
    }, [location.pathname]);

    const read = useMutation({
        mutationFn: (id: string) => {
            return readNotification(id)
        },
        onError: (error: any) => {
            console.log(error)
        }
    });

    const _delete = useMutation({
        mutationFn: (id: string) => {
            return deleteNotification(id)
        },
        onError: (error: any) => {
            console.log(error)
        }
    }) as any;

    const deleteAll = useMutation({
        mutationFn: (userId: string) => {
            return deleteAllNotification(userId)
        },
        onError: (error: any) => {
            console.log(error)
        }
    });

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const checkTitle = (notification: any) => {
        if (notification.title === 'Low Stock Alert') navigate('/inventory/view', { state: { id: notification?.dataId } })
        else if (notification.title === 'Issuance Validity Reminder') navigate('/issuance/view', { state: { id: notification?.dataId } })
        else navigate('/receipt/view', { state: { id: notification?.dataId } })
        read.mutate(notification.id)
        setOpen(false)
        refetchNotifications()
    }

    return (
        <div className="relative">
            <div className='flex flex-row gap-3 h-full m-auto items-center'>
                <div onClick={() => setOpen(!open)} className='relative cursor-pointer'>
                    <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" />
                    </svg>
                    {notifications?.filter(n => !n.read).length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0 rounded-full">
                            {notifications.filter(n => !n.read).length}
                        </span>
                    )}
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div ref={dropdownRef} className="absolute z-10 top-full right-0 mt-2 w-[400px] bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <div className='flex justify-between'>
                        <p className="text-sm font-semibold mb-2 text-gray-600">Notifications</p>
                        <p
                            onClick={() => {
                                deleteAll.mutate(notifications[0].userId)
                                refetchNotifications()
                            }
                            }
                            className="text-xs mb-2 text-gray-600 cursor-pointer hover:underline"
                        >Clear All</p>
                    </div>
                    <ul className="max-h-[300px] overflow-y-auto space-y-2 text-sm text-gray-600">
                        {
                            notifications.length > 0 ? (
                                notifications.map((notification: { id: string, title: string, message: string, read: boolean, dataId: string | null }) => (
                                    <li onClick={() => checkTitle(notification)} className={`hover:bg-gray-100 p-2 rounded flex justify-between items-center cursor-pointer ${notification.read ? 'opacity-50' : 'opacity-100'}`}>
                                        <div className='flex items-center'>
                                            <div className='pr-3'>
                                                <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6" />
                                                </svg>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='font-bold text-gray-500'>{notification.title}</p>
                                                <p>{notification.message}</p>
                                            </div>
                                        </div>
                                        <div onClick={(e) => {
                                            e.stopPropagation();
                                            _delete.mutate(notification.id)
                                            refetchNotifications()
                                        }}
                                            className='rounded-full hover:bg-gray-200 p-1'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className={`p-2 rounded flex justify-between items-center cursor-pointer`}>
                                    <p className='text-center m-auto text-xs text-gray-400'>No notification was found.</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            )
            }
        </div >
    );
};

export default NotificationDropdown;
