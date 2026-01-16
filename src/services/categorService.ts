import { ICategory } from "../model/ICategory";
import { baseApi } from "./baseApi";
import { IApiResponse } from "../model/IApiResponse";
import { IPagedResponse } from "../model/IPagedResponse";

export const categoryService = {
  getAll: (pageIndex?: number, pageSize?: number) => {
    let url = "/category/GetAll";

    if (pageIndex !== undefined && pageSize !== undefined) {
      url += `?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    }

    return baseApi.get<IPagedResponse<ICategory>>(url);
  },

  addCategory: (data: ICategory) =>
    baseApi.post<IApiResponse<ICategory>>("/category/Add", data),
  updateCategory: (data: ICategory) =>
    baseApi.put<IApiResponse<ICategory>>("/category/Update", data),

  deleteCategory: (id: string) =>
    baseApi.delete<IApiResponse<{ id: string }>>(`/category/delete?id=${id}`),
};
