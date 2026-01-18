import { LoginResponse } from "../model/ILoginResponse";
import { baseApi } from "./baseApi";

 
export const authService = {
  login: (email: string, password: string) =>
    baseApi.post<LoginResponse>('/auth/login', { email, password }),

  me: () => baseApi.get<any>('/auth/me'),
};