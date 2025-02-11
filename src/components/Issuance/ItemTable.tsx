import { useMemo } from "react"
import Table from "../Table"
import { Field } from "formik"
import DropdownWithNew from "../DropdownWithNew"
import DropdownWithSearch from "../DropdownWithSearch"

interface ItemTableProps {
    setFieldValue: any
}

const ItemTable: React.FC<ItemTableProps> = ({ setFieldValue }) => {
    const rows = {
        data: [
            {
                itemName: 'My item'
            }
        ]
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'itemName',
                render(row: object, value: string) {
                    return (
                        <div>
                            <DropdownWithNew
                                placeholder="Item Name"
                                name="itemName"
                                fetchNames={null}
                                setFieldValue={setFieldValue}
                                setSelectedValue={(value) => console.log("Selected:", value)}
                            />
                        </div>
                    )
                }
            },
            {
                label: 'Location',
                name: 'location',
                render(row: object, value: string) {
                    return (
                        <div>
                            <DropdownWithSearch
                                setFieldValue={setFieldValue}
                                placeholder="Location"
                                name='location'
                                fetchNames={null}
                            />
                        </div>
                    )
                }
            },
            {
                label: 'Supplier',
                name: 'supplier',
                render(row: object, value: string) {
                    return (
                        <div>
                            <Field
                                as="input"
                                name="supplier"
                                placeholder="Supplier"
                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </div>
                    )
                }
            },
            {
                label: 'Size (Optional)',
                name: 'size',
                render(row: object, value: string) {
                    return (
                        <div>
                            <Field
                                as="select"
                                name="size"
                                className={`bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon`}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("expense_type", e.target.value)}
                            >
                                <option value="" disabled selected>Select Size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </Field>
                        </div>
                    )
                }
            },
            {
                label: 'Qty',
                name: 'quantity',
                render(row: object, value: string) {
                    return (
                        <div>
                            <Field
                                as="input"
                                type='number'
                                name="quantity"
                                placeholder="Quantity"
                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </div>
                    )
                }
            },
            {
                label: 'U/I',
                name: 'unit',
                render(row: object, value: string) {
                    return (
                        <div>
                            <Field
                                as="select"
                                name="size"
                                className={`bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon`}
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("expense_type", e.target.value)}
                            >
                                <option value="" disabled selected>Select Unit</option>
                                <option value="ea">ea</option>
                                <option value="prs">prs</option>
                                <option value="set">sets</option>
                            </Field>
                        </div>
                    )
                }
            },
            {
                label: 'U/Price',
                name: 'price',
                render(row: object, value: string) {
                    return (
                        <div>
                            <Field
                                as="input"
                                name="price"
                                placeholder="U/Price"
                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </div>
                    )
                }
            },
            {
                label: 'T/Amount',
                name: 'price',
                render(row: object, value: string) {
                    return (
                        <div>
                            <Field
                                as="input"
                                name="amount"
                                placeholder="T/Amount"
                                className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </div>
                    )
                }
            },
            {
                label: 'Action',
                name: 'id',
                render(row: { id: number | null, status: string }, value: number) {
                    return (
                        <div className="flex flex-row gap-2">
                            <div onClick={() => console.log('delete')} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto text-red-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    )
                }
            }
        ]
    }, [])

    return (
        <div className="col-span-2">
            <Table
                columns={columns}
                rows={rows}
            />
        </div>
    )
}

export default ItemTable