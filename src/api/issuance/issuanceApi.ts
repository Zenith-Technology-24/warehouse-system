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

export const fetchIssuance = async ({ search, page, limit, status }: fetchExpensesProps) => {
    const { data } = await apiService.get(`issuance/issuances?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    return data;
};

export const createIssuance = async (data: createIssuanceProps) => {
    const res = await apiService.post("/issuance/issuances", data);
    return res;
};