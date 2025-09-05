import React, { createContext, useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsLoading(false);
  }, []);

  // Registro de usuário
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Verificar email duplicado
      if (existingUsers.find((u: any) => u.email === email)) return false;

      // Criptografar senha
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
      };

      // Salvar senha criptografada junto do usuário
      const userWithPassword = { ...newUser, password: hashedPassword };
      existingUsers.push(userWithPassword);

      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setUser(newUser);

      return true;
    } catch (error) {
      console.error("Erro no registro:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login de usuário
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userFound = existingUsers.find((u: any) => u.email === email);

      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        const { password: _, ...userWithoutPassword } = userFound;
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
