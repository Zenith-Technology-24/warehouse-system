import { a as apiService } from "./axios-DSoLq97m.js";
const fetchExpenses = async ({ search, page, limit, status }) => {
  const { data } = await apiService.post(`/expenses?page=${page}&limit=${limit}`, { search, status });
  return data;
};
const exportExpenses = async ({ search, status, start_date, end_date }) => {
  const { data } = await apiService.post("/expenses/export", { search, status, start_date, end_date });
  return data;
};
const createExpense = async (data) => {
  const res = await apiService.post("/expenses/create", data);
  return res;
};
const updateExpense = async (data) => {
  const res = await apiService.post(`/expenses/${data.id}/update`, data);
  return res;
};
const updateExpenseStatus = async ({ id, status }) => {
  const { data } = await apiService.get(`/expenses/${id}/${status}`);
  return data;
};
export {
  updateExpense as a,
  createExpense as c,
  exportExpenses as e,
  fetchExpenses as f,
  updateExpenseStatus as u
};
