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
    return (
        <>
            <div className="flex flex-row justify-between">
                <Header title={'View User'} description={'Manage Users'} />
                <TopButtons >
                    <button onClick={() => navigate(-1)} className="rounded-lg font-lato border border-aaa text-aaa p-3">
                        Cancel
                    </button>
                    <button onClick={() => navigate('/manage-users/update', { state: state })} className="rounded-lg font-lato bg-aaa text-white p-3">
                        Update
                    </button>
                </TopButtons>
            </div>
            <div className="border rounded-lg py-4 px-6 space-y-4">
                <div>
                    <div className="text-gray-500">
                        <p>ID: <span className="text-black ml-2">{state?.id || 'N/A'}</span></p>
                        <p>First Name: <span className="text-black ml-2">{state?.firstname || 'N/A'}</span></p>
                        <p>Last Name: <span className="text-black ml-2">{state?.lastname || 'N/A'}</span></p>
                        <p>Role: <span className="text-black ml-2">{state?.roles[0]?.name || 'N/A'}</span></p>
                        <p>Username: <span className="text-black ml-2">{state?.username || 'N/A'}</span></p>
                        <div className="flex">
                            <p>Status:</p>
                            <div
                                className={`${state?.status === 'active'
                                    ? 'bg-green-50 text-green-500 w-14'
                                    : 'bg-gray-50 text-gray-500 w-20'
                                    } rounded-full flex items-center justify-center`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full mr-1 ${state?.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                                        }`}
                                ></div>
                                <p className="text-xs">
                                    {state?.status.charAt(0).toUpperCase() + state?.status.slice(1)}
                                </p>
                            </div>
                        </div>
                        <p>Created At: <span className="text-black ml-2">{moment(state?.createdAt).format('DD MMM YYYY h:mm A') || 'N/A'}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View