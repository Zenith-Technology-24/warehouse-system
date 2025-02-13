import { useMemo } from "react"
import Table from "../Table"
import { Field } from "formik"
import DropdownWithNew from "../DropdownWithNew"
import DropdownWithSearch from "../DropdownWithSearch"

interface ItemTableProps {
    index: number
    values: any
    setFieldValue: any
}

const ItemTable: React.FC<ItemTableProps> = ({ index, values, setFieldValue }) => {
    // Fetch the inventoryItems array from Formik values
    const inventoryItems = values.endUser[index].inventoryItems || []

    // Function to add a new item
    const addItem = () => {
        const newItem = {
            item_name: "",
            location: "",
            supplier: "",
            size: "",
            quantity: 1,
            unit: "",
            price: "",
            amount: "",
        }
        console.log(newItem)
        setFieldValue(`endUser[${index}].inventoryItems`, [...inventoryItems, newItem])
    }

    // Function to remove an item
    const removeItem = (itemIndex: number) => {
        console.log(itemIndex)
        const updatedItems = inventoryItems.filter((_, i) => i !== itemIndex)
        setFieldValue(`endUser[${index}].inventoryItems`, updatedItems)
    }

    const columns = useMemo(() => {
        return [
            {
                label: 'Item Name',
                name: 'itemName',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <DropdownWithNew
                            placeholder="Item Name"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].item_name`}
                            fetchNames={null}
                            setFieldValue={setFieldValue}
                            setSelectedValue={(value) => console.log("Selected:", value)}
                        />
                    )
                }
            },
            {
                label: 'Location',
                name: 'location',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <DropdownWithSearch
                            setFieldValue={setFieldValue}
                            placeholder="Location"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].location`}
                            fetchNames={() => [{ name: 'Storage A' }, { name: 'Storage B' }]}
                        />
                    )
                }
            },
            {
                label: 'Supplier',
                name: 'supplier',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <Field
                            as="input"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].supplier`}
                            placeholder="Supplier"
                            className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        />
                    )
                }
            },
            {
                label: 'Size (Optional)',
                name: 'size',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <Field as="select"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].size`}
                            className="bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon"
                        >
                            <option value="" disabled>Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </Field>
                    )
                }
            },
            {
                label: 'Qty',
                name: 'quantity',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <Field
                            as="input"
                            type="number"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].quantity`}
                            placeholder="Quantity"
                            className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        />
                    )
                }
            },
            {
                label: 'U/I',
                name: 'unit',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <Field as="select"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].unit`}
                            className="bg-transparent h-12 border border-gray-300 px-4 mb-1 rounded-md custom-select-icon"
                        >
                            <option value="" disabled>Select Unit</option>
                            <option value="ea">ea</option>
                            <option value="prs">prs</option>
                            <option value="set">sets</option>
                        </Field>
                    )
                }
            },
            {
                label: 'U/Price',
                name: 'price',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <Field
                            as="input"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].price`}
                            placeholder="U/Price"
                            className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        />
                    )
                }
            },
            {
                label: 'T/Amount',
                name: 'amount',
                render(row: any, value: string, rowIndex: number) {
                    return (
                        <Field
                            as="input"
                            name={`endUser[${index}].inventoryItems[${rowIndex}].amount`}
                            placeholder="T/Amount"
                            className="bg-transparent h-12 border border-gray-300 p-4 mb-1 rounded-md"
                        />
                    )
                }
            },
            {
                label: 'Action',
                name: 'id',
                render(row: any, value: number, rowIndex: number) {
                    return (
                        <div className="flex flex-row gap-2">
                            <div
                                onClick={() => removeItem(rowIndex)}
                                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition m-auto text-red-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    )
                }
            }
        ]
    }, [inventoryItems])

    return (
        <div className="col-span-2">
            <Table columns={columns} rows={{ data: inventoryItems }} classes="!h-0" />
            <div onClick={addItem} className="flex flex-row gap-2 items-center text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>Add Item</p>
            </div>
        </div>
    )
}

export default ItemTable
