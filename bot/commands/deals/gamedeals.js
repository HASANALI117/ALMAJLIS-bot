import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ComponentType,
} from "discord.js";
import GameAlert from "../../models/GameAlert.js";
import { ERROR_MESSAGES } from "../../utils/constants.js";
import { createSearchResultEmbed } from "../../utils/embedBuilders.js";
import {
  getGamePrices,
  searchGame,
} from "../../services/isThereAnyDealService.js";

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
    const games = await gameDealsService.getGameByTitle(game);

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

  await interaction.deferReply({ ephemeral: true });

  try {
    // const gameDealsService = client.gameDealsService;

    // Step 1: Search for games
    const games = await searchGame(game);

    if (games.length === 0) {
      return interaction.editReply({
        content: `${ERROR_MESSAGES.GAME_NOT_FOUND} **${game}**.`,
      });
    }

    // Step 2: Show game selection if multiple results
    if (games.length === 1) {
      // Only one result - proceed directly
      return await showGameDeals(interaction, client, games[0]);
    }

    // Multiple results - show selection menu
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("game_selection")
      .setPlaceholder("Choose the correct game...")
      .addOptions(
        games.slice(0, 25).map((gameItem, index) => ({
          label:
            gameItem.title.length > 100
              ? gameItem.title.substring(0, 97) + "..."
              : gameItem.title,
          value: index.toString(),
        }))
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setTitle("Multiple Games Found")
      .setDescription(
        `Found ${games.length} games matching "${game}". Please select the correct one:`
      )
      .setColor("#5865F2")
      .addFields(
        games.slice(0, 25).map((gameItem, index) => ({
          name: `${index + 1}. ${gameItem.title}`,
          value: "",
          inline: false,
        }))
      );

    if (games.length > 25) {
      embed.setFooter({
        text: `Showing 25 of ${games.length} results. Use a more specific search term for better results.`,
      });
    }

    const response = await interaction.editReply({
      embeds: [embed],
      components: [row],
    });

    // Step 3: Handle user selection
    try {
      const selectInteraction = await response.awaitMessageComponent({
        componentType: ComponentType.StringSelect,
        time: 300000, // 5 minutes timeout
        filter: (i) => i.user.id === interaction.user.id,
      });

      const selectedIndex = parseInt(selectInteraction.values[0]);
      const selectedGame = games[selectedIndex];

      await selectInteraction.deferUpdate();
      await showGameDeals(interaction, selectedGame);
    } catch (error) {
      await interaction.editReply({
        content: "Selection timed out. Please run the command again.",
        components: [],
      });
    }
  } catch (error) {
    console.error("Error searching for deals:", error);
    await interaction.editReply({
      content: "❌ An error occurred while searching for deals.",
    });
  }
}

async function showGameDeals(interaction, selectedGame) {
  try {
    let gameImageUrl = null;

    const response = await getGamePrices(selectedGame.id);

    if (response.length === 0) {
      return interaction.editReply({
        content: `${ERROR_MESSAGES.NO_DEALS_FOUND} **${selectedGame.external}**.`,
        components: [],
      });
    }
    const deals = response[0].deals;
    const bestDeal = deals[0];

    console.log(bestDeal);

    // Use the selected game data for the embed
    const embed = createSearchResultEmbed(selectedGame, bestDeal, gameImageUrl);

    await interaction.editReply({
      embeds: [embed],
      components: [], // Remove selection menu
    });
  } catch (error) {
    console.error("Error fetching game deals:", error);
    await interaction.editReply({
      content: "❌ An error occurred while fetching deals.",
      components: [],
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
