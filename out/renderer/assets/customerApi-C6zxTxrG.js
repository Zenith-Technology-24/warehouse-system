import { a as apiService } from "./axios-DSoLq97m.js";
const fetchProductNames = async () => {
  const { data } = await apiService.get("/inventory/names");
  return data;
};
const fetchCustomers = async () => {
  const { data } = await apiService.get("/customers");
  return data;
};
export {
  fetchProductNames as a,
  fetchCustomers as f
};
