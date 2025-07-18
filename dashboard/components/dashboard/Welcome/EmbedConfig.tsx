import React from "react";

interface EmbedConfigProps {
  embedTitle: string;
  embedDescription: string;
  embedColor: string;
  footerText: string;
  showThumbnail: boolean;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onColorChange: (color: string) => void;
  onFooterChange: (footer: string) => void;
  onThumbnailToggle: (show: boolean) => void;
}

const EmbedConfig = ({
  embedTitle,
  embedDescription,
  embedColor,
  footerText,
  showThumbnail,
  onTitleChange,
  onDescriptionChange,
  onColorChange,
  onFooterChange,
  onThumbnailToggle,
}: EmbedConfigProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Embed Title
          </label>
          <input
            type="text"
            value={embedTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            placeholder="Welcome!"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Embed Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={embedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-12 h-10 rounded glass-button border-none"
            />
            <input
              type="text"
              value={embedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="flex-1 glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              placeholder="#5865F2"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Embed Description
        </label>
        <textarea
          value={embedDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 h-24"
          placeholder="Welcome to {server}, {user}! 🎉"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Footer Text
          </label>
          <input
            type="text"
            value={footerText}
            onChange={(e) => onFooterChange(e.target.value)}
            className="w-full glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            placeholder="Member #{membercount}"
          />
        </div>
        <div className="flex items-center space-x-4 pt-8">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showThumbnail}
              onChange={(e) => onThumbnailToggle(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                showThumbnail ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  showThumbnail ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
            <span className="ml-2 text-white/80">Show User Avatar</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default EmbedConfig;
