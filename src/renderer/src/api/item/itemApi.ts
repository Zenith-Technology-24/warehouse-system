import apiService from "../axios";

interface addItemTypeProps {
    name: string
    sizeType: string
    unit: string
}

interface updateItemTypeProps {
    id: string
    name: string
    sizeType: string
    unit: string
}

export const addItemType = async (data: addItemTypeProps) => {
    const res = await apiService.post("/inventory/type", data);
    return res;
};

export const updateItemType = async (data: updateItemTypeProps) => {
    const res = await apiService.put(`/inventory/item/update/${data.id}`, data);
    return res;
};

export const deleteItemType = async (id: string) => {
    const res = await apiService.get(`/inventory/item/delete/${id}`);
    return res;
};

export const fetchItemType = async () => {
    const { data } = await apiService.get('/inventory/type');
    return data;
};