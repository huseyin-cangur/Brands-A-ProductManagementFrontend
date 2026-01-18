import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagedResponse } from "../../model/IPagedResponse";
import { IClaim } from "../../model/IClaim";

interface ClaimState {
  claims: IClaim[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const initialState: ClaimState = {
  claims: [],
  pageIndex: 0,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
};

export const claimSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    setClaim: (state, action: PayloadAction<IPagedResponse<IClaim>>) => {
      state.claims = action.payload.items;
      state.pageIndex = action.payload.index;
      state.pageSize = action.payload.size;
      state.totalCount = action.payload.count;
      state.totalPages = action.payload.pages;
    }
    
  },
});

export const { setClaim,} =
  claimSlice.actions;
