"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/utils/axios";
import { DiscordUser } from "@/utils/types";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: DiscordUser | null;
  loading: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    // Don't fetch if we're already on the login page
    if (pathname === "/") {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/users/me", { withCredentials: true });
      setUser(data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Only redirect if we're not already on a public page
        if (pathname !== "/") {
          router.push("/");
        }
        return;
      }
      console.error("Failed to fetch user:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]); // Fetch user on path change

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
