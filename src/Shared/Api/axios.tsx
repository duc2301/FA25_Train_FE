import axios, { AxiosError } from "axios";

// Ensure API base URL has trailing slash if it exists
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_PREFIXED_URL = baseUrl.endsWith("/")
  ? baseUrl + "api/"
  : baseUrl + "/api/";

const api = axios.create({
  baseURL: API_PREFIXED_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRoot = axios.create({
  baseURL: API_PREFIXED_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header
const requestInterceptor = (config: any) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const requestErrorInterceptor = (error: any) => {
  return Promise.reject(
    error instanceof Error ? error : new Error(String(error))
  );
};

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
apiRoot.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken");
      globalThis.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

apiRoot.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken");
      globalThis.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default api;
