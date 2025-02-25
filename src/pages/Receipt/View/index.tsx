import { useEffect, useMemo, useState } from "react"
import LinkPrimaryButton from "../../../components/buttons/LinkPrimaryButton"
import SecondaryButton from "../../../components/buttons/SecondaryButton"
import Header from "../../../components/Header"
import Table from "../../../components/Table"
import TopButtons from "../../../components/TopButtons"
import CsvDownloader from 'react-csv-downloader'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteSalesProduct, fetchOneSales } from "../../../api/sales/salesApi"
import PrimaryButton from "../../../components/buttons/PrimaryButton"
import Modal from "../../../components/Modal"
import { useToast } from "../../../providers/ToastContext"
import moment from "moment"

const View: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    console.log(state);
    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'name',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <p className="font-normal">{value}</p>
                    )
                }
            },
            {
                label: 'Location',
                name: 'location',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <p>{row?.item?.location}</p>
                    )
                }
            },
            {
                label: 'Size (Optional)',
                name: 'size',
                render(row: { item: { size: string } }, value: string, rowIndex: number) {
                    return (
                        <p>{row?.item?.size}</p>
                    )
                }
            },
            {
                label: 'Stock Details',
                name: 'StockDetails',
                render(row: { item: { quantity: string, unit: string }, unit: string }, value: string, rowIndex: number) {
                    return (
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-500">Qty</p>
                                <p>{row?.item?.quantity}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">U/I</p>
                                <p>{row?.item?.unit || 'N/A'}</p>
                            </div>
                        </div>
                    )
                }
            },
            {
                label: 'U/Price',
                name: 'price',
                render(row: { item: { price: string } }, value: string, rowIndex: number) {
                    return (
                        <p>₱{row?.item?.price}</p>
                    )
                }
            },
            {
                label: 'T/Amount',
                name: 'price',
                render(row: { item: { amount: string } }, value: string, rowIndex: number) {
                    return (
                        <div>
                            <p className="text-gray-500">T/Amount</p>
                            <p>₱{row?.item?.amount}</p>
                        </div>
                    )
                }
            },
            {
                label: 'Action',
                name: 'action',
                render(row: { item: { amount: string } }, value: string, rowIndex: number) {
                    return (
                        <div className="flex flex-row gap-2">
                            <div onClick={() => navigate('/receipt/update', { state: row })} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#48494A"></path>
                                    </g>
                                </svg>
                            </div>
                            <div onClick={() => alert('delete')} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
            <div className="flex flex-row justify-between">
                <Header title={'View Receipt'} description={'Receipt'} />
                <TopButtons >
                    <button onClick={() => navigate(-1)} className="rounded-lg font-lato border border-aaa text-aaa p-3">
                        Cancel
                    </button>
                    <button onClick={() => navigate('/receipt/update', { state: state })} className="rounded-lg font-lato bg-aaa text-white p-3">
                        Update
                    </button>
                </TopButtons>
            </div>
            <div className="border rounded-lg py-4 px-6 space-y-4">
                <div>
                    <h1 className="text-md font-semibold mb-2">Receipt Details</h1>
                    <div className="text-gray-500 space-y-2">
                        <p>Receipt Date: <span className="text-black ml-2">{moment(state?.issuance_date).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <p>Issuance Directive Nr: <span className="text-black ml-2">{state?.issuanceDirective || 'N/A'}</span></p>
                        <p>Source: <span className="text-black ml-2">{state?.source || 'N/A'}</span></p>
                        <div className="flex">
                            <p>Status:</p>
                            <div
                                className={`
                                    ${state?.status === 'active' && 'bg-green-50 text-green-500 w-20'}
                                    ${state?.status === 'archived' && 'bg-gray-50 text-gray-500 w-20'} 
                                    rounded-full flex items-center justify-center mx-3`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full mr-1 
                                        ${state?.status === 'active' && 'bg-green-500'}
                                        ${state?.status === 'archived' && 'bg-gray-500'}
                                    `}
                                ></div>
                                <p className="text-xs">
                                    {state?.status.charAt(0).toUpperCase() + state?.status.slice(1)}
                                </p>
                            </div>
                        </div>
                        <p>Created At: <span className="text-black ml-2">{moment(state?.createdAt).format('DD MMM YYYY h:mm A') || 'N/A'}</span></p>
                        <p>Created By: <span className="text-black ml-2">{state?.created_by || 'N/A'}</span></p>
                    </div>
                </div>
                <div>
                    <h1 className="text-md font-semibold mb-2">Item Details</h1>
                    <Table
                        columns={columns}
                        rows={{ data: state?.inventory }}
                        classes="!h-0"
                    />
                </div>
            </div>
        </>
    )
}

export default View