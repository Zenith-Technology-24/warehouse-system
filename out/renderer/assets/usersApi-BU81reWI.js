import { a as apiService } from "./axios-DSoLq97m.js";
const fetchUsers = async ({ search, page, limit, status }) => {
  const { data } = await apiService.get(`user?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return data;
};
const createUser = async (data) => {
  const res = await apiService.post("user", data);
  return res;
};
const updateUser = async (data) => {
  const res = await apiService.put(`/user/${data.id}`, data);
  return res;
};
const updateUserStatus = async ({ id, status }) => {
  const { data } = await apiService.put(`/user/${id}`, { status });
  return data;
};
const fetchEndUsers = async () => {
  const { data } = await apiService.get("end-user");
  return data;
};
export {
  updateUser as a,
  fetchEndUsers as b,
  createUser as c,
  fetchUsers as f,
  updateUserStatus as u
};
