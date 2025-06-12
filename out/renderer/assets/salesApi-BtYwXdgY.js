import { a as apiService } from "./axios-DSoLq97m.js";
const fetchSales = async ({ search, page, limit, status }) => {
  const { data } = await apiService.post(`/sales?page=${page}&limit=${limit}`, { search, status });
  return data;
};
const exportSales = async ({ search, status, start_date, end_date }) => {
  const { data } = await apiService.post("/sales/export", { search, status, start_date, end_date });
  return data;
};
const fetchOneSales = async (id) => {
  const { data } = await apiService.get(`/sales/${id}`);
  return data;
};
const createSales = async (data) => {
  const res = await apiService.post("/sales/create", data);
  return res;
};
const updateSales = async (data) => {
  const res = await apiService.post(`/sales/${data.id}/update`, data);
  return res;
};
const updateSalesStatus = async ({ id, status }) => {
  const { data } = await apiService.get(`/sales/${id}/${status}`);
  return data;
};
const deleteSalesProduct = async ({ id }) => {
  const { data } = await apiService.get(`/sales/product/${id}/delete`);
  return data;
};
export {
  updateSales as a,
  fetchOneSales as b,
  createSales as c,
  deleteSalesProduct as d,
  exportSales as e,
  fetchSales as f,
  updateSalesStatus as u
};
