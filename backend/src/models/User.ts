export enum Role {
  PENDUK = 'penduduk',
  SEKRETARIS = 'sekretaris',
  KAPALA = 'kapala_desa',
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  penduduk_id?: number; // FK to penduduk if user is a penduduk
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  username: string;
  password: string;
  role: Role;
  penduduk_id?: number;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: Role;
  };
}
