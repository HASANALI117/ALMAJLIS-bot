import { useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/axios";

export const useLeaveSettings = () => {
  const { guildId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Leave message states
  const [leaveEnabled, setLeaveEnabled] = useState(false);
  const [selectedLeaveChannel, setSelectedLeaveChannel] = useState("");
  const [leaveMessage, setLeaveMessage] = useState(
    "Goodbye {user}, we'll miss you! 👋"
  );
  const [useLeaveEmbed, setUseLeaveEmbed] = useState(false);
  const [leaveEmbedTitle, setLeaveEmbedTitle] = useState("Goodbye!");
  const [leaveEmbedDescription, setLeaveEmbedDescription] = useState(
    "Goodbye {user}, we hope to see you again!"
  );
  const [leaveEmbedColor, setLeaveEmbedColor] = useState("#FF0000");
  const [showLeaveThumbnail, setShowLeaveThumbnail] = useState(true);
  const [leaveFooterText, setLeaveFooterText] = useState(
    "Member #{membercount}"
  );

  const saveLeaveSettings = async () => {
    setIsLoading(true);
    try {
      const payload = {
        guildId,
        channelId: selectedLeaveChannel,
        enabled: leaveEnabled,
        message: useLeaveEmbed ? null : leaveMessage,
        useEmbed: useLeaveEmbed,
        embed: useLeaveEmbed
          ? {
              title: leaveEmbedTitle,
              description: leaveEmbedDescription,
              color: leaveEmbedColor,
              thumbnail: showLeaveThumbnail,
              footer: {
                text: leaveFooterText,
                iconURL: null,
              },
            }
          : null,
      };

      const { data } = await api.post(`/leave/${guildId}`, payload);
      console.log("Leave settings saved:", data);
    } catch (error) {
      console.error("Error saving leave settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeaveSettings = async () => {
    try {
      const { data } = await api.get(`/leave/${guildId}`);
      if (data) {
        setSelectedLeaveChannel(data.channelId || "");
        setLeaveEnabled(data.enabled !== false);

        if (data.useEmbed && data.embed) {
          setUseLeaveEmbed(true);
          setLeaveEmbedTitle(data.embed.title || "Goodbye!");
          setLeaveEmbedDescription(
            data.embed.description ||
              "Goodbye {user}, we hope to see you again!"
          );
          setLeaveEmbedColor(data.embed.color || "#FF0000");
          setShowLeaveThumbnail(data.embed.thumbnail !== false);
          setLeaveFooterText(
            data.embed.footer?.text || "Member #{membercount}"
          );
        } else {
          setUseLeaveEmbed(false);
          setLeaveMessage(
            data.message || "Goodbye {user}, we hope to see you again!"
          );
        }
      }
    } catch (error) {
      console.error("Error fetching leave settings:", error);
    }
  };

  return {
    // States
    leaveEnabled,
    selectedLeaveChannel,
    leaveMessage,
    useLeaveEmbed,
    leaveEmbedTitle,
    leaveEmbedDescription,
    leaveEmbedColor,
    showLeaveThumbnail,
    leaveFooterText,
    isLoading,

    // Setters
    setLeaveEnabled,
    setSelectedLeaveChannel,
    setLeaveMessage,
    setUseLeaveEmbed,
    setLeaveEmbedTitle,
    setLeaveEmbedDescription,
    setLeaveEmbedColor,
    setShowLeaveThumbnail,
    setLeaveFooterText,

    // Actions
    saveLeaveSettings,
    fetchLeaveSettings,
  };
};
