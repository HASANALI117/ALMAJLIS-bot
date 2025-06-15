"use client";

import { useGuild } from "@/contexts";

interface ChannelSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const ChannelSelect = ({
  value,
  onChange,
  placeholder = "Select a channel...",
  label,
}: ChannelSelectProps) => {
  const { channels, loading } = useGuild();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full glass-button px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
        disabled={loading}
      >
        <option value="" className="text-black">
          {loading ? "Loading channels..." : placeholder}
        </option>
        {channels.map((channel) => (
          <option key={channel.id} value={channel.id} className="text-black">
            #{channel.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChannelSelect;
