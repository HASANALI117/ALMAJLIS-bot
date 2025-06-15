import BotSettings from "@/components/dashboard/BotSettings";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const BotSettingsPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="bot-settings" />
      {/* Content */}
      <div className="space-y-6">
        <BotSettings />
      </div>
    </>
  );
};

export default BotSettingsPage;
