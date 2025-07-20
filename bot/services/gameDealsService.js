import GameAlert from "../models/GameAlert.js";
import { EmbedBuilder } from "discord.js";
import axios from "axios";
import { STORES } from "../utils/constants.js";

class GameDealsService {
  constructor(client) {
    this.client = client;
    this.isPolling = false;
    this.pollingInterval = null;
    this.stores = new Map(); // Cache for store information
    this.storesLastFetched = null;
    this.storesCacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

    // Configure axios instance
    this.api = axios.create({
      baseURL: "https://www.cheapshark.com/api/1.0",
      timeout: 10000,
      headers: {
        "User-Agent": "ALMAJLIS-Bot/1.0",
      },
    });
  }

  async searchGame(title) {
    try {
      const { data } = await this.api.get("/games", {
        params: {
          title: title,
          limit: 5,
        },
      });
      return data;
    } catch (error) {
      console.error(
        "Error searching for game:",
        error.response?.data || error.message
      );
      return [];
    }
  }

  async getGameDeals(steamAppID) {
    try {
      const { data } = await this.api.get("/deals", {
        params: {
          steamAppID: steamAppID,
          onSale: 1,
          sortBy: "Savings",
        },
      });
      return data;
    } catch (error) {
      console.error(
        "Error fetching game deals:",
        error.response?.data || error.message
      );
      return [];
    }
  }

  async getAllDeals(maxPrice = 60, minDiscount = 50) {
    try {
      const { data } = await this.api.get("/deals", {
        params: {
          upperPrice: maxPrice,
          onSale: 1,
          sortBy: "Savings",
          pageSize: 60,
        },
      });

      return data.filter((deal) => parseFloat(deal.savings) >= minDiscount);
    } catch (error) {
      console.error(
        "Error fetching all deals:",
        error.response?.data || error.message
      );
      return [];
    }
  }

  async checkGameAlerts() {
    if (this.isPolling) return;
    this.isPolling = true;

    try {
      const alerts = await GameAlert.find({ isActive: true });
      console.log(`Checking ${alerts.length} game alerts...`);

      for (const alert of alerts) {
        await this.processAlert(alert);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error("Error checking game alerts:", error);
    } finally {
      this.isPolling = false;
    }
  }

  async processAlert(alert) {
    try {
      let deals = [];

      if (alert.steamAppID) {
        deals = await this.getGameDeals(alert.steamAppID);
      } else {
        const games = await this.searchGame(alert.gameTitle);
        if (games.length > 0) {
          const game = games[0];
          deals = await this.getGameDeals(game.steamAppID);
        }
      }

      const validDeals = deals.filter((deal) => {
        const price = parseFloat(deal.salePrice);
        const discount = parseFloat(deal.savings);

        return price <= alert.maxPrice && discount >= alert.minDiscountPercent;
      });

      if (validDeals.length > 0) {
        await this.sendDealNotification(alert, validDeals[0]);

        alert.lastNotified = new Date();
        await alert.save();
      }
    } catch (error) {
      console.error(`Error processing alert for ${alert.gameTitle}:`, error);
    }
  }

  async sendDealNotification(alert, deal) {
    try {
      const guild = this.client.guilds.cache.get(alert.guildId);
      if (!guild) return;

      const channel = guild.channels.cache.get(alert.channelId);
      if (!channel) return;

      if (
        alert.lastNotified &&
        Date.now() - alert.lastNotified.getTime() < 6 * 60 * 60 * 1000
      ) {
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`🎮 Game Deal Alert!`)
        .setDescription(`**${deal.title}** is on sale!`)
        .setColor(0x00ff00)
        .addFields(
          { name: "💰 Sale Price", value: `$${deal.salePrice}`, inline: true },
          {
            name: "💸 Normal Price",
            value: `$${deal.normalPrice}`,
            inline: true,
          },
          {
            name: "📊 Discount",
            value: `${Math.round(deal.savings)}% OFF`,
            inline: true,
          },
          {
            name: "🛒 Store",
            value: STORES[deal.storeID].storeName || "Unknown Store",
            inline: true,
          },
          {
            name: "⭐ Deal Rating",
            value: `${deal.dealRating}/10`,
            inline: true,
          },
          {
            name: "🔗 Get Deal",
            value: `[Click Here](https://www.cheapshark.com/redirect?dealID=${deal.dealID})`,
            inline: false,
          }
        )
        .setThumbnail(deal.thumb)
        .setFooter({ text: "Powered by CheapShark API" })
        .setTimestamp();

      await channel.send({
        content: `<@${alert.createdBy}> Your game alert triggered!`,
        embeds: [embed],
      });

      console.log(`Sent deal notification for ${deal.title} to ${guild.name}`);
    } catch (error) {
      console.error("Error sending deal notification:", error);
    }
  }

  startPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    this.pollingInterval = setInterval(() => {
      this.checkGameAlerts();
    }, 30 * 60 * 1000);

    console.log("Game deals polling started - checking every 30 minutes");
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      console.log("Game deals polling stopped");
    }
  }
}

export default GameDealsService;
