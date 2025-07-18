"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChannelSelect from "../common/ChannelSelect";
import api from "@/utils/axios";
import { useParams } from "next/navigation";
import { useAuth, useGuild } from "@/contexts";
import SaveButton from "../ui/SaveButton";

const WelcomeComponent = () => {
  const { guildId } = useParams();
  const { guild } = useGuild();
  const { user } = useAuth();
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

  const placeholders = [
    { placeholder: "{user}", description: "Mention the user" },
    { placeholder: "{server}", description: "Server name" },
    { placeholder: "{membercount}", description: "Total member count" },
    { placeholder: "{username}", description: "Username without mention" },
  ];

  // Helper function to replace placeholders for preview
  const replaceMessagePlaceholders = (text: string) => {
    return text
      .replace("{user}", `@${user?.username}`)
      .replace("{server}", `${guild?.name}`)
      .replace("{membercount}", "1,234")
      .replace("{username}", `${user?.username}`);
  };

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

  const fetchWelcomeSettings = async () => {
    try {
      const { data } = await api.get(`/welcome/${guildId}`);
      if (data) {
        setSelectedWelcomeChannel(data.channelId || "");
        setWelcomeEnabled(!!data.channelId);

        // Load embed or message settings properly
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
        console.log("Welcome settings fetched:", data);
      }
    } catch (error) {
      console.error("Error fetching welcome settings:", error);
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
        console.log("Leave settings fetched:", data);
      }
    } catch (error) {
      console.error("Error fetching leave settings:", error);
    }
  };

  useEffect(() => {
    if (guildId) {
      fetchWelcomeSettings();
      fetchLeaveSettings();
    }
  }, [guildId]);

  return (
    <div className="space-y-6">
      {/* Welcome Messages */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-user-plus text-green-400"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Welcome Messages
              </h4>
              <p className="text-sm text-white/60">
                Greet new members when they join
              </p>
            </div>
          </div>
          <button
            onClick={() => setWelcomeEnabled(!welcomeEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              welcomeEnabled ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                welcomeEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {welcomeEnabled && (
          <div className="space-y-4 p-4 glass-dark rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ChannelSelect
                  value={selectedWelcomeChannel}
                  onChange={setSelectedWelcomeChannel}
                  label="Welcome Channel"
                  placeholder="Select a channel..."
                />
              </div>
            </div>

            {/* Message Type Toggle */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="messageType"
                  checked={!useEmbed}
                  onChange={() => setUseEmbed(false)}
                  className="sr-only"
                />
                <div
                  className={`glass-button px-4 py-2 transition-all duration-300 ${
                    !useEmbed
                      ? "bg-green-500/20 text-green-400"
                      : "text-white/70"
                  }`}
                >
                  <i className="bx bx-message mr-2"></i>
                  Message
                </div>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="messageType"
                  checked={useEmbed}
                  onChange={() => setUseEmbed(true)}
                  className="sr-only"
                />
                <div
                  className={`glass-button px-4 py-2 transition-all duration-300 ${
                    useEmbed ? "bg-blue-500/20 text-blue-400" : "text-white/70"
                  }`}
                >
                  <i className="bx bx-card mr-2"></i>
                  Embed
                </div>
              </label>
            </div>

            {!useEmbed ? (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Welcome Message
                </label>
                <textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 h-24"
                  placeholder="Enter your welcome message..."
                />
              </div>
            ) : (
              // Embed Configuration
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Embed Title
                    </label>
                    <input
                      type="text"
                      value={embedTitle}
                      onChange={(e) => setEmbedTitle(e.target.value)}
                      className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="Welcome!"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Embed Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={embedColor}
                        onChange={(e) => setEmbedColor(e.target.value)}
                        className="w-12 h-10 rounded glass-button border-none"
                      />
                      <input
                        type="text"
                        value={embedColor}
                        onChange={(e) => setEmbedColor(e.target.value)}
                        className="flex-1 glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                        placeholder="#5865F2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Embed Description
                  </label>
                  <textarea
                    value={embedDescription}
                    onChange={(e) => setEmbedDescription(e.target.value)}
                    className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 h-24"
                    placeholder="Welcome to {server}, {user}! 🎉"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Footer Text
                    </label>
                    <input
                      type="text"
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="Member #{membercount}"
                    />
                  </div>
                  <div className="flex items-center space-x-4 pt-8">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showThumbnail}
                        onChange={(e) => setShowThumbnail(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          showThumbnail ? "bg-blue-500" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            showThumbnail ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-white/80">
                        Show User Avatar
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Message Preview */}
            <div className="glass-button p-4 border border-green-500/30">
              <h5 className="text-sm font-medium text-white/80 mb-2">
                Preview:
              </h5>
              <div className="bg-discord-dark p-3 rounded">
                <div className="flex items-center mb-2">
                  <Image
                    src={"/js.jpg"}
                    alt="Bot Avatar"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  ></Image>
                  <span className="text-white font-medium">ALMAJLIS-BOT</span>
                  <span className="text-xs text-gray-400 ml-2">
                    Today at 12:00 PM
                  </span>
                </div>

                {!useEmbed ? (
                  // Simple message preview
                  <p className="text-white ml-13">
                    {replaceMessagePlaceholders(welcomeMessage)}
                  </p>
                ) : (
                  // Embed preview
                  <div className="ml-13">
                    <div
                      className="border-l-4 bg-gray-800/50 rounded p-4 max-w-md"
                      style={{ borderLeftColor: embedColor }}
                    >
                      {embedTitle && (
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {replaceMessagePlaceholders(embedTitle)}
                        </h3>
                      )}

                      <div className="flex items-start">
                        <div className="flex-1">
                          {embedDescription && (
                            <p className="text-gray-300 mb-3">
                              {replaceMessagePlaceholders(embedDescription)}
                            </p>
                          )}

                          {footerText && (
                            <div className="text-xs text-gray-400 mt-2">
                              {replaceMessagePlaceholders(footerText)}
                            </div>
                          )}
                        </div>

                        {showThumbnail && user?.avatar && (
                          <Image
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                            alt="User Avatar"
                            width={80}
                            height={80}
                            className="rounded-full ml-4"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <SaveButton handleSave={saveWelcomeSettings} loading={isLoading} />
          </div>
        )}
      </div>

      {/* Goodbye Messages */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-user-minus text-orange-400"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Goodbye Messages
              </h4>
              <p className="text-sm text-white/60">
                Say farewell to members who leave
              </p>
            </div>
          </div>
          <button
            onClick={() => setLeaveEnabled(!leaveEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              leaveEnabled ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                leaveEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {leaveEnabled && (
          <div className="space-y-4 p-4 glass-dark rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChannelSelect
                value={selectedLeaveChannel}
                onChange={setSelectedLeaveChannel}
                label="Leave Channel"
                placeholder="Select a channel..."
              />
            </div>

            {/* Message Type Toggle */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="messageType"
                  checked={!useLeaveEmbed}
                  onChange={() => setUseLeaveEmbed(false)}
                  className="sr-only"
                />
                <div
                  className={`glass-button px-4 py-2 transition-all duration-300 ${
                    !useLeaveEmbed
                      ? "bg-green-500/20 text-green-400"
                      : "text-white/70"
                  }`}
                >
                  <i className="bx bx-message mr-2"></i>
                  Message
                </div>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="messageType"
                  checked={useLeaveEmbed}
                  onChange={() => setUseLeaveEmbed(true)}
                  className="sr-only"
                />
                <div
                  className={`glass-button px-4 py-2 transition-all duration-300 ${
                    useLeaveEmbed
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-white/70"
                  }`}
                >
                  <i className="bx bx-card mr-2"></i>
                  Embed
                </div>
              </label>
            </div>

            {!useLeaveEmbed ? (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Leave Message
                </label>
                <textarea
                  value={leaveMessage}
                  onChange={(e) => setLeaveMessage(e.target.value)}
                  className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 h-24"
                  placeholder="Enter your goodbye message..."
                />
              </div>
            ) : (
              // Embed Configuration
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Embed Title
                    </label>
                    <input
                      type="text"
                      value={leaveEmbedTitle}
                      onChange={(e) => setLeaveEmbedTitle(e.target.value)}
                      className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="Welcome!"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Embed Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={leaveEmbedColor}
                        onChange={(e) => setLeaveEmbedColor(e.target.value)}
                        className="w-12 h-10 rounded glass-button border-none"
                      />
                      <input
                        type="text"
                        value={leaveEmbedColor}
                        onChange={(e) => setLeaveEmbedColor(e.target.value)}
                        className="flex-1 glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                        placeholder="#5865F2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Embed Description
                  </label>
                  <textarea
                    value={leaveEmbedDescription}
                    onChange={(e) => setLeaveEmbedDescription(e.target.value)}
                    className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 h-24"
                    placeholder="Welcome to {server}, {user}! 🎉"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Footer Text
                    </label>
                    <input
                      type="text"
                      value={leaveFooterText}
                      onChange={(e) => setLeaveFooterText(e.target.value)}
                      className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="Member #{membercount}"
                    />
                  </div>
                  <div className="flex items-center space-x-4 pt-8">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showLeaveThumbnail}
                        onChange={(e) =>
                          setShowLeaveThumbnail(e.target.checked)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          showLeaveThumbnail ? "bg-blue-500" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            showLeaveThumbnail
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-white/80">
                        Show User Avatar
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Message Preview */}
            <div className="glass-button p-4 border border-orange-500/30">
              <h5 className="text-sm font-medium text-white/80 mb-2">
                Preview:
              </h5>
              <div className="bg-discord-dark p-3 rounded">
                <div className="flex items-center mb-2">
                  <Image
                    src={"/js.jpg"}
                    alt="Bot Avatar"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  ></Image>
                  <span className="text-white font-medium">ALMAJLIS-BOT</span>
                  <span className="text-xs text-gray-400 ml-2">
                    Today at 12:00 PM
                  </span>
                </div>
                {!useLeaveEmbed ? (
                  // Simple message preview
                  <p className="text-white ml-13">
                    {replaceMessagePlaceholders(leaveMessage)}
                  </p>
                ) : (
                  // Embed preview
                  <div className="ml-13">
                    <div
                      className="border-l-4 bg-gray-800/50 rounded p-4 max-w-md"
                      style={{ borderLeftColor: leaveEmbedColor }}
                    >
                      {leaveEmbedTitle && (
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {replaceMessagePlaceholders(leaveEmbedTitle)}
                        </h3>
                      )}

                      <div className="flex items-start">
                        <div className="flex-1">
                          {leaveEmbedDescription && (
                            <p className="text-gray-300 mb-3">
                              {replaceMessagePlaceholders(
                                leaveEmbedDescription
                              )}
                            </p>
                          )}

                          {leaveFooterText && (
                            <div className="text-xs text-gray-400 mt-2">
                              {replaceMessagePlaceholders(leaveFooterText)}
                            </div>
                          )}
                        </div>

                        {showLeaveThumbnail && user?.avatar && (
                          <Image
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                            alt="User Avatar"
                            width={80}
                            height={80}
                            className="rounded-full ml-4"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <SaveButton handleSave={saveLeaveSettings} loading={isLoading} />
          </div>
        )}
      </div>

      {/* Message Placeholders */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-code text-blue-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Message Placeholders
            </h4>
            <p className="text-sm text-white/60">
              Use these placeholders in your messages
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placeholders.map((item, index) => (
            <div
              key={index}
              className="glass-button p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300 group"
            >
              <div>
                <code className="text-blue-400 font-mono text-sm bg-black/30 px-2 py-1 rounded">
                  {item.placeholder}
                </code>
                <p className="text-white/60 text-sm mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(item.placeholder)}
                className="glass-button p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-blue-400"
              >
                <i className="bx bx-copy"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
