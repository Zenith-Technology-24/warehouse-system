import React from "react";
import EmptyTableImage from "./EmptyTableImage";

interface Props {
    columns: any
    rows: any
    totalRows?: number
    currentPage?: number
    setCurrentPage?: any
    rowsPerPage?: number
    totalPages?: number
    onPageChange?: (page: number) => void
    footerTableJSX?: any
    classes?: string,
    gAmount?: number
}

const Table: React.FC<Props> = ({
    currentPage,
    setCurrentPage,
    columns,
    rows,
    totalRows = 1,
    rowsPerPage = 10,
    totalPages,
    onPageChange,
    footerTableJSX,
    classes,
    gAmount = 0
}) => {
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange && onPageChange(page);
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            {columns?.length > 0 && (
                <table className={`${classes} min-w-full h-[500px] divide-y divide-gray-200 border border-gray-100`}>
                    <thead className="bg-[#EAECDF]">
                        <tr>
                            {columns.map((column: { name: string, label: string }, index: number) => (
                                <th
                                    key={index}
                                    className={`px-6 py-3 text-left text-xs font-medium tracking-wider ${column?.label === 'Action' && 'text-center'}`}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {!totalRows || rows?.data?.length <= 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                                    <EmptyTableImage />
                                    <p> No data was found</p>
                                    <p className="font-light text-xs text-gray-400">Please check back later or ensure items have been added.</p>
                                </td>
                            </tr>
                        ) : (
                            rows?.data?.map((row: any, rowIndex: number) => (
                                <tr key={rowIndex}>
                                    {columns.map((column: any, colIndex: number) => (
                                        <td key={colIndex} className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-gray-900">
                                            {column?.render ? column?.render(row, row[column?.name], rowIndex) : row[column?.name] || 'N/A'}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                    {footerTableJSX}
                </table>
            )
            }

            {/* Pagination */}
            {
                totalPages > 0 && (
                    <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
                                    <span className="font-medium">
                                        {((rowsPerPage * currentPage) - rowsPerPage) + totalRows}
                                    </span>{" "}
                                    of <span className="font-medium">{totalRows}</span> results
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    <button
                                        onClick={() => handlePageChange(1)}
                                        disabled={currentPage === 1}
                                        className={`${currentPage === 1 && 'opacity-50'} relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                    >
                                        <span className="sr-only">First</span>
                                        &laquo;
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`${currentPage === 1 && 'opacity-50'} relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        &lsaquo;
                                    </button>
                                    <button
                                        className={`bg-indigo-50 border-aaa text-aaa relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                    >
                                        {currentPage}
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`${currentPage === totalPages && 'opacity-50'} relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                    >
                                        <span className="sr-only">Next</span>
                                        &rsaquo;
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className={`${currentPage === totalPages && 'opacity-50'} relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                    >
                                        <span className="sr-only">Last</span>
                                        &raquo;
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )
            }
                <div className="p-4 w-full flex justify-end">
                <h2 className="text-[14px]">Gross Total Amount: <span className="font-bold">P{gAmount.toLocaleString()} </span></h2>
            </div>
        </div >
        
    );
};

export default Table;
