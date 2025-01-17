import React from "react"

interface Props {
    icon: any
    title: string
    value: string
}

const DashboardCard: React.FC<Props> = ({ icon, title, value }) => {
    return (
        <div className="shadow-md hover:shadow-lg h-32 flex gap-10 justify-center rounded-lg items-center">
            {icon}
            <div className="space-y-2">
                <p className="text-gray-400 font-medium">{title}</p>
                <h1 className="font-medium text-gray-600 text-right text-3xl">{value}</h1>
            </div>

        </div>
    )
}

export default DashboardCard