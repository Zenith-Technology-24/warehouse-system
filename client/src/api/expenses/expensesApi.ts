import apiService from "../axios";

interface fetchExpensesProps {
    search: string
    page: number
    limit: number
    status: string
}

interface exportExpensesProps {
    search: string
    status: string
    start_date: string
    end_date: string
}

interface createExpenseProps {
    expense_type: string
    first_name: string
    last_name: string
    amount: number
    description: string
}

interface updateExpenseProps {
    id: number
    expense_type: string
    first_name: string
    last_name: string
    amount: number
    description: string
}

interface updateExpenseStatusProps {
    id: number | null;
    status: string;
}

export const fetchExpenses = async ({ search, page, limit, status }: fetchExpensesProps) => {
    const { data } = await apiService.post(`/expenses?page=${page}&limit=${limit}`, { search, status });
    return data;
};

export const exportExpenses = async ({ search, status, start_date, end_date }: exportExpensesProps) => {
    const { data } = await apiService.post('/expenses/export', { search, status, start_date, end_date });
    return data;
};

export const createExpense = async (data: createExpenseProps) => {
    const res = await apiService.post("/expenses/create", data);
    return res;
};

export const updateExpense = async (data: updateExpenseProps) => {
    const res = await apiService.post(`/expenses/${data.id}/update`, data);
    return res;
};

export const updateExpenseStatus = async ({ id, status }: updateExpenseStatusProps) => {
    const { data } = await apiService.get(`/expenses/${id}/${status}`);
    return data;
};
