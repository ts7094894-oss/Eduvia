import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { DEMO_ACCOUNTS } from '../data/users';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  loginAsDemo: (role: Role) => void;
  signup: (userData: { name: string; email: string; password?: string; role: Role; college?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updated: Partial<User>) => void;
  updateUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const explicitLogout = localStorage.getItem('eduvia_logged_out');
      if (explicitLogout === 'true') {
        return null;
      }
      const stored = localStorage.getItem('eduvia_auth_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return DEMO_ACCOUNTS[0].user;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('eduvia_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eduvia_auth_user');
    }
  }, [user]);

  const login = async (email: string, password: string, _rememberMe = true): Promise<{ success: boolean; message?: string }> => {
    localStorage.removeItem('eduvia_logged_out');
    const trimmedEmail = email.trim().toLowerCase();

    // Check demo accounts first
    const demo = DEMO_ACCOUNTS.find((d) => d.email.toLowerCase() === trimmedEmail);
    if (demo) {
      if (demo.password === password) {
        setUser(demo.user);
        return { success: true };
      }
      return { success: false, message: 'Invalid password. Please check demo credentials or enter student123.' };
    }

    // Check custom registered users from LocalStorage
    try {
      const registeredUsers = JSON.parse(
        localStorage.getItem('eduvia_registered_users') ||
        '[]'
      );
      const found = registeredUsers.find(
        (u: { email: string; password?: string }) => u.email.toLowerCase() === trimmedEmail
      );
      if (found) {
        if (found.password === password) {
          const { password: _, ...cleanUser } = found;
          setUser(cleanUser as User);
          return { success: true };
        }
        return { success: false, message: 'Invalid password for this registered account.' };
      }
    } catch {
      // ignore
    }

    // Fallback: If user enters demo student email with any valid format
    if (trimmedEmail.includes('student') || trimmedEmail.includes('demo')) {
      const defaultStudent = DEMO_ACCOUNTS[0].user;
      setUser(defaultStudent);
      return { success: true };
    }

    return {
      success: false,
      message: 'Account not found. You can use the Quick Demo Logins below or create a new account.',
    };
  };

  const loginAsDemo = (role: Role) => {
    localStorage.removeItem('eduvia_logged_out');
    const account = DEMO_ACCOUNTS.find((d) => d.role === role) || DEMO_ACCOUNTS[0];
    setUser(account.user);
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password?: string;
    role: Role;
    college?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    localStorage.removeItem('eduvia_logged_out');
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      college: userData.college || 'EduPath University',
      degree: userData.role === 'student' ? 'B.Tech - Computer Science & Engineering' : undefined,
      graduationYear: userData.role === 'student' ? '2026' : undefined,
      cgpa: userData.role === 'student' ? '8.5' : undefined,
      skills: userData.role === 'student' ? ['Python', 'Java', 'React', 'SQL'] : undefined,
    };

    try {
      const registeredUsers = JSON.parse(
        localStorage.getItem('eduvia_registered_users') ||
        '[]'
      );
      registeredUsers.push({ ...newUser, password: userData.password || 'password123' });
      localStorage.setItem('eduvia_registered_users', JSON.stringify(registeredUsers));
    } catch {
      // ignore
    }

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.setItem('eduvia_logged_out', 'true');
    setUser(null);
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updated });
  };

  const updateUser = (updated: Partial<User>) => {
    updateProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        signup,
        logout,
        updateProfile,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
