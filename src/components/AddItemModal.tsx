import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup'

interface AddItemModalProps {
    isOpen: boolean
    onClose: () => void
    handleFunction: (values: any) => void
}

const VALIDATION_SCHEMA = Yup.object().shape({
    name: Yup.string()
        .required('Item name is required'),
    size: Yup.string()
        .required('Size is required'),
    uom: Yup.string()
        .required('UoM is required'),
});


const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, handleFunction }) => {
    if (!isOpen) return null;

    const schema = useFormik({
        validateOnMount: false,
        initialValues: {
            name: '',
            size: 'none',
            uom: ''
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
                            name="size"
                            value={schema.values.size}
                            onChange={schema.handleChange}
                            id="size"
                            className="bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md custom-select-icon"
                            required
                        >
                            <option value="none">No Size</option>
                            <option value="apparel">Apparel (S, M, L, XL, 2XL)</option>
                            <option value="numerical">Numerical (6-12)</option>
                        </select>
                        {schema.errors.size && (
                            <p className='text-red-500 text-sm'>{schema.errors.size}</p>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label className='label text-sm'>Default UoM</label>
                        <input
                            name="uom"
                            value={schema.values.uom}
                            onChange={schema.handleChange}
                            id="uom"
                            className="bg-transparent text-gray-500 border border-gray-300 p-4 mb-1 rounded-md"
                            placeholder="Default"
                            required
                        />
                        {
                            schema.errors.uom && (
                                <p className='text-red-500 text-sm'>{schema.errors.uom}</p>
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

export default AddItemModal
