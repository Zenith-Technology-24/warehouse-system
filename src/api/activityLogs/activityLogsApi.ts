import apiService from "../axios";

interface fetchActivityLogsProps {
    search: string
    page: number
    limit: number
    date: string | null | number
}

interface exportActivityLogsProps {
    search: string
    start_date: string 
    end_date: string 
}

export const fetchActivityLogs = async ({ page, limit, search, date}: fetchActivityLogsProps) => {
    const { data } = await apiService.get(`/activity-log?page=${page}&limit=${limit}&search=${search}&date=${date}`);
    return data;
};

export const exportActivityLogs = async ({ search, start_date, end_date }: exportActivityLogsProps ) => {
    const { data } = await apiService.post('/activity-log/export', { search, start_date, end_date });
    return data
}
