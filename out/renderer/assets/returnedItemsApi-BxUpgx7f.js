import { a as apiService } from "./axios-DSoLq97m.js";
const fetchReturnedItems = async ({ status, search, page, limit }) => {
  const { data } = await apiService.get(`/returned-items?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return data;
};
const exportReturnedItems = async ({ search, status, start_date, end_date }) => {
  const { data } = await apiService.post("/returned-items/export", { search, status, start_date, end_date });
  return data;
};
const createReturnedItems = async (data) => {
  const res = await apiService.post("/returned-items", data);
  return res;
};
const updateReturnedItems = async (data) => {
  const res = await apiService.put(`/returned-items/${data.id}`, data);
  return res;
};
const fetchOneReturnedItems = async (id) => {
  const { data } = await apiService.get(`/returned-items/${id}`);
  return data;
};
const updateReturnedItemStatus = async ({ id, status }) => {
  const { data } = await apiService.put(`/returned-items/${id}`, { status });
  return data;
};
export {
  fetchOneReturnedItems as a,
  updateReturnedItems as b,
  createReturnedItems as c,
  exportReturnedItems as e,
  fetchReturnedItems as f,
  updateReturnedItemStatus as u
};
