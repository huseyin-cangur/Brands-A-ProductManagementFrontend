import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "../pages/Category/CategorySlice";
import { productSlice } from "../pages/Product/ProductSlice";
import { userSlice } from "../pages/User/UserSlice";
import { claimSlice } from "../pages/Claim/ClaimSlice";
import authReducer from "../pages/Login/AuthSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    products: productSlice.reducer,
    users: userSlice.reducer,
    claims: claimSlice.reducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
