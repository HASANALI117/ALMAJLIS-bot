"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/utils/axios";
import { Channel, PartialGuild } from "@/utils/types";

interface GuildContextType {
  guild: PartialGuild | null;
  channels: Channel[];
  loading: boolean;
  refreshChannels: () => void;
}

const GuildContext = createContext<GuildContextType>({
  guild: null,
  channels: [],
  loading: true,
  refreshChannels: () => {},
});

export const GuildProvider = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string | undefined;
}) => {
  const [guild, setGuild] = useState<PartialGuild | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuild = async () => {
    setLoading(true);
    try {
      // Fetch guild details
      const { data: guild } = await api.get(`/guilds/${id}`, {
        withCredentials: true,
      });
      // Fetch channels for the guild
      const { data: channels } = await api.get(`/guilds/${id}/channels`, {
        withCredentials: true,
      });

      setGuild(guild);
      setChannels(channels);
    } catch (error: any) {
      setGuild(null);
      setChannels([]);
      console.error("Failed to fetch guild or channels:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuild();
  }, [id]);

  return (
    <GuildContext.Provider
      value={{ guild, channels, loading, refreshChannels: fetchGuild }}
    >
      {children}
    </GuildContext.Provider>
  );
};

export const useGuild = () => useContext(GuildContext);
