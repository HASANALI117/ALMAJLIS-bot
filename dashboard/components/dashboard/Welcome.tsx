"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ChannelSelect from "../common/ChannelSelect";
import api from "@/utils/axios";
import { useParams } from "next/navigation";
import { useAuth, useGuild } from "@/contexts";

const WelcomeComponent = () => {
  const { guildId } = useParams();
  const { guild } = useGuild();
  const { user } = useAuth();
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [goodbyeEnabled, setGoodbyeEnabled] = useState(false);
  const [selectedWelcomeChannel, setSelectedWelcomeChannel] = useState("");
  const [selectedGoodbyeChannel, setSelectedGoodbyeChannel] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to {server}, {user}! 🎉"
  );

  // New embed states
  const [useEmbed, setUseEmbed] = useState(false);
  const [embedTitle, setEmbedTitle] = useState("Welcome!");
  const [embedDescription, setEmbedDescription] = useState(
    "Welcome to {server}, {user}! 🎉"
  );
  const [embedColor, setEmbedColor] = useState("#5865F2");
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [footerText, setFooterText] = useState("Member #{membercount}");

  const [goodbyeMessage, setGoodbyeMessage] = useState(
    "Goodbye {user}, we'll miss you! 👋"
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

  const saveSettings = async () => {
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
      console.log("Settings saved:", data);
    } catch (error) {
      console.error("Error saving settings:", error);
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

  useEffect(() => {
    fetchWelcomeSettings();
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
              <div className="flex items-end">
                <button className="glass-button px-6 py-3 text-white hover:text-green-400 font-medium transition-all duration-300 group">
                  <i className="bx bx-test-tube mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Test Message
                </button>
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
                  Simple Message
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
                  Rich Embed
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
            onClick={() => setGoodbyeEnabled(!goodbyeEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              goodbyeEnabled ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                goodbyeEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {goodbyeEnabled && (
          <div className="space-y-4 p-4 glass-dark rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ChannelSelect
                  value={selectedGoodbyeChannel}
                  onChange={setSelectedGoodbyeChannel}
                  label="Goodbye Channel"
                  placeholder="Select a channel..."
                />
              </div>
              <div className="flex items-end">
                <button className="glass-button px-6 py-3 text-white hover:text-orange-400 font-medium transition-all duration-300 group">
                  <i className="bx bx-test-tube mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Test Message
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Goodbye Message
              </label>
              <textarea
                value={goodbyeMessage}
                onChange={(e) => setGoodbyeMessage(e.target.value)}
                className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 h-24"
                placeholder="Enter your goodbye message..."
              />
            </div>

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
                <p className="text-white">
                  {replaceMessagePlaceholders(goodbyeMessage)}
                </p>
              </div>
            </div>
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

      {/* Advanced Settings */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-cog text-purple-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Advanced Settings
            </h4>
            <p className="text-sm text-white/60">
              Additional welcome/goodbye options
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Delete message after 30 seconds", enabled: false },
            { label: "Send message as DM to user", enabled: false },
            { label: "Include server invite link", enabled: true },
            { label: "Show user avatar in message", enabled: true },
            { label: "Auto-assign default role", enabled: false },
          ].map((setting, index) => (
            <div
              key={index}
              className="glass-button p-3 flex items-center justify-between"
            >
              <span className="text-white/80">{setting.label}</span>
              <button
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
                  setting.enabled ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                    setting.enabled ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">24</div>
          <div className="text-sm text-white/60">Members Welcomed Today</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-400 mb-1">3</div>
          <div className="text-sm text-white/60">Members Left Today</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">1,847</div>
          <div className="text-sm text-white/60">Total Members</div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="glass-button px-8 py-3 text-white hover:text-pink-400 font-semibold transition-all duration-300 group"
          onClick={saveSettings}
        >
          <i className="bx bx-save mr-2 group-hover:scale-110 transition-transform duration-300"></i>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default WelcomeComponent;
