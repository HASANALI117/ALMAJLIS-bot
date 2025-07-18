export const placeholders = [
  { placeholder: "{user}", description: "Mention the user" },
  { placeholder: "{server}", description: "Server name" },
  { placeholder: "{membercount}", description: "Total member count" },
  { placeholder: "{username}", description: "Username without mention" },
];

export const replaceMessagePlaceholders = (
  text: string,
  user?: any,
  guild?: any
) => {
  return text
    .replace("{user}", `@${user?.username || "User"}`)
    .replace("{server}", `${guild?.name || "Server"}`)
    .replace("{membercount}", "1,234")
    .replace("{username}", `${user?.username || "Username"}`);
};
