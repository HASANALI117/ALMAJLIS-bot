"use client";

import { useState } from "react";
import ChannelSelect from "../common/ChannelSelect";

const LoggingComponent = () => {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [logTypes, setLogTypes] = useState({
    messageDelete: true,
    messageEdit: true,
    memberJoin: true,
    memberLeave: true,
    memberBan: true,
    memberUnban: false,
    channelCreate: true,
    channelDelete: true,
    roleCreate: false,
    roleDelete: false,
    voiceJoin: false,
    voiceLeave: false,
  });

  const toggleLogType = (type: keyof typeof logTypes) => {
    setLogTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="space-y-6">
      {/* Log Channel Selection */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-hash text-green-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Log Channel</h4>
            <p className="text-sm text-white/60">
              Select channel for server logs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ChannelSelect
              value={selectedChannel}
              onChange={setSelectedChannel}
              label="Primary Log Channel"
              placeholder="Select a channel..."
            />
          </div>
          <div className="flex items-end">
            <button className="glass-button px-6 py-3 text-white hover:text-green-400 font-medium transition-all duration-300 group">
              <i className="bx bx-plus mr-2 group-hover:rotate-180 transition-transform duration-300"></i>
              Create Log Channel
            </button>
          </div>
        </div>
      </div>

      {/* Message Logs */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-message text-purple-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Message Logs</h4>
            <p className="text-sm text-white/60">
              Track message-related activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: "messageDelete",
              icon: "bx-trash",
              label: "Message Deletions",
              color: "text-red-400",
            },
            {
              key: "messageEdit",
              icon: "bx-edit",
              label: "Message Edits",
              color: "text-orange-400",
            },
          ].map((log) => (
            <div
              key={log.key}
              className="glass-button p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center">
                <i className={`bx ${log.icon} ${log.color} mr-3 text-lg`}></i>
                <span className="text-white/80">{log.label}</span>
              </div>
              <button
                onClick={() => toggleLogType(log.key as keyof typeof logTypes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  logTypes[log.key as keyof typeof logTypes]
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    logTypes[log.key as keyof typeof logTypes]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Member Logs */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-user text-blue-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Member Logs</h4>
            <p className="text-sm text-white/60">
              Track member-related activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: "memberJoin",
              icon: "bx-user-plus",
              label: "Member Joins",
              color: "text-green-400",
            },
            {
              key: "memberLeave",
              icon: "bx-user-minus",
              label: "Member Leaves",
              color: "text-yellow-400",
            },
            {
              key: "memberBan",
              icon: "bx-user-x",
              label: "Member Bans",
              color: "text-red-400",
            },
            {
              key: "memberUnban",
              icon: "bx-user-check",
              label: "Member Unbans",
              color: "text-blue-400",
            },
          ].map((log) => (
            <div
              key={log.key}
              className="glass-button p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center">
                <i className={`bx ${log.icon} ${log.color} mr-3 text-lg`}></i>
                <span className="text-white/80">{log.label}</span>
              </div>
              <button
                onClick={() => toggleLogType(log.key as keyof typeof logTypes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  logTypes[log.key as keyof typeof logTypes]
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    logTypes[log.key as keyof typeof logTypes]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Server Logs */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-server text-pink-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Server Logs</h4>
            <p className="text-sm text-white/60">
              Track server configuration changes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: "channelCreate",
              icon: "bx-plus-circle",
              label: "Channel Created",
              color: "text-green-400",
            },
            {
              key: "channelDelete",
              icon: "bx-minus-circle",
              label: "Channel Deleted",
              color: "text-red-400",
            },
            {
              key: "roleCreate",
              icon: "bx-crown",
              label: "Role Created",
              color: "text-purple-400",
            },
            {
              key: "roleDelete",
              icon: "bx-crown",
              label: "Role Deleted",
              color: "text-orange-400",
            },
          ].map((log) => (
            <div
              key={log.key}
              className="glass-button p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center">
                <i className={`bx ${log.icon} ${log.color} mr-3 text-lg`}></i>
                <span className="text-white/80">{log.label}</span>
              </div>
              <button
                onClick={() => toggleLogType(log.key as keyof typeof logTypes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  logTypes[log.key as keyof typeof logTypes]
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    logTypes[log.key as keyof typeof logTypes]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Logs */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-microphone text-cyan-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Voice Logs</h4>
            <p className="text-sm text-white/60">
              Track voice channel activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: "voiceJoin",
              icon: "bx-phone-call",
              label: "Voice Channel Joins",
              color: "text-green-400",
            },
            {
              key: "voiceLeave",
              icon: "bx-phone-off",
              label: "Voice Channel Leaves",
              color: "text-red-400",
            },
          ].map((log) => (
            <div
              key={log.key}
              className="glass-button p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center">
                <i className={`bx ${log.icon} ${log.color} mr-3 text-lg`}></i>
                <span className="text-white/80">{log.label}</span>
              </div>
              <button
                onClick={() => toggleLogType(log.key as keyof typeof logTypes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  logTypes[log.key as keyof typeof logTypes]
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    logTypes[log.key as keyof typeof logTypes]
                      ? "translate-x-6"
                      : "translate-x-1"
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
          <div className="text-2xl font-bold text-green-400 mb-1">
            {Object.values(logTypes).filter(Boolean).length}
          </div>
          <div className="text-sm text-white/60">Active Log Types</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
          <div className="text-sm text-white/60">Monitoring</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">∞</div>
          <div className="text-sm text-white/60">Log Retention</div>
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

export default LoggingComponent;
