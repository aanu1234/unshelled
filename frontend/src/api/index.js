import axios from "axios";
// config
import { HOST_API_KEY } from "../config.js";

// axios instance
const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

// ------------------------------------------------------------------------------

axiosInstance.interceptors.request.use((req) => {
  // console.log(req.headers.Authorization)
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Basic ${localStorage.getItem("token")}`;
  }
  return req;
});

// ------------------------ Order items Request Routes ---------------------
export const getOrderItems = async () => axiosInstance.get(`/order_items`);
export const deleteOrderItem = async (id) =>
  axiosInstance.delete(`/order_items/${id}`);

// ------------------------ Account Request Routes ---------------------
export const updateAccount = async (requestBody) =>
  axiosInstance.patch(`/account`, requestBody);

// ------------------------------------------------------------------------------

export default axiosInstance;
