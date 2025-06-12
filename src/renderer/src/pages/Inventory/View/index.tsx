import { useEffect, useState } from "react"
import { usePendingIssuanceColumns } from "../../../columns/PendingIssuanceColumns"
import { useReceiptColumns } from "../../../columns/ReceiptColumns"
import DashboardCard from "../../../components/DashboardCard"
import Header from "../../../components/Header"
import Table from "../../../components/Table"
import TopButtons from "../../../components/TopButtons"
import { useLocation, useNavigate } from "react-router-dom"
import InventoryBreakdown from "../../../components/InventoryBreakdown"
import { useQuery } from "@tanstack/react-query"
import { fetchOneInventory } from "../../../api/inventory/inventoryApi"

const View: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [gAmountReceipt, setGamountReceipt] = useState(0)
    const [gAmountIssuance, setGamountIssuance] = useState(0)
    const [expand, setExpand] = useState<string | null>(null)
    const { data } = useQuery({
        queryKey: ["inventory_details", state.id],
        queryFn: () => fetchOneInventory(state.id),
    });
    const receiptColumns = useReceiptColumns(state)
    const pendingIssuanceColumns = usePendingIssuanceColumns(state)

    const [receiptPage, setReceiptPage] = useState<number>(1)
    const [receiptLimit, setReceiptLimit] = useState<number>(5)

    const [issuancePage, setIssuancePage] = useState<number>(1)
    const [issuanceLimit, setIssuanceLimit] = useState<number>(5)


    const calculateGrossTotalReceipt = (items: any[]) => {
        if (!Array.isArray(items)) return 0;

        return items.reduce((total, item) => {
            return total + item.item.reduce((itemTotal, item) => {
                const amount = typeof item.amount === "string"
                    ? Number(item.amount.replace(/,/g, ""))
                    : Number(item.amount);
                return itemTotal + (isNaN(amount) ? 0 : amount);
            }, 0);
        }, 0);
    };

    const calculateGrossTotalIssuance = (items: any[]) => {
        if (!Array.isArray(items)) return 0;

        return items.reduce((total, item) => {
            const amount = typeof item.amount === "string"
                ? Number(item.amount.replace(/,/g, ""))
                : Number(item.amount);
            return total + (isNaN(amount) ? 0 : amount);
        }, 0);
    };


    useEffect(() => {
        if (Array.isArray(data?.receipts) && data?.receipts.length > 0) {
            setGamountReceipt(calculateGrossTotalReceipt(data.receipts));
        }
        if (Array.isArray(data?.issuance) && data?.issuance.length > 0) {
            setGamountIssuance(calculateGrossTotalIssuance(data.issuance))
        }
    }, [data]);

    const getReceiptPaginatedData = (data: any[], page: number, limit: number) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return data?.slice(startIndex, endIndex);
    };

    const handleReceiptChangePage = (page: number) => {
        setReceiptPage(page)
    }

    const getIssuancePaginatedData = (data: any[], page: number, limit: number) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return data?.slice(startIndex, endIndex);
    };

    const handleIssuanceChangePage = (page: number) => {
        setIssuancePage(page)
    }

    return (
        <>
            <div className="flex flex-row justify-between">
                <Header title={'View Inventory'} description={'Inventory'} />
            </div>
            <div className="border rounded-lg py-4 px-6 space-y-4">
                <div className="grid grid-columns-2">
                    <h1 className="text-md font-semibold mb-2 col-span-2">Inventory Details</h1>
                    <div className="text-gray-500 space-y-2">
                        <p>Item Name: <span className="text-black ml-2">{data?.name}</span></p>
                        <p>UoM: <span className="text-black ml-2">{data?.unit}</span></p>
                        <div className="flex">
                            <p>Status:</p>
                            <div
                                className={`
                                    ${data?.status === 'active' && 'bg-green-50 text-green-500 w-20'}
                                    ${data?.status === 'archived' && 'bg-gray-50 text-gray-500 w-20'} 
                                    rounded-full flex items-center justify-center mx-3`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full mr-1 
                                        ${data?.status === 'active' && 'bg-green-500'}
                                        ${data?.status === 'archived' && 'bg-gray-500'}
                                    `}
                                ></div>
                                <p className="text-xs">
                                    {data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2 grid-cols-4">
                        <DashboardCard
                            active={data?.sizeType === 'none' ? null : expand === 'inventory'}
                            icon={
                                <div>
                                    <div className="bg-aaa rounded-full p-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5218 7.6876H10.8218V3.3501C10.8218 3.10146 10.723 2.863 10.5472 2.68719C10.3714 2.51137 10.1329 2.4126 9.88428 2.4126H5.86553C5.61689 2.4126 5.37843 2.51137 5.20261 2.68719C5.0268 2.863 4.92803 3.10146 4.92803 3.3501V7.6876H3.22803C2.97939 7.6876 2.74093 7.78637 2.56511 7.96218C2.3893 8.138 2.29053 8.37646 2.29053 8.6251V12.6501C2.29053 12.8987 2.3893 13.1372 2.56511 13.313C2.74093 13.4888 2.97939 13.5876 3.22803 13.5876H7.2499C7.48151 13.588 7.70474 13.501 7.8749 13.3438C8.04604 13.4994 8.26863 13.5862 8.4999 13.5876H12.5249C12.7735 13.5876 13.012 13.4888 13.1878 13.313C13.3636 13.1372 13.4624 12.8987 13.4624 12.6501V8.6251C13.4624 8.50172 13.4381 8.37956 13.3907 8.26561C13.3434 8.15166 13.2741 8.04817 13.1867 7.96108C13.0993 7.87398 12.9956 7.80499 12.8815 7.75806C12.7674 7.71113 12.6452 7.68719 12.5218 7.6876ZM7.5624 12.6501C7.5624 12.733 7.52948 12.8125 7.47087 12.8711C7.41227 12.9297 7.33278 12.9626 7.2499 12.9626H3.22803C3.14515 12.9626 3.06566 12.9297 3.00706 12.8711C2.94845 12.8125 2.91553 12.733 2.91553 12.6501V8.6251C2.91553 8.54222 2.94845 8.46273 3.00706 8.40413C3.06566 8.34552 3.14515 8.3126 3.22803 8.3126H4.45928V9.5626C4.45928 9.64548 4.4922 9.72496 4.55081 9.78357C4.60941 9.84217 4.6889 9.8751 4.77178 9.8751H5.70928C5.79166 9.8735 5.87022 9.84006 5.92848 9.7818C5.98674 9.72354 6.02018 9.64498 6.02178 9.5626V8.3126H7.5624V12.6501ZM5.55303 7.6876V3.3501C5.55303 3.26722 5.58595 3.18773 5.64456 3.12913C5.70316 3.07052 5.78265 3.0376 5.86553 3.0376H7.09053V4.2876C7.09053 4.37048 7.12345 4.44996 7.18206 4.50857C7.24066 4.56717 7.32015 4.6001 7.40303 4.6001H8.34053C8.42341 4.6001 8.50289 4.56717 8.5615 4.50857C8.6201 4.44996 8.65303 4.37048 8.65303 4.2876V3.0376H9.88428C9.96716 3.0376 10.0466 3.07052 10.1052 3.12913C10.1639 3.18773 10.1968 3.26722 10.1968 3.3501V7.6876H5.55303ZM12.8343 12.6501C12.8327 12.7325 12.7992 12.811 12.741 12.8693C12.6827 12.9276 12.6042 12.961 12.5218 12.9626H8.4999C8.41752 12.961 8.33896 12.9276 8.2807 12.8693C8.22244 12.811 8.189 12.7325 8.1874 12.6501V8.3126H9.73115V9.5626C9.73115 9.64548 9.76408 9.72496 9.82268 9.78357C9.88129 9.84217 9.96077 9.8751 10.0437 9.8751H10.9812C11.064 9.8751 11.1435 9.84217 11.2021 9.78357C11.2607 9.72496 11.2937 9.64548 11.2937 9.5626V8.3126H12.5249C12.6078 8.3126 12.6873 8.34552 12.7459 8.40413C12.8045 8.46273 12.8374 8.54222 12.8374 8.6251L12.8343 12.6501Z" fill="white" />
                                        </svg>
                                    </div>
                                </div>
                            }
                            title={'Total Inventory'}
                            value={data?.quantitySummary?.totalQuantity}
                            type={'inventory'}
                            handleClick={() => {
                                if (data?.sizeType !== 'none') {
                                    expand === 'inventory' ? setExpand(null) : setExpand('inventory')
                                }
                            }}
                        />
                        <DashboardCard
                            active={data?.sizeType === 'none' ? null : expand === 'pending'}
                            icon={
                                <div>
                                    <div className="bg-[#FFC107] rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                        </svg>
                                    </div>
                                </div>
                            }
                            title={'Total Pending'}
                            value={data?.quantitySummary?.pendingQuantity}
                            type={'pending'}
                            handleClick={() => {
                                if (data?.sizeType !== 'none') {
                                    expand === 'pending' ? setExpand(null) : setExpand('pending')
                                }
                            }}
                        />
                        <DashboardCard
                            active={data?.sizeType === 'none' ? null : expand === 'available'}
                            icon={
                                <div>
                                    <div className="bg-[#4CAF50] rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-white" viewBox="0 0 24 24">
                                            <g className="box-outline">
                                                <g fill="currentColor" fill-rule="evenodd" className="Vector" clip-rule="evenodd">
                                                    <path d="m14.179 2.948l4.57 2.64a4.36 4.36 0 0 1 2.18 3.773v5.278a4.36 4.36 0 0 1-2.18 3.774l-4.57 2.639a4.36 4.36 0 0 1-4.358 0l-4.57-2.64a4.36 4.36 0 0 1-2.18-3.773V9.361c0-1.557.831-2.995 2.18-3.774l4.57-2.639a4.36 4.36 0 0 1 4.358 0m-1 1.732a2.36 2.36 0 0 0-2.358 0l-4.57 2.64a2.36 2.36 0 0 0-1.18 2.04v5.28c0 .841.45 1.62 1.18 2.04l4.57 2.64c.73.42 1.628.42 2.358 0l4.57-2.64a2.36 2.36 0 0 0 1.18-2.04V9.36c0-.841-.45-1.62-1.18-2.04z" />
                                                    <path d="M10.499 11.796L4.696 8.894l.894-1.788l5.803 2.901c.382.191.832.191 1.214 0l5.803-2.901l.895 1.788l-5.803 2.902a3.36 3.36 0 0 1-3.003 0" />
                                                    <path d="M13 11.428v9.143h-2v-9.143z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            }
                            title={'Available Issuance'}
                            value={data?.quantitySummary?.availableQuantity}
                            type={'available'}
                            handleClick={() => {
                                if (data?.sizeType !== 'none') {
                                    expand === 'available' ? setExpand(null) : setExpand('available')
                                }
                            }}
                        />
                        <DashboardCard
                            icon={
                                <div>
                                    <div className="bg-[#2196F3] rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 text-white">
                                            <path fill="currentColor" d="M8.4 21q-2.275 0-3.838-1.562T3 15.6q0-.95.325-1.85t.925-1.625L7.8 7.85l-1.7-3.4q-.25-.5.038-.975T7 3h10q.575 0 .863.475t.037.975l-1.7 3.4l3.55 4.275q.6.725.925 1.625T21 15.6q0 2.275-1.575 3.838T15.6 21zm3.6-5q-.825 0-1.412-.587T10 14t.588-1.412T12 12t1.413.588T14 14t-.587 1.413T12 16M9.625 7h4.75l1-2h-6.75zM8.4 19h7.2q1.425 0 2.413-.987T19 15.6q0-.6-.213-1.162t-.587-1.013L14.525 9H9.5l-3.7 4.4q-.375.45-.587 1.025T5 15.6q0 1.425.988 2.413T8.4 19" />
                                        </svg>
                                    </div>
                                </div>
                            }
                            title={'Gross Total Amount'}
                            value={data?.quantitySummary?.grandTotalAmount}
                            type={'gross'}
                        />
                    </div>
                </div>
                {
                    expand === 'inventory' && (
                        <InventoryBreakdown
                            title={'Total Quantity Breakdown by Size'}
                            classname={'bg-[#575B42]'}
                            data={data?.sizeDetails?.total}
                        />
                    )
                }
                {
                    expand === 'pending' && (
                        <InventoryBreakdown
                            title={'Total Pending Breakdown by Size'}
                            classname={'bg-[#FFC107]'}
                            data={data?.sizeDetails?.pending}
                        />
                    )
                }
                {
                    expand === 'available' && (
                        <InventoryBreakdown
                            title={'Total Available Issuance Breakdown by Size'}
                            classname={'bg-[#4CAF50]'}
                            data={data?.sizeDetails?.available}
                        />
                    )
                }
                <div>
                    <h1 className="text-md font-semibold mb-2">Receipt Details</h1>
                    <Table
                        currentPage={receiptPage}
                        setCurrentPage={setReceiptPage}
                        totalRows={getReceiptPaginatedData(data?.items || [], receiptPage, receiptLimit).length || 1}
                        columns={receiptColumns}
                        rows={{ data: getReceiptPaginatedData(data?.items || [], receiptPage, receiptLimit) }}
                        rowsPerPage={receiptLimit}
                        totalPages={Math.ceil((data?.items?.length || 0) / receiptLimit)}
                        onPageChange={handleReceiptChangePage}
                        classes="!h-0"
                    />
                </div>
                <div>
                    <h1 className="text-md font-semibold mb-2">Pending Issuance Details</h1>
                    <Table
                        currentPage={issuancePage}
                        setCurrentPage={setIssuancePage}
                        totalRows={getIssuancePaginatedData(data?.issuance || [], issuancePage, issuanceLimit).length || 1}
                        columns={pendingIssuanceColumns}
                        rows={{ data: getIssuancePaginatedData(data?.issuance || [], issuancePage, issuanceLimit) }}
                        rowsPerPage={issuanceLimit}
                        totalPages={Math.ceil((data?.issuance?.length || 0) / issuanceLimit)}
                        onPageChange={handleIssuanceChangePage}
                        classes="!h-0"
                    />
                </div>
            </div>
        </>
    )
}

export default View