import { useEffect, useMemo, useState } from "react"
import Header from "../../components/Header"
import Search from "../../components/Search"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import ExportModal from "../../components/ExportModal"
import exportToExcel from "../../components/ExportToExcel"
import moment from "moment"
import { exportExpenses } from "../../api/expenses/expensesApi"
import Table from "../../components/Table"
import { useQuery } from "@tanstack/react-query"
import { fetchActivityLogs, helloWorld } from "../../api/activityLogs/activityLogsApi"

const ActivityLogs = () => {
    
    const [date, setDate] = useState<string | null | number>(null)
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [status, setStatus] = useState<string>('active')
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const { data: rows, refetch } = useQuery({
      queryKey: ["activityLogs", search, page, limit],
      queryFn: () => fetchActivityLogs({ search, page, limit }) as any
    });    
    const handleSearch = (searchInput = '') => {
        setSearch(searchInput)
    };

    const handleChangePage = (page: number) => {
        setPage(page)
    }
    const handleExport = ({ toExport, start_date, end_date }: any) => {
        const headers = [
            { header: 'Activity Logs ID ', key: 'id', width: 10 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Activity', key: 'activity', width: 15 },
            { header: 'Performed By', key: 'performedBy', width: 15 },
        ];

        let data = toExport?.map((row: {
            id: number,
            activity: string,
            performedBy: {
                userName: string,
                role: string
            },
            created_at: string,
        }) => {
            return {
                id: row.id,
                date: moment(row.created_at).format('YYYY-MM-DD'),
                activity: row.activity,
                performedBy: row.performedBy.userName + ' - ' + row.performedBy.role,
            }
        })

        data = [...data, 
          { id: '', date: '', activity: '', performedBy: '' }, 
          { id: '', date: '', activity: '', performedBy: '' }
      ];
      exportToExcel({ data, headers, filename: `${status}-activityLogs-${start_date}-to-${end_date}` })
    }

    const columns = useMemo(() => {
        return [
          {
            label: 'Date',
            name: 'date',
            render(row: object, value: string, rowIndex: number) {
              const date = new Date(value);
              return (
                <div className="font-normal">
                  {date.toLocaleString()}
                </div>
              )
            }
          },
          {
            label: 'Activity',
            name: 'activity',
            render(row: object, value: string, rowIndex: number) {
              return (
                <div className="font-normal">
                  {value}
                </div>
              )
            }
          },
          {
            label: 'Performed By',
            name: 'performedBy',
            render(row: object, value: { userName: string, role: string }, rowIndex: number) {
              return (
                <div className="font-normal flex flex-col">
                  <p>{value?.username}</p>
                  <p className="text-xs text-gray-700">{value?.roles[0].description}</p>
                </div>
              )
            }
          },
        ]
    }, [rows])


    return (
        <>
            <ExportModal
                search={search}
                status={status}
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                handleFunction={handleExport}
                exportFunction={exportExpenses}
            />
            
            <div className="flex flex-row justify-between items-center">
                <div className="w-48">
                  <Header title={'Activity Logs'} description={'Showing all activity logs'} />  
                </div>
                <div className="flex gap-5">
                  <input
                    name="end_date"
                    value={date === null ? '' : date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    id="end_date"
                    className="bg-transparent text-gray-500 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                    placeholder="Enter End Date"
                    required
                  />
                  <Search
                    handleFetchData={handleSearch}
                  />
                  <button onClick={helloWorld}>
                    Hello
                  </button>
                  <PrimaryButton
                      onClick={() => { setIsExportModalOpen(true)}}
                      text={'Export'} 
                  />
                </div>
            </div>
            <Table
                currentPage={page}
                setCurrentPage={setPage}
                totalRows={rows?.data?.length || 1}
                columns={columns}
                rows={rows}
                rowsPerPage={limit}
                totalPages={rows?.totalPages}
                onPageChange={handleChangePage}
            />
        </>
    )
}

export default ActivityLogs