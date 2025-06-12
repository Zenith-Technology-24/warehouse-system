import apiService from "../axios";

interface fetchReturnedItemsProps {
    status: string
    search: string
    page: number
    limit: number
}

interface createReturnedProps {
    receiptRef: string
    itemName: string
    size: string
    personnel: string
    notes: string
    date: string
    time: string
}

interface updateReturnedProps {
    id: string
    receiptRef: string
    itemName: string
    size: string
    personnel: string
    notes: string
    date: string
    time: string
}

interface updateReturnedItemStatusProps {
    id: number | null;
    status: string;
}

interface exportReturnedItemsProps {
    search: string
    status: string
    start_date: string
    end_date: string
}

export const fetchReturnedItems = async ({ status, search, page, limit }: fetchReturnedItemsProps) => {
    const { data } = await apiService.get(`/returned-items?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    return data;
};

export const exportReturnedItems = async ({ search, status, start_date, end_date }: exportReturnedItemsProps) => {
    const { data } = await apiService.post('/returned-items/export', { search, status, start_date, end_date });
    return data;
};

export const createReturnedItems = async (data: createReturnedProps) => {
    const res = await apiService.post("/returned-items", data);
    return res;
};

export const updateReturnedItems = async (data: updateReturnedProps) => {
    const res = await apiService.put(`/returned-items/${data.id}`, data);
    return res;
};

export const fetchOneReturnedItems = async (id: number) => {
    const { data } = await apiService.get(`/returned-items/${id}`);
    return data;
};

export const updateReturnedItemStatus = async ({ id, status }: updateReturnedItemStatusProps) => {
    const { data } = await apiService.put(`/returned-items/${id}`, { status });
    return data;
};