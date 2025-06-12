import { a as apiService } from "./axios-DSoLq97m.js";
const login = async (payload) => {
  const { data } = await apiService.post("/auth/login", payload);
  return data;
};
const session = async () => {
  const { data } = await apiService.get("/auth/session");
  return data;
};
export {
  login as l,
  session as s
};
