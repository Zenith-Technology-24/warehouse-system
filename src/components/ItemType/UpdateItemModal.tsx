import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup'

interface AddItemModalProps {
    data: {
        id: string
        name: string
        sizeType: string
        unit: string
    }
    isOpen: boolean
    onClose: () => void
    handleFunction: (values: any) => void
}

const VALIDATION_SCHEMA = Yup.object().shape({
    id: Yup.string()
        .required('ID is required'),
    name: Yup.string()
        .required('Item name is required'),
    sizeType: Yup.string()
        .required('Size is required'),
    unit: Yup.string()
        .required('Unit is required'),
});


const UpdateItemModal: React.FC<AddItemModalProps> = ({ data, isOpen, onClose, handleFunction }) => {
    if (!isOpen) return null;

    const schema = useFormik({
        validateOnMount: false,
        initialValues: {
            id: data?.id,
            name: data?.name,
            sizeType: data?.sizeType,
            unit: data?.unit
        },
        validationSchema: VALIDATION_SCHEMA,
        onSubmit(values) {
            handleFunction(values)
        }
    })

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center !z-[9999]">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[500px]">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Add Item Type</h2>
                <div className="flex flex-col gap-3">
                    <div className='flex flex-col'>
                        <label className='label text-sm'>Item Name</label>
                        <input
                            name="name"
                            value={schema.values.name}
                            onChange={schema.handleChange}
                            id="name"
                            className="bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md"
                            placeholder="Enter Item Name"
                            required
                        />
                        {
                            schema.errors.name && (
                                <p className='text-red-500 text-sm'>{schema.errors.name}</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label className='label text-sm'>Size</label>
                        <select
                            name="sizeType"
                            value={schema.values.sizeType}
                            onChange={schema.handleChange}
                            id="sizeType"
                            className="bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md custom-select-icon"
                            required
                        >
                            <option value="none">No Size</option>
                            <option value="standard">Standard (XS, S, M, L, XL, 2XL, 3XL)</option>
                            <option value="numerical">Numeric (5-12.5)</option>
                            <option value="length">Length Variants (XXS, SS, SR, SL, MS, MR, ML, LS, LR, LL)</option>
                            <option value="fit">Fit Variants (5R-12R, 5W-12W)</option>
                            <option value="expanded">Expanded Numeric (52-60)</option>
                            <option value="roman">Roman Numerals (I-X)</option>
                        </select>
                        {schema.errors.sizeType && (
                            <p className='text-red-500 text-sm'>{schema.errors.sizeType}</p>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label className='label text-sm'>Default UoM</label>
                        <input
                            name="unit"
                            value={schema.values.unit}
                            onChange={schema.handleChange}
                            id="uom"
                            className="bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md"
                            placeholder="Default"
                            required
                        />
                        {
                            schema.errors.unit && (
                                <p className='text-red-500 text-sm'>{schema.errors.unit}</p>
                            )
                        }
                    </div>
                </div>
                <div className="flex space-x-3 mt-5">
                    <button
                        onClick={onClose}
                        className="grow border border-aaa hover:border-aaa text-aaa py-2 px-4 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        onClick={schema.handleSubmit as any}
                        className="grow bg-aaa hover:border-aaa text-white py-2 px-4 rounded-lg"
                    >
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateItemModal
