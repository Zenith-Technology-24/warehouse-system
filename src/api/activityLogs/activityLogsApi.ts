import apiService from "../axios";

// interface addActivityLogProps {
//     date: string, 
//     activity: string,
//     performedBy: { 
//         userName: string, 
//         role: string 
//     } 
// }

interface fetchActivityLogsProps {
    search: string
    page: number
    limit: number,
    date: string | null | number
}

export const fetchActivityLogs = async ({ search, page, limit, date }: fetchActivityLogsProps) => {
    const { data } = await apiService.get(`/activity-log?page=${page}&limit=${limit}&search=${search}&date=${date}`);
    return data;
};

export const helloWorld = async () => {
    await apiService.post('/activity-log/hello');
}
