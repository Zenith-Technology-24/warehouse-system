import { useMemo, useState } from "react"
import Table from "../../components/Table"
import Header from "../../components/Header"
import { useMutation, useQuery } from "@tanstack/react-query"
import { exportInventory, fetchInventory, updateInventoryStatus } from "../../api/inventory/inventoryApi"
import Modal from "../../components/Modal"
import TopButtons from "../../components/TopButtons"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../providers/ToastContext"
import moment from "moment"
import Search from "../../components/Search"
import exportToExcel from "../../components/ExportToExcel"
import ExportModal from "../../components/ExportModal"
import StockStatusComponent from "../../components/StockStatus"

const Inventory: React.FC = () => {
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [status, setStatus] = useState<string>('active')
    const [toArchive, setToArchive] = useState<number | null>(null)
    const [toActive, setToActive] = useState<number | null>(null)
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false)
    const [isActiveModalOpen, setIsActiveModalOpen] = useState<boolean>(false)
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
    const { data: rows, refetch } = useQuery({
        queryKey: ["inventory", search, page, limit, status],
        queryFn: () => fetchInventory({ search, page, limit, status }) as any,
    });

    const updateStatus = useMutation({
        mutationFn: updateInventoryStatus,
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: (data: any) => {
            setIsActiveModalOpen(false)
            setIsArchiveModalOpen(false)
            refetch()
            showToast(
                `Inventory Successfully ${data?.inventory?.status === 'active' ? 'Restored' : 'Archived'}!`,
                `Inventory has been successfully ${data?.inventory?.status === 'active' ? 'restored' : 'archived'}.`,
                'success'
            );
            setToArchive(null)
            setToActive(null)
        },
    });

    const handleSearch = (searchInput = '') => {
        setSearch(searchInput)
    };

    const handleChangePage = (page: number) => {
        setPage(page)
    }

    const handleOpenActiveModal = (id: number | null) => {
        setIsActiveModalOpen(true)
        setToActive(id)
    }

    const handleOpenArchiveModal = (id: number | null) => {
        setIsArchiveModalOpen(true)
        setToArchive(id)
    }

    const handleArchive = () => {
        updateStatus.mutate({
            id: toArchive,
            status: 'archive'
        })
        setIsArchiveModalOpen(false)
    }

    const handleActive = () => {
        updateStatus.mutate({
            id: toActive,
            status: 'unarchive'
        })
        setIsArchiveModalOpen(false)
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'name',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <div className="font-normal">
                            {value}
                        </div>
                    )
                }
            },
            {
                label: 'T/Qty',
                name: 'totalQuantity',
                render(row: object, value: number, rowIndex: number) {
                    return (
                        <div>
                            {value}
                        </div>
                    )
                }
            },
            {
                label: 'UoM',
                name: 'unit',
                render(row: { item: { unit: string } }, value: string, rowIndex: number) {
                    return (
                        <div>
                            {row?.unit}
                        </div>
                    )
                }
            },
            {
                label: 'GT/Amount',
                name: 'grandTotalAmount',
                render(row: { item: { amount: string } }, value: string, rowIndex: number) {
                    return (
                        <div>
                            {value && '₱' + value}
                        </div>
                    )
                }
            },
            {
                label: 'Stock Level',
                name: 'stockLevel',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <StockStatusComponent status={value} />
                    )
                }
            },
            {
                label: 'Action',
                name: 'id',
                render(row: { id: number | null, status: string }, value: number, rowIndex: number) {
                    return (
                        <div className="flex flex-row justify-center gap-2">
                            <div onClick={() => navigate('/inventory/view', { state: row })} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" d="M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821" />
                                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                                    </g>
                                </svg>
                            </div>
                            {
                                row.status === 'active' ? (
                                    <div onClick={() => handleOpenArchiveModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                                        <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7" stroke="#48494A" stroke-width="1.5" stroke-linecap="round"></path>
                                                <path d="M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z" stroke="#48494A" stroke-width="1.5"></path>
                                                <path d="M12 7L12 16M12 16L15 12.6667M12 16L9 12.6667" stroke="#48494A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </g>
                                        </svg>
                                    </div>
                                ) : (
                                    <div onClick={() => handleOpenActiveModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                                        <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M12 21L12 12M12 12L15 15.3333M12 12L9 15.3333" stroke="#48494A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7" stroke="#48494A" stroke-width="1.5" stroke-linecap="round"></path>
                                                <path d="M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z" stroke="#48494A" stroke-width="1.5"></path>
                                            </g>
                                        </svg>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            }
        ]
    }, [rows])

    const checkIfActive = (value: string) => {
        return value === status && 'border-b-2 border-black'
    }

    const handleExport = ({ toExport, start_date, end_date }: any) => {
        const headers = [
            { header: 'ID', key: 'id', width: 40 },
            { header: 'Item name', key: 'name', width: 40 },
            { header: 'T/Qty', key: 'totalQuantity', width: 15 },
            { header: 'UoM', key: 'unit', width: 15 },
            { header: 'GT/Amount', key: 'grandTotalAmount', width: 15 },
            { header: 'Stock Level', key: 'stockLevel', width: 15 },
            { header: 'Created At', key: 'created_at', width: 15 },
        ];

        const data = toExport?.map((row: {
            id: number,
            name: string,
            totalQuantity: number,
            unit: string,
            grandTotalAmount: string,
            stockLevel: string,
            created_at: string
        }) => {
            return {
                id: row.id,
                name: row.name,
                totalQuantity: row.totalQuantity,
                unit: row.unit,
                grandTotalAmount: row.grandTotalAmount,
                stockLevel: row.stockLevel,
                created_at: moment(row.created_at).format('L')
            }
        })
        exportToExcel({ data, headers, filename: `${status}-inventory-${start_date}-to-${end_date}` })
    }

    return (
        <>
            <ExportModal
                search={search}
                status={status}
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                handleFunction={handleExport}
                exportFunction={exportInventory}
            />
            <Modal
                isOpen={isArchiveModalOpen}
                title={'Archive Inventory'}
                onClose={() => setIsArchiveModalOpen(false)}
                handleFunction={() => handleArchive()}
                message={'Are you sure you want to archive this Inventory?'}
            />
            <Modal
                isOpen={isActiveModalOpen}
                title={'Restore Inventory'}
                onClose={() => setIsActiveModalOpen(false)}
                handleFunction={() => handleActive()}
                message={'Are you sure you want to restore this Inventory?'}
            />
            <div className="flex flex-row justify-between">
                <Header title={'Inventory'} description={'Showing all Inventories'} />
                <TopButtons >
                    <button onClick={() => setIsExportModalOpen(true)} className="rounded-lg font-lato border-2 bg-aaa text-white p-3">
                        Export
                    </button>
                </TopButtons>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 text-center text-lg text-gray-500">
                    <div onClick={() => setStatus('active')} className={`${checkIfActive('active')} w-24 py-2 cursor-pointer`}>Active</div>
                    <div onClick={() => setStatus('archived')} className={`${checkIfActive('archived')} w-24 py-2 cursor-pointer`}>Archived</div>
                </div>
                <Search
                    handleFetchData={handleSearch}
                />
            </div>
            <Table
                currentPage={page}
                setCurrentPage={setPage}
                totalRows={rows?.data?.length || 1}
                columns={columns}
                rows={rows}
                rowsPerPage={limit}
                totalPages={rows?.totalPages}
                onPageChange={handleChangePage}
            />
        </>
    )
}

export default Inventory