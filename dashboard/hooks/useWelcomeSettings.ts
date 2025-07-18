import { useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/axios";

export const useWelcomeSettings = () => {
  const { guildId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Welcome message states
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [selectedWelcomeChannel, setSelectedWelcomeChannel] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to {server}, {user}! 🎉"
  );

  // Welcome embed states
  const [useEmbed, setUseEmbed] = useState(false);
  const [embedTitle, setEmbedTitle] = useState("Welcome!");
  const [embedDescription, setEmbedDescription] = useState(
    "Welcome to {server}, {user}! 🎉"
  );
  const [embedColor, setEmbedColor] = useState("#5865F2");
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [footerText, setFooterText] = useState("Member #{membercount}");

  const saveWelcomeSettings = async () => {
    setIsLoading(true);
    try {
      const payload = {
        guildId,
        channelId: selectedWelcomeChannel,
        message: useEmbed ? null : welcomeMessage,
        useEmbed,
        embed: useEmbed
          ? {
              title: embedTitle,
              description: embedDescription,
              color: embedColor,
              thumbnail: showThumbnail,
              footer: {
                text: footerText,
                iconURL: null,
              },
            }
          : null,
      };

      const { data } = await api.post(`/welcome/${guildId}`, payload);
      console.log("Welcome settings saved:", data);
    } catch (error) {
      console.error("Error saving welcome settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWelcomeSettings = async () => {
    try {
      const { data } = await api.get(`/welcome/${guildId}`);
      console.log("Fetched welcome settings:", data);
      if (data) {
        setSelectedWelcomeChannel(data.channelId || "");
        setWelcomeEnabled(!!data.channelId);

        if (data.useEmbed && data.embed) {
          setUseEmbed(true);
          setEmbedTitle(data.embed.title || "Welcome!");
          setEmbedDescription(
            data.embed.description || "Welcome to {server}, {user}! 🎉"
          );
          setEmbedColor(data.embed.color || "#5865F2");
          setShowThumbnail(data.embed.thumbnail !== false);
          setFooterText(data.embed.footer?.text || "Member #{membercount}");
        } else {
          setUseEmbed(false);
          setWelcomeMessage(data.message || "Welcome to {server}, {user}! 🎉");
        }
      }
    } catch (error) {
      console.error("Error fetching welcome settings:", error);
    }
  };

  return {
    // States
    welcomeEnabled,
    selectedWelcomeChannel,
    welcomeMessage,
    useEmbed,
    embedTitle,
    embedDescription,
    embedColor,
    showThumbnail,
    footerText,
    isLoading,

    // Setters
    setWelcomeEnabled,
    setSelectedWelcomeChannel,
    setWelcomeMessage,
    setUseEmbed,
    setEmbedTitle,
    setEmbedDescription,
    setEmbedColor,
    setShowThumbnail,
    setFooterText,

    // Actions
    saveWelcomeSettings,
    fetchWelcomeSettings,
  };
};
