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
    console.log(state)

    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'item_name',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <p>{row?.inventory?.itemName}</p>
                    )
                }
            },
            {
                label: 'Location',
                name: 'location',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <p>{row?.inventory?.location}</p>
                    )
                }
            },
            {
                label: 'Supplier',
                name: 'supplier',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <p>{row?.inventory?.supplier}</p>
                    )
                }
            },
            {
                label: 'Size',
                name: 'size',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <p>{row?.inventory?.size}</p>
                    )
                }
            },
            {
                label: 'Stock Details',
                name: 'StockDetails',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-500">Qty</p>
                                <p>{row?.inventory?.quantity}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">U/I</p>
                                <p>{row?.inventory?.unit}</p>
                            </div>
                        </div>
                    )
                }
            },
            {
                label: 'Financials',
                name: 'financials',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-500">U/Price</p>
                                <p>{row?.inventory?.price}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">T/Amount</p>
                                <p>{row?.inventory?.amount}</p>
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
                        <p>Issuance Directive Nr: <span className="text-black ml-2">{state?.directiveNo || 'N/A'}</span></p>
                        <p>Issuance Date: <span className="text-black ml-2">{moment(state?.issuance_date).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <p>Expiry Date: <span className="text-black ml-2">{moment(state?.expiry_date).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <p>Document No: <span className="text-black ml-2">{state?.documentNum || 'N/A'}</span></p>
                        <div className="flex">
                            <p>Status:</p>
                            <div
                                className={`
                                    ${state?.status === 'withdrawn' && 'bg-green-50 text-green-500 w-20'} 
                                    ${state?.status === 'pending' && 'bg-yellow-50 text-yellow-500 w-20'}
                                    ${state?.status === 'archived' && 'bg-gray-50 text-gray-500 w-20'} 
                                    rounded-full flex items-center justify-center mx-3`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full mr-1 
                                        ${state?.status === 'withdrawn' && 'bg-green-500'}
                                        ${state?.status === 'pending' && 'bg-yellow-500'}
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
                {
                    state?.endUsers.map((end: any, index: number) => (
                        <div key={index}>
                            <h1 className="text-md font-semibold mb-2">End User: {end?.endUser?.name}</h1>
                            <Table
                                columns={columns}
                                rows={{ data: end?.items }}
                                classes="!h-0"
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default View