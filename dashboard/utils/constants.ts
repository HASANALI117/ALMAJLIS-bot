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
      { key: "webhooks", label: "Weblogs", icon: "🌐" },
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
  {
    category: "UTILITY",
    links: [
      { key: "welcome", label: "Welcome", icon: "👋" },
      { key: "reaction-roles", label: "Reaction roles", icon: "😀" },
      { key: "starboard", label: "Starboard", icon: "📊" },
      { key: "levels", label: "Levels", icon: "⬆️", badge: "Premium" },
    ],
  },
];
