import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import GameAlert from "../../models/GameAlert.js";
import { STORES } from "../../utils/constants.js";
import axios from "axios";

export const data = new SlashCommandBuilder()
  .setName("gamedeals")
  .setDescription("Manage game deal alerts")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("add")
      .setDescription("Add a new game deal alert")
      .addStringOption((option) =>
        option
          .setName("game")
          .setDescription("Name of the game to watch")
          .setRequired(true)
      )
      .addNumberOption((option) =>
        option
          .setName("maxprice")
          .setDescription("Maximum price for the deal (default: $60)")
          .setMinValue(1)
          .setMaxValue(999)
      )
      .addNumberOption((option) =>
        option
          .setName("mindiscount")
          .setDescription("Minimum discount percentage (default: 50%)")
          .setMinValue(10)
          .setMaxValue(90)
      )
      .addChannelOption((option) =>
        option
          .setName("channel")
          .setDescription(
            "Channel to send alerts to (default: current channel)"
          )
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("remove")
      .setDescription("Remove a game deal alert")
      .addStringOption((option) =>
        option
          .setName("game")
          .setDescription("Name of the game to stop watching")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("list")
      .setDescription("List all your active game deal alerts")
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("search")
      .setDescription("Search for current deals on a game")
      .addStringOption((option) =>
        option
          .setName("game")
          .setDescription("Name of the game to search")
          .setRequired(true)
      )
  );

export async function run({ interaction, client }) {
  const subcommand = interaction.options.getSubcommand();

  switch (subcommand) {
    case "add":
      await handleAddAlert(interaction, client);
      break;
    case "remove":
      await handleRemoveAlert(interaction);
      break;
    case "list":
      await handleListAlerts(interaction);
      break;
    case "search":
      await handleSearchDeals(interaction, client);
      break;
  }
}

async function handleAddAlert(interaction, client) {
  const game = interaction.options.getString("game");
  const maxPrice = interaction.options.getNumber("maxprice") || 60;
  const minDiscount = interaction.options.getNumber("mindiscount") || 50;
  const channel =
    interaction.options.getChannel("channel") || interaction.channel;

  await interaction.deferReply({ ephemeral: true });

  try {
    const gameDealsService = client.gameDealsService;
    const games = await gameDealsService.searchGame(game);

    if (games.length === 0) {
      return interaction.editReply({
        content: `❌ Could not find a game named "${game}". Please check the spelling and try again.`,
      });
    }

    const foundGame = games[0];

    const existingAlert = await GameAlert.findOne({
      guildId: interaction.guild.id,
      gameTitle: foundGame.external,
      createdBy: interaction.user.id,
      isActive: true,
    });

    if (existingAlert) {
      return interaction.editReply({
        content: `❌ You already have an active alert for "${foundGame.external}".`,
      });
    }

    const userAlertCount = await GameAlert.countDocuments({
      guildId: interaction.guild.id,
      createdBy: interaction.user.id,
      isActive: true,
    });

    if (userAlertCount >= 5) {
      return interaction.editReply({
        content:
          "❌ You can only have a maximum of 5 active game alerts. Please remove some before adding new ones.",
      });
    }

    const newAlert = new GameAlert({
      guildId: interaction.guild.id,
      channelId: channel.id,
      gameTitle: foundGame.external,
      steamAppID: foundGame.steamAppID,
      maxPrice: maxPrice,
      minDiscountPercent: minDiscount,
      createdBy: interaction.user.id,
    });

    await newAlert.save();

    const embed = new EmbedBuilder()
      .setTitle("✅ Game Alert Created!")
      .setDescription(
        `You'll be notified when **${foundGame.external}** goes on sale!`
      )
      .setColor("#5865F2")
      .addFields(
        { name: "🎮 Game", value: foundGame.external, inline: true },
        { name: "💰 Max Price", value: `$${maxPrice}`, inline: true },
        { name: "📊 Min Discount", value: `${minDiscount}%`, inline: true },
        { name: "📢 Channel", value: `<#${channel.id}>`, inline: false }
      )
      .setThumbnail(foundGame.thumb)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error("Error adding game alert:", error);
    await interaction.editReply({
      content:
        "❌ An error occurred while creating the alert. Please try again later.",
    });
  }
}

async function handleRemoveAlert(interaction) {
  const game = interaction.options.getString("game");

  try {
    const alert = await GameAlert.findOneAndDelete({
      guildId: interaction.guild.id,
      gameTitle: { $regex: game, $options: "i" },
      createdBy: interaction.user.id,
      isActive: true,
    });

    if (!alert) {
      return interaction.reply({
        content: `❌ Could not find an active alert for "${game}".`,
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `✅ Removed game alert for **${alert.gameTitle}**.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error removing game alert:", error);
    await interaction.reply({
      content: "❌ An error occurred while removing the alert.",
      ephemeral: true,
    });
  }
}

async function handleListAlerts(interaction) {
  try {
    const alerts = await GameAlert.find({
      guildId: interaction.guild.id,
      createdBy: interaction.user.id,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (alerts.length === 0) {
      return interaction.reply({
        content: "📭 You don't have any active game alerts.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("🎮 Your Active Game Alerts")
      .setColor("#5865F2")
      .setDescription(`You have ${alerts.length}/5 active alerts`)
      .setTimestamp();

    alerts.forEach((alert, index) => {
      const lastNotified = alert.lastNotified
        ? `<t:${Math.floor(alert.lastNotified.getTime() / 1000)}:R>`
        : "Never";

      embed.addFields({
        name: `${index + 1}. ${alert.gameTitle}`,
        value: `💰 Max Price: $${alert.maxPrice} | 📊 Min Discount: ${alert.minDiscountPercent}%\n📢 Channel: <#${alert.channelId}> | 🔔 Last: ${lastNotified}`,
        inline: false,
      });
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error("Error listing game alerts:", error);
    await interaction.reply({
      content: "❌ An error occurred while fetching your alerts.",
      ephemeral: true,
    });
  }
}

async function handleSearchDeals(interaction, client) {
  const game = interaction.options.getString("game");

  await interaction.deferReply();

  try {
    const gameDealsService = client.gameDealsService;
    const games = await gameDealsService.searchGame(game);

    if (games.length === 0) {
      return interaction.editReply({
        content: `❌ Could not find a game named "${game}".`,
      });
    }

    const foundGame = games[0];
    const deals = await gameDealsService.getGameDeals(foundGame.steamAppID);

    if (deals.length === 0) {
      return interaction.editReply({
        content: `📭 No current deals found for **${foundGame.external}**.`,
      });
    }

    const bestDeal = deals[0];

    // Get store info using STORES object directly
    const bestStoreName =
      STORES[bestDeal.storeID]?.storeName || "Unknown Store";
    const storeLogoURL = STORES[bestDeal.storeID]?.images?.logo;
    const storeIconURL = STORES[bestDeal.storeID]?.images?.icon;

    // Helper function to get larger game image
    async function getLargerGameImage(thumbUrl) {
      if (!thumbUrl) return null;

      try {
        // Query Steam’s App Details API
        const { data } = await axios.get(
          `https://store.steampowered.com/api/appdetails`,
          {
            params: {
              appids: foundGame.steamAppID,
              l: "en", // or any locale you prefer
            },
            timeout: 5_000,
          }
        );

        const body = data?.[foundGame.steamAppID];

        if (body?.success && body.data.header_image) {
          return body.data.header_image;
        }
      } catch (err) {
        console.error(
          `Steam API failed for app ${foundGame.steamAppID}:`,
          err.message
        );
      }

      // if any of the above fails, return the original thumbnail
      return thumbUrl;
    }

    const gameImageUrl = await getLargerGameImage(foundGame.thumb);
    const originalPrice = parseFloat(bestDeal.normalPrice);
    const salePrice =
      parseFloat(bestDeal.salePrice) == 0
        ? "Free"
        : parseFloat(bestDeal.salePrice);
    const savings = Math.round(parseFloat(bestDeal.savings));
    const dealDate = gameDealsService.formatDate(bestDeal.lastChange);

    const embed = new EmbedBuilder()
      .setTitle(foundGame.external)
      .setDescription(
        `~~$${originalPrice.toFixed(
          2
        )}~~ **${salePrice}** (${savings}% OFF)\n` +
          `Last updated: ${dealDate}\n\n` +
          `[**Open in browser ↗**](https://www.cheapshark.com/redirect?dealID=${bestDeal.dealID})`
      )
      .setThumbnail(storeLogoURL)
      .setColor("#2F3136")
      .setImage(gameImageUrl)
      .setFooter({
        text: `via cheapshark • © ${bestStoreName}`,
        iconURL: "https://www.cheapshark.com/img/logo_image.png",
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error("Error searching for deals:", error);
    await interaction.editReply({
      content: "❌ An error occurred while searching for deals.",
    });
  }
}

export const options = {
  userPermissions: [],
  botPermissions: [
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.EmbedLinks,
  ],
};
