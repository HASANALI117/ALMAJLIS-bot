"use client";

import React, { useState } from "react";

import BotSettings from "./BotSettings";
import CommandsComponent from "./Commands";
import WebhooksComponent from "./Weblogs";
import AutomodComponent from "./Automod";
import LoggingComponent from "./Logging";
import GameAlertComponent from "./Gamealerts";
import ReactionRolesComponent from "./Reactionroles";
import WelcomeComponent from "./Welcome";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  // Tracking which section is currently active
  const [activeSection, setActiveSection] = useState("bot-settings");

  // Function to render the correct section based on activeSection state
  const renderActiveSection = () => {
    switch (activeSection) {
      case "bot-settings":
        return <BotSettings />;
      case "commands":
        return <CommandsComponent />;
      case "webhooks":
        return <WebhooksComponent />;
      case "automod":
        return <AutomodComponent />;
      case "logging":
        return <LoggingComponent />;
      case "game-alert":
        return <GameAlertComponent />;
      case "welcome":
        return <WelcomeComponent />;
      case "reaction-roles":
        return <ReactionRolesComponent />;
      // case "moderation":
      //   return <ModerationComponent />;
      // case "autoroles":
      //   return <AutorolesComponent />;
      // case "twitch":
      //   return <TwitchComponent />;
      // case "youtube":
      //   return <YoutubeComponent />;
      // case "starboard":
      //   return <StarboardComponent />;
      // case "levels":
      //   return <LevelsComponent />;
      default:
        return <BotSettings />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Dashboard Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">{renderActiveSection()}</div>

          {/* Recent Actions Panel - Fixed for all sections */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
