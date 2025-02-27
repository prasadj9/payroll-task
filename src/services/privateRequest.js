import axios from "axios";
import { getToken } from "../utils/utils";

export const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const requestHandler = (request) => {
  const token = getToken() || "";
  request.headers.Authorization = `Basic ${token}`;
  return request;
};

privateRequest.interceptors.request.use(requestHandler);
