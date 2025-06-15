"use client";

import { useState } from "react";
import ChannelSelect from "../common/ChannelSelect";

const GamealertsComponent = () => {
  const [gameAlerts, setGameAlerts] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [alertTypes, setAlertTypes] = useState({
    newGame: true,
    gameUpdate: false,
    freeGames: true,
    releases: true,
    sales: false,
  });

  const toggleAlertType = (type: keyof typeof alertTypes) => {
    setAlertTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="space-y-6">
      {gameAlerts && (
        <>
          {/* Channel Selection */}
          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <div className="glass-button p-2 rounded-full mr-3">
                <i className="bx bx-hash text-blue-400"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Alert Channel
                </h4>
                <p className="text-sm text-white/60">
                  Select channel for game alerts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ChannelSelect
                  value={selectedChannel}
                  onChange={setSelectedChannel}
                  label="Channel"
                  placeholder="Select a channel..."
                />
              </div>
              <div className="flex items-end">
                <button className="glass-button px-6 py-3 text-white hover:text-blue-400 font-medium transition-all duration-300 group">
                  <i className="bx bx-test-tube mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  Test Alert
                </button>
              </div>
            </div>
          </div>

          {/* Alert Types */}
          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <div className="glass-button p-2 rounded-full mr-3">
                <i className="bx bx-bell text-yellow-400"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Alert Types
                </h4>
                <p className="text-sm text-white/60">
                  Choose what game alerts to receive
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: "newGame",
                  icon: "bx-joystick",
                  label: "New Game Releases",
                  description: "Latest game releases and announcements",
                  color: "text-green-400",
                },
                {
                  key: "gameUpdate",
                  icon: "bx-refresh",
                  label: "Game Updates",
                  description: "Major game updates and patches",
                  color: "text-blue-400",
                },
                {
                  key: "freeGames",
                  icon: "bx-gift",
                  label: "Free Games",
                  description: "Free game giveaways and promotions",
                  color: "text-purple-400",
                },
                {
                  key: "releases",
                  icon: "bx-calendar",
                  label: "Upcoming Releases",
                  description: "Games releasing soon",
                  color: "text-orange-400",
                },
                {
                  key: "sales",
                  icon: "bx-purchase-tag",
                  label: "Game Sales",
                  description: "Sales and discounts on games",
                  color: "text-red-400",
                },
              ].map((alert) => (
                <div
                  key={alert.key}
                  className="glass-button p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <i
                        className={`bx ${alert.icon} ${alert.color} mr-3 text-xl`}
                      ></i>
                      <span className="text-white font-medium">
                        {alert.label}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        toggleAlertType(alert.key as keyof typeof alertTypes)
                      }
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
                        alertTypes[alert.key as keyof typeof alertTypes]
                          ? "bg-green-500"
                          : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                          alertTypes[alert.key as keyof typeof alertTypes]
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-white/60 ml-8">
                    {alert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Games */}
          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <div className="glass-button p-2 rounded-full mr-3">
                <i className="bx bx-trending-up text-pink-400"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Popular Games
                </h4>
                <p className="text-sm text-white/60">
                  Track specific games for updates
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Valorant", icon: "🎯", players: "1.2M" },
                { name: "League of Legends", icon: "⚔️", players: "2.1M" },
                { name: "CS2", icon: "💣", players: "950K" },
                { name: "Apex Legends", icon: "🎮", players: "800K" },
                { name: "Fortnite", icon: "🌪️", players: "3.2M" },
                { name: "Minecraft", icon: "🧱", players: "1.8M" },
              ].map((game, index) => (
                <div
                  key={index}
                  className="glass-button p-4 text-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="text-2xl mb-2">{game.icon}</div>
                  <h5 className="text-white font-medium mb-1">{game.name}</h5>
                  <p className="text-sm text-white/60">{game.players} active</p>
                  <button className="mt-2 text-xs px-3 py-1 glass-dark rounded-full text-white/80 hover:text-green-400 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                    Track Updates
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Settings */}
          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <div className="glass-button p-2 rounded-full mr-3">
                <i className="bx bx-cog text-gray-400"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Alert Settings
                </h4>
                <p className="text-sm text-white/60">
                  Customize alert frequency and format
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Alert Frequency
                </label>
                <select className="w-full glass-button px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300">
                  <option>Instant</option>
                  <option>Every 30 minutes</option>
                  <option>Hourly</option>
                  <option>Daily summary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Mention Role
                </label>
                <select className="w-full glass-button px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300">
                  <option>@everyone</option>
                  <option>@here</option>
                  <option>@gamers</option>
                  <option>No mentions</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Include game thumbnails",
                "Show release dates",
                "Include pricing information",
                "Add direct store links",
              ].map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between glass-button p-3"
                >
                  <span className="text-white/80">{option}</span>
                  <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-green-500 transition-colors duration-300">
                    <span className="inline-block h-3 w-3 transform translate-x-5 rounded-full bg-white transition-transform duration-300" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {Object.values(alertTypes).filter(Boolean).length}
              </div>
              <div className="text-sm text-white/60">Active Alerts</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">47</div>
              <div className="text-sm text-white/60">Games Tracked</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">12</div>
              <div className="text-sm text-white/60">Alerts Today</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">3</div>
              <div className="text-sm text-white/60">Free Games</div>
            </div>
          </div>
        </>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="glass-button px-8 py-3 text-white hover:text-green-400 font-semibold transition-all duration-300 group">
          <i className="bx bx-save mr-2 group-hover:scale-110 transition-transform duration-300"></i>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default GamealertsComponent;
