import { useMemo, useState } from "react"
import Header from "../../components/Header"
import Search from "../../components/Search"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import ExportModal from "../../components/ExportModal"
import exportToExcel from "../../components/ExportToExcel"
import Table from "../../components/Table"
import { useQuery } from "@tanstack/react-query"
import { exportActivityLogs, fetchActivityLogs } from "../../api/activityLogs/activityLogsApi"

const ActivityLogs = () => {
    
    const [date, setDate] = useState<string | null | number>(null)
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [status, setStatus] = useState<string>('active')
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const { data: rows, refetch } = useQuery({
      queryKey: ["activityLogs", search, page, limit, date],
      queryFn: () => fetchActivityLogs({ search, page, limit, date }) as any
    });

    const handleSearch = (searchInput = '') => {
        setSearch(searchInput)
    };

    const handleChangePage = (page: number) => {
        setPage(page)
    }
    const handleExport = ({ toExport, start_date, end_date }: any) => {
        const headers = [
            { header: 'Activity Logs ID ', key: 'id', width: 40 },
            { header: 'Date', key: 'date', width: 30},
            { header: 'Activity', key: 'activity', width: 60 },
            { header: 'Performed By', key: 'performedBy', width: 40 },
        ];

        let data = toExport?.map((row: {
            id: string,
            date: string,
            activity: string,
            performedBy: {
                username: string,
                roles: { description: string }[]
            },
        }) => {
            return {
                id: row.id,
                date: row.date,
                activity: row.activity,
                performedBy: `${row.performedBy.username} - ${row.performedBy.roles[0].description}`,
            }
        })
        
      exportToExcel({ data, headers, filename: `activityLogs-${start_date}-to-${end_date}` })
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
                exportFunction={exportActivityLogs}
            />
            
            <div className="flex flex-row justify-between items-center">
                <div className="w-48">
                  <Header title={'Activity Logs'} description={'Showing all activity logs'} />  
                </div>
                <div className="flex gap-5">
                  <input
                    name="activity-log-date"
                    value={date === null ? '' : date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    id="activity-log-date"
                    className="bg-transparent text-gray-500 h-12 border border-gray-300 p-4 mb-1 rounded-md"
                    placeholder="Enter Date"
                    required
                  />
                  <Search
                    handleFetchData={handleSearch}
                  />
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