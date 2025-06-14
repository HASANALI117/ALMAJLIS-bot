import axios from "axios";
import { DISCORD_API_ENDPOINT } from "../../utils/constants";
import { PartialGuild, Channel } from "../../utils/types";
import { User } from "../../models";

export const getBotGuildsService = async () => {
  return axios.get<PartialGuild[]>(`${DISCORD_API_ENDPOINT}/users/@me/guilds`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });
};

export const getUserGuildsService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return axios.get<PartialGuild[]>(`${DISCORD_API_ENDPOINT}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};

export const getMutualGuildsService = async (id: string) => {
  const { data: botGuilds } = await getBotGuildsService();
  const { data: userGuilds } = await getUserGuildsService(id);

  const adminUserGuilds = userGuilds.filter(
    (guild) => (parseInt(guild.permissions) & 0x8) === 0x8 // Check if the user has the ADMINISTRATOR permission
  );
  // Find mutual guilds where user has admin permissions
  const mutualAdminGuilds = adminUserGuilds.filter((userGuild) =>
    botGuilds.some((botGuild) => botGuild.id === userGuild.id)
  );

  return mutualAdminGuilds;
};

export const getGuildService = (id: string) => {
  return axios.get(`${DISCORD_API_ENDPOINT}/guilds/${id}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
  });
};

export const getGuildChannelsService = async (id: string) => {
  const { data: channels } = await axios.get<Channel[]>(
    `${DISCORD_API_ENDPOINT}/guilds/${id}/channels`,
    {
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    }
  );

  // Filter for text and announcement channels only
  const textChannels = channels.filter(
    (channel) => [0, 5].includes(channel.type) // 0 = GUILD_TEXT, 5 = GUILD_ANNOUNCEMENT
  );

  return textChannels;
};

export const createBotInviteService = async (id: string) => {
  return `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=bot&permissions=364870364415&guild_id=${id}`;
};
