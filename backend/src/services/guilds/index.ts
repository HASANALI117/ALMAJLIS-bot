import axios from "axios";
import { DISCORD_API_ENDPOINT } from "../../utils/constants";
import { PartialGuild } from "../../utils/types";
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
