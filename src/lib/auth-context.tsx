"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { deleteCookie, getCookie, setCookie } from "./utils";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (mockToken: string, mockUser: User) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = getCookie("token");
    const userData = getCookie("user-info");

    if (token && userData) {
      try {
        const decodedData = decodeURIComponent(userData);
        setUser(JSON.parse(decodedData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        clearAuth();
      }
    }
    setIsLoading(false);
  };

  const login = async (mockToken: string, mockUser: User) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const encodedUserData = encodeURIComponent(JSON.stringify(mockUser));

      // Store in cookies
      setCookie("token", mockToken, 7); // 7 days
      setCookie("refresh-token", encodedUserData, 7);
      setCookie("user-info", encodedUserData, 7);

      setUser(mockUser);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    clearAuth();
    setUser(null);
    router.push("/login");
  };

  const clearAuth = () => {
    deleteCookie("token");
    deleteCookie("refresh-token");
    deleteCookie("user-info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
