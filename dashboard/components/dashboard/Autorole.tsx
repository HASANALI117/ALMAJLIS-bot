"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/axios";
import { AutoroleSettings, Role } from "@/utils/types";
import { useGuild } from "@/contexts";
import Loading from "../common/Loading";
import SaveButton from "../ui/SaveButton";

const AutoroleComponent = () => {
  const { guildId } = useParams();
  const { guild } = useGuild();
  const [autoroleEnabled, setAutoroleEnabled] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  const availableRoles = guild?.roles || [];

  // Convert Discord color integer to hex
  const getColorHex = (color: number) => {
    if (color === 0) return "#99AAB5"; // Default Discord color
    return `#${color.toString(16).padStart(6, "0")}`;
  };

  // Fetch autorole settings
  const fetchAutoroleSettings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<AutoroleSettings>(`/autorole/${guildId}`);
      setAutoroleEnabled(data.enabled);
      // Find and set the role object based on roleId
      if (data.roleId) {
        const role = availableRoles.find((r) => r.id === data.roleId);
        setSelectedRole(role || null);
      } else {
        setSelectedRole(null);
      }
    } catch (error) {
      console.error("Error fetching autorole settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save autorole settings
  const saveSettings = async () => {
    try {
      const payload: AutoroleSettings = {
        enabled: autoroleEnabled,
        roleId: autoroleEnabled && selectedRole ? selectedRole.id : null,
      };
      await api.post(`/autorole/${guildId}`, payload);
      console.log("Autorole settings saved");
    } catch (error) {
      console.error("Error saving autorole settings:", error);
    }
  };

  // Handle role selection change
  const handleRoleChange = (roleId: string) => {
    if (roleId === "") {
      setSelectedRole(null);
    } else {
      const role = availableRoles.find((r) => r.id === roleId);
      setSelectedRole(role || null);
    }
  };

  useEffect(() => {
    if (availableRoles.length > 0) {
      fetchAutoroleSettings();
    }
  }, [guildId, availableRoles.length]);

  if (loading) {
    return <Loading title="Loading Autorole Settings" />;
  }

  return (
    <div className="space-y-6">
      {/* Auto Role Configuration */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="glass-button p-2 rounded-full mr-3">
              <i className="bx bx-user-check text-blue-400"></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Auto Role Assignment
              </h4>
              <p className="text-sm text-white/60">
                Automatically assign roles to new members
              </p>
            </div>
          </div>
          <button
            onClick={() => setAutoroleEnabled(!autoroleEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              autoroleEnabled ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                autoroleEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {autoroleEnabled && (
          <div className="space-y-4 p-4 glass-dark rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Role to Assign
                </label>
                <select
                  value={selectedRole?.id || ""}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full glass-button px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                >
                  <option value="">Select a role...</option>
                  {availableRoles.map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                      className="text-black"
                    >
                      @{role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role Preview */}
            {selectedRole && (
              <div className="glass-button p-4 border border-blue-500/30">
                <h5 className="text-sm font-medium text-white/80 mb-2">
                  Preview:
                </h5>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor: getColorHex(selectedRole.color),
                    }}
                  ></div>
                  <span className="text-white font-medium">
                    @{selectedRole.name}
                  </span>
                  <span className="text-xs text-white/60 ml-2">
                    will be assigned to new members
                  </span>
                </div>
                <div className="mt-2 text-xs text-white/50">
                  Position: {selectedRole.position} •
                  {selectedRole.mentionable
                    ? " Mentionable"
                    : " Not Mentionable"}{" "}
                  •
                  {selectedRole.hoist
                    ? " Displayed Separately"
                    : " Not Hoisted"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Save Button */}
      <SaveButton handleSave={saveSettings} loading={loading} />
    </div>
  );
};

export default AutoroleComponent;
