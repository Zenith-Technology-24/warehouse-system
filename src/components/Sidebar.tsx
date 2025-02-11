import React from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { session } from '../api/auth/authApi'
import { siteConfig } from '../constants/site'
import { useToast } from '../providers/ToastContext'

interface Props {
    isOpen: boolean
    toggleSidebar: any
}

const Sidebar: React.FC<Props> = ({ isOpen }) => {
    const { showToast } = useToast()
    const { data } = useQuery({
        queryKey: ["session"],
        queryFn: () => session(),
    })

    const handleLogout = () => {
        localStorage.removeItem('user');
        showToast(
            "Logged Out Successfully!",
            "",
            'success'
        );
    };

    return (
        <div className={`h-screen sticky top-0 overflow-hidden transition-all shadow-lg duration-300 !z-10 ${isOpen ? 'w-64 flex-none' : 'w-0'}`}>
            <div className={`flex flex-col items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <div className={`flex items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <img src={siteConfig.logo} alt="Vite Logo" />
                </div>
                <nav className="w-full text-gray-500">
                    <ul className="space-y-1 px-3 py-5">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/inventory"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path fill="currentColor" d="M5.616 21q-.672 0-1.144-.472T4 19.385V8.263q-.43-.178-.715-.577Q3 7.286 3 6.769V4.615q0-.67.472-1.143Q3.944 3 4.616 3h14.769q.67 0 1.143.472q.472.472.472 1.144v2.153q0 .517-.285.916q-.284.4-.715.578v11.122q0 .67-.472 1.143q-.472.472-1.143.472zM5 8.385v10.904q0 .307.221.509T5.77 20h12.616q.269 0 .442-.173t.173-.442v-11zm-.385-1h14.77q.269 0 .442-.173T20 6.769V4.616q0-.27-.173-.443T19.384 4H4.616q-.27 0-.443.173T4 4.616v2.153q0 .27.173.442q.173.173.443.173m4.769 5.482h5.23V12h-5.23zM12 14.192" />
                                </svg>
                                Inventory
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/issuance"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01" /></g></svg>
                                Issuance
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                to="/inventory"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                                Inventory
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/inventory"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                                Return of Items
                            </NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink
                                to="/expenses"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                                Expenses
                            </NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink
                                to="/sales"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                Sales
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink
                                to="/sales"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.198 3.002H3.802c-.75 0-1.126 0-1.386.177a1 1 0 0 0-.31.338c-.153.273-.116.64-.041 1.376c.125 1.228.187 1.842.513 2.28c.163.22.369.403.606.54c.476.277 1.102.277 2.355.277h12.922c1.253 0 1.879 0 2.355-.277c.237-.137.443-.32.606-.54c.326-.438.388-1.052.513-2.28c.075-.736.112-1.103-.04-1.376a1 1 0 0 0-.311-.338c-.26-.177-.636-.177-1.386-.177m-10.198 8h4m.539 4.976l2.727-.053c1.086-.02 3.237.247 3.237 2.503c0 2.34-2.249 2.57-3.262 2.57H8.05c-2.128 0-5.048-.472-5.048-4.488V7.997m11.536 7.981a.77.77 0 0 1 .232-.538l1.714-1.454m-1.946 1.992a.77.77 0 0 0 .234.579l1.712 1.414m4.495-9.974v5.028" color="currentColor" />
                                </svg>
                                Return of Items
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/manage-users"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.928 19.634h2.138a1.165 1.165 0 0 0 1.116-1.555a6.85 6.85 0 0 0-6.117-3.95m0-2.759a3.664 3.664 0 0 0 3.665-3.664a3.664 3.664 0 0 0-3.665-3.674m-1.04 16.795a1.908 1.908 0 0 0 1.537-3.035a8.03 8.03 0 0 0-6.222-3.196a8.03 8.03 0 0 0-6.222 3.197a1.909 1.909 0 0 0 1.536 3.034zM9.34 11.485a4.16 4.16 0 0 0 4.15-4.161a4.151 4.151 0 0 0-8.302 0a4.16 4.16 0 0 0 4.151 4.16" />
                                </svg>
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sales"
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m-.007 4.648a.75.75 0 0 0-1.493.102v6l.007.102a.75.75 0 0 0 .743.648h4l.102-.007A.75.75 0 0 0 15.25 12H12V6.75z" />
                                </svg>
                                Activity Logs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/settings"
                                state={data}
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Account Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/l"
                                onClick={() => handleLogout()}
                                className={({ isActive }) =>
                                    `flex flex-row gap-2 items-center px-4 py-3 rounded-lg text-left transition ${isActive ? 'bg-aaa text-white hover:text-white' : 'hover:bg-aaa hover:text-white'
                                    } ${isOpen ? 'block' : 'hidden'}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                Log Out
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
