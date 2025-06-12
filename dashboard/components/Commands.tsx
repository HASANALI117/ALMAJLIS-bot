"use client";

import { useState } from "react";

const CommandsComponent = () => {
  const [commands, setCommands] = useState([
    {
      id: 1,
      name: "welcome",
      description: "Send welcome message",
      enabled: true,
      usage: "!welcome @user",
    },
    {
      id: 2,
      name: "kick",
      description: "Kick a member",
      enabled: true,
      usage: "!kick @user [reason]",
    },
    {
      id: 3,
      name: "ban",
      description: "Ban a member",
      enabled: true,
      usage: "!ban @user [reason]",
    },
    {
      id: 4,
      name: "mute",
      description: "Mute a member",
      enabled: false,
      usage: "!mute @user [time]",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCommand, setShowAddCommand] = useState(false);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCommand = (id: number) => {
    setCommands(
      commands.map((cmd) =>
        cmd.id === id ? { ...cmd, enabled: !cmd.enabled } : cmd
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-terminal text-blue-400"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white text-glow">
                Command Management
              </h3>
              <p className="text-sm text-white/60">
                Configure and manage bot commands
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddCommand(!showAddCommand)}
            className="glass-button px-4 py-2 text-white hover:text-green-400 transition-all duration-300 group"
          >
            <i
              className={`bx ${
                showAddCommand ? "bx-x" : "bx-plus"
              } mr-2 group-hover:rotate-180 transition-transform duration-300`}
            ></i>
            {showAddCommand ? "Cancel" : "Add Command"}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4">
        <div className="relative">
          <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"></i>
          <input
            type="text"
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-button pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Add Command Form */}
      {showAddCommand && (
        <div className="glass-card p-6 border border-green-500/30">
          <h4 className="text-lg font-semibold text-white text-glow mb-4">
            Add New Command
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Command Name
              </label>
              <input
                type="text"
                className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                placeholder="e.g., greet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Usage Pattern
              </label>
              <input
                type="text"
                className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                placeholder="e.g., !greet @user"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <input
                type="text"
                className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                placeholder="Brief description of what this command does"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={() => setShowAddCommand(false)}
              className="glass-button px-4 py-2 text-white/70 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button className="glass-button px-6 py-2 text-white hover:text-green-400 transition-all duration-300">
              Add Command
            </button>
          </div>
        </div>
      )}

      {/* Commands List */}
      <div className="glass-card p-6">
        <div className="space-y-4">
          {filteredCommands.map((command) => (
            <div
              key={command.id}
              className={`glass-button p-4 transition-all duration-300 ${
                command.enabled ? "border-green-500/30" : "border-red-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      command.enabled ? "bg-green-400 pulse-glow" : "bg-red-400"
                    }`}
                  ></div>
                  <div>
                    <h4 className="text-white font-semibold">
                      !{command.name}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {command.description}
                    </p>
                    <p className="text-white/40 text-xs font-mono mt-1">
                      {command.usage}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCommand(command.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      command.enabled ? "bg-green-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        command.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <button className="glass-button p-2 text-white/60 hover:text-blue-400 transition-all duration-300">
                    <i className="bx bx-edit"></i>
                  </button>
                  <button className="glass-button p-2 text-white/60 hover:text-red-400 transition-all duration-300">
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {commands.filter((c) => c.enabled).length}
          </div>
          <div className="text-sm text-white/60">Active Commands</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {commands.filter((c) => !c.enabled).length}
          </div>
          <div className="text-sm text-white/60">Disabled Commands</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {commands.length}
          </div>
          <div className="text-sm text-white/60">Total Commands</div>
        </div>
      </div>
    </div>
  );
};

export default CommandsComponent;
