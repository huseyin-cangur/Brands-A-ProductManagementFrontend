import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    console.log(error?.response)
    const message =
      error?.response?.data.detail || "Beklenmeyen bir hata oluştu";

    toast.error(message);

    return Promise.reject(error);
  },
);

export default axiosInstance;
