import apiService from "../axios";
import InventoryData from "../../dummy/InventoryData.json";

interface fetchInventoryProps {
    search: string
    page: number
    limit: number
    status: string
}

interface exportInventoryProps {
    search: string
    status: string
    start_date: string
    end_date: string
}

interface createProductProps {
    productName: string
    inStock: number
    cost: string
    price: string
    category: string
}

interface updateProductProps {
    id: number
    productName: string
    inStock: number
    cost: string
    size: string
    price: string
    category: string
}

interface updateInventoryStatusProps {
    id: number | null;
    status: string;
}

export const fetchInventory = async ({ search, page, limit, status }: fetchInventoryProps) => {
    const { data } = await apiService.get(`/inventory?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    return data;
};

export const exportInventory = async ({ search, status, start_date, end_date }: exportInventoryProps) => {
    const { data } = await apiService.post('/inventory/export', { search, status, start_date, end_date });
    return data;
};

export const createProduct = async (props: createProductProps) => {
    const res = await apiService.post("/inventory/create", { ...props, product_name: props?.productName, in_stock: props?.inStock });
    return res;
};

export const updateProduct = async (props: updateProductProps) => {
    const res = await apiService.post(`/inventory/${props.id}/update`, {
        product_name: props?.productName,
        category: props?.category,
        size: props?.size,
        in_stock: props?.inStock,
        cost: props?.cost,
        price: props?.price
    });
    return res;
};

export const updateInventoryStatus = async ({ id, status }: updateInventoryStatusProps) => {
    const { data } = await apiService.put(`/inventory/${status}/${id}`);
    return data;
};

export const fetchOneInventory = async (id: number) => {
    const { data } = await apiService.get(`/inventory/${id}`);
    return data;
};

export const fetchIssuanceInventory = async () => {
    const { data } = await apiService.get('/issuance/inventory');
    return data.map(({ itemName, ...rest }) => ({
        name: itemName,
        ...rest,
    }));
};