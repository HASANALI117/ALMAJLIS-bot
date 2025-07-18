import React from "react";
import Image from "next/image";
import { replaceMessagePlaceholders } from "@/utils/messageUtils";
import { useAuth, useGuild } from "@/contexts";

interface MessagePreviewProps {
  useEmbed: boolean;
  message?: string;
  embedTitle?: string;
  embedDescription?: string;
  embedColor?: string;
  footerText?: string;
  showThumbnail?: boolean;
  borderColor?: string;
}

const MessagePreview = ({
  useEmbed,
  message,
  embedTitle,
  embedDescription,
  embedColor,
  footerText,
  showThumbnail,
  borderColor = "border-green-500/30",
}: MessagePreviewProps) => {
  const { user } = useAuth();
  const { guild } = useGuild();

  return (
    <div className={`glass-button p-4 border ${borderColor}`}>
      <h5 className="text-sm font-medium text-white/80 mb-2">Preview:</h5>
      <div className="bg-discord-dark p-3 rounded">
        <div className="flex items-center mb-2">
          <Image
            src={"/js.jpg"}
            alt="Bot Avatar"
            width={32}
            height={32}
            className="rounded-full mr-2"
          />
          <span className="text-white font-medium">ALMAJLIS-BOT</span>
          <span className="text-xs text-gray-400 ml-2">Today at 12:00 PM</span>
        </div>

        {!useEmbed ? (
          <p className="text-white ml-13">
            {replaceMessagePlaceholders(message || "", user, guild)}
          </p>
        ) : (
          <div className="ml-13">
            <div
              className="border-l-4 bg-gray-800/50 rounded p-4 max-w-md"
              style={{ borderLeftColor: embedColor }}
            >
              {embedTitle && (
                <h3 className="text-white font-semibold text-lg mb-2">
                  {replaceMessagePlaceholders(embedTitle, user, guild)}
                </h3>
              )}

              <div className="flex items-start">
                <div className="flex-1">
                  {embedDescription && (
                    <p className="text-gray-300 mb-3">
                      {replaceMessagePlaceholders(
                        embedDescription,
                        user,
                        guild
                      )}
                    </p>
                  )}

                  {footerText && (
                    <div className="text-xs text-gray-400 mt-2">
                      {replaceMessagePlaceholders(footerText, user, guild)}
                    </div>
                  )}
                </div>

                {showThumbnail && user?.avatar && (
                  <Image
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="rounded-full ml-4"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePreview;
