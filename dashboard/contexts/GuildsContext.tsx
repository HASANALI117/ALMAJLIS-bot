"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/utils/axios";
import { PartialGuild } from "@/utils/types";

interface GuildsContextType {
  guilds: PartialGuild[];
  loading: boolean;
  refreshGuilds: () => void;
}

const GuildsContext = createContext<GuildsContextType>({
  guilds: [],
  loading: true,
  refreshGuilds: () => {},
});

export const GuildsProvider = ({ children }: { children: ReactNode }) => {
  const [guilds, setGuilds] = useState<PartialGuild[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuilds = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/guilds", { withCredentials: true });
      setGuilds(data);
    } catch (error: any) {
      setGuilds([]);
      console.error("Failed to fetch guilds:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <GuildsContext.Provider
      value={{ guilds, loading, refreshGuilds: fetchGuilds }}
    >
      {children}
    </GuildsContext.Provider>
  );
};

export const useGuilds = () => useContext(GuildsContext);
