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

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    const message =
      error?.response?.data.detail || "Beklenmeyen bir hata oluştu";

    toast.error(message);

    return Promise.reject(error);
  },
);

export default axiosInstance;
