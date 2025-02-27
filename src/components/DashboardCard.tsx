import React from "react"

interface Props {
    active?: boolean
    icon: any
    title: string
    value: string
    type: string
    handleClick?: () => void
}

const getStyle = (type: string) => {
    switch (type) {
        case 'inventory':
            return 'bg-[#575B421A]';
        case 'issued':
            return 'bg-[#2196F31A]';
        case 'in stock':
            return 'bg-[#4CAF501A]';
        case 'returned':
            return 'bg-[#FFC1071A]';
        case 'total amount':
            return 'bg-[#9A59EE1A]';
        case 'pending':
            return 'bg-[#FFC1071A]';
        case 'available':
            return 'bg-[#4CAF501A]';
        case 'gross':
            return 'bg-[#2196F31A]';
    }
}

const isActive = (active: boolean, type: string) => {
    if (!active) return
    switch (type) {
        case 'inventory':
            return 'border border-aaa';
        case 'pending':
            return 'border border-[#FFC107]';
        case 'available':
            return 'border border-[#4CAF50]';
        case 'gross':
            return 'border border-[#2196F3]';
    }
}

const DashboardCard: React.FC<Props> = ({ active = false, icon, title, value, type, handleClick }) => {
    return (
        <div onClick={handleClick} className={`shadow-md hover:shadow-lg flex flex-col justify-center gap-2 rounded-lg items-start p-4 ${getStyle(type)} ${isActive(active, type)}`}>
            {icon}
            <p className="text-gray-400 font-medium">{title}</p>
            <h1 className="font-medium text-gray-600 text-right text-3xl">{value}</h1>
        </div>
    )
}

export default DashboardCard