import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há uma sessão salva no localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('admin-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('admin-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simular autenticação com Supabase
      // Em um ambiente real, você faria a chamada para o Supabase aqui
      if (email === 'trabalholaila7@gmail.com' && password === 'Lailaavance1020@') {
        const userData = {
          id: '1',
          email: email
        };
        
        setUser(userData);
        localStorage.setItem('admin-user', JSON.stringify(userData));
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin-user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};