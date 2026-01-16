import { baseApi } from "./baseApi";
import { IApiResponse } from "../model/IApiResponse";
import { IProduct } from "../model/IProduct";
import { IPageRequest } from "../model/IPageRequest";
import { IPagedResponse } from "../model/IPagedResponse";

export const productService = {
  getAll: (pageIndex: number, pageSize: number) =>
    baseApi.get<IPagedResponse<IProduct>>(
      `/product/GetAll?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    ),

  addProduct: (data: IProduct) =>
    baseApi.post<IApiResponse<IProduct>>("/product/Add", data),
  updateProduct: (data: IProduct) =>
    baseApi.put<IApiResponse<IProduct>>("/product/Update", data),

  deleteProduct: (id: string) =>
    baseApi.delete<IApiResponse<{ id: string }>>(`/product/delete?id=${id}`),
};
