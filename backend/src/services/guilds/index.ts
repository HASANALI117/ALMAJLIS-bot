import axios from "axios";
import { DISCORD_API_ENDPOINT } from "../../utils/constants";
import { PartialGuild } from "../../utils/types";

export const getBotGuildsService = async () => {
  return axios.get<PartialGuild[]>(`${DISCORD_API_ENDPOINT}/users/@me/guilds`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });
};
