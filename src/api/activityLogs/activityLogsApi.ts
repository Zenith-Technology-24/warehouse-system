import apiService from "../axios";

interface addActivityLogProps {
    date: string, 
    activity: string,
    performedBy: { 
        userName: string, 
        role: string 
    } 
}

interface fetchActivityLogsProps {
    search: string
    page: number
    limit: number
    status: string
}

export const fetchActivityLogs = async ({ page, limit, search, status}: fetchActivityLogsProps) => {
    const { data } = await apiService.get(`/activity-logs?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    return data;
};

export const addActivityLog = async (data: addActivityLogProps) => {
    const res = await apiService.post("/activity-logs/add", data);
    return res;
}