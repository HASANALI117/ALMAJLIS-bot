"use client";

import { useState } from "react";

const AutomodComponent = () => {
  const [spamProtection, setSpamProtection] = useState(true);
  const [linkFilter, setLinkFilter] = useState(false);
  const [raidProtection, setRaidProtection] = useState(true);

  return (
    <div className="space-y-6">
      {/* Spam Protection */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-message-x text-orange-400"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Spam Protection
              </h4>
              <p className="text-sm text-white/60">
                Prevent message spam and flooding
              </p>
            </div>
          </div>
          <button
            onClick={() => setSpamProtection(!spamProtection)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              spamProtection ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                spamProtection ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {spamProtection && (
          <div className="space-y-4 mt-4 p-4 glass-dark rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Messages per 5 seconds
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  defaultValue="5"
                  className="w-full glass-button px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Action
                </label>
                <select className="w-full glass-button px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300">
                  <option>Timeout (1 minute)</option>
                  <option>Timeout (5 minutes)</option>
                  <option>Timeout (1 hour)</option>
                  <option>Kick user</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Link Filter */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-link text-blue-400"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Link Filter</h4>
              <p className="text-sm text-white/60">
                Filter and control link sharing
              </p>
            </div>
          </div>
          <button
            onClick={() => setLinkFilter(!linkFilter)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              linkFilter ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                linkFilter ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {linkFilter && (
          <div className="space-y-4 mt-4 p-4 glass-dark rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Filter Type
                </label>
                <div className="space-y-2">
                  {[
                    { id: "discord", label: "Discord invites", checked: true },
                    { id: "all", label: "All links", checked: false },
                    { id: "custom", label: "Custom domains", checked: false },
                  ].map((filter) => (
                    <div key={filter.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={filter.id}
                        defaultChecked={filter.checked}
                        className="rounded bg-transparent border-white/30 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-transparent"
                      />
                      <label
                        htmlFor={filter.id}
                        className="ml-2 text-sm text-white/80"
                      >
                        {filter.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Whitelisted domains
                </label>
                <textarea
                  className="w-full glass-button px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 h-24"
                  placeholder="youtube.com&#10;github.com&#10;discord.gg"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Raid Protection */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-shield-quarter text-purple-400"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Raid Protection
              </h4>
              <p className="text-sm text-white/60">
                Protect against coordinated attacks
              </p>
            </div>
          </div>
          <button
            onClick={() => setRaidProtection(!raidProtection)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              raidProtection ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                raidProtection ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {raidProtection && (
          <div className="space-y-4 mt-4 p-4 glass-dark rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Join rate threshold (users/minute)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  defaultValue="10"
                  className="w-full glass-button px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Action
                </label>
                <select className="w-full glass-button px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300">
                  <option>Alert moderators</option>
                  <option>Enable verification</option>
                  <option>Lock server</option>
                  <option>Ban new users</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auto Actions */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-zap text-yellow-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Automated Actions
            </h4>
            <p className="text-sm text-white/60">
              Configure automatic responses to violations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "bx-trash",
              label: "Delete violating messages",
              enabled: true,
              color: "text-red-400",
            },
            {
              icon: "bx-message-dots",
              label: "Send warning message",
              enabled: true,
              color: "text-orange-400",
            },
            {
              icon: "bx-time",
              label: "Timeout repeat offenders",
              enabled: false,
              color: "text-purple-400",
            },
            {
              icon: "bx-note",
              label: "Log all violations",
              enabled: true,
              color: "text-blue-400",
            },
          ].map((action, index) => (
            <div
              key={index}
              className="glass-button p-3 flex items-center justify-between"
            >
              <div className="flex items-center">
                <i className={`bx ${action.icon} ${action.color} mr-3`}></i>
                <span className="text-white/80">{action.label}</span>
              </div>
              <button
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
                  action.enabled ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                    action.enabled ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="glass-button px-8 py-3 text-white hover:text-red-400 font-semibold transition-all duration-300 group">
          <i className="bx bx-save mr-2 group-hover:scale-110 transition-transform duration-300"></i>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AutomodComponent;
