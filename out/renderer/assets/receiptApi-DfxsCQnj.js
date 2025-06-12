import { a as apiService } from "./axios-DSoLq97m.js";
const fetchReceipt = async ({ search, page, limit, status }) => {
  const { data } = await apiService.get(`receipt?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return data;
};
const fetchOneReceipt = async (id) => {
  const { data } = await apiService.get(`/receipt/${id}`);
  return data;
};
const exportReceipt = async ({ search, status, start_date, end_date }) => {
  const { data } = await apiService.post("/receipt/export", { search, status, start_date, end_date });
  return data;
};
const createReceipt = async (data) => {
  const res = await apiService.post("/receipt", data);
  return res;
};
const updateReceipt = async (data) => {
  const res = await apiService.put(`/receipt/${data.id}`, data);
  return res;
};
const updateReceiptStatus = async ({ id, status }) => {
  const { data } = await apiService.put(`/receipt/${status}/${id}`);
  return data;
};
export {
  fetchOneReceipt as a,
  updateReceipt as b,
  createReceipt as c,
  exportReceipt as e,
  fetchReceipt as f,
  updateReceiptStatus as u
};
