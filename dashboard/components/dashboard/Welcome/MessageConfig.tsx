import React from "react";

interface MessageConfigProps {
  message: string;
  onChange: (message: string) => void;
  placeholder: string;
  label: string;
}

const MessageConfig = ({
  message,
  onChange,
  placeholder,
  label,
}: MessageConfigProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">
        {label}
      </label>
      <textarea
        value={message}
        onChange={(e) => onChange(e.target.value)}
        className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 h-24"
        placeholder={placeholder}
      />
    </div>
  );
};

export default MessageConfig;
