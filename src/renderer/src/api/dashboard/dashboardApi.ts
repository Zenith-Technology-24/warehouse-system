import apiService from "../axios";

export const fetchDashboardData = async () => {
    const { data } = await apiService.get('/dashboard');
    return data;
};