import moment from "moment"
import { useMemo } from "react"

export const useReceiptColumns = (inventoryData: any) => {
    return useMemo(() => {
        return [
            {
                label: 'Receipt Date',
                name: 'receiptDate',
                render(row: { receiptDate: string }, value: string) {
                    return <p>{moment(value).format('DD MMM YYYY')}</p>
                }
            },
            {
                label: 'Receipt Directive Nr',
                name: 'issuanceDirective',
                render(row: any, value: string) {
                    return <p>{row?.receipt?.issuanceDirective?.toUpperCase()}</p>
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
                render(row: { item: { quantity: string, unit: string } }, value: string) {
                    return <p>{value}</p>
                }
            },
            {
                label: 'T/Amount',
                name: 'amount',
                render(row: object, value: string) {
                    return <p>{value && '₱' + value}</p>
                }
            },
            {
                label: 'Created Details',
                name: 'price',
                render(row: any) {
                    return (
                        <div>
                            <div>
                                <p className="text-gray-500">Created At</p>
                                <p>{moment(row?.createdAt).format('DD MMM YYYY')}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Created By</p>
                                <p>{row?.receipt?.user?.firstname} {row?.receipt?.user?.lastname} ({row?.receipt?.user?.roles[0]?.name})</p>
                            </div>
                        </div>
                    )
                }
            }
        ]
    }, [inventoryData])
}
