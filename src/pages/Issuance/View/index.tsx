import { useEffect, useMemo, useState } from "react"
import Header from "../../../components/Header"
import Table from "../../../components/Table"
import TopButtons from "../../../components/TopButtons"
import CsvDownloader from 'react-csv-downloader'
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchOneIssuance, withdrawIssuance } from "../../../api/issuance/issuanceApi"
import Modal from "../../../components/Modal"
import { useToast } from "../../../providers/ToastContext"

const View: React.FC = () => {
    const { showToast } = useToast()
    const { state } = useLocation()
    const navigate = useNavigate()
    const [isWithdrawnModalOpen, setIsWithdrawnModalOpen] = useState<boolean>(false)
    const [toWithdrawn, setToWithdrawn] = useState<string | null>(null)
    const [inventoryId, setInventoryId] = useState<string | null>(null)
    const { data, refetch } = useQuery({
        queryKey: ["receipt_details", state.id],
        queryFn: () => fetchOneIssuance(state.id),
    });

    const withdraw = useMutation({
        mutationFn: withdrawIssuance,
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: (data: any) => {
            refetch()
            showToast(
                `Item Successfully ${data?.status}!`,
                `Item has been successfully ${data?.status}.`,
                'success'
            );
            setToWithdrawn(null)
            setInventoryId(null)
        },
    });

    const calculateGrossTotal = (endUser: any) => {
        if (!endUser.inventory) return 0;

        return endUser.inventory.reduce((total, inventory) => {
            const amount = typeof inventory.item.amount === "string"
                ? Number(inventory.item.amount.replace(/,/g, ""))
                : Number(inventory.item.amount);
            return total + (isNaN(amount) ? 0 : amount);
        }, 0);
    };

    useEffect(() => {
        if (data?.endUsers) {
            calculateGrossTotal(data.endUsers)
        }

    }, [data]);

    const handleWithdrawn = () => {
        withdraw.mutate({
            id: toWithdrawn,
            inventoryId
        })
        setIsWithdrawnModalOpen(false)
    }

    const handleOpenWithdrawnModal = (id: string | null, inventoryId: string | null) => {
        setIsWithdrawnModalOpen(true)
        setToWithdrawn(id)
        setInventoryId(inventoryId)
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'name',
                render(row: { item: { name: string } }, value: string, rowIndex: number) {
                    return (
                        <p>{row?.item?.name}</p>
                    )
                }
            },
            {
                label: 'Receipt Ref',
                name: 'receiptRef',
                render(row: { item: { receiptRef: string } }, value: string, rowIndex: number) {
                    return (
                        <p>{row?.item?.receiptRef}</p>
                    )
                }
            },
            {
                label: 'Stock Details',
                name: 'StockDetails',
                render(row: { item: { size: string, quantity: number, unit: string } }, value: string, rowIndex: number) {
                    return (
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-500">Size (Optional)</p>
                                <p>{row?.item?.size}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Qty</p>
                                <p>{row?.item?.quantity}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">U/I</p>
                                <p>{row?.item?.unit}</p>
                            </div>
                        </div>
                    )
                }
            },
            {
                label: 'T/Amount',
                name: 'price',
                render(row: { item: { price: string, amount: string } }, value: string, rowIndex: number) {
                    return (
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-500">U/Price</p>
                                <p>₱{row?.item?.price}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">T/Amount</p>
                                <p>₱{row?.item?.amount}</p>
                            </div>
                        </div>
                    )
                }
            },
            {
                label: 'Status',
                name: 'status',
                render(row: object, value: string, rowIndex: number) {
                    return (
                        <div
                            className={`
                                    ${value === 'withdrawn' && 'bg-green-50 text-green-500 w-20'} 
                                    ${value === 'pending' && 'bg-yellow-50 text-yellow-500 w-20'}
                                    ${value === 'archived' && 'bg-gray-50 text-gray-500 w-20'} 
                                    rounded-full flex items-center justify-center mx-3`}
                        >
                            <div
                                className={`w-2 h-2 rounded-full mr-1 
                                        ${value === 'withdrawn' && 'bg-green-500'}
                                        ${value === 'pending' && 'bg-yellow-500'}
                                        ${value === 'archived' && 'bg-gray-500'}
                                    `}
                            ></div>
                            <p className="text-xs">
                                {value?.charAt(0).toUpperCase() + value?.slice(1)}
                            </p>
                        </div>
                    )
                }
            },
            {
                label: 'Action',
                name: 'issuanceDetailId',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <div className="flex">
                            <div onClick={() => handleOpenWithdrawnModal(value, row?.id)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                                        <path d="m18.935 13.945l-.67-3.648c-.29-1.576-.435-2.364-1.008-2.83S15.86 7 14.213 7H9.787c-1.647 0-2.47 0-3.044.467c-.573.466-.718 1.254-1.008 2.83l-.67 3.648c-.6 3.271-.901 4.907.024 5.98C6.014 21 7.724 21 11.142 21h1.716c3.418 0 5.128 0 6.053-1.074s.625-2.71.024-5.98" />
                                        <path d="M12 10.5V17m-2.5-2l2.5 2.5l2.5-2.5m6.5-4a1.5 1.5 0 0 0 .414-.305C22 10.089 22 9.11 22 7.152s0-2.936-.586-3.544S19.886 3 18 3H6c-1.886 0-2.828 0-3.414.608S2 5.195 2 7.152s0 2.936.586 3.543q.18.188.414.305" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    )
                }
            }
        ]
    }, [state?.endUsers])

    return (
        <>
            <Modal
                isOpen={isWithdrawnModalOpen}
                title={'Move Pending Item to Withdrawn'}
                onClose={() => setIsWithdrawnModalOpen(false)}
                handleFunction={() => handleWithdrawn()}
                message={'Are you sure you want to change the status of this item from Pending to Withdrawn?'}
            />
            <div className="flex flex-row justify-between">
                <Header title={'View Issuance'} description={'Issuance'} />
                <TopButtons >
                    <button onClick={() => navigate(-1)} className="rounded-lg font-lato border border-aaa text-aaa p-3">
                        Cancel
                    </button>
                    <button onClick={() => navigate('/issuance/update', { state: state })} className="rounded-lg font-lato bg-aaa text-white p-3">
                        Update
                    </button>
                </TopButtons>
            </div>
            <div className="border rounded-lg py-4 px-6 space-y-4">
                <div>
                    <h1 className="text-md font-semibold mb-2">Issuance Details</h1>
                    <div className="text-gray-500 space-y-2">
                        <p>Document No: <span className="text-black ml-2">{data?.documentNo || 'N/A'}</span></p>
                        <p>Issuance Directive Nr: <span className="text-black ml-2">{data?.issuanceDirective || 'N/A'}</span></p>
                        <p>Issuance Date: <span className="text-black ml-2">{moment(data?.issuanceDate).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <p>Validity Date: <span className="text-black ml-2">{moment(data?.validityDate).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <p>Created At: <span className="text-black ml-2">{moment(data?.createdAt).format('DD MMM YYYY h:mm A') || 'N/A'}</span></p>
                        <p>Created By: <span className="text-black ml-2">{data?.user?.firstname + ' ' + data?.user?.lastname + ' (' + data?.user?.roles[0]?.name + ')' || 'N/A'}</span></p>
                    </div>
                </div>
                {
                    data?.endUsers.map((endUser: any, index: number) => (
                        <div key={index}>
                            <h1 className="text-md font-semibold mb-2">End User: {endUser?.name}</h1>
                            <Table
                                columns={columns}
                                rows={{ data: endUser?.inventory }}
                                classes="!h-0"
                                gAmount={calculateGrossTotal(endUser)}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default View