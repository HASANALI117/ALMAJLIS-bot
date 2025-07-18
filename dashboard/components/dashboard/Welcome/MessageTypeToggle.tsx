import React from "react";

interface MessageTypeToggleProps {
  useEmbed: boolean;
  onToggle: (useEmbed: boolean) => void;
}

const MessageTypeToggle = ({ useEmbed, onToggle }: MessageTypeToggleProps) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="messageType"
          checked={!useEmbed}
          onChange={() => onToggle(false)}
          className="sr-only"
        />
        <div
          className={`glass-button px-4 py-2 transition-all duration-300 ${
            !useEmbed ? "bg-green-500/20 text-green-400" : "text-white/70"
          }`}
        >
          <i className="bx bx-message mr-2"></i>
          Message
        </div>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="messageType"
          checked={useEmbed}
          onChange={() => onToggle(true)}
          className="sr-only"
        />
        <div
          className={`glass-button px-4 py-2 transition-all duration-300 ${
            useEmbed ? "bg-blue-500/20 text-blue-400" : "text-white/70"
          }`}
        >
          <i className="bx bx-card mr-2"></i>
          Embed
        </div>
      </label>
    </div>
  );
};

export default MessageTypeToggle;
