import axios from 'axios';
import type { ApiResponse, User, Penduduk, Layanan } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth related functions
export const authAPI = {
  login: (username: string, password: string) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', { username, password }),
  register: (data: { username: string; password: string; role: string; penduduk_id?: number }) =>
    api.post<ApiResponse>('/auth/register', data),
  resetPassword: (data: { username: string; newPassword: string }) =>
    api.post<ApiResponse>('/auth/reset-password', data),
  getMe: () => api.get<ApiResponse<User>>('/auth/me'),
};

export const pendudukAPI = {
  getAll: (params?: any) => api.get<ApiResponse<Penduduk[]>>('/penduduk', { params }),
  getMe: () => api.get<ApiResponse>('/penduduk/me'),
  getById: (id: number) => api.get<ApiResponse>(`/penduduk/${id}`),
  create: (data: any) => api.post<ApiResponse>('/penduduk', data),
  update: (id: number, data: any) => api.put<ApiResponse>(`/penduduk/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse>(`/penduduk/${id}`),
};

export const layananAPI = {
  getAll: () => api.get<ApiResponse<Layanan[]>>('/layanan'),
  getById: (id: number) => api.get<ApiResponse>(`/layanan/${id}`),
  create: (data: any) => api.post<ApiResponse>('/layanan', data),
  update: (id: number, data: any) => api.put<ApiResponse>(`/layanan/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse>(`/layanan/${id}`),
  generatePDF: (id: number) => api.get(`/layanan/${id}/pdf`, { responseType: 'blob' }),
};

export const dashboardAPI = {
  getStats: () => api.get<ApiResponse<any>>('/dashboard/stats'),
};
