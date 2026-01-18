import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "../pages/Category/CategorySlice";
import { productSlice } from "../pages/Product/ProductSlice";
import { userSlice } from "../pages/User/UserSlice";
import { claimSlice } from "../pages/Claim/ClaimSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    products: productSlice.reducer,
    users: userSlice.reducer,
    claims: claimSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
