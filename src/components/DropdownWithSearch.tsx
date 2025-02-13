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
    values?: any
}

const DropdownWithSearch: React.FC<DropdownWithSearchProps> = ({
    _index,
    setFieldValue,
    label,
    placeholder,
    name,
    fetchNames,
    forUpdate,
    setSelectedValue
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedOption, setSelectedOption] = useState<any>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (forUpdate) {
            setSelectedOption({ id: forUpdate.id, name: forUpdate.product_name })
        }
    }, [name])

    const { data: options } = useQuery({
        queryKey: [`${name}-list`],
        queryFn: () => fetchNames() as any,
    });

    const filteredOptions = options?.filter((option: any) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <div className="flex flex-col w-full">
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
                                <span className={`ml-1 ${!selectedOption?.name ? 'text-gray-400' : 'text-black'}`}>{selectedOption?.name || placeholder}</span>
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
                                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
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
                                                    className="p-2 hover:bg-gray-200 cursor-pointer ml-2"
                                                    onClick={() => handleOptionClick(option)}
                                                >
                                                    {option.name}
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
