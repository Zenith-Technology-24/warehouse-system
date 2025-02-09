import apiService from "../axios";
import IssuanceData from "../../dummy/IssuanceData.json";

interface fetchExpensesProps {
    search: string
    page: number
    limit: number
    status: string
}

export const fetchIssuance = async ({ search, page, limit, status }: fetchExpensesProps) => {
    const { data } = await apiService.get(`issuance/issuances?page=${page}&limit=${limit}`, { search, status });
    return data;
};