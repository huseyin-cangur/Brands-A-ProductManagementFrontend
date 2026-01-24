import { baseApi } from "./baseApi";
import { IApiResponse } from "../model/IApiResponse";
import { IPagedResponse } from "../model/IPagedResponse";
import { IOrder } from "../model/IOrder";

export const orderService = {
  getAll: (pageIndex: number, pageSize: number) =>
    baseApi.get<IPagedResponse<IOrder>>(
      `/order/GetAll?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    ),

  addOrder: (data: IOrder) =>
    baseApi.post<IApiResponse<IOrder>>("/order/Add", data),

};
