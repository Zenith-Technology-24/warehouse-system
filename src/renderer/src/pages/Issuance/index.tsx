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
import exportToExcel from "../../components/ExportToExcel"
import ExportModal from "../../components/ExportModal"
import { exportIssuance, fetchIssuance, pendingAllIssuance, updateIssuanceStatus, withdrawAllIssuance } from "../../api/issuance/issuanceApi"

const Issuance: React.FC = () => {
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [status, setStatus] = useState<string>('all')
    const [isPendingModalOpen, setIsPendingModalOpen] = useState<boolean>(false)
    const [toPending, setToPending] = useState<string | null | number>(null)
    const [toArchive, setToArchive] = useState<number | null>(null)
    const [toWithdrawn, setToWithdrawn] = useState<string | null | number>(null)
    const [toActive, setToActive] = useState<number | null>(null)
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false)
    const [isWithdrawnModalOpen, setIsWithdrawnModalOpen] = useState<boolean>(false)
    const [isActiveModalOpen, setIsActiveModalOpen] = useState<boolean>(false)
    const [isSeeMore, setIsSeeMore] = useState<{ [key: number]: boolean }>({})
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
    const { data: rows, refetch } = useQuery({
        queryKey: ["issuance", search, page, limit, status],
        queryFn: () => fetchIssuance({ search, page, limit, status }) as any,
    });

    const updateStatus = useMutation({
        mutationFn: updateIssuanceStatus,
        onError: (error: any) => {
            showToast(
                error?.response?.data?.message,
                "",
                "error"
            );
        },
        onSuccess: (data: any) => {
            setIsActiveModalOpen(false)
            setIsArchiveModalOpen(false)
            refetch()
            showToast(
                `Issuance Successfully ${data?.status}!`,
                `Issuance has been successfully ${data?.status}.`,
                'success'
            );
            setToArchive(null)
            setToActive(null)
            setToWithdrawn(null)
        },
    });

    const withdrawAll = useMutation({
        mutationFn: withdrawAllIssuance,
        onError: (error: any) => {
            showToast(
                error?.response?.data?.message,
                "",
                "error"
            );
        },
        onSuccess: (data: any) => {
            setIsActiveModalOpen(false)
            setIsArchiveModalOpen(false)
            refetch()
            showToast(
                `Issuance Successfully ${data?.status}!`,
                `Issuance has been successfully ${data?.status}.`,
                'success'
            );
            setToArchive(null)
            setToActive(null)
            setToWithdrawn(null)
        },
    });

    const pendingAll = useMutation({
        mutationFn: pendingAllIssuance,
        onError: (error: any) => {
            showToast(
                error?.response?.data?.message,
                "",
                "error"
            );
        },
        onSuccess: (data: any) => {
            setIsActiveModalOpen(false)
            setIsArchiveModalOpen(false)
            refetch()
            showToast(
                `Issuance Successfully Pending!`,
                `Issuance has been successfully Pending.`,
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

    const handleOpenPendingModal = (id: string | null | number) => {
        setIsPendingModalOpen(true)
        setToPending(id)
    }

    const handleArchive = () => {
        updateStatus.mutate({
            id: toArchive,
            status: 'archived'
        })
        setIsArchiveModalOpen(false)
    }

    const handleActive = () => {
        updateStatus.mutate({
            id: toActive,
            status: 'pending'
        })
        setIsArchiveModalOpen(false)
    }

    const handleWithdrawn = () => {
        withdrawAll.mutate({
            id: toWithdrawn
        })
        setIsWithdrawnModalOpen(false)
    }

    const handlePending = () => {
        pendingAll.mutate({
            id: toPending
        })
        setIsPendingModalOpen(false)
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'Issuance Date',
                name: 'issuanceDate',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <div>
                            <p>{moment(value).format('DD MMM YYYY')}</p>
                        </div>
                    )
                }
            },
            {
                label: 'Issuance Directive Nr',
                name: 'issuanceDirective',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <p>{value}</p>
                    )
                }
            },
            {
                label: 'Status',
                name: 'issuanceStatus',
                render(row: { status: string }, value: string, rowIndex: number) {
                    return (
                        <div className={`
                            ${value === 'withdrawn' && 'bg-green-50 text-green-500 w-20'}
                            ${value === 'pending' && 'bg-yellow-50 text-yellow-500 w-20'}
                            ${value === 'archived' && 'bg-gray-50 text-gray-500 w-20'}
                                rounded-full flex flex-row items-center justify-center`}>
                            <div className={`w-2 h-2 rounded-full mr-1 
                                ${value === 'withdrawn' && 'bg-green-500'}
                                ${value === 'pending' && 'bg-yellow-500'}
                                ${value === 'archived' && 'bg-gray-500'}
                            `}></div>
                            <p className="text-xs">{value.charAt(0).toUpperCase() + row.status.slice(1)}</p>
                        </div>
                    )
                }
            },
            {
                label: 'Action',
                name: 'id',
                render(row: { id: number | null, status: string }, value: number, rowIndex: number) {
                    return (
                        <div className="flex flex-row gap-2">
                            <div onClick={() => navigate('/issuance/view', { state: row })} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" d="M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821" />
                                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                                    </g>
                                </svg>
                            </div>
                            <div onClick={() => row.status !== 'withdrawn' && navigate('/issuance/update', { state: row })} className={`p-2 rounded-full ${row.status !== 'withdrawn' && 'hover:bg-gray-100 cursor-pointer !opacity-100'} opacity-50 transition m-auto`}>
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#48494A"></path>
                                    </g>
                                </svg>
                            </div>
                            {
                                row.status === 'withdrawn' ? (
                                    <div onClick={() => handleOpenPendingModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div onClick={() => handleOpenWithdrawnModal(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                        <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                                                <path d="m18.935 13.945l-.67-3.648c-.29-1.576-.435-2.364-1.008-2.83S15.86 7 14.213 7H9.787c-1.647 0-2.47 0-3.044.467c-.573.466-.718 1.254-1.008 2.83l-.67 3.648c-.6 3.271-.901 4.907.024 5.98C6.014 21 7.724 21 11.142 21h1.716c3.418 0 5.128 0 6.053-1.074s.625-2.71.024-5.98" />
                                                <path d="M12 10.5V17m-2.5-2l2.5 2.5l2.5-2.5m6.5-4a1.5 1.5 0 0 0 .414-.305C22 10.089 22 9.11 22 7.152s0-2.936-.586-3.544S19.886 3 18 3H6c-1.886 0-2.828 0-3.414.608S2 5.195 2 7.152s0 2.936.586 3.543q.18.188.414.305" />
                                            </g>
                                        </svg>
                                    </div>
                                )
                            }
                            {
                                row.status !== 'archived' ? (
                                    <div onClick={() => row.status !== 'withdrawn' && handleOpenArchiveModal(value)} className={`p-2 rounded-full ${row.status !== 'withdrawn' && 'hover:bg-gray-100 cursor-pointer !opacity-100'} opacity-50 transition m-auto`}>
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
            { header: 'Issuance Date', key: 'issuanceDate', width: 40 },
            { header: 'Document No', key: 'documentNo', width: 40 },
            { header: 'Directive Nr', key: 'issuanceDirective', width: 30 },
            { header: 'Validity Date', key: 'validityDate', width: 20 },
            { header: 'End User', key: 'endUser', width: 20 },
            { header: 'Item Name', key: 'itemName', width: 30 },
            { header: 'Size', key: 'size', width: 30 },
            { header: 'Quantity', key: 'quantity', width: 30 },
            { header: 'UoM', key: 'unit', width: 30 },
            { header: 'Unit Price', key: 'price', width: 30 },
            { header: 'Total Amount', key: 'totalAmount', width: 30 },
            { header: 'Status', key: 'status', width: 30 },
            { header: 'Created At', key: 'createdAt', width: 30 },
            { header: 'Created By', key: 'createdBy', width: 30 },
        ];

        let gtAmount = 0
        let tQty = 0

        let data = toExport?.flatMap((row: {
            issuanceDate: string,
            documentNo: string,
            validityDate: string,
            issuanceDirective: string,
            endUsers: { name: string }[],
            issuanceDetails: {
                createdAt: string,
                inventory: {
                    name: string,
                    unit: string,
                    status: string
                }
            }[],
            quantity: string,
            user: {
                firstname: string,
                lastname: string
            },
            size: string,
            price: string,
            totalAmount: string
        }) => {
            const fullName = row.user
                ? `${row.user.firstname} ${row.user.lastname}`
                : 'N/A';

            const formatDate = (dateStr: string) => {
                return new Intl.DateTimeFormat("en-PH", {
                    timeZone: "Asia/Manila",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).format(new Date(dateStr));
            };

            const formattedIssuanceDate = formatDate(row.issuanceDate);
            const formattedValidityDate = formatDate(row.validityDate);
            const formattedCreatedAt = formatDate(row.issuanceDetails[0].createdAt);

            const issuanceRows = row.issuanceDetails.map((item: any, index) => {
                gtAmount += parseInt(item.inventory[0].amount)
                tQty += parseInt(item.inventory[0].quantity)
                return {
                    issuanceDate: index === 0 ? formattedIssuanceDate : '',
                    documentNo: index === 0 ? row.documentNo : '',
                    validityDate: index === 0 ? formattedValidityDate : '',
                    issuanceDirective: index === 0 ? row.issuanceDirective : '',
                    endUser: item.endUser.name,
                    totalAmount: item.inventory[0].amount,
                    itemName: item.inventory[0].item_name,
                    quantity: item.inventory[0].quantity,
                    size: item.inventory[0].size,
                    price: item.inventory[0].price,
                    unit: item.inventory[0].unit,
                    status: item.status,
                    createdAt: index === 0 ? formattedCreatedAt : '',
                    createdBy: index === 0 ? fullName : ''
                };
            });

            return issuanceRows
        })
        data = [...data, {
            issuanceDate: '',
            documentNo: '',
            validityDate: '',
            issuanceDirective: '',
            endUser: '',
            totalAmount: '',
            itemName: '',
            quantity: '',
            size: '',
            price: '',
            unit: '',
            status: '',
            createdAt: '',
            createdBy: ''
        }, {
            issuanceDate: 'GT/AMOUNT : ',
            documentNo: gtAmount.toLocaleString(),
            validityDate: '',
            issuanceDirective: '',
            endUser: '',
            totalAmount: '',
            itemName: '',
            quantity: '',
            size: '',
            price: '',
            unit: '',
            status: '',
            createdAt: '',
            createdBy: ''
        }, {
            issuanceDate: 'T/Qty : ',
            documentNo: tQty,
            validityDate: '',
            issuanceDirective: '',
            endUser: '',
            totalAmount: '',
            itemName: '',
            quantity: '',
            size: '',
            price: '',
            unit: '',
            status: '',
            createdAt: '',
            createdBy: ''
        }]
        exportToExcel({ data, headers, filename: `${status}-issuance-${start_date}-to-${end_date}` })
        setIsExportModalOpen(false)
    }

    return (
        <>
            <ExportModal
                search={search}
                status={status}
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                handleFunction={handleExport}
                exportFunction={exportIssuance}
            />
            <Modal
                isOpen={isArchiveModalOpen}
                title={'Archive Issuance'}
                onClose={() => setIsArchiveModalOpen(false)}
                handleFunction={() => handleArchive()}
                message={'Are you sure you want to archive this issuance?'}
            />
            <Modal
                isOpen={isActiveModalOpen}
                title={'Restore Issuance'}
                onClose={() => setIsActiveModalOpen(false)}
                handleFunction={() => handleActive()}
                message={'Are you sure you want to restore this issuance?'}
            />
            <Modal
                isOpen={isWithdrawnModalOpen}
                title={'Pending to Withdrawn'}
                onClose={() => setIsWithdrawnModalOpen(false)}
                handleFunction={() => handleWithdrawn()}
                message={'Are you sure you want to change the status of this issuance from Pending to Withdrawn?'}
            />
            <Modal
                isOpen={isPendingModalOpen}
                title={'Withdrawn to Pending'}
                onClose={() => setIsPendingModalOpen(false)}
                handleFunction={() => handlePending()}
                message={'Are you sure you want to change the status of this issuance from Withdrawn to Pending?'}
            />
            <div className="flex flex-row justify-between">
                <Header title={'Issuance'} description={'Showing all issuance'} />
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
                    <div onClick={() => setStatus('pending')} className={`${checkIfActive('pending')} w-24 py-2 cursor-pointer`}>Pending</div>
                    <div onClick={() => setStatus('withdrawn')} className={`${checkIfActive('withdrawn')} w-24 py-2 cursor-pointer`}>Withdrawn</div>
                    <div onClick={() => setStatus('archived')} className={`${checkIfActive('archived')} w-24 py-2 cursor-pointer`}>Archived</div>
                </div>
                <div className="flex gap-3">
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

export default Issuance