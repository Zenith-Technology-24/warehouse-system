import { a as apiService } from "./axios-DSoLq97m.js";
const fetchInventory = async ({ search, page, limit, status, filter }) => {
  const { data } = await apiService.get(`/inventory?page=${page}&limit=${limit}&search=${search}&status=${status}&filter=${filter}`);
  return data;
};
const exportInventory = async ({ search, status, start_date, end_date }) => {
  const { data } = await apiService.post("/inventory/export", { search, status, start_date, end_date });
  return data;
};
const createProduct = async (props) => {
  const res = await apiService.post("/inventory/create", { ...props, product_name: props?.productName, in_stock: props?.inStock });
  return res;
};
const updateProduct = async (props) => {
  const res = await apiService.post(`/inventory/${props.id}/update`, {
    product_name: props?.productName,
    category: props?.category,
    size: props?.size,
    in_stock: props?.inStock,
    cost: props?.cost,
    price: props?.price
  });
  return res;
};
const updateInventoryStatus = async ({ id, status }) => {
  const { data } = await apiService.put(`/inventory/${status}/${id}`);
  return data;
};
const fetchOneInventory = async (id) => {
  const { data } = await apiService.get(`/inventory/${id}`);
  return data;
};
export {
  fetchOneInventory as a,
  updateProduct as b,
  createProduct as c,
  exportInventory as e,
  fetchInventory as f,
  updateInventoryStatus as u
};
