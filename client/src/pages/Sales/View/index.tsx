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

const View: React.FC = () => {
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [isDeleteProductOpen, setIsDeleteProductOpen] = useState<boolean>(false)
    const { id } = useParams()
    const [page, setPage] = useState<number>(1)
    const limit = 5
    const { data, refetch } = useQuery({
        queryKey: ["sales_details", id],
        queryFn: () => fetchOneSales(Number(id)),
    });
    const rows = useMemo(() => {
        return data?.salesInventory?.slice(
            (page - 1) * limit,
            page * limit
        )
    }, [data, page])
    const totalPages = Math.ceil(data?.salesInventory.length / limit);
    const [toDelete, setToDelete] = useState<number | null>(null)

    const handleChangePage = (page: number) => {
        setPage(page)
    }

    const deleteProduct = useMutation({
        mutationFn: deleteSalesProduct,
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: () => {
            setIsDeleteProductOpen(false)
            refetch()
            showToast(
                `Product Successfully Deleted!`,
                `Product has been successfully Deleted.`,
                'success'
            )
            setToDelete(null)
        },
    });

    const handleDeleteProduct = () => {
        if (rows?.length > 1) {
            deleteProduct.mutate({
                id: toDelete
            })
        } else {
            showToast(
                `Product Unsuccessfully Deleted!`,
                `Sales must have atleast one product left.`,
                'error'
            )
            setIsDeleteProductOpen(false)
            setToDelete(null)
        }
    }

    const handleOpenDeleteProduct = (id: number | null) => {
        setIsDeleteProductOpen(true)
        setToDelete(id)
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'Product',
                name: 'inventory',
                render(row: object, value: any) {
                    return (
                        <div>
                            {value.product_name}
                        </div>
                    )
                }
            },
            {
                label: 'Quantity',
                name: 'quantity',
                render(row: object, value: any) {
                    return (
                        <div>
                            {value}
                        </div>
                    )
                }
            },
            {
                label: 'Amount',
                name: 'total_price',
                render(row: object, value: any) {
                    return (
                        <div>
                            ₱{value}
                        </div>
                    )
                }
            },
            {
                label: 'Terms',
                name: 'terms',
                render(row: object, value: any) {
                    return (
                        <div>
                            {value}
                        </div>
                    )
                }
            },
            {
                label: 'Action',
                name: 'id',
                render(row: object, value: any) {
                    return (
                        <div className="flex flex-row">
                            <div onClick={() => handleOpenDeleteProduct(value)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    )
                }
            }
        ]
    }, [rows])

    return (
        <>
            <Modal
                isOpen={isDeleteProductOpen}
                title={'Delete Product'}
                onClose={() => setIsDeleteProductOpen(false)}
                handleFunction={() => handleDeleteProduct()}
                message={'Are you sure you want to delete this Product?'}
            />
            <div className="flex flex-row justify-between">
                <Header title={'Sales'} description={'Showing all sales'} />
                <TopButtons >
                    <button onClick={() => navigate(-1)} className="rounded-lg font-lato border border-aaa text-aaa p-3">
                        Cancel
                    </button>
                    <button onClick={() => navigate('/sales/update', { state: data })} className="rounded-lg font-lato bg-aaa text-white p-3">
                        Update
                    </button>
                </TopButtons>
            </div>
            <div className="border rounded-lg py-4 px-6 space-y-4">
                <div>
                    <p className="font-semibold mb-4">Customer Information</p>
                    <div className="flex flex-row">
                        <div className="mr-40 text-gray-500 space-y-2">
                            <p>Customer First Name</p>
                            <p>Customer Last Name</p>
                            <p>Contact Number</p>
                            <p>Address</p>
                        </div>
                        <div className="space-y-2">
                            <p>{data?.customer.first_name}</p>
                            <p>{data?.customer.last_name}</p>
                            <p>{data?.customer.contact_number}</p>
                            <p>{data?.customer.address}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="font-semibold mb-4">Product Information</p>
                    {
                        data && (
                            <Table
                                currentPage={page}
                                setCurrentPage={setPage}
                                totalRows={rows?.length || 1}
                                columns={columns}
                                rows={{ data: rows }}
                                rowsPerPage={limit}
                                totalPages={totalPages}
                                onPageChange={handleChangePage}
                                footerTableJSX={
                                
                                        <tfoot className="sticky bottom-0">
                                        <tr>
                                          <th colSpan={columns?.length ?? 1} className="p-4">
                                            <div className="flex justify-start gap-2 ">
                                            <span>Total Sales: </span>
                                             <span className="font-normal">{`₱${data?.total ?? 0}`}</span>
                                            </div>
                                        
                                         </th>
                                     </tr>
                                     </tfoot>
                                    }
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default View