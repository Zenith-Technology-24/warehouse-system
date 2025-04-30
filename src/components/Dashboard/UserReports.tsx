import DashboardCard from "../DashboardCard";

interface UserReportProps {
  users?: {
    totalUsers?: number;
    activeUsers?: number;
    inactiveUsers?: number;
  };
}

const UserReports: React.FC<UserReportProps> = ({ users }) => {
  return (
    <div className="shadow-lg rounded-lg border border-gray-100 px-6 pb-5 pt-2 space-y-2">
      <h1 className="font-normal text-lg">User Reports</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <DashboardCard
          icon={
            <div>
              <div className="bg-aaa rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
            </div>
          }
          title={"Total Registered Users"}
          value={users?.totalUsers?.toString() || "0"}
          type={"primary"}
        />
        <DashboardCard
          icon={
            <div>
              <div className="bg-[#4CAF50] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>

              </div>
            </div>
          }
          title={"Active Users"}
          value={users?.activeUsers?.toString() || "0"}
          type={"success"}
        />
        <DashboardCard
          icon={
            <div>
              <div className="bg-[#F44336] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </div>
            </div>
          }
          title={"Deactivated Users"}
          value={users?.inactiveUsers?.toString() || "0"}
          type={"error"}
        />
      </div>
    </div>
  );
};

export default UserReports;
