import { EmbedBuilder } from "discord.js";
import { formatDate, formatDealDescription } from "./formatters.js";
import { STORES } from "./constants.js";

export const createSearchResultEmbed = (game, deal) => {
  const storeName = deal.shop.name;
  const storeLogoURL =
    STORES[deal.shop.id]?.images?.logo ||
    STORES[deal.shop.id]?.images?.icon ||
    STORES[deal.shop.id]?.images?.banner ||
    null;
  const gameImage =
    game.assets.banner600 ||
    game.assets.banner400 ||
    game.assets.banner300 ||
    game.assets.banner145 ||
    game.assets.boxart ||
    null;

  const dealDescription = formatDealDescription(
    deal.regular.amount,
    deal.price.amount,
    deal.cut
  );
  const dealDate =
    deal.expiry !== null
      ? `Expires: ${formatDate(deal.expiry)}\n`
      : `Last updated: ${formatDate(deal.timestamp)}\n`;
  //   const dealRating =
  //     deal.dealRating !== "" ? `Deal Rating: ${deal.dealRating}/10 ★\n` : "";

  const embed = new EmbedBuilder()
    .setTitle(game.title)
    .setDescription(
      `${dealDescription}\n` +
        // `${dealRating}` +
        `${dealDate}\n` +
        `[**Open in browser ↗**](${deal.url})`
    )
    .setThumbnail(storeLogoURL)
    .setColor("#2F3136")
    .setImage(gameImage)
    .setFooter({
      text: `via isthereanydeal.com • ©️ ${storeName}`,
      iconURL: "https://avatars.githubusercontent.com/u/87337674?s=200&v=4",
    });

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
