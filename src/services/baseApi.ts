import axiosInstance from "./axiosInstance";

 
export const baseApi = {
  get: <T>(url: string, params?: object) =>
    axiosInstance.get<T>(url, { params }).then(res=>res.data),

  post: <T>(url: string, body?: object) =>
    axiosInstance.post<T>(url, body).then(res => res.data),

  put: <T>(url: string, body?: object) =>
    axiosInstance.put<T>(url, body).then(res => res.data),

  delete: <T>(url: string) =>
    axiosInstance.delete<T>(url).then(res => res.data),
};