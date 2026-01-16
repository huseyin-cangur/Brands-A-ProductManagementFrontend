import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "../pages/Category/CategorySlice";
import { productSlice } from "../pages/Product/ProductSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    products: productSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
