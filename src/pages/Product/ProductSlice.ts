import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../model/IProduct";
import { IPagedResponse } from "../../model/IPagedResponse";

interface ProductState {
  products: IProduct[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const initialState: ProductState = {
  products: [],
  pageIndex: 0,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IPagedResponse<IProduct>>) => {
      state.products = action.payload.items;
      state.pageIndex = action.payload.index;
      state.pageSize = action.payload.size;
      state.totalCount = action.payload.count;
      state.totalPages = action.payload.pages;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.products.findIndex((c) => c.id === action.payload.id);

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (c) => c.id?.toString() !== action.payload.toString(),
      );
    },
  },
});

export const { setProduct, addProduct, deleteProduct, updateProduct } =
  productSlice.actions;
