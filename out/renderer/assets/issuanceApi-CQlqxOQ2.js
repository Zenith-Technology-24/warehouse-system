import { a as apiService } from "./axios-DSoLq97m.js";
const fetchIssuance = async ({ search, page, limit, status }) => {
  const { data } = await apiService.get(`issuance?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return data;
};
const createIssuance = async (data) => {
  const res = await apiService.post("/issuance", data);
  return res;
};
const exportIssuance = async ({ search, status, start_date, end_date }) => {
  const { data } = await apiService.post("/issuance/export", { search, status, start_date, end_date });
  return data;
};
const updateIssuance = async (data) => {
  const res = await apiService.put(`/issuance/${data.id}`, data);
  return res;
};
const updateIssuanceStatus = async ({ id, status }) => {
  const { data } = await apiService.put(`/issuance/${status === "archived" ? "archive" : "unarchive"}/${id}`);
  return data;
};
const fetchReceiptRefs = async (fetch = "some") => {
  const { data } = await apiService.get(`/issuance/refs?fetch=${fetch}`);
  return data.map(({ receipt, items, ...rest }) => ({
    name: receipt,
    items: items.map((item) => ({ ...item, name: item.item_name })),
    ...rest
  }));
};
const fetchOneIssuance = async (id) => {
  const { data } = await apiService.get(`/issuance/${id}`);
  return data;
};
const withdrawIssuance = async ({ id, inventoryId }) => {
  const { data } = await apiService.get(`/issuance/withdraw/${id}/${inventoryId}`);
  return data;
};
const pendingIssuance = async ({ id, inventoryId }) => {
  const { data } = await apiService.get(`/issuance/pending/${id}/${inventoryId}`);
  return data;
};
const withdrawAllIssuance = async ({ id }) => {
  const { data } = await apiService.get(`/issuance/withdraw/all/${id}`);
  return data;
};
const pendingAllIssuance = async ({ id }) => {
  const { data } = await apiService.get(`/issuance/pending-all/${id}`);
  return data;
};
export {
  fetchReceiptRefs as a,
  fetchOneIssuance as b,
  createIssuance as c,
  withdrawIssuance as d,
  exportIssuance as e,
  fetchIssuance as f,
  pendingIssuance as g,
  updateIssuance as h,
  pendingAllIssuance as p,
  updateIssuanceStatus as u,
  withdrawAllIssuance as w
};
