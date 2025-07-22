import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import GameAlert from "../../models/GameAlert.js";

export const data = new SlashCommandBuilder()
  .setName("gamedeals-add")
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
      .setDescription("Channel to send alerts to (default: current channel)")
  );

export async function run({ interaction, client }) {
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

export const options = {
  userPermissions: [],
  botPermissions: [
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.EmbedLinks,
  ],
};
