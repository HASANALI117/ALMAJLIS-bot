import { EmbedBuilder } from "discord.js";
import { formatDate, formatDealDescription } from "./formatters.js";
import { STORES } from "./constants.js";

export const createSearchResultEmbed = (deal, gameImageUrl = null) => {
  const storeName = STORES[deal.storeID]?.storeName || "Unknown Store";
  const storeLogoURL =
    STORES[deal.storeID]?.images?.logo ||
    STORES[deal.storeID]?.images?.icon ||
    STORES[deal.storeID]?.images?.banner ||
    null;

  const dealDescription = formatDealDescription(
    deal.normalPrice,
    deal.salePrice,
    deal.savings
  );
  const dealDate = formatDate(deal.lastChange);

  const embed = new EmbedBuilder()
    .setTitle(deal.title)
    .setDescription(
      `${dealDescription}\n` +
        `Deal Rating: ${deal.dealRating}/10 ★\n` +
        `Last updated: ${dealDate}\n\n` +
        `[**Open in browser ↗**](https://www.cheapshark.com/redirect?dealID=${deal.dealID})`
    )
    .setThumbnail(storeLogoURL)
    .setColor("#2F3136")
    .setFooter({
      text: `via cheapshark.com • © ${storeName}`,
      iconURL: "https://www.cheapshark.com/img/logo_image.png",
    });

  if (gameImageUrl) {
    embed.setImage(gameImageUrl);
  }

  return embed;
};

export const createAlertCreatedEmbed = (
  game,
  maxPrice,
  minDiscount,
  channel,
  gameImageUrl = null
) => {
  const embed = new EmbedBuilder()
    .setTitle("✅ Game Alert Created!")
    .setDescription(
      `You'll be notified when **${game.external}** goes on sale!`
    )
    .setColor("#5865F2")
    .addFields(
      { name: "Game", value: game.external, inline: true },
      { name: "Max Price", value: `$${maxPrice}`, inline: true },
      { name: "Min Discount", value: `${minDiscount}%`, inline: true },
      { name: "Channel", value: `<#${channel.id}>`, inline: false }
    )
    .setThumbnail(game.thumb)
    .setTimestamp();

  if (gameImageUrl) {
    embed.setImage(gameImageUrl);
  }

  return embed;
};
