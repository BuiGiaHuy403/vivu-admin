
import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from 'sonner'
import type { ApiResponse } from "../types/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: { "Content-Type": "application/json" },
});


let navigate: ((path: string) => void) | null = null;
export function setNavigateFunction(navigateFunction: (path: string) => void) {
  navigate = navigateFunction;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      if(navigate && window.location.pathname !== '/login') {
        navigate('/login');
        toast.error("Session expired. Please log in again.");
      } else if (!navigate && window.location.pathname !== '/login') {
        window.location.href = '/login';
        toast.error("Session expired. Please log in again.");
      }
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async get<T = unknown>(url: string, params?: Record<string, unknown>) : Promise<ApiResponse<T>> {
      try {
        const { data, status } : AxiosResponse<ApiResponse<T>> = await api.get(url, { params }); 
        return { ...data, status }
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>
          return {
            succeeded: false,
            message: axiosError.response?.data?.message || axiosError.message || 'Unknown error',
            status: axiosError.response?.status || 500
          }
      }
  },
  async post<T = unknown>(url: string, body?: Record<string, unknown>): Promise<ApiResponse<T>> {
    try {
      const { data, status }: AxiosResponse<ApiResponse<T>> = await api.post(url, body)
      return { ...data, status }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      return {
        succeeded: false,
        message: axiosError.response?.data?.message || axiosError.message || 'Unknown error',
        status: axiosError.response?.status || 500
      }
    }
  },

  async put<T = unknown>(url: string, body?: Record<string, unknown>): Promise<ApiResponse<T>> {
    try {
      const { data, status }: AxiosResponse<ApiResponse<T>> = await api.put(url, body)
      return { ...data, status }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      return {
        succeeded: false,
        message: axiosError.response?.data?.message || axiosError.message || 'Unknown error',
        status: axiosError.response?.status || 500
      }
    }
  },

  async delete<T = unknown>(url: string): Promise<ApiResponse<T>> {
    try {
      const { data, status }: AxiosResponse<ApiResponse<T>> = await api.delete(url)
      return { ...data, status }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      return {
        succeeded: false,
        message: axiosError.response?.data?.message || axiosError.message || 'Unknown error',
        status: axiosError.response?.status || 500
      }
    }
  }
}

export default api;