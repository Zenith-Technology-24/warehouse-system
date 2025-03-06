import { useMemo, useState } from "react"
import Table from "../../components/Table"
import Header from "../../components/Header"
import { useMutation, useQuery } from "@tanstack/react-query"
import Modal from "../../components/Modal"
import TopButtons from "../../components/TopButtons"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../providers/ToastContext"
import moment from "moment"
import Search from "../../components/Search"
import LinkPrimaryButton from "../../components/buttons/LinkPrimaryButton"
import { exportExpenses, updateExpenseStatus } from "../../api/expenses/expensesApi"
import exportToExcel from "../../components/ExportToExcel"
import ExportModal from "../../components/ExportModal"
import FilterButton from "../../components/buttons/FilterButton"
import { fetchIssuance, updateIssuanceStatus } from "../../api/issuance/issuanceApi"
import { fetchReceipt, updateReceiptStatus } from "../../api/receipt/receiptApi"

const Receipt: React.FC = () => {
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [status, setStatus] = useState<string>('active')
    const [toArchive, setToArchive] = useState<number | null>(null)
    const [toWithdrawn, setToWithdrawn] = useState<number | null>(null)
    const [toActive, setToActive] = useState<number | null>(null)
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false)
    const [isWithdrawnModalOpen, setIsWithdrawnModalOpen] = useState<boolean>(false)
    const [isActiveModalOpen, setIsActiveModalOpen] = useState<boolean>(false)
    const [isSeeMore, setIsSeeMore] = useState<{ [key: number]: boolean }>({})
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
    const [date, setDate] = useState<Date | null | number>(null)
    const { data: rows, refetch } = useQuery({
        queryKey: ["receipt", search, page, limit, status],
        queryFn: () => fetchReceipt({ search, page, limit, status }) as any,
    });

    const updateStatus = useMutation({
        mutationFn: updateReceiptStatus,
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: (data: any) => {
            setIsActiveModalOpen(false)
            setIsArchiveModalOpen(false)
            refetch()
            showToast(
                `Receipt Successfully ${data?.status}!`,
                `Receipt has been successfully ${data?.status}.`,
                'success'
            );
            setToArchive(null)
            setToActive(null)
            setToWithdrawn(null)
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

    const handleOpenWithdrawnModal = (id: number | null) => {
        setIsWithdrawnModalOpen(true)
        setToWithdrawn(id)
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

    const handleWithdrawn = () => {
        updateStatus.mutate({
            id: toWithdrawn,
            status: 'withdrawn'
        })
        setIsWithdrawnModalOpen(false)
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'Date of Receipt',
                name: 'receiptDate',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <div>
                            <p className="font-normal">{moment(value).format('DD MMM YYYY')}</p>
                        </div>
                    )
                }
            },
            {
                label: 'Issuance Directive Nr',
                name: 'issuanceDirective',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <p className="font-normal">{value}</p>
                    )
                }
            },
            // {
            //     label: 'T/Qty',
            //     name: 'quantity',
            //     render(row: object, value: string, rowIndex: number) {
            //         return (
            //             <p className="font-normal">{value}</p>
            //         )
            //     }
            // },
            {
                label: 'Source',
                name: 'source',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <p className="font-normal">{value}</p>
                    )
                }
            },
            {
                label: 'Action',
                name: 'id',
                render(row: { id: number | null, status: string }, value: number, rowIndex: number) {
                    return (
                        <div className="flex flex-row gap-2">
                            <div onClick={() => navigate('/receipt/view', { state: row })} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" d="M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821" />
                                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                                    </g>
                                </svg>
                            </div>
                            <div onClick={() => navigate('/receipt/update', { state: row })} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#48494A"></path>
                                    </g>
                                </svg>
                            </div>
                            {
                                row.status !== 'archived' ? (
                                    <div onClick={() => handleOpenArchiveModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
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
                                    <div onClick={() => handleOpenActiveModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
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
    }, [rows, isSeeMore])

    const checkIfActive = (value: string) => {
        return value === status && 'border-b-2 border-black'
    }

    const handleExport = ({ toExport, start_date, end_date }: any) => {
        const headers = [
            { header: 'Expenses ID', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 15 },
            { header: 'Expense Type', key: 'type', width: 15 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Description', key: 'description', width: 35 },
            { header: 'Created At', key: 'created_at', width: 15 }
        ];

        let overall = 0

        let data = toExport?.map((row: {
            id: number,
            first_name: string
            last_name: string
            expense_type: string,
            amount: string,
            description: string,
            created_at: string,
        }) => {
            overall += parseFloat(row.amount);
            return {
                id: row.id,
                name: row.first_name + row.last_name,
                type: row.expense_type,
                amount: "₱" + row.amount,
                description: row.description,
                created_at: moment(row.created_at).format('L')
            }
        })

        data = [...data, {
            id: '',
            name: '',
            type: '',
            amount: '',
            description: '',
            created_at: ''
        }, {
            id: '',
            name: '',
            type: 'OVERALL TOTAL',
            amount: '₱' + overall,
            description: '',
            created_at: ''
        }]
        exportToExcel({ data, headers, filename: `${status}-expenses-${start_date}-to-${end_date}` })
    }

    return (
        <>
            <ExportModal
                search={search}
                status={status}
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                handleFunction={handleExport}
                exportFunction={exportExpenses}
            />
            <Modal
                isOpen={isArchiveModalOpen}
                title={'Archive Receipt'}
                onClose={() => setIsArchiveModalOpen(false)}
                handleFunction={() => handleArchive()}
                message={'Are you sure you want to archive this receipt?'}
            />
            <Modal
                isOpen={isActiveModalOpen}
                title={'Restore Receipt'}
                onClose={() => setIsActiveModalOpen(false)}
                handleFunction={() => handleActive()}
                message={'Are you sure you want to restore this receipt?'}
            />
            <Modal
                isOpen={isWithdrawnModalOpen}
                title={'Withdraw Receipt'}
                onClose={() => setIsWithdrawnModalOpen(false)}
                handleFunction={() => handleWithdrawn()}
                message={'Are you sure you want to withdraw this receipt?'}
            />
            <div className="flex flex-row justify-between">
                <Header title={'Receipt'} description={'Showing all receipts'} />
                <TopButtons >
                    <button onClick={() => setIsExportModalOpen(true)} className="rounded-lg font-lato border-2 border-aaa text-aaa p-3">
                        Export
                    </button>
                    <LinkPrimaryButton text="Create" to="create" />
                </TopButtons>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 text-center text-lg text-gray-500">
                    <div onClick={() => setStatus('active')} className={`${checkIfActive('active')} w-24 py-2 cursor-pointer`}>Active</div>
                    <div onClick={() => setStatus('archived')} className={`${checkIfActive('archived')} w-24 py-2 cursor-pointer`}>Archived</div>
                </div>
                <div className="flex gap-3">
                    <input
                        name="end_date"
                        value={date}
                        onChange={(e) => setDate(e)}
                        type="date"
                        id="end_date"
                        className="bg-transparent text-gray-500 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        placeholder="Enter End Date"
                        required
                    />
                    <Search
                        handleFetchData={handleSearch}
                    />
                </div>
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

export default Receipt