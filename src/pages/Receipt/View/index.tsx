import { useEffect, useMemo, useState } from "react"
import Header from "../../../components/Header"
import Table from "../../../components/Table"
import TopButtons from "../../../components/TopButtons"
import CsvDownloader from 'react-csv-downloader'
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import { fetchOneReceipt } from "../../../api/receipt/receiptApi"

const View: React.FC = () => {
    const [gAmount, setGamount] = useState(0)
    const { state } = useLocation()
    const navigate = useNavigate()
    const { data } = useQuery({
        queryKey: ["receipt_details", state.id],
        queryFn: () => fetchOneReceipt(state.id),
    });


    const calculateGrossTotal = (items: any[]) => {
        if (!Array.isArray(items)) return 0;

        return items.reduce((total, item) => {
            const amount = typeof item.amount === "string"
                ? Number(item.amount.replace(/,/g, ""))
                : Number(item.amount);

            return total + (isNaN(amount) ? 0 : amount);
        }, 0);
    };


    useEffect(() => {
        if (data?.item) {
            setGamount(calculateGrossTotal(data.item));
        }
    }, [data]);

    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'item_name',
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
                        <p>{value}</p>
                    )
                }
            },
            {
                label: 'Size (Optional)',
                name: 'size',
                render(row: { item: { size: string } }, value: string, rowIndex: number) {
                    return (
                        <p>{value}</p>
                    )
                }
            },
            {
                label: 'Stock Details',
                name: 'StockDetails',
                render(row: { quantity_string: string, unit: string, is_consumed: boolean }, value: string, rowIndex: number) {
                    return (
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-500">Qty</p>
                                <p className={`${row?.is_consumed && 'text-gray-400'}`}>{row?.quantity_string}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">UoM</p>
                                <p>{row?.unit || 'N/A'}</p>
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
                        <p>₱{value}</p>
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
                            <p>₱{row?.amount}</p>
                        </div>
                    )
                }
            },
            {
                label: 'Expiry Date',
                name: 'expiryDate',
                render(row: { item: { amount: string } }, value: string, rowIndex: number) {
                    return (
                        <p>{value ? moment(value).format('DD MMM YYYY') : 'N/A'}</p>
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
                        <p>Receipt Date: <span className="text-black ml-2">{moment(data?.receiptDate).format('DD MMM YYYY') || 'N/A'}</span></p>
                        <p>Issuance Directive Nr: <span className="text-black ml-2">{data?.issuanceDirective || 'N/A'}</span></p>
                        <p>Source: <span className="text-black ml-2">{data?.source || 'N/A'}</span></p>
                        <p>Created At: <span className="text-black ml-2">{moment(data?.createdAt).format('DD MMM YYYY h:mm A') || 'N/A'}</span></p>
                        <p>Created By: <span className="text-black ml-2">{data?.user?.firstname + ' ' + data?.user?.lastname || 'N/A'}</span></p>
                    </div>
                </div>
                <div>
                    <h1 className="text-md font-semibold mb-2">Item Details</h1>
                    <Table
                        columns={columns}
                        rows={{ data: data?.item }}
                        classes="!h-0"
                        gAmount={gAmount}
                    />
                </div>
            </div>
        </>
    )
}

export default View