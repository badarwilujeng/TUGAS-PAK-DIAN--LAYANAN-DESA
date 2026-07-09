import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: { username: string; password: string; role: string; penduduk_id?: number }) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await authAPI.getMe();
          if (response.data.success) {
            setUser(response.data.data as User);
            localStorage.setItem('user', JSON.stringify(response.data.data));
          } else {
            logout();
          }
        } catch (error) {
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.login(username, password);
      if (response.data.success) {
        if (response.data.data) {
          const { token: newToken, user: newUser } = response.data.data;
          localStorage.setItem('token', newToken);
          localStorage.setItem('user', JSON.stringify(newUser));
          setToken(newToken);
          setUser(newUser);
        }
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || error.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const register = async (data: { username: string; password: string; role: string; penduduk_id?: number }) => {
    try {
      const response = await authAPI.register(data);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Registration failed');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || error.message || 'Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
