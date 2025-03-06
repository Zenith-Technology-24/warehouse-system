import apiService from "../axios";

interface addItemTypeProps {
    name: string
    sizeType: string
    unit: string
}

export const addItemType = async (data: addItemTypeProps) => {
    const res = await apiService.post("/inventory/type", data);
    return res;
};

export const fetchItemType = async () => {
    const { data } = await apiService.get('/inventory/type');
    return data;
};