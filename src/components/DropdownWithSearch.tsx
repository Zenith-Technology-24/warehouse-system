import React, { useEffect, useRef, useState } from "react";
import { Field, ErrorMessage } from "formik";
import { useQuery } from "@tanstack/react-query";

interface DropdownWithSearchProps {
    _index?: number
    setFieldValue: any
    label?: string
    placeholder: string
    name: string
    fetchNames: any
    forUpdate?: any
    setSelectedValue?: any
    formikSelectedValue?: any
    refetchData?: any;
    onDelete?: any;
    onUpdate?: any;
}

const DropdownWithSearch: React.FC<DropdownWithSearchProps> = ({
    _index,
    setFieldValue,
    label,
    placeholder,
    name,
    fetchNames,
    forUpdate,
    setSelectedValue,
    formikSelectedValue,
    refetchData,
    onDelete = null,
    onUpdate = null
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedOption, setSelectedOption] = useState<any>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (forUpdate) {
            setSelectedOption({ name: forUpdate })
        } else {
            setSelectedOption(null);
        }
    }, [name, formikSelectedValue])

    const { data: options, refetch } = useQuery({
        queryKey: [`${name}-list`],
        queryFn: () => fetchNames() as any,
    });

    const filteredOptions = options?.filter((option: any) =>
        option.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const handleOptionClick = (option: any) => {
        setSelectedOption(option)
        setIsOpen(false)
        setFieldValue(name, option?.name)
        if (setSelectedValue) {
            setSelectedValue(option)
        }

        if (label === 'Product') {
            setFieldValue(`inventories[${_index}].quantity`, '0')
            setFieldValue(`inventories[${_index}].total_price`, '0')
            setFieldValue(`inventories[${_index}].price`, Number(option?.price))
        }
    };

    useEffect(() => {
        if (refetchData) {
            refetchData(refetch);
        }
    }, [refetchData, refetch])

    return (
        <div key={_index} className="flex flex-col w-full">
            {
                label && (
                    <label className="pb-2 text-gray-500">{label}</label>
                )
            }
            <div className="relative w-full">
                <Field name={name}>
                    {() => (
                        <>
                            <div
                                className="bg-transparent h-12 border border-gray-300 rounded-lg p-2 flex justify-between items-center cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className={`ml-1 ${selectedOption?.name || formikSelectedValue ? 'text-black' : 'text-gray-400'}`}>{selectedOption?.name || formikSelectedValue || placeholder}</span>
                                <svg
                                    className={`w-5 h-5 transition-transform text-gray-400 ${isOpen ? "transform rotate-180" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            {isOpen && (
                                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                        placeholder=" Search..."
                                        className="w-full p-2 border-b border-gray-300 outline-none"
                                    />
                                    <ul ref={dropdownRef} className="max-h-60 overflow-y-auto">
                                        {filteredOptions?.length > 0 ? (
                                            filteredOptions.map((option: any, index: number) => (
                                                <li
                                                    key={index}
                                                    className="p-2 ml-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleOptionClick(option)}
                                                >
                                                    <span className="flex-grow">{option.name}</span>
                                                    <div className="flex gap-2">
                                                        {onUpdate && (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="size-4 text-gray-400 hover:text-gray-900"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onUpdate(option);
                                                                }}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                                />
                                                            </svg>
                                                        )}
                                                        {onDelete && (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="size-4 text-red-300 hover:text-red-500"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onDelete(option);
                                                                }}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </li>
                                            ))

                                        ) : (
                                            <li className="p-2 text-gray-400">No options found</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </Field>
                <div className="h-6">
                    <ErrorMessage className="text-red-400" name={name} component="div" />
                </div>
            </div>
        </div >
    );
};

export default DropdownWithSearch;
