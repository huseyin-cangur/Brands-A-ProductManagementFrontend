import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../model/ICategory";
import { IPagedResponse } from "../../model/IPagedResponse";


interface CategoryState {
  categories: ICategory[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const initialState: CategoryState = {
  categories: [],
  pageIndex: 0,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
};

 

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
     setCategory: (state, action: PayloadAction<IPagedResponse<ICategory>>) => {
          state.categories = action.payload.items;
          state.pageIndex = action.payload.index;
          state.pageSize = action.payload.size;
          state.totalCount = action.payload.count;
          state.totalPages = action.payload.pages;
        },
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id
      );

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (c) => c.id?.toString() !== action.payload.toString()
      );

      console.log(state.categories);
    },
  },
});

export const { setCategory, addCategory, deleteCategory,updateCategory } =
  categorySlice.actions;
