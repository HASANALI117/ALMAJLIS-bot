"use client";

import React, { useState, useEffect } from "react";

import BotSettings from "./BotSettings";
import CommandsComponent from "./Commands";
import WebhooksComponent from "./Weblogs";
import AutomodComponent from "./Automod";
import LoggingComponent from "./Logging";
import GameAlertComponent from "./Gamealerts";
import ReactionRolesComponent from "./Reactionroles";
import WelcomeComponent from "./Welcome";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import api from "@/utils/axios";
import ComingSoon from "./ComingSoon";

interface DashboardProps {
  guildId: string;
}

const Dashboard = ({ guildId }: DashboardProps) => {
  // Tracking which section is currently active
  const [activeSection, setActiveSection] = useState("bot-settings");
  const [guild, setGuild] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch guild data when the component mounts
    const fetchGuildData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/guilds/${guildId}`);
        setGuild(data);
      } catch (error) {
        console.error("Error fetching guild data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuildData();
  }, [guildId]);

  // Function to render the correct section based on activeSection state
  const renderActiveSection = () => {
    const components = {
      "bot-settings": <BotSettings />,
      commands: <CommandsComponent />,
      webhooks: <WebhooksComponent />,
      automod: <AutomodComponent />,
      logging: <LoggingComponent />,
      "game-alert": <GameAlertComponent />,
      welcome: <WelcomeComponent guildId={guildId} />,
      "reaction-roles": <ReactionRolesComponent />,
      // Add more coming soon features
      "music-bot": (
        <ComingSoon
          featureName="Music Bot"
          description="High-quality music streaming with playlist support"
          expectedDate="Q3 2024"
        />
      ),
      leveling: (
        <ComingSoon
          featureName="Leveling System"
          description="XP tracking and reward system for active members"
          expectedDate="Q2 2024"
        />
      ),
    };

    const Component = components[activeSection as keyof typeof components] || (
      <ComingSoon
        featureName="Feature"
        description="This feature is currently under development."
      />
    );

    return (
      <div className="glass-scroll overflow-y-auto h-full">
        <div className="p-8">
          {/* Section Header */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white text-glow mb-2">
                  {getSectionTitle(activeSection)}
                </h1>
                <p className="text-white/70">
                  {getSectionDescription(activeSection)}
                </p>
              </div>
              <div className="glass-button p-3 rounded-full">
                <i
                  className={`bx ${getSectionIcon(
                    activeSection
                  )} text-2xl text-white/80`}
                ></i>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center mt-4 text-sm text-white/60">
              <span>Dashboard</span>
              <i className="bx bx-chevron-right mx-2"></i>
              <span className="text-white/80">
                {getSectionTitle(activeSection)}
              </span>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="space-y-6">{Component}</div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen animated-bg floating-orbs relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="glass-loader text-center">
            <div className="relative mb-6">
              <i className="bx bx-loader-alt bx-spin text-6xl text-white"></i>
              <div className="absolute inset-0 animate-ping">
                <i className="bx bx-loader-alt text-6xl text-blue-400/30"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-glow mb-2">
              Loading Dashboard
            </h2>
            <p className="text-white/70">
              Preparing your server configuration...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen animated-bg floating-orbs relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Navbar */}
        <Navbar guild={guild} />

        {/* Main Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Main Dashboard Content */}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 relative">
              {/* Content Area */}
              <div className="absolute inset-0">{renderActiveSection()}</div>

              {/* Floating Action Button */}
              <div className="absolute bottom-8 right-8 z-20">
                <button className="glass-button p-4 rounded-full shadow-2xl group hover:scale-110 transition-all duration-300">
                  <i className="bx bx-help-circle text-2xl text-white group-hover:text-blue-400 transition-colors duration-300"></i>
                </button>
              </div>
            </div>

            {/* Stats Panel - Optional */}
            <div className="w-80 glass-sidebar border-l border-white/10 p-6 hidden xl:block">
              <div className="space-y-6">
                {/* Server Stats */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white text-glow mb-4">
                    Server Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Members</span>
                      <span className="text-blue-400 font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Online</span>
                      <span className="text-green-400 font-bold">567</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Channels</span>
                      <span className="text-purple-400 font-bold">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Roles</span>
                      <span className="text-pink-400 font-bold">15</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white text-glow mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: "bx-user-plus",
                        text: "New member joined",
                        time: "2m ago",
                        color: "text-green-400",
                      },
                      {
                        icon: "bx-message",
                        text: "Command executed",
                        time: "5m ago",
                        color: "text-blue-400",
                      },
                      {
                        icon: "bx-shield",
                        text: "Auto-mod action",
                        time: "10m ago",
                        color: "text-red-400",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
                      >
                        <i
                          className={`bx ${activity.icon} ${activity.color}`}
                        ></i>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 truncate">
                            {activity.text}
                          </p>
                          <p className="text-xs text-white/50">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white text-glow mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full glass-button p-3 text-sm text-white/80 hover:text-white transition-colors duration-300 group">
                      <i className="bx bx-refresh mr-2 group-hover:rotate-180 transition-transform duration-300"></i>
                      Sync Settings
                    </button>
                    <button className="w-full glass-button p-3 text-sm text-white/80 hover:text-white transition-colors duration-300">
                      <i className="bx bx-download mr-2"></i>
                      Export Config
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getSectionTitle = (section: string): string => {
  const titles: Record<string, string> = {
    "bot-settings": "Bot Settings",
    commands: "Custom Commands",
    webhooks: "Webhooks & Logs",
    automod: "Auto Moderation",
    logging: "Server Logging",
    "game-alert": "Game Alerts",
    welcome: "Welcome Messages",
    "reaction-roles": "Reaction Roles",
  };
  return titles[section] || "Dashboard";
};

const getSectionDescription = (section: string): string => {
  const descriptions: Record<string, string> = {
    "bot-settings": "Configure basic bot settings and preferences",
    commands: "Create and manage custom commands for your server",
    webhooks: "Setup webhook integrations and external logging",
    automod: "Automatic moderation tools and spam protection",
    logging: "Monitor and track server activity",
    "game-alert": "Setup gaming notifications and alerts",
    welcome: "Customize welcome messages for new members",
    "reaction-roles": "Configure role assignment through reactions",
  };
  return descriptions[section] || "Manage your bot configuration";
};

const getSectionIcon = (section: string): string => {
  const icons: Record<string, string> = {
    "bot-settings": "bx-cog",
    commands: "bx-terminal",
    webhooks: "bx-link",
    automod: "bx-shield",
    logging: "bx-history",
    "game-alert": "bx-joystick",
    welcome: "bx-door-open",
    "reaction-roles": "bx-happy",
  };
  return icons[section] || "bx-dashboard";
};

export default Dashboard;
