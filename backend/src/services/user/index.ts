import axios from "axios";
import { User } from "../../models";
import { DiscordUser } from "../../utils/types";
import { DISCORD_API_ENDPOINT } from "../../utils/constants";

export const getUserService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return axios.get<DiscordUser>(`${DISCORD_API_ENDPOINT}/users/@me`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};
