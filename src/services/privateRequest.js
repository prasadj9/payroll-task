import axios from "axios";
import { getToken } from "../utils/utils";
import toast from "react-hot-toast";

export const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
});

const requestHandler = (request) => {
  const token = getToken() || "";
  request.headers.Authorization = `Basic ${token}`;
  return request;
};

const responseErrorHandler = (error) => {
  if (error.response) {
    const { status, data, message } = error.response;

    switch (status) {
      case 400:
        toast.error(
          data.message ? data.message : message || "Invalid Value/ Bad Request"
        );
        break;
      case 403:
        toast.error(
          data.message ? data.message : message || "Access Denied/ Forbidden"
        );
        break;
      case 405:
        toast.error(data.message ? data.message : message || "Invalid Request");
        break;
      case 409:
        toast.error(
          data.message ? data.message : message || "Resource already exists."
        );
        break;
      case 422:
        toast.error(data.message ? data.message : message || "Already Exists");
        break;
      case 500:
        toast.error(
          data.message ? data.message : message || "Internal Server Error"
        );
        break;
      case 501:
        toast.error(data.message ? data.message : message || "Session Expired");
        break;
      case 504:
        toast.error(data.message ? data.message : message || "Network Error");
        break;
      default:
        toast.error(
          data.message ? data.message : message || "Some Error Occurred"
        );
        break;
    }
  } else {
    if (error.name !== "CanceledError")
      toast.error(error?.message || "Some Error Occurred");
  }
  return Promise.reject(error);
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

privateRequest.interceptors.request.use(requestHandler, errorHandler);

privateRequest.interceptors.response.use((response) => {
  return response;
}, responseErrorHandler);
