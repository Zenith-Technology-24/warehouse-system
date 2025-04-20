import DashboardCard from "../DashboardCard";

interface InventoryReportsProps {
  data?: {
    totalItems?: number;
    totalInStock?: number;
    totalIssuedItems?: number;
    totalReceiptItems?: number;
    totalReturnedItems?: number;
    totalAmount?: number;
  };
}

const InventoryReports: React.FC<InventoryReportsProps> = ({ data }) => {
  return (
    <div className="shadow-lg rounded-lg border border-gray-100 px-6 pb-5 pt-2 space-y-2">
      <h1 className="font-normal text-lg">Inventory Reports</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-3">
        <DashboardCard
          icon={
            <div>
              <div className="bg-aaa rounded-full p-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5218 7.6876H10.8218V3.3501C10.8218 3.10146 10.723 2.863 10.5472 2.68719C10.3714 2.51137 10.1329 2.4126 9.88428 2.4126H5.86553C5.61689 2.4126 5.37843 2.51137 5.20261 2.68719C5.0268 2.863 4.92803 3.10146 4.92803 3.3501V7.6876H3.22803C2.97939 7.6876 2.74093 7.78637 2.56511 7.96218C2.3893 8.138 2.29053 8.37646 2.29053 8.6251V12.6501C2.29053 12.8987 2.3893 13.1372 2.56511 13.313C2.74093 13.4888 2.97939 13.5876 3.22803 13.5876H7.2499C7.48151 13.588 7.70474 13.501 7.8749 13.3438C8.04604 13.4994 8.26863 13.5862 8.4999 13.5876H12.5249C12.7735 13.5876 13.012 13.4888 13.1878 13.313C13.3636 13.1372 13.4624 12.8987 13.4624 12.6501V8.6251C13.4624 8.50172 13.4381 8.37956 13.3907 8.26561C13.3434 8.15166 13.2741 8.04817 13.1867 7.96108C13.0993 7.87398 12.9956 7.80499 12.8815 7.75806C12.7674 7.71113 12.6452 7.68719 12.5218 7.6876ZM7.5624 12.6501C7.5624 12.733 7.52948 12.8125 7.47087 12.8711C7.41227 12.9297 7.33278 12.9626 7.2499 12.9626H3.22803C3.14515 12.9626 3.06566 12.9297 3.00706 12.8711C2.94845 12.8125 2.91553 12.733 2.91553 12.6501V8.6251C2.91553 8.54222 2.94845 8.46273 3.00706 8.40413C3.06566 8.34552 3.14515 8.3126 3.22803 8.3126H4.45928V9.5626C4.45928 9.64548 4.4922 9.72496 4.55081 9.78357C4.60941 9.84217 4.6889 9.8751 4.77178 9.8751H5.70928C5.79166 9.8735 5.87022 9.84006 5.92848 9.7818C5.98674 9.72354 6.02018 9.64498 6.02178 9.5626V8.3126H7.5624V12.6501ZM5.55303 7.6876V3.3501C5.55303 3.26722 5.58595 3.18773 5.64456 3.12913C5.70316 3.07052 5.78265 3.0376 5.86553 3.0376H7.09053V4.2876C7.09053 4.37048 7.12345 4.44996 7.18206 4.50857C7.24066 4.56717 7.32015 4.6001 7.40303 4.6001H8.34053C8.42341 4.6001 8.50289 4.56717 8.5615 4.50857C8.6201 4.44996 8.65303 4.37048 8.65303 4.2876V3.0376H9.88428C9.96716 3.0376 10.0466 3.07052 10.1052 3.12913C10.1639 3.18773 10.1968 3.26722 10.1968 3.3501V7.6876H5.55303ZM12.8343 12.6501C12.8327 12.7325 12.7992 12.811 12.741 12.8693C12.6827 12.9276 12.6042 12.961 12.5218 12.9626H8.4999C8.41752 12.961 8.33896 12.9276 8.2807 12.8693C8.22244 12.811 8.189 12.7325 8.1874 12.6501V8.3126H9.73115V9.5626C9.73115 9.64548 9.76408 9.72496 9.82268 9.78357C9.88129 9.84217 9.96077 9.8751 10.0437 9.8751H10.9812C11.064 9.8751 11.1435 9.84217 11.2021 9.78357C11.2607 9.72496 11.2937 9.64548 11.2937 9.5626V8.3126H12.5249C12.6078 8.3126 12.6873 8.34552 12.7459 8.40413C12.8045 8.46273 12.8374 8.54222 12.8374 8.6251L12.8343 12.6501Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          }
          title={"Total Nr of Items"}
          value={data?.totalItems?.toString() || "0"}
          type={"inventory"}
        />
        <DashboardCard
          icon={
            <div>
              <div className="bg-[#4CAF50] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-white" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5l-4 2M12 12L3 7.5m9 4.5v9.5m0-9.5l4.5-2.25l.5-.25m0 0V13m0-3.5l-9.5-5" />
                </svg>
              </div>
            </div>
          }
          title={"Total In-Stock"}
          value={data?.totalInStock?.toString() || "0"}
          type={"in stock"}
        />
        <DashboardCard
          icon={
            <div>
              <div className="bg-[#FFC107] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-white" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                    <path stroke-linejoin="round" d="M20.935 11.009V8.793a2.98 2.98 0 0 0-1.529-2.61l-5.957-3.307a2.98 2.98 0 0 0-2.898 0L4.594 6.182a2.98 2.98 0 0 0-1.529 2.611v6.414a2.98 2.98 0 0 0 1.529 2.61l5.957 3.307a2.98 2.98 0 0 0 2.898 0l2.522-1.4" />
                    <path stroke-linejoin="round" d="M20.33 6.996L12 12L3.67 6.996M12 21.49V12" />
                    <path stroke-miterlimit="10" d="M19.903 13.965v5m-2.494-2.495h5" />
                  </g>
                </svg>
              </div>
            </div>
          }
          title={"Total Issued Items"}
          value={data?.totalIssuedItems?.toString() || "0"}
          type={"issued"}
        />
        <DashboardCard
          icon={
            <div>
              <div className="bg-[#2196F3] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-white" viewBox="0 0 48 48">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4">
                    <path stroke-linejoin="round" d="M4.592 19.467A2 2 0 0 1 6.537 17h34.926a2 2 0 0 1 1.945 2.467l-5.04 21A2 2 0 0 1 36.423 42H11.577a2 2 0 0 1-1.945-1.533z" />
                    <path stroke-linejoin="round" d="M11 7h8v10h-8zm8 10l6.5-9L38 17" />
                    <path d="M15 25h8" />
                  </g>
                </svg>
              </div>
            </div>
          }
          title={"Total Received Items"}
          value={data?.totalReceiptItems?.toString() || "0"}
          type={"received"}
        />
        <DashboardCard
          icon={
            <div>
              <div className="bg-[#F44336] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-white" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.198 3.002H3.802c-.75 0-1.126 0-1.386.177a1 1 0 0 0-.31.338c-.153.273-.116.64-.041 1.376c.125 1.228.187 1.842.513 2.28c.163.22.369.403.606.54c.476.277 1.102.277 2.355.277h12.922c1.253 0 1.879 0 2.355-.277c.237-.137.443-.32.606-.54c.326-.438.388-1.052.513-2.28c.075-.736.112-1.103-.04-1.376a1 1 0 0 0-.311-.338c-.26-.177-.636-.177-1.386-.177m-10.198 8h4m.539 4.976l2.727-.053c1.086-.02 3.237.247 3.237 2.503c0 2.34-2.249 2.57-3.262 2.57H8.05c-2.128 0-5.048-.472-5.048-4.488V7.997m11.536 7.981a.77.77 0 0 1 .232-.538l1.714-1.454m-1.946 1.992a.77.77 0 0 0 .234.579l1.712 1.414m4.495-9.974v5.028" color="currentColor" />
                </svg>
              </div>
            </div>
          }
          title={"Total Returned Items"}
          value={data?.totalReturnedItems?.toString() || "0"}
          type={"returned"}
        />
        <DashboardCard
          icon={
            <div>
              <div className="bg-[#9A59EE] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-white" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3s-2.686-3-6-3s-6 1.343-6 3" />
                    <path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0S15 7.072 15 6s-1.144-2.062-3-2.598s-4.144-.536-6 0S3 4.928 3 6" />
                    <path d="M3 6v10c0 .888.772 1.45 2 2" />
                    <path d="M3 11c0 .888.772 1.45 2 2" />
                  </g>
                </svg>
              </div>
            </div>
          }
          title={"Total Amount"}
          value={data?.totalAmount?.toString().replace(".00", "") || "0"}
          type={"total amount"}
        />
      </div>
    </div>
  );
};

export default InventoryReports;
