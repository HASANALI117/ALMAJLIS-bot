export const navigation = [
  { name: "Docs", href: "#", icon: "bxs-book" },
  { name: "Invite", href: "#", icon: "bx-plus" },
  { name: "Discord", href: "#", icon: "bxl-discord" },
  { name: "Status", href: "#", icon: "bxs-heart" },
  { name: "Guilds", href: "/guilds", icon: "bxs-server" },
];

export const sidebarMenu = [
  {
    category: "SETTINGS",
    links: [
      { key: "bot-settings", label: "Bot settings", icon: "⚙️" },
      { key: "commands", label: "Commands", icon: "💬" },
      { key: "webhooks", label: "Webhooks", icon: "🌐" },
    ],
  },
  {
    category: "UTILITY",
    links: [
      { key: "welcome", label: "Welcome", icon: "👋" },
      { key: "reaction-roles", label: "Reaction roles", icon: "😀" },
      { key: "levels", label: "Levels", icon: "⬆️", badge: "Premium" },
    ],
  },
  {
    category: "MODERATION",
    links: [
      { key: "automod", label: "Automod", icon: "🤖" },
      { key: "moderation", label: "Moderation", icon: "🛡️" },
      { key: "logging", label: "Logging", icon: "📝" },
      { key: "autoroles", label: "Autoroles", icon: "🔔" },
    ],
  },
  {
    category: "GAMING",
    links: [
      { key: "game-alert", label: "Game Alert", icon: "🎮", badge: "NEW" },
    ],
  },
  {
    category: "FEEDS",
    links: [
      { key: "twitch", label: "Twitch", icon: "📺" },
      { key: "youtube", label: "Youtube", icon: "▶️" },
    ],
  },
];

// Dashboard section configurations
export const dashboardSections = {
  "bot-settings": {
    title: "Bot Settings",
    description: "Configure basic bot settings and preferences",
    icon: "bx-cog",
    url: "/dashboard/{guildId}/bot-settings",
  },
  commands: {
    title: "Custom Commands",
    description: "Create and manage custom commands for your server",
    icon: "bx-terminal",
    url: "/dashboard/{guildId}/commands",
  },
  webhooks: {
    title: "Webhooks & Logs",
    description: "Setup webhook integrations and external logging",
    icon: "bx-link",
    url: "/dashboard/{guildId}/webhooks",
  },
  automod: {
    title: "Auto Moderation",
    description: "Automatic moderation tools and spam protection",
    icon: "bx-shield",
    url: "/dashboard/{guildId}/automod",
  },
  logging: {
    title: "Server Logging",
    description: "Monitor and track server activity",
    icon: "bx-history",
    url: "/dashboard/{guildId}/logging",
  },
  "game-alert": {
    title: "Game Alerts",
    description: "Setup gaming notifications and alerts",
    icon: "bx-joystick",
    url: "/dashboard/{guildId}/game-alert",
  },
  welcome: {
    title: "Welcome Messages",
    description: "Customize welcome messages for new members",
    icon: "bx-door-open",
    url: "/dashboard/{guildId}/welcome",
  },
  "reaction-roles": {
    title: "Reaction Roles",
    description: "Configure role assignment through reactions",
    icon: "bx-happy",
    url: "/dashboard/{guildId}/reaction-roles",
  },
  moderation: {
    title: "Moderation",
    description: "Manual moderation tools and settings",
    icon: "bx-shield-check",
    url: "/dashboard/{guildId}/moderation",
  },
  autoroles: {
    title: "Auto Roles",
    description: "Automatically assign roles to new members",
    icon: "bx-user-check",
    url: "/dashboard/{guildId}/autoroles",
  },
  twitch: {
    title: "Twitch Integration",
    description: "Stream notifications and Twitch features",
    icon: "bxl-twitch",
    url: "/dashboard/{guildId}/twitch",
  },
  youtube: {
    title: "YouTube Integration",
    description: "Video notifications and YouTube features",
    icon: "bxl-youtube",
    url: "/dashboard/{guildId}/youtube",
  },
  starboard: {
    title: "Starboard",
    description: "Highlight popular messages with star reactions",
    icon: "bx-star",
    url: "/dashboard/{guildId}/starboard",
  },
  levels: {
    title: "Levels System",
    description: "XP tracking and reward system for active members",
    icon: "bx-trending-up",
    url: "/dashboard/{guildId}/levels",
  },
  "coming-soon": {
    title: "Coming Soon",
    description: "Exciting new features launching soon",
    icon: "bx-time-five",
    url: "/dashboard/{guildId}/coming-soon",
  },
};
