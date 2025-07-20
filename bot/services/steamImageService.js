import axios from "axios";
import { GAME_DEAL_CONSTANTS } from "../utils/constants.js";

export const getGameImage = async (steamAppID) => {
  try {
    const { data } = await axios.get(
      `https://store.steampowered.com/api/appdetails`,
      {
        params: { appids: steamAppID, l: "en" },
        timeout: GAME_DEAL_CONSTANTS.STEAM_API_TIMEOUT,
      }
    );

    const gameData = data?.[steamAppID];

    if (gameData?.success && gameData?.data?.header_image) {
      return gameData.data.header_image;
    }
  } catch (err) {
    console.error(`Steam API failed for app ${steamAppID}:`, err.message);
  }

  return null;
};
