import apiService from "../axios";

interface fetchCustomersProps {
    search: string
}

export const fetchCustomers = async () => {
    const { data } = await apiService.get('/customers');
    return data;
};
