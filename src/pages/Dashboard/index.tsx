import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header"
import Sales from "../Sales"
import { fetchDashboardData } from "../../api/dashboard/dashboardApi";
import InventoryStatus from "../../components/InventoryStatus";
import InventoryReports from "../../components/Dashboard/InventoryReports";
import UserReports from "../../components/Dashboard/UserReports";

const Dashboard: React.FC = () => {
    const { data } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => fetchDashboardData() as any,
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-row justify-between">
                <Header title={'Dashboard'} description={'Showing summary reports'} />
            </div>
            <InventoryReports />
            <UserReports />
            <InventoryStatus />
            <Sales dashboardView={true} />
        </div>
    )
}

export default Dashboard