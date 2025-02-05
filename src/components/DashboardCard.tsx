import React from "react"

interface Props {
    icon: any
    title: string
    value: string
    type: string
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
    }
}

const DashboardCard: React.FC<Props> = ({ icon, title, value, type }) => {
    return (
        <div className={`shadow-md hover:shadow-lg flex flex-col justify-center gap-2 rounded-lg items-start p-4 ${getStyle(type)}`}>
            {icon}
            <p className="text-gray-400 font-medium">{title}</p>
            <h1 className="font-medium text-gray-600 text-right text-3xl">{value}</h1>
        </div>
    )
}

export default DashboardCard