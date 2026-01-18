import { baseApi } from "./baseApi";
import { IApiResponse } from "../model/IApiResponse";
import { IPagedResponse } from "../model/IPagedResponse";
import { IUser } from "../model/IUser";

export const userService = {
  getAll: (pageIndex: number, pageSize: number) =>
    baseApi.get<IPagedResponse<IUser>>(
      `/user/GetAll?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    ),

  addUser: (data: IUser) =>
    baseApi.post<IApiResponse<IUser>>("/user/Add", data),
  updateUser: (data: IUser) =>
    baseApi.put<IApiResponse<IUser>>("/user/Update", data),

  deleteUser: (id: string) =>
    baseApi.delete<IApiResponse<{ id: string }>>(`/user/delete?id=${id}`),
};
