'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscription?: {
    planId: string;
    plan: string;
    status: 'active' | 'paused' | 'cancelled';
    renewalDate: string;
    mealsRemaining: number;
    startDate: string;
  };
}

interface UserContextType {
  user: User | null;
  isAdmin: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setAdminMode: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const setAdminMode = (adminMode: boolean) => {
    setIsAdmin(adminMode);
  };

  return (
    <UserContext.Provider value={{ user, isAdmin, login, logout, updateUser, setAdminMode }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};