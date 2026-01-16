import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "../pages/Category/CategorySlice";
 

export const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
