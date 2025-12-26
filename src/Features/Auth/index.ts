import type { ApiResponse } from "../../Entities/ApiResponse";
import api from "../../Shared/Api/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOtpRequest {
  email: string;
  otpCode: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<string>> => {
    const response = await api.post<ApiResponse<string>>(
      "Auth/login",
      credentials
    );
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<string>> => {
    const response = await api.post<ApiResponse<string>>("Auth/register", data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<ApiResponse<string>> => {
    const response = await api.post<ApiResponse<string>>(
      "Auth/verify-otp",
      data
    );
    return response.data;
  },

  googleLogin: async (
    request: GoogleLoginRequest
  ): Promise<ApiResponse<string>> => {
    const response = await api.post<ApiResponse<string>>(
      "Auth/google-login",
      request
    );
    return response.data;
  },

  setToken: (token: string): void => {
    localStorage.setItem("jwtToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  getToken: (): string | null => {
    return localStorage.getItem("jwtToken");
  },

  clearToken: (): void => {
    localStorage.removeItem("jwtToken");
    delete api.defaults.headers.common["Authorization"];
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("jwtToken");
  },

  logout: (): void => {
    AuthService.clearToken();
  },
};
