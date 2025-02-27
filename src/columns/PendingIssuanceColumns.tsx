import { useMemo } from "react"

export const usePendingIssuanceColumns = (issuanceData: any) => {
    return useMemo(() => {
        return [
            {
                label: 'Issuance Date',
                name: 'name',
                render(row: any, value: string) {
                    return <p className="font-normal">{value}</p>
                }
            },
            {
                label: 'Issuance Directive Nr',
                name: 'location',
                render(row: any) {
                    return <p>{row?.item?.location}</p>
                }
            },
            {
                label: 'Qty',
                name: 'size',
                render(row: { item: { size: string } }) {
                    return <p>{row?.item?.size}</p>
                }
            },
            {
                label: 'UoM',
                name: 'StockDetails',
                render(row: { item: { quantity: string, unit: string } }) {
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
                label: 'T/Amount',
                name: 'price',
                render(row: { item: { price: string } }) {
                    return <p>₱{row?.item?.price}</p>
                }
            },
            {
                label: 'Status',
                name: 'price',
                render(row: { item: { amount: string } }) {
                    return (
                        <div>
                            <p className="text-gray-500">T/Amount</p>
                            <p>₱{row?.item?.amount}</p>
                        </div>
                    )
                }
            },
            {
                label: 'Created Details',
                name: 'price',
                render(row: { item: { amount: string } }) {
                    return (
                        <div>
                            <p className="text-gray-500">T/Amount</p>
                            <p>₱{row?.item?.amount}</p>
                        </div>
                    )
                }
            }
        ]
    }, [issuanceData])
}
