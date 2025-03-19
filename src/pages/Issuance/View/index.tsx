import { useMemo } from "react"
import Header from "../../../components/Header"
import Table from "../../../components/Table"
import TopButtons from "../../../components/TopButtons"
import CsvDownloader from 'react-csv-downloader'
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import { fetchOneIssuance } from "../../../api/issuance/issuanceApi"

const View: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { data } = useQuery({
        queryKey: ["receipt_details", state.id],
        queryFn: () => fetchOneIssuance(state.id),
    });

    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'name',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <p>{value}</p>
                    )
                }
            },
            {
                label: 'Location',
                name: 'location',
                render(row: { item: { location: string } }, value: string, rowIndex: number) {
                    return (
                        <p>{row?.item?.location}</p>
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
                                <p>{row?.item?.price}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">T/Amount</p>
                                <p>{row?.item?.amount}</p>
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
                        <p>Document No: <span className="text-black ml-2">{data?.documentNo || 'N/A'}</span></p>
                        <p>Issuance Directive Nr: <span className="text-black ml-2">{data?.issuanceDirective || 'N/A'}</span></p>
                        <p>Issuance Date: <span className="text-black ml-2">{moment(data?.issuanceDate).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <p>Validity Date: <span className="text-black ml-2">{moment(data?.validityDate).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <div className="flex">
                            <p>Status:</p>
                            <div
                                className={`
                                    ${data?.status === 'withdrawn' && 'bg-green-50 text-green-500 w-20'} 
                                    ${data?.status === 'pending' && 'bg-yellow-50 text-yellow-500 w-20'}
                                    ${data?.status === 'archived' && 'bg-gray-50 text-gray-500 w-20'} 
                                    rounded-full flex items-center justify-center mx-3`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full mr-1 
                                        ${data?.status === 'withdrawn' && 'bg-green-500'}
                                        ${data?.status === 'pending' && 'bg-yellow-500'}
                                        ${data?.status === 'archived' && 'bg-gray-500'}
                                    `}
                                ></div>
                                <p className="text-xs">
                                    {data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
                                </p>
                            </div>
                        </div>
                        <p>Created At: <span className="text-black ml-2">{moment(data?.createdAt).format('DD MMM YYYY h:mm A') || 'N/A'}</span></p>
                        <p>Created By: <span className="text-black ml-2">{data?.user?.firstname + ' ' + data?.user?.lastname + ' (' + data?.user?.roles[0]?.name + ')' || 'N/A'}</span></p>
                    </div>
                </div>
                {
                    data?.endUsers.map((end: any, index: number) => (
                        <div key={index}>
                            <h1 className="text-md font-semibold mb-2">End User: {end?.name}</h1>
                            <Table
                                columns={columns}
                                rows={{ data: end?.inventory }}
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