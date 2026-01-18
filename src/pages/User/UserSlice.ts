import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../model/IProduct";
import { IPagedResponse } from "../../model/IPagedResponse";
import { IUser } from "../../model/IUser";

interface UserState {
  users: IUser[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const initialState: UserState = {
  users: [],
  pageIndex: 0,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IPagedResponse<IUser>>) => {
      state.users = action.payload.items;
      state.pageIndex = action.payload.index;
      state.pageSize = action.payload.size;
      state.totalCount = action.payload.count;
      state.totalPages = action.payload.pages;
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex((c) => c.id === action.payload.id);

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (c) => c.id?.toString() !== action.payload.toString(),
      );
    },
  },
});

export const { setUser, addUser, deleteUser, updateUser } =
  userSlice.actions;
