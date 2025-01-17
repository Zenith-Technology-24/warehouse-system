import { useQuery } from "@tanstack/react-query";
import DashboardCard from "../../components/DashboardCard"
import Header from "../../components/Header"
import Sales from "../Sales"
import { fetchDashboardData } from "../../api/dashboard/dashboardApi";

const Dashboard: React.FC = () => {
    const { data } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => fetchDashboardData() as any,
    });

    return (
        <>
            <div className="flex flex-row justify-between">
                <Header title={'Dashboard'} description={'Showing summary reports'} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 !mb-6">
                <DashboardCard
                    icon={
                        <div className="bg-yellow-50 rounded-lg py-4 px-7">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 text-yellow-500">
                                <path fillRule="evenodd" d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    }
                    title={'Total Inventory'}
                    value={data?.countInventory}
                />
                <DashboardCard
                    icon={
                        <div className="bg-blue-50 rounded-lg py-4 px-7">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 text-blue-500">
                                <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                                <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                            </svg>
                        </div>
                    }
                    title={"Today's Expenses"}
                    value={"₱" + data?.countExpense}
                />
                <DashboardCard
                    icon={
                        <div className="bg-green-50 rounded-lg py-4 px-7">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 text-green-500">
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                            </svg>
                        </div>
                    }
                    title={"Today's Sales"}
                    value={"₱" + data?.countSales}
                />
            </div>
            <Sales dashboardView={true} />
        </>
    )
}

export default Dashboard