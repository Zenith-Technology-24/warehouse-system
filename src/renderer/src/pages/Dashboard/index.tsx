/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header"
import { fetchDashboardData } from "../../api/dashboard/dashboardApi";
import InventoryStatus from "../../components/InventoryStatus";
import InventoryReports from "../../components/Dashboard/InventoryReports";
import UserReports from "../../components/Dashboard/UserReports";
import { session } from "../../api/auth/authApi";

const Dashboard: React.FC = () => {
    const { data } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => fetchDashboardData() as any,
    });
    const { data: sessionData } = useQuery({
        queryKey: ["session"],
        queryFn: () => session(),
    })

    return (
        <div className="space-y-4">
            <div className="flex flex-row justify-between">
                <Header title={'Dashboard'} description={'Showing summary reports'} />
            </div>
            <InventoryReports data={data} />
            {
                sessionData?.user?.roles[0]?.name === 'superadmin' && (
                    <UserReports users={data?.users} />
                )
            }
            <InventoryStatus data={data} />
        </div>
    )
}

export default Dashboard