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
import SecondaryButton from "../../components/buttons/SecondaryButton"
import CsvDownloader from 'react-csv-downloader'
import { exportExpenses, updateExpenseStatus } from "../../api/expenses/expensesApi"
import exportToExcel from "../../components/ExportToExcel"
import ExportModal from "../../components/ExportModal"
import ButtonWithIcon from "../../components/buttons/ButtonWithIcon"
import { fetchUsers } from "../../api/users/usersApi"

const ManageUsers: React.FC = () => {
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [status, setStatus] = useState<string>('all')
    const [toArchive, setToArchive] = useState<number | null>(null)
    const [toActive, setToActive] = useState<number | null>(null)
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false)
    const [isActiveModalOpen, setIsActiveModalOpen] = useState<boolean>(false)
    const [isSeeMore, setIsSeeMore] = useState<{ [key: number]: boolean }>({})
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
    const { data: rows, refetch } = useQuery({
        queryKey: ["users", search, page, limit, status],
        queryFn: () => fetchUsers({ search, page, limit, status }) as any,
    });

    const updateStatus = useMutation({
        mutationFn: updateExpenseStatus,
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: (data: any) => {
            setIsActiveModalOpen(false)
            setIsArchiveModalOpen(false)
            refetch()
            showToast(
                `User Successfully ${data?.expense?.status === 'active' ? 'Restored' : 'Deactivated'}!`,
                `User has been successfully ${data?.expense?.status === 'active' ? 'restored' : 'deactivated'}.`,
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

    const handleDeactivate = () => {
        updateStatus.mutate({
            id: toArchive,
            status: 'deactivated'
        })
        setIsArchiveModalOpen(false)
    }

    const handleActive = () => {
        updateStatus.mutate({
            id: toActive,
            status: 'active'
        })
        setIsArchiveModalOpen(false)
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'ID',
                name: 'id',
                render(row: object, value: string) {
                    return (
                        <div>
                            {value}
                        </div>
                    )
                }
            },
            {
                label: 'Name',
                name: 'firstname',
                render(row: { lastname: string }, value: string) {
                    return (
                        <p>{value} {row.lastname}</p>
                    )
                }
            },
            {
                label: 'Email',
                name: 'email',
                render(row: object, value: string) {
                    return (
                        <p>{value}</p>
                    );
                },
            },
            {
                label: 'Role',
                name: 'role',
                render(row: object, value: string) {
                    return (
                        <p>{value}</p>
                    )
                }
            },
            {
                label: 'Created At',
                name: 'created_at',
                render(row: object, value: string) {
                    return (
                        <p>{moment(value).format('D MMM YYYY')}</p>
                    )
                }
            },
            {
                label: 'Action',
                name: 'id',
                render(row: { id: number | null, status: string }, value: number) {
                    return (
                        <div className="flex flex-row gap-2">
                            <div onClick={() => console.log('view')} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" d="M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821" />
                                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                                    </g>
                                </svg>
                            </div>
                            <div onClick={() => navigate('/manage-users/update', { state: row })} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#48494A"></path>
                                    </g>
                                </svg>
                            </div>
                            {
                                row.status === 'active' ? (
                                    <div onClick={() => handleOpenArchiveModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                        <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3.5m8.5 7l-5-5m0 5l5-5" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div onClick={() => handleOpenActiveModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                        <svg width="14px" height="14px" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.7 371.7 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1c-.4.2-.8.3-1.2.5c-44.7 18.9-84.8 46-119.3 80.6a373.4 373.4 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 888.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8c2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3M512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521M880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8" />
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
                title={'Deactivate User'}
                onClose={() => setIsArchiveModalOpen(false)}
                handleFunction={() => handleDeactivate()}
                message={'Are you sure you want to deactivate this user?'}
            />
            <Modal
                isOpen={isActiveModalOpen}
                title={'Restore User'}
                onClose={() => setIsActiveModalOpen(false)}
                handleFunction={() => handleActive()}
                message={'Are you sure you want to restore this user?'}
            />
            <div className="flex flex-row justify-between">
                <Header title={'Manage Users'} description={'Showing all users'} />
                <TopButtons >
                    <button onClick={() => setIsExportModalOpen(true)} className="rounded-lg font-lato border-2 border-aaa text-aaa p-3">
                        Export
                    </button>
                    <LinkPrimaryButton text="Create" to="create" />
                </TopButtons>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 text-center text-lg text-gray-500">
                    <div onClick={() => setStatus('all')} className={`${checkIfActive('all')} w-24 py-2 cursor-pointer`}>All</div>
                    <div onClick={() => setStatus('active')} className={`${checkIfActive('active')} w-24 py-2 cursor-pointer`}>Active</div>
                    <div onClick={() => setStatus('deactivated')} className={`${checkIfActive('deactivated')} w-24 py-2 cursor-pointer`}>Deactivated</div>
                </div>
                <div className="flex gap-3">
                    <ButtonWithIcon
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3.75 7a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15A.75.75 0 0 1 3.75 7m2.5 5a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3 5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75" />
                            </svg>
                        }
                        options={[
                            { label: "Name", value: "name" },
                            { label: "Email", value: "email" },
                            { label: "Date", value: "date" },
                        ]}
                        onSelect={() => alert("Button clicked!")}
                    >
                        Filter
                    </ButtonWithIcon>
                    <Search
                        handleFetchData={handleSearch}
                    />
                </div>
            </div>
            <Table
                currentPage={page}
                setCurrentPage={setPage}
                totalRows={rows?.length || 1}
                columns={columns}
                rows={{ data: rows }}
                rowsPerPage={limit}
                totalPages={rows?.totalPages}
                onPageChange={handleChangePage}
            />
        </>
    )
}

export default ManageUsers