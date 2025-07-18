import React, { useEffect } from "react";
import ChannelSelect from "../../common/ChannelSelect";
import MessageTypeToggle from "./MessageTypeToggle";
import MessageConfig from "./MessageConfig";
import EmbedConfig from "./EmbedConfig";
import MessagePreview from "./MessagePreview";
import SaveButton from "../../ui/SaveButton";
import { useLeaveSettings } from "@/hooks/useLeaveSettings";
import { useParams } from "next/navigation";

const LeaveSection = () => {
  const { guildId } = useParams();
  const {
    leaveEnabled,
    selectedLeaveChannel,
    leaveMessage,
    useLeaveEmbed,
    leaveEmbedTitle,
    leaveEmbedDescription,
    leaveEmbedColor,
    showLeaveThumbnail,
    leaveFooterText,
    isLoading,
    setLeaveEnabled,
    setSelectedLeaveChannel,
    setLeaveMessage,
    setUseLeaveEmbed,
    setLeaveEmbedTitle,
    setLeaveEmbedDescription,
    setLeaveEmbedColor,
    setShowLeaveThumbnail,
    setLeaveFooterText,
    saveLeaveSettings,
    fetchLeaveSettings,
  } = useLeaveSettings();

  useEffect(() => {
    if (guildId) {
      fetchLeaveSettings();
    }
  }, [guildId]);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-user-minus text-orange-400"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Goodbye Messages
            </h4>
            <p className="text-sm text-white/60">
              Say farewell to members who leave
            </p>
          </div>
        </div>
        <button
          onClick={() => setLeaveEnabled(!leaveEnabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
            leaveEnabled ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              leaveEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {leaveEnabled && (
        <div className="space-y-4 p-4 glass-dark rounded-lg">
          <ChannelSelect
            value={selectedLeaveChannel}
            onChange={setSelectedLeaveChannel}
            label="Leave Channel"
            placeholder="Select a channel..."
          />

          <MessageTypeToggle
            useEmbed={useLeaveEmbed}
            onToggle={setUseLeaveEmbed}
          />

          {!useLeaveEmbed ? (
            <MessageConfig
              message={leaveMessage}
              onChange={setLeaveMessage}
              placeholder="Enter your goodbye message..."
              label="Leave Message"
            />
          ) : (
            <EmbedConfig
              embedTitle={leaveEmbedTitle}
              embedDescription={leaveEmbedDescription}
              embedColor={leaveEmbedColor}
              footerText={leaveFooterText}
              showThumbnail={showLeaveThumbnail}
              onTitleChange={setLeaveEmbedTitle}
              onDescriptionChange={setLeaveEmbedDescription}
              onColorChange={setLeaveEmbedColor}
              onFooterChange={setLeaveFooterText}
              onThumbnailToggle={setShowLeaveThumbnail}
            />
          )}

          <MessagePreview
            useEmbed={useLeaveEmbed}
            message={leaveMessage}
            embedTitle={leaveEmbedTitle}
            embedDescription={leaveEmbedDescription}
            embedColor={leaveEmbedColor}
            footerText={leaveFooterText}
            showThumbnail={showLeaveThumbnail}
            borderColor="border-orange-500/30"
          />

          <SaveButton handleSave={saveLeaveSettings} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default LeaveSection;
