import apiService from "../axios";

interface fetchSalesProps {
    search: string
    page: number
    limit: number
    status: string
}

interface createSalesProps {
    customer_firstname: string
    customer_lastname: string
    customer_contactnumber: string
    customer_address: string
    inventory: [{
        id: number,
        quantity: number,
        total_price: number,
        terms: string
    }]
}

interface exportSalesProps {
    search: string
    status: string
    start_date: string
    end_date: string
}

interface updateSalesProps {
    id: number
    productName: string
    inStock: number
    cost: string
    size: string
    price: string
    category: string
}

interface updateSalesStatusProps {
    id: number | null;
    status: string;
}

interface deleteSalesProductProps {
    id: number | null | undefined;
}

export const fetchSales = async ({ search, page, limit, status }: fetchSalesProps) => {
    const { data } = await apiService.post(`/sales?page=${page}&limit=${limit}`, { search, status });
    return data;
};

export const exportSales = async ({ search, status, start_date, end_date }: exportSalesProps) => {
    const { data } = await apiService.post('/sales/export', { search, status, start_date, end_date });
    return data;
};

export const fetchOneSales = async (id: number) => {
    const { data } = await apiService.get(`/sales/${id}`);
    return data;
};

export const createSales = async (data: createSalesProps) => {
    const res = await apiService.post("/sales/create", data);
    return res;
};

export const updateSales = async (data: updateSalesProps) => {
    const res = await apiService.post(`/sales/${data.id}/update`, data);
    return res;
};

export const updateSalesStatus = async ({ id, status }: updateSalesStatusProps) => {
    const { data } = await apiService.get(`/sales/${id}/${status}`);
    return data;
};

export const deleteSalesProduct = async ({ id }: deleteSalesProductProps) => {
    const { data } = await apiService.get(`/sales/product/${id}/delete`);
    return data;
};