import moment from "moment"
import { useMemo } from "react"

export const useReceiptColumns = (inventoryData: any) => {
    return useMemo(() => {
        return [
            {
                label: 'Receipt Date',
                name: 'receiptDate',
                render(row: { receiptDate: string }, value: string) {
                    return <p className="font-normal">{moment(value).format('DD MMM YYYY')}</p>
                }
            },
            {
                label: 'Receipt Directive Nr',
                name: 'issuanceDirective',
                render(row: any, value: string) {
                    return <p>{value.toUpperCase()}</p>
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
                label: 'UoM',
                name: 'StockDetails',
                render(row: { item: { quantity: string, unit: string } }, value: string) {
                    return <p>{value}</p>
                }
            },
            {
                label: 'T/Amount',
                name: 'price',
                render(row: { item: { price: string } }) {
                    return <p></p>
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
                                <p>{row?.user?.firstname} {row?.user?.lastname}</p>
                            </div>
                        </div>
                    )
                }
            }
        ]
    }, [inventoryData])
}
