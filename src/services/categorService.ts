import { IBaseListResponse } from "../model/IBaseListResponse";
import { ICategory } from "../model/ICategory";
import { baseApi } from "./baseApi";
import { IApiResponse } from "../model/IApiResponse";

export const categoryService = {
  getAll: () =>
    baseApi.get<IBaseListResponse>("/category/GetAll?pageIndex=0&pageSize=10"),

  addCategory: (data: ICategory) =>
    baseApi.post<IApiResponse<ICategory>>("/category/Add", data),
  updateCategory: (data: ICategory) =>

    baseApi.put<IApiResponse<ICategory>>("/category/Update", data),

  deleteCategory: (id: string) =>
    baseApi.delete<IApiResponse<{ id: string }>>(`/category/delete?id=${id}`),
};
