import { useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import { Outlet } from "react-router-dom"

interface Props {
    // children: any
}

const Pagelayout: React.FC<Props> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="grow">
                <Topbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <main className="p-6 w-full space-y-2">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Pagelayout