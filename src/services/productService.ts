import { IBaseListResponse } from "../model/IBaseListResponse";
 
import { baseApi } from "./baseApi";
import { IApiResponse } from "../model/IApiResponse";
import { IProduct } from "../model/IProduct";

export const productService = {
  getAll: () =>
    baseApi.get<IBaseListResponse>("/product/GetAll?pageIndex=0&pageSize=10"),

  addProduct: (data: IProduct) =>
    baseApi.post<IApiResponse<IProduct>>("/product/Add", data),
  updateProduct: (data: IProduct) =>

    baseApi.put<IApiResponse<IProduct>>("/product/Update", data),

  deleteProduct: (id: string) =>
    baseApi.delete<IApiResponse<{ id: string }>>(`/product/delete?id=${id}`),
};
