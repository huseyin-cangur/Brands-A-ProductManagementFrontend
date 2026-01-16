import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../model/ICategory";

interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
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
