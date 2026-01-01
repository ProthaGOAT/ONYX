import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import api from '../api/axios';

// Define what a User looks like
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login Function
  const login = async (formData: any) => {
    const { data } = await api.post('/auth/login', formData);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Register Function
  const register = async (formData: any) => {
    const { data } = await api.post('/auth/register', formData);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};