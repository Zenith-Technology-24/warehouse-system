import apiService from "../axios";

export const fetchProductNames = async () => {
    const { data } = await apiService.get('/inventory/names');
    return data;
};