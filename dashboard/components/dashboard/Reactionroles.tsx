"use client";

import { useState } from "react";
import ChannelSelect from "../common/ChannelSelect";

const ReactionrolesComponent = () => {
  const [reactionRoles, setReactionRoles] = useState([
    {
      id: 1,
      emoji: "🎮",
      role: "Gamer",
      roleId: "123456789",
      messageId: "msg_001",
    },
    {
      id: 2,
      emoji: "🎵",
      role: "Music Lover",
      roleId: "987654321",
      messageId: "msg_001",
    },
    {
      id: 3,
      emoji: "�",
      role: "Book Club",
      roleId: "456789123",
      messageId: "msg_002",
    },
  ]);

  const [selectedChannel, setSelectedChannel] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRole, setNewRole] = useState({
    emoji: "",
    role: "",
    messageId: "",
  });

  const availableRoles = [
    { id: "role_001", name: "Gamer" },
    { id: "role_002", name: "Artist" },
    { id: "role_003", name: "Developer" },
    { id: "role_004", name: "Music Lover" },
  ];

  const removeReactionRole = (id: number) => {
    setReactionRoles(reactionRoles.filter((rr) => rr.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-happy text-yellow-400"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white text-glow">
                Reaction Roles
              </h3>
              <p className="text-sm text-white/60">
                Let users assign roles by reacting to messages
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="glass-button px-4 py-2 text-white hover:text-yellow-400 transition-all duration-300 group"
          >
            <i
              className={`bx ${
                showAddForm ? "bx-x" : "bx-plus"
              } mr-2 group-hover:rotate-180 transition-transform duration-300`}
            ></i>
            {showAddForm ? "Cancel" : "Add Reaction Role"}
          </button>
        </div>
      </div>

      {/* Add Reaction Role Form */}
      {showAddForm && (
        <div className="glass-card p-6 border border-yellow-500/30">
          <h4 className="text-lg font-semibold text-white text-glow mb-4">
            Add New Reaction Role
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <ChannelSelect
                value={selectedChannel}
                onChange={setSelectedChannel}
                label="Channel"
                placeholder="Select a channel..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Role
              </label>
              <select
                value={newRole.role}
                onChange={(e) =>
                  setNewRole({ ...newRole, role: e.target.value })
                }
                className="w-full glass-button px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300"
              >
                <option value="">Select a role...</option>
                {availableRoles.map((role) => (
                  <option key={role.id} value={role.name}>
                    @{role.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Emoji
              </label>
              <input
                type="text"
                value={newRole.emoji}
                onChange={(e) =>
                  setNewRole({ ...newRole, emoji: e.target.value })
                }
                className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300"
                placeholder="🎮 or :emoji_name:"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Message ID (Optional)
              </label>
              <input
                type="text"
                value={newRole.messageId}
                onChange={(e) =>
                  setNewRole({ ...newRole, messageId: e.target.value })
                }
                className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300"
                placeholder="Leave empty to create new message"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="glass-button px-4 py-2 text-white/70 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button className="glass-button px-6 py-2 text-white hover:text-yellow-400 transition-all duration-300">
              Add Reaction Role
            </button>
          </div>
        </div>
      )}

      {/* Current Reaction Roles */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-list-ul text-blue-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Active Reaction Roles
            </h4>
            <p className="text-sm text-white/60">
              Currently configured reaction roles
            </p>
          </div>
        </div>

        {reactionRoles.length > 0 ? (
          <div className="space-y-3">
            {reactionRoles.map((reactionRole) => (
              <div
                key={reactionRole.id}
                className="glass-button p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{reactionRole.emoji}</div>
                  <div>
                    <h5 className="text-white font-medium">
                      @{reactionRole.role}
                    </h5>
                    <p className="text-sm text-white/60">
                      Message ID: {reactionRole.messageId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="glass-button p-2 text-white/60 hover:text-blue-400 transition-all duration-300">
                    <i className="bx bx-edit"></i>
                  </button>
                  <button
                    onClick={() => removeReactionRole(reactionRole.id)}
                    className="glass-button p-2 text-white/60 hover:text-red-400 transition-all duration-300"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="glass-button p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i className="bx bx-emoji-neutral text-2xl text-white/40"></i>
            </div>
            <p className="text-white/60">No reaction roles configured yet</p>
            <p className="text-sm text-white/40 mt-1">
              Add your first reaction role above
            </p>
          </div>
        )}
      </div>

      {/* Quick Setup Templates */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-palette text-purple-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Quick Setup Templates
            </h4>
            <p className="text-sm text-white/60">
              Pre-made reaction role setups
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Gaming Roles",
              description: "Common gaming platform roles",
              roles: [
                "🎮 Gamer",
                "🎯 FPS Player",
                "🏎️ Racing Fan",
                "⚽ Sports Gamer",
              ],
              color: "border-green-500/30",
            },
            {
              name: "Interest Roles",
              description: "Hobby and interest based roles",
              roles: ["🎵 Music", "📚 Books", "🎨 Art", "💻 Tech"],
              color: "border-blue-500/30",
            },
            {
              name: "Notification Roles",
              description: "Announcement and ping roles",
              roles: ["📢 Announcements", "🎉 Events", "📰 News", "🔔 Updates"],
              color: "border-purple-500/30",
            },
            {
              name: "Color Roles",
              description: "Cosmetic color roles",
              roles: ["🔴 Red", "🔵 Blue", "🟢 Green", "🟡 Yellow"],
              color: "border-pink-500/30",
            },
          ].map((template, index) => (
            <div
              key={index}
              className={`glass-button p-4 border ${template.color} hover:bg-white/10 transition-all duration-300 group`}
            >
              <h5 className="text-white font-medium mb-2">{template.name}</h5>
              <p className="text-sm text-white/60 mb-3">
                {template.description}
              </p>
              <div className="space-y-1 mb-3">
                {template.roles.map((role, roleIndex) => (
                  <div
                    key={roleIndex}
                    className="text-xs text-white/70 bg-black/20 px-2 py-1 rounded inline-block mr-1"
                  >
                    {role}
                  </div>
                ))}
              </div>
              <button className="w-full glass-dark py-2 px-3 text-sm text-white/80 hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-4">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-cog text-gray-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Reaction Role Settings
            </h4>
            <p className="text-sm text-white/60">
              Configure reaction role behavior
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Remove reaction after role assignment", enabled: true },
            { label: "Allow multiple roles per user", enabled: true },
            { label: "Send DM confirmation to user", enabled: false },
            { label: "Log role changes to mod channel", enabled: true },
            {
              label: "Require verification for role assignment",
              enabled: false,
            },
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {reactionRoles.length}
          </div>
          <div className="text-sm text-white/60">Active Roles</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">147</div>
          <div className="text-sm text-white/60">Role Assignments</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">23</div>
          <div className="text-sm text-white/60">Today&apos;s Reactions</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">89%</div>
          <div className="text-sm text-white/60">Success Rate</div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="glass-button px-8 py-3 text-white hover:text-yellow-400 font-semibold transition-all duration-300 group">
          <i className="bx bx-save mr-2 group-hover:scale-110 transition-transform duration-300"></i>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ReactionrolesComponent;
