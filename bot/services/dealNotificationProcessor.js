import { EmbedBuilder } from "discord.js";
import GameAlert from "../models/GameAlert.js";
import { createDealNotificationEmbed } from "../utils/embedBuilders.js";

export async function processWebhookNotification(webhookData, discordClient) {
  try {
    console.log("🎮 Processing webhook notification:", webhookData.hookId);

    const { games } = webhookData;

    if (!games || games.length === 0) {
      console.log("⚠️ No games found in webhook notification");
      return;
    }

    console.log(
      `📦 Processing ${games.length} games from webhook notification`
    );

    // Process each game in the notification
    for (const game of games) {
      await processGameDeals(game, discordClient);
    }
  } catch (error) {
    console.error("❌ Error processing webhook notification:", error);
  }
}

async function processGameDeals(game, discordClient) {
  try {
    console.log(`🎮 Processing deals for: ${game.title}`);

    // Find matching alerts in bot database
    const matchingAlerts = await GameAlert.find({
      gameTitle: { $regex: game.title, $options: "i" },
      isActive: true,
    });

    if (matchingAlerts.length === 0) {
      console.log(`⚠️ No matching alerts found for: ${game.title}`);
      return;
    }

    console.log(
      `🔍 Found ${matchingAlerts.length} matching alerts for: ${game.title}`
    );

    // Process each deal for the game
    for (const deal of game.deals) {
      await processDealForAlerts(game, deal, matchingAlerts, discordClient);
    }
  } catch (error) {
    console.error(`❌ Error processing game deals for ${game.title}:`, error);
  }
}

async function processDealForAlerts(game, deal, alerts, discordClient) {
  try {
    const dealPrice = deal.price.amount;
    const discountPercent = deal.cut;

    console.log(
      `💰 Checking deal: ${game.title} - $${dealPrice} (${discountPercent}% off) at ${deal.shop.name}`
    );

    // Filter alerts that match the deal criteria
    const triggeredAlerts = alerts.filter((alert) => {
      const priceMatch = dealPrice <= alert.maxPrice;
      const discountMatch = discountPercent >= alert.minDiscountPercent;

      // Check cooldown (6 hours)
      const now = new Date();
      const cooldownTime = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
      const cooldownExpired =
        !alert.lastNotified ||
        now.getTime() - alert.lastNotified.getTime() >= cooldownTime;

      console.log(
        `🔍 Alert check for ${alert.gameTitle}: Price(${priceMatch}) Discount(${discountMatch}) Cooldown(${cooldownExpired})`
      );

      return priceMatch && discountMatch && cooldownExpired;
    });

    if (triggeredAlerts.length === 0) {
      console.log(
        `⏭️ No alerts triggered for ${game.title} at $${dealPrice} (${discountPercent}% off)`
      );
      return;
    }

    console.log(
      `🔔 ${triggeredAlerts.length} alerts triggered for ${game.title}!`
    );

    // Send notifications for each triggered alert
    for (const alert of triggeredAlerts) {
      const success = await sendDealNotification(
        game,
        deal,
        alert,
        discordClient
      );

      if (success) {
        // Update last notified time
        alert.lastNotified = new Date();
        await alert.save();
        console.log(`✅ Updated last notified time for alert: ${alert._id}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing deal for alerts:`, error);
  }
}

async function sendDealNotification(game, deal, alert, discordClient) {
  try {
    if (!discordClient) {
      console.error("❌ Discord client not initialized");
      return false;
    }

    const guild = discordClient.guilds.cache.get(alert.guildId);
    if (!guild) {
      console.error(`❌ Guild not found: ${alert.guildId}`);
      return false;
    }

    const channel = guild.channels.cache.get(alert.channelId);
    if (!channel) {
      console.error(`❌ Channel not found: ${alert.channelId}`);
      return false;
    }

    // Create embed for the deal notification
    const embed = createDealNotificationEmbed(game, deal, alert);

    await channel.send({
      content: `<@${alert.createdBy}> 🎯 Your game alert triggered!`,
      embeds: [embed],
    });

    console.log(
      `✅ Sent deal notification for ${game.title} to ${guild.name}/#${channel.name}`
    );
    return true;
  } catch (error) {
    console.error("❌ Error sending deal notification:", error);
    return false;
  }
}
