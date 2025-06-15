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
  const [goodbyeMessage, setGoodbyeMessage] = useState(
    "Goodbye {user}, we'll miss you! 👋"
  );

  const placeholders = [
    { placeholder: "{user}", description: "Mention the user" },
    { placeholder: "{server}", description: "Server name" },
    { placeholder: "{membercount}", description: "Total member count" },
    { placeholder: "{username}", description: "Username without mention" },
  ];

  const saveSettings = async () => {
    try {
      const { data } = await api.post(`/welcome/${guildId}`, {
        guildId,
        channelId: selectedWelcomeChannel,
        message: welcomeMessage,
      });
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
        setWelcomeMessage(data.message || "Welcome to {server}, {user}! 🎉");
        setWelcomeEnabled(!!data.channelId);
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

            {/* Message Preview */}
            <div className="glass-button p-4 border border-green-500/30">
              <h5 className="text-sm font-medium text-white/80 mb-2">
                Preview:
              </h5>
              <div className="bg-discord-dark p-3 rounded">
                <div className="flex items-center mb-2">
                  {/* <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <i className="bx bx-bot text-white text-sm"></i>
                  </div> */}
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
                  {welcomeMessage
                    .replace("{user}", `@${user?.username}`)
                    .replace("{server}", `${guild?.name}`)
                    .replace("{membercount}", "1,234")
                    .replace("{username}", `${user?.username}`)}
                </p>
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
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <i className="bx bx-bot text-white text-sm"></i>
                  </div>
                  <span className="text-white font-medium">ALMAJLIS-BOT</span>
                  <span className="text-xs text-gray-400 ml-2">
                    Today at 12:00 PM
                  </span>
                </div>
                <p className="text-white">
                  {goodbyeMessage
                    .replace("{user}", "LeftUser")
                    .replace("{server}", "Your Server")
                    .replace("{membercount}", "1,233")
                    .replace("{username}", "LeftUser")}
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
