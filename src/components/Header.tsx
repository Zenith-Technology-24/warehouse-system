import React from "react"

interface Props {
    title: string,
    description: string
}

const Header: React.FC<Props> = ({ title, description }) => {
    return (
        <div>
            <p className="font-bold text-lg">{title}</p>
            <div className="flex flex-row items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}

export default Header