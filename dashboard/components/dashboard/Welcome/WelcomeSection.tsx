import React, { useEffect } from "react";
import ChannelSelect from "../../common/ChannelSelect";
import MessageTypeToggle from "./MessageTypeToggle";
import MessageConfig from "./MessageConfig";
import EmbedConfig from "./EmbedConfig";
import MessagePreview from "./MessagePreview";
import SaveButton from "../../ui/SaveButton";
import { useWelcomeSettings } from "@/hooks/useWelcomeSettings";
import { useParams } from "next/navigation";

const WelcomeSection = () => {
  const { guildId } = useParams();
  const {
    welcomeEnabled,
    selectedWelcomeChannel,
    welcomeMessage,
    useEmbed,
    embedTitle,
    embedDescription,
    embedColor,
    showThumbnail,
    footerText,
    isLoading,
    setWelcomeEnabled,
    setSelectedWelcomeChannel,
    setWelcomeMessage,
    setUseEmbed,
    setEmbedTitle,
    setEmbedDescription,
    setEmbedColor,
    setShowThumbnail,
    setFooterText,
    saveWelcomeSettings,
    fetchWelcomeSettings,
  } = useWelcomeSettings();

  useEffect(() => {
    if (guildId) {
      fetchWelcomeSettings();
    }
  }, [guildId]);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-user-plus text-green-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Welcome Messages
            </h4>
            <p className="text-sm text-white/60">
              Greet new members when they join
            </p>
          </div>
        </div>
        <button
          onClick={() => setWelcomeEnabled(!welcomeEnabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
            welcomeEnabled ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              welcomeEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {welcomeEnabled && (
        <div className="space-y-4 p-4 glass-dark rounded-lg">
          <ChannelSelect
            value={selectedWelcomeChannel}
            onChange={setSelectedWelcomeChannel}
            label="Welcome Channel"
            placeholder="Select a channel..."
          />

          <MessageTypeToggle useEmbed={useEmbed} onToggle={setUseEmbed} />

          {!useEmbed ? (
            <MessageConfig
              message={welcomeMessage}
              onChange={setWelcomeMessage}
              placeholder="Enter your welcome message..."
              label="Welcome Message"
            />
          ) : (
            <EmbedConfig
              embedTitle={embedTitle}
              embedDescription={embedDescription}
              embedColor={embedColor}
              footerText={footerText}
              showThumbnail={showThumbnail}
              onTitleChange={setEmbedTitle}
              onDescriptionChange={setEmbedDescription}
              onColorChange={setEmbedColor}
              onFooterChange={setFooterText}
              onThumbnailToggle={setShowThumbnail}
            />
          )}

          <MessagePreview
            useEmbed={useEmbed}
            message={welcomeMessage}
            embedTitle={embedTitle}
            embedDescription={embedDescription}
            embedColor={embedColor}
            footerText={footerText}
            showThumbnail={showThumbnail}
          />

          <SaveButton handleSave={saveWelcomeSettings} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default WelcomeSection;
