import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ComponentType,
} from "discord.js";
import { ERROR_MESSAGES } from "../../utils/constants.js";
import { createSearchResultEmbed } from "../../utils/embedBuilders.js";
import {
  getGamePrices,
  searchGame,
} from "../../services/isThereAnyDealService.js";

export const data = new SlashCommandBuilder()
  .setName("gamedeals-search")
  .setDescription("Search for current deals on a game")
  .addStringOption((option) =>
    option
      .setName("game")
      .setDescription("Name of the game to search")
      .setRequired(true)
  );

export async function run({ interaction, client }) {
  const game = interaction.options.getString("game");

  await interaction.deferReply({ ephemeral: true });

  try {
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
