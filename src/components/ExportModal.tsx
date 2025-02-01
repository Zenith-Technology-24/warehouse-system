import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react';
import * as Yup from 'yup'

interface ExportModalProps {
    search: string
    status: string
    isOpen: boolean
    onClose: () => void
    handleFunction: (values: any) => void
    exportFunction: any
}

const VALIDATION_SCHEMA = Yup.object().shape({
    start_date: Yup.string()
        .required('Start date is required')
        .test('start_date_before_or_equal_end_date', 'Start date must be before or equal to end date', function (value) {
            const { end_date } = this.parent;
            return value && end_date ? new Date(value) <= new Date(end_date) : true;
        }),
    end_date: Yup.string()
        .required('End date is required')
        .test('end_date_after_or_equal_start_date', 'End date must be after or equal to start date', function (value) {
            const { start_date } = this.parent;
            return value && start_date ? new Date(value) >= new Date(start_date) : true;
        }),
});


const ExportModal: React.FC<ExportModalProps> = ({ search, status, isOpen, onClose, handleFunction, exportFunction }) => {
    if (!isOpen) return null;

    const schema = useFormik({
        validateOnMount: false,
        initialValues: {
            start_date: moment().startOf('month').format('YYYY-MM-DD'),
            end_date: moment().endOf('month').format('YYYY-MM-DD'),
        },
        validationSchema: VALIDATION_SCHEMA,
        onSubmit(values) {
            toExportData.mutate({ ...values, search, status } as any)
        }
    })

    const toExportData = useMutation({
        mutationFn: exportFunction,
        onError: (error: any) => {
            console.log(error)
        },
        onSuccess: (toExport: any) => {
            handleFunction({ toExport, start_date: schema.values.start_date, end_date: schema.values.end_date })
        },
    });

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center !z-[9999]">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[500px]">
                <h2 className="text-xl font-medium text-center text-gray-800 mb-4">EXPORT</h2>
                <div className="flex flex-col gap-3">
                    <div className='flex flex-col'>
                        <label className='label text-sm text-gray-500'>Start Date</label>
                        <input
                            name="start_date"
                            value={schema.values.start_date}
                            onChange={schema.handleChange}
                            type="date"
                            id="start_date"
                            className="bg-transparent text-gray-500 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                            placeholder="Enter Start Date"
                            required
                        />
                        {
                            schema.errors.start_date && (
                                <p className='text-red-500 text-sm'>{schema.errors.start_date}</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label className='label text-sm text-gray-500'>End Date</label>
                        <input
                            name="end_date"
                            value={schema.values.end_date}
                            onChange={schema.handleChange}
                            type="date"
                            id="end_date"
                            className="bg-transparent text-gray-500 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                            placeholder="Enter End Date"
                            required
                        />
                        {
                            schema.errors.end_date && (
                                <p className='text-red-500 text-sm'>{schema.errors.end_date}</p>
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
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExportModal
