import React from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from "js-cookie"
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
        Cookies.remove('user')
        showToast(
            "Logged Out Successfully!",
            "",
            'success'
        )
    }

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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                                Inventory
                            </NavLink>
                        </li>
                        <li>
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
                        </li>
                        <li>
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
                                Settings
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
