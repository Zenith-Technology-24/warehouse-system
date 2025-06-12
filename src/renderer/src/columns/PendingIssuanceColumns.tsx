import moment from "moment"
import { useMemo } from "react"

export const usePendingIssuanceColumns = (issuanceData: any) => {
    return useMemo(() => {
        return [
            {
                label: 'Issuance Date',
                name: 'issuanceDate',
                render(row: any, value: string) {
                    return <p>{moment(value).format('DD MMM YYYY')}</p>
                }
            },
            {
                label: 'Issuance Directive Nr',
                name: 'issuanceDirective',
                render(row: any, value: string) {
                    return <p>{value?.toUpperCase()}</p>
                }
            },
            {
                label: 'Qty',
                name: 'quantity',
                render(row: { item: { size: string } }, value: string) {
                    return <p>{value}</p>
                }
            },
            {
                label: 'Size',
                name: 'size',
                render(row: object, value: string) {
                    return <p>{value}</p>
                }
            },
            {
                label: 'UoM',
                name: 'unit',
                render(row: object, value: string) {
                    return <p>{value}</p>
                }
            },
            {
                label: 'T/Amount',
                name: 'amount',
                render(row: object, value: string) {
                    return <p>₱{value}</p>
                }
            },
            {
                label: 'Status',
                name: 'status',
                render(row: object, value: string) {
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
                label: 'Created Details',
                name: 'details',
                render(row: { createdAt: string }, value: string) {
                    return (
                        <div>
                            <div>
                                <p className="text-gray-500">Created At</p>
                                <p>{moment(row?.createdAt).format('DD MMM YYYY')}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Created By</p>
                                <p>{row?.user?.firstname} {row?.user?.lastname} ({row?.user?.roles[0]?.name})</p>
                            </div>
                        </div>
                    )
                }
            }
        ]
    }, [issuanceData])
}
