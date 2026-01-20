import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface AuthUser {
  userId: string;
  email: string;
  fullName: string;
  roles: string[];
}

interface AuthState {
 
  user: AuthUser | null;
  isAuthenticated:boolean;
}

const initialState: AuthState = {
 
  isAuthenticated: false,
  user: null,
};



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<AuthUser>) => {
     
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
       
      state.user = null;
    },
  },
});

export const { setAuthenticated, clearAuth } = authSlice.actions;
export default authSlice.reducer;
