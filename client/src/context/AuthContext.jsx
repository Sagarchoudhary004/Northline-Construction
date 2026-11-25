import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../services';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  const checkAuth = useCallback(async () => {
    const hasToken = Boolean(localStorage.getItem('northline_admin_token'));
    try {
      const profile = await authService.getMe();
      setAdmin(profile);
    } catch {
      if (hasToken) localStorage.removeItem('northline_admin_token');
      setAdmin(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setAdmin(data.admin);
    return data.admin;
  };

  const logout = async () => {
    await authService.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ admin, isAuthenticated: Boolean(admin), checking, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
