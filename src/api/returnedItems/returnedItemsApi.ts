import apiService from "../axios";

interface fetchReturnedItemsProps {
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


export const fetchReturnedItems = async ({ search, page, limit }: fetchReturnedItemsProps) => {
    const { data } = await apiService.get(`/returned-items?page=${page}&limit=${limit}`, { search });
    return data;
};

export const createReturnedItems = async (data: createReturnedProps) => {
    const res = await apiService.post("/returned-items", data);
    return res;
};