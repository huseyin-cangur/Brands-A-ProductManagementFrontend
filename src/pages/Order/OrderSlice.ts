import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagedResponse } from "../../model/IPagedResponse";
import { IOrder } from "../../model/IOrder";


interface OrderState {
  orders: IOrder[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const initialState: OrderState = {
  orders: [],
  pageIndex: 0,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
};

 

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
     setOrders: (state, action: PayloadAction<IPagedResponse<IOrder>>) => {
          state.orders = action.payload.items;
          state.pageIndex = action.payload.index;
          state.pageSize = action.payload.size;
          state.totalCount = action.payload.count;
          state.totalPages = action.payload.pages;
        },
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload);
    },
      
  },
});

export const { setOrders, addOrder } =
  orderSlice.actions;
