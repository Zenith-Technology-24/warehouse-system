import { useMemo } from "react"
import Header from "../../../components/Header"
import Table from "../../../components/Table"
import TopButtons from "../../../components/TopButtons"
import CsvDownloader from 'react-csv-downloader'
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import { fetchOneReceipt } from "../../../api/receipt/receiptApi"
import { fetchOneReturnedItems } from "../../../api/returnedItems/returnedItemsApi"

const View: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    // const { data } = useQuery({
    //     queryKey: ["returned_item_details", state.id],
    //     queryFn: () => fetchOneReturnedItems(state.id),
    // });

    return (
        <>
            <div className="flex flex-row justify-between">
                <Header title={'View Returned Item'} description={'Returned Item'} />
                <TopButtons >
                    <button onClick={() => navigate(-1)} className="rounded-lg font-lato border border-aaa text-aaa p-3">
                        Cancel
                    </button>
                    <button onClick={() => navigate('/return-of-items/update', { state: state })} className="rounded-lg font-lato bg-aaa text-white p-3">
                        Update
                    </button>
                </TopButtons>
            </div>
            <div className="border rounded-lg py-4 px-6 space-y-4">
                <div>
                    <div className="text-gray-500 space-y-2">
                        <p>ID: <span className="text-black ml-2">{state?.id || 'N/A'}</span></p>
                        <p>Receipt Ref: <span className="text-black ml-2">{state?.receiptRef || 'N/A'}</span></p>
                        <p>Item Name: <span className="text-black ml-2">{state?.itemName || 'N/A'}</span></p>
                        <p>Item Size: <span className="text-black ml-2">{state?.size || 'N/A'}</span></p>
                        <p>Returned Date & Time: <span className="text-black ml-2">{moment(state?.date).format('DD MMM YYYY') + ' ' + moment(state?.time, "HH:mm").format('h:mm A') || 'N/A'}</span></p>
                        <p>Created At: <span className="text-black ml-2">{moment(state?.createdAt).format('DD MMM YYYY h:mm A') || 'N/A'}</span></p>
                        <p>Created By: <span className="text-black ml-2">{state?.created_by?.firstname} {state?.created_by?.lastname}</span></p>
                        <p>Personnel: <span className="text-black ml-2">{state?.personnel}</span></p>
                        <p>Notes: <span className="text-black ml-2">{state?.notes}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View