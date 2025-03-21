import apiService from "../axios";
import IssuanceData from "../../dummy/IssuanceData.json";

interface fetchExpensesProps {
    search: string
    page: number
    limit: number
    status: string
}

interface createIssuanceProps {
    document_no: string
    directive_no: string
    issuance_date: string
    expiry_date: string
    endUser: [{
        id: string | null,
        name: string,
        inventoryItems: [{
            id: string | null,
            item_name: string,
            location: string,
            supplier: string,
            quantity: number,
            price: number,
            amount: number,
            unit: string,
            size: string
        }]
    }]
}

interface updateIssuanceProps {
    directive_no: string;
    document_no: string;
    expiry_date: string;
    endUsers: {
        id: string | null;
        name: string;
        items: {
            inventoryId: string;
            quantity: number;
            id: string;
            itemName: string;
            location: string;
            supplier: string;
            price: number;
            amount: number;
            unit: string;
            status: string;
            size: string;
        }[];
    }[];
    status: string;
}

interface updateIssuanceStatusProps {
    id: number | null;
    status: string;
}

interface withdrawIssuanceProps {
    id: string | null;
}

interface withdrawAllIssuanceProps {
    id: string | null;
}

export const fetchIssuance = async ({ search, page, limit, status }: fetchExpensesProps) => {
    const { data } = await apiService.get(`issuance?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    return data;
};

export const createIssuance = async (data: createIssuanceProps) => {
    const res = await apiService.post("/issuance", data);
    return res;
};

export const updateIssuance = async (data: updateIssuanceProps) => {
    const res = await apiService.put(`/issuance/${data.id}`, data);
    return res;
};

export const updateIssuanceStatus = async ({ id, status }: updateIssuanceStatusProps) => {
    const { data } = await apiService.put(`/issuance/issuances/${id}`, { status });
    return data;
};

export const fetchReceiptRefs = async () => {
    const { data } = await apiService.get('/issuance/refs');

    return data.map(({ receipt, ...rest }) => ({
        name: receipt,
        ...rest
    }));
};

export const fetchOneIssuance = async (id: number) => {
    const { data } = await apiService.get(`/issuance/${id}`);
    return data;
};

export const withdrawIssuance = async ({ id }: withdrawIssuanceProps) => {
    const { data } = await apiService.get(`/issuance/withdraw/${id}`);
    return data;
};

export const withdrawAllIssuance = async ({ id }: withdrawAllIssuanceProps) => {
    const { data } = await apiService.get(`/issuance/withdraw/all/${id}`);
    return data;
};