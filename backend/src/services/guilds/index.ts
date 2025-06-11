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
