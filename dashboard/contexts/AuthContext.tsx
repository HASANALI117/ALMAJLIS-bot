"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/utils/axios";

type User = {
  id: string;
  email?: string;
  username: string;
  global_name?: string;
  avatar: string | null;
  banner?: string;
  discriminator?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me", { withCredentials: true });
      setUser(res.data);
    } catch (error: any | unknown) {
      if (error.response && error.response.status === 401) {
        // Redirect to Discord signin page
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/discord`;
        return;
      }
      console.error("Failed to fetch user:", error.message);
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
