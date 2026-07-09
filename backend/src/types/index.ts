import { Request } from 'express';
import { User } from '../models/User';

export enum Role {
  PENDUK = 'penduduk',
  SEKRETARIS = 'sekretaris',
  KAPALA = 'kapala_desa',
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  };
}
