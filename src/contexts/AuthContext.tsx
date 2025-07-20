import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../data/models/user';
import { authEndpoints } from '../data/network/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('xployt_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const currentUser = await authEndpoints.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to fetch user', error);
          localStorage.removeItem('xployt_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async () => {
    try {
      const { url } = await authEndpoints.getGitHubLoginUrl();
      window.location.href = url;
    } catch (error) {
      console.error('Failed to get GitHub login URL', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('xployt_token');
    setToken(null);
    setUser(null);
  };

  const updateToken = (newToken: string) => {
    localStorage.setItem('xployt_token', newToken);
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, setToken: updateToken }}>
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
