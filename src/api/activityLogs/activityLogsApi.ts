import apiService from "../axios";

interface fetchActivityLogsProps {
    search: string
    page: number
    limit: number
    date: string | null | number
}

export const fetchActivityLogs = async ({ page, limit, search, date}: fetchActivityLogsProps) => {
    const { data } = await apiService.get(`/activity-log?page=${page}&limit=${limit}&search=${search}&date=${date}`);
    return data;
};
