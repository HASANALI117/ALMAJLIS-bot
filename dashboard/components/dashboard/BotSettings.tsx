"use client";

import { useState } from "react";

const BotSettings = () => {
  const [botName, setBotName] = useState("ALMAJLIS-BOT");
  const [prefixes, setPrefixes] = useState(["!", "?", "."]);
  const [newPrefix, setNewPrefix] = useState("");

  const handleAddPrefix = () => {
    if (newPrefix && !prefixes.includes(newPrefix)) {
      setPrefixes([...prefixes, newPrefix]);
      setNewPrefix("");
    }
  };

  const handleRemovePrefix = (prefix: string) => {
    setPrefixes(prefixes.filter((p) => p !== prefix));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nickname Section */}
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-user text-blue-400"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white text-glow">
                Bot Nickname
              </h3>
              <p className="text-sm text-white/60">
                Set the bot&apos;s display name in the server
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="flex-1 glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-white/30 transition-all duration-300"
              placeholder="Enter bot nickname"
            />
            {/* <button className="glass-button px-6 py-3 text-white hover:text-blue-400 font-medium transition-all duration-300 group">
            <i className="bx bx-check mr-2 group-hover:scale-110 transition-transform duration-300"></i>
            Apply
          </button> */}
          </div>
        </div>

        {/* Bot Status Section */}
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-broadcast text-green-400"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white text-glow">
                Bot Status
              </h3>
              <p className="text-sm text-white/60">
                Configure bot presence and activity
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Status Type
              </label>
              <select className="w-full glass-button px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300">
                <option value="playing">Playing</option>
                <option value="listening">Listening to</option>
                <option value="watching">Watching</option>
                <option value="competing">Competing in</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Activity Text
              </label>
              <input
                type="text"
                className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                placeholder="Enter activity text"
                defaultValue="Managing the server"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Prefix Section */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-code text-purple-400"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white text-glow">
              Command Prefixes
            </h3>
            <p className="text-sm text-white/60">
              Set custom prefixes for bot commands
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={newPrefix}
            onChange={(e) => setNewPrefix(e.target.value)}
            className="flex-1 glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/30 transition-all duration-300"
            placeholder="Enter new prefix (e.g., !)"
            maxLength={5}
          />
          <button
            onClick={handleAddPrefix}
            className="glass-button px-6 py-3 text-white hover:text-purple-400 font-medium transition-all duration-300 group"
          >
            <i className="bx bx-plus mr-2 group-hover:rotate-180 transition-transform duration-300"></i>
            Add
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-white/80 mb-2">
            Current Prefixes:
          </h4>
          {prefixes.map((prefix, index) => (
            <div
              key={index}
              className="glass-button p-3 flex justify-between items-center group hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center">
                <span className="text-xs px-2 py-1 glass-dark rounded text-white/90 mr-3 font-mono">
                  {prefix}
                </span>
                <span className="text-white/70">Command prefix</span>
              </div>
              <button
                onClick={() => handleRemovePrefix(prefix)}
                className="text-white/40 hover:text-red-400 transition-colors duration-300 opacity-0 group-hover:opacity-100"
              >
                <i className="bx bx-trash text-lg"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="glass-button px-8 py-3 text-white hover:text-blue-400 font-semibold transition-all duration-300 group">
          <i className="bx bx-save mr-2 group-hover:scale-110 transition-transform duration-300"></i>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default BotSettings;
