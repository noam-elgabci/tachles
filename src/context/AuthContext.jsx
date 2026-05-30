import { createContext, useContext, useState } from 'react';
import { mockUser } from '../mocks/user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUser);

  const login = () => setUser(mockUser);
  const logout = () => setUser(null);

  const updateUser = updates =>
    setUser(prev => (prev ? { ...prev, ...updates } : prev));

  const addReservation = reservation =>
    setUser(prev =>
      prev
        ? { ...prev, reservations: [reservation, ...prev.reservations] }
        : prev
    );

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, addReservation }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
