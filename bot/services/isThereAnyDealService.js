import GameAlert from "../models/GameAlert.js";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

// Create axios instance for ITAD API
const api = axios.create({
  baseURL: "https://api.isthereanydeal.com",
  timeout: 10000,
  headers: {
    "User-Agent": "ALMAJLIS-Bot/1.0",
  },
});

// Global Discord client reference
let discordClient = null;

// Initialize the service with Discord client
// export function initializeITADService(client) {
//   discordClient = client;
//   console.log("ITAD service initialized with webhook support");
// }

// Search for games using ITAD API
export async function searchGame(title) {
  try {
    if (!process.env.ITAD_API_KEY) {
      console.error("ITAD_API_KEY not found in environment variables");
      return [];
    }

    const { data } = await api.get("/games/search/v1", {
      params: {
        // key: process.env.ITAD_API_KEY,
        key: `${process.env.ITAD_API_KEY}`,
        title,
      },
    });

    // console.log(data);

    return data;

    // // Sort results by relevance
    // return results.sort((a, b) => {
    //   const titleLower = title.toLowerCase();
    //   const aLower = a.title.toLowerCase();
    //   const bLower = b.title.toLowerCase();

    //   // Exact match gets highest priority
    //   const aExact = aLower === titleLower;
    //   const bExact = bLower === titleLower;
    //   if (aExact && !bExact) return -1;
    //   if (!aExact && bExact) return 1;

    //   // Starts with search term gets second priority
    //   const aStarts = aLower.startsWith(titleLower);
    //   const bStarts = bLower.startsWith(titleLower);
    //   if (aStarts && !bStarts) return -1;
    //   if (!aStarts && bStarts) return 1;

    //   // Contains search term gets third priority
    //   const aContains = aLower.includes(titleLower);
    //   const bContains = bLower.includes(titleLower);
    //   if (aContains && !bContains) return -1;
    //   if (!aContains && bContains) return 1;

    //   return aLower.localeCompare(bLower);
    // });
  } catch (error) {
    console.error(
      "Error searching for game:",
      error.response?.data || error.message
    );
    return [];
  }
}

// Get current prices for a game
export async function getGamePrices(gameId, country = "US") {
  try {
    const gameIds = Array.isArray(gameId) ? gameId : [gameId];

    if (gameIds.length === 0 || !gameIds[0]) {
      console.error("Invalid or empty game ID provided");
      return [];
    }

    if (!process.env.ITAD_API_KEY) {
      console.error("ITAD_API_KEY not found in environment variables");
      return [];
    }

    const { data } = await api.post(
      "/games/prices/v3",
      gameIds, // Request body: array of game IDs
      {
        params: {
          key: `${process.env.ITAD_API_KEY}`,
          country: country,
          deals: true, // Only load deals with price cuts
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Error fetching game deals:",
      error.response?.data || error.message
    );
    return [];
  }
}

// // Get game overview with basic info
// export async function getGameOverview(gameId, region = "us", country = "US") {
//   try {
//     const { data } = await api.get("/service/game/overview/v2", {
//       params: {
//         key: process.env.ITAD_API_KEY,
//         id: gameId,
//         region: region,
//         country: country,
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error(
//       "Error fetching game overview:",
//       error.response?.data || error.message
//     );
//     return null;
//   }
// }

// // Get historical lowest price for a game
// export async function getLowestPrice(gameId, region = "us") {
//   try {
//     const { data } = await api.get("/service/game/lowest/v1", {
//       params: {
//         key: process.env.ITAD_API_KEY,
//         id: gameId,
//         region: region,
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error(
//       "Error fetching lowest price:",
//       error.response?.data || error.message
//     );
//     return null;
//   }
// }

// // Create webhook subscription for price alerts
// export async function createWebhook(gameId, maxPrice, minDiscount, metadata) {
//   try {
//     const { data } = await api.post("/service/webhook/create/v1", {
//       key: process.env.ITAD_API_KEY,
//       game_id: gameId,
//       price_threshold: maxPrice,
//       discount_threshold: minDiscount,
//       webhook_url: `${process.env.WEBHOOK_BASE_URL}/api/webhooks/deal-alert`,
//       metadata: metadata,
//     });

//     console.log(
//       `Created webhook for game ${gameId} with ID: ${data.webhook_id}`
//     );
//     return data.webhook_id;
//   } catch (error) {
//     console.error(
//       "Error creating webhook:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// // Remove webhook subscription
// export async function removeWebhook(webhookId) {
//   try {
//     await api.delete(`/service/webhook/delete/v1`, {
//       params: {
//         key: process.env.ITAD_API_KEY,
//         webhook_id: webhookId,
//       },
//     });

//     console.log(`Removed webhook ${webhookId}`);
//     return true;
//   } catch (error) {
//     console.error(
//       "Error removing webhook:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// // Create a new game alert with webhook
// export async function createAlert(
//   gameId,
//   gameTitle,
//   maxPrice,
//   minDiscount,
//   alertData
// ) {
//   try {
//     // Create webhook metadata
//     const metadata = {
//       alert_id: null, // Will be updated after saving
//       user_id: alertData.createdBy,
//       guild_id: alertData.guildId,
//       channel_id: alertData.channelId,
//       game_title: gameTitle,
//     };

//     // Create alert in database first
//     const alert = new GameAlert({
//       ...alertData,
//       gameId: gameId,
//       gameTitle: gameTitle,
//       maxPrice: maxPrice,
//       minDiscountPercent: minDiscount,
//     });

//     await alert.save();

//     // Update metadata with alert ID
//     metadata.alert_id = alert._id.toString();

//     // Create webhook subscription
//     const webhookId = await createWebhook(
//       gameId,
//       maxPrice,
//       minDiscount,
//       metadata
//     );

//     // Store webhook ID in alert
//     alert.webhookId = webhookId;
//     await alert.save();

//     console.log(
//       `Created alert for ${gameTitle} (ID: ${gameId}) with webhook ${webhookId}`
//     );
//     return alert;
//   } catch (error) {
//     console.error("Error creating alert:", error);
//     throw error;
//   }
// }

// // Remove a game alert and its webhook
// export async function removeAlert(alertId) {
//   try {
//     const alert = await GameAlert.findById(alertId);
//     if (!alert) return null;

//     // Remove webhook if it exists
//     if (alert.webhookId) {
//       await removeWebhook(alert.webhookId);
//     }

//     // Remove from database
//     await GameAlert.findByIdAndDelete(alertId);
//     console.log(`Removed alert for ${alert.gameTitle}`);
//     return alert;
//   } catch (error) {
//     console.error("Error removing alert:", error);
//     throw error;
//   }
// }

// // Remove alert by game title (for backward compatibility)
// export async function removeAlertByGame(guildId, gameTitle, userId) {
//   try {
//     const alert = await GameAlert.findOne({
//       guildId: guildId,
//       gameTitle: { $regex: gameTitle, $options: "i" },
//       createdBy: userId,
//       isActive: true,
//     });

//     if (!alert) return null;

//     await removeAlert(alert._id);
//     console.log(`Removed alert for ${alert.gameTitle} by ${userId}`);
//     return alert;
//   } catch (error) {
//     console.error("Error removing alert by game:", error);
//     throw error;
//   }
// }

// // Handle incoming webhook notification
// export async function handleWebhookNotification(webhookData) {
//   try {
//     const { game, deal, price, discount, metadata } = webhookData;

//     // Find the alert
//     const alert = await GameAlert.findById(metadata.alert_id);
//     if (!alert || !alert.isActive) {
//       console.log(`Alert not found or inactive: ${metadata.alert_id}`);
//       return false;
//     }

//     // Check cooldown (6 hours)
//     if (
//       alert.lastNotified &&
//       Date.now() - alert.lastNotified.getTime() < 6 * 60 * 60 * 1000
//     ) {
//       console.log(`Alert cooldown active for ${alert.gameTitle}`);
//       return false;
//     }

//     if (!discordClient) {
//       console.error("Discord client not initialized");
//       return false;
//     }

//     const guild = discordClient.guilds.cache.get(metadata.guild_id);
//     if (!guild) {
//       console.error(`Guild not found: ${metadata.guild_id}`);
//       return false;
//     }

//     const channel = guild.channels.cache.get(metadata.channel_id);
//     if (!channel) {
//       console.error(`Channel not found: ${metadata.channel_id}`);
//       return false;
//     }

//     // Create and send embed
//     const embed = new EmbedBuilder()
//       .setTitle(`🎮 Game Deal Alert!`)
//       .setDescription(`**${game.title}** is on sale!`)
//       .setColor(0x00ff00)
//       .addFields(
//         { name: "💰 Sale Price", value: `$${price.current}`, inline: true },
//         { name: "💸 Regular Price", value: `$${price.regular}`, inline: true },
//         { name: "📊 Discount", value: `${discount}% OFF`, inline: true },
//         { name: "🛒 Store", value: deal.shop.name, inline: true },
//         {
//           name: "🔗 Get Deal",
//           value: `[Click Here](${deal.url})`,
//           inline: false,
//         }
//       )
//       .setThumbnail(game.image || null)
//       .setFooter({
//         text: "Powered by IsThereAnyDeal • Real-time webhook alert",
//       })
//       .setTimestamp();

//     await channel.send({
//       content: `<@${metadata.user_id}> Your game alert triggered!`,
//       embeds: [embed],
//     });

//     // Update last notified time
//     alert.lastNotified = new Date();
//     await alert.save();

//     console.log(`Sent webhook notification for ${game.title} to ${guild.name}`);
//     return true;
//   } catch (error) {
//     console.error("Error handling webhook notification:", error);
//     return false;
//   }
// }

// // Utility function to format game data for Discord embeds
// export function formatGameForEmbed(gameData, dealData = null) {
//   const embed = new EmbedBuilder()
//     .setTitle(`🎮 ${gameData.title}`)
//     .setColor("#5865F2");

//   if (dealData) {
//     embed.addFields(
//       {
//         name: "💰 Current Price",
//         value: `$${dealData.price.amount}`,
//         inline: true,
//       },
//       {
//         name: "💸 Regular Price",
//         value: `$${dealData.regular.amount}`,
//         inline: true,
//       },
//       { name: "📊 Discount", value: `${dealData.cut}% OFF`, inline: true },
//       { name: "🛒 Store", value: dealData.shop.name, inline: true }
//     );
//   }

//   embed.setFooter({ text: "Powered by IsThereAnyDeal" }).setTimestamp();

//   return embed;
// }

// // Health check function
// export async function healthCheck() {
//   try {
//     const { data } = await api.get("/service/search/v1", {
//       params: {
//         key: process.env.ITAD_API_KEY,
//         q: "test",
//         limit: 1,
//       },
//     });

//     return {
//       status: "healthy",
//       timestamp: new Date().toISOString(),
//       apiResponse: !!data,
//       webhookSupport: true,
//     };
//   } catch (error) {
//     return {
//       status: "unhealthy",
//       timestamp: new Date().toISOString(),
//       error: error.message,
//       webhookSupport: false,
//     };
//   }
// }

// // Get webhook statistics
// export async function getWebhookStats() {
//   try {
//     const totalAlerts = await GameAlert.countDocuments({ isActive: true });
//     const alertsWithWebhooks = await GameAlert.countDocuments({
//       isActive: true,
//       webhookId: { $exists: true, $ne: null },
//     });

//     return {
//       totalAlerts,
//       alertsWithWebhooks,
//       webhookCoverage:
//         totalAlerts > 0 ? (alertsWithWebhooks / totalAlerts) * 100 : 0,
//     };
//   } catch (error) {
//     console.error("Error getting webhook stats:", error);
//     return {
//       totalAlerts: 0,
//       alertsWithWebhooks: 0,
//       webhookCoverage: 0,
//       error: error.message,
//     };
//   }
// }
