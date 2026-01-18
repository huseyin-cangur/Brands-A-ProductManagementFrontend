import { baseApi } from "./baseApi";
import { IPagedResponse } from "../model/IPagedResponse";
import { IClaim } from "../model/IClaim";

export const claimService = {
  getAll: (pageIndex: number, pageSize: number) =>
    baseApi.get<IPagedResponse<IClaim>>(
      `/operationClaim/GetAll?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    ),
}