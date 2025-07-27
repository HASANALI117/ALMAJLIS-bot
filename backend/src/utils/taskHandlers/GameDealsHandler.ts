import { BaseTaskHandler } from "./BaseTaskHandler";
import {
  TaskType,
  TaskCategory,
  TaskConfig,
  NotificationData,
  ITADDeal,
  ITADResponse,
} from "../../utils/types";

export class GameDealsHandler extends BaseTaskHandler {
  type = TaskType.GAME_DEALS;
  category = TaskCategory.MONITORING;

  async execute(config: TaskConfig): Promise<ITADDeal[]> {
    const {
      endpoint = "https://api.isthereanydeal.com/v02/game/deals/",
      apiKey,
      queryParams = {},
      retries = 3,
    } = config;

    if (!this.validateConfig(config)) {
      throw new Error("Invalid configuration for GameDealsHandler");
    }

    const defaultParams = {
      key: apiKey,
      limit: "50",
      sort: "time:desc",
      format: "json",
    };

    const requestConfig = {
      ...config,
      queryParams: {
        ...defaultParams,
        ...queryParams,
      },
    };

    try {
      const response = await this.retryRequest(
        () => this.makeRequest<ITADResponse>(endpoint, requestConfig),
        retries
      );

      const data = response.data;

      if (!data || !Array.isArray(data.deals)) {
        console.warn(
          "[GameDealsHandler] Invalid response format from ITAD API"
        );
        return [];
      }

      console.log(`[GameDealsHandler] Fetched ${data.deals.length} deals`);
      return data.deals;
    } catch (error) {
      console.error("[GameDealsHandler] Failed to fetch deals:", error);
      throw new Error(
        `Failed to fetch game deals: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  compare(oldData: ITADDeal[], newData: ITADDeal[]): ITADDeal[] {
    if (!oldData.length) {
      // Return only recent deals (last 6 hours) if no previous data
      const sixHoursAgo = Date.now() / 1000 - 6 * 60 * 60;
      const recentDeals = newData.filter((deal) => deal.added > sixHoursAgo);
      console.log(
        `[GameDealsHandler] No previous data, returning ${recentDeals.length} recent deals`
      );
      return recentDeals;
    }

    const oldIds = new Set(oldData.map((deal) => this.getId(deal)));
    const newDeals = newData.filter((deal) => !oldIds.has(this.getId(deal)));

    console.log(`[GameDealsHandler] Found ${newDeals.length} new deals`);
    return newDeals;
  }

  formatForNotification(deals: ITADDeal[]): NotificationData[] {
    return deals.map((deal) => {
      const discountPercentage = Math.round(deal.cut);
      const savings = (deal.regular.amount - deal.price.amount).toFixed(2);
      const currency = deal.price.currency || "$";

      const description = [
        `💰 **${currency}${deal.price.amount}** ~~${currency}${deal.regular.amount}~~`,
        `📉 **${discountPercentage}% OFF** (Save ${currency}${savings})`,
        `🏪 Available at **${deal.shop.name}**`,
        deal.drm?.length ? `🔒 DRM: ${deal.drm.join(", ")}` : "",
        deal.expiry ? `⏰ Expires: <t:${deal.expiry}:R>` : "",
      ]
        .filter(Boolean)
        .join("\n");

      return {
        title: `🎮 ${deal.title}`,
        description,
        url: deal.url,
        image: deal.assets?.banner600 || deal.assets?.capsule,
        timestamp: new Date(deal.added * 1000),
        metadata: {
          dealId: deal.id,
          originalPrice: deal.regular.amount,
          currentPrice: deal.price.amount,
          discount: discountPercentage,
          shop: deal.shop.name,
          shopId: deal.shop.id,
          savings: parseFloat(savings),
          currency: deal.price.currency,
          added: deal.added,
          expiry: deal.expiry,
          drm: deal.drm || [],
          qualityScore: this.calculateQualityScore(deal),
        },
      };
    });
  }

  validateConfig(config: TaskConfig): boolean {
    if (config.type !== TaskType.GAME_DEALS) return false;
    if (!config.apiKey) {
      console.error("[GameDealsHandler] API key is required");
      return false;
    }
    return true;
  }

  protected getId(deal: ITADDeal): string {
    return `${deal.id}_${deal.shop.id}_${deal.added}`;
  }

  private calculateQualityScore(deal: ITADDeal): number {
    const discountScore = deal.cut / 100;
    const priceScore = Math.max(0, 1 - deal.price.amount / 60);
    return Math.round((discountScore * 0.7 + priceScore * 0.3) * 100);
  }

  protected async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt === maxRetries) break;

        // Don't retry on auth errors
        if (
          lastError.message.includes("401") ||
          lastError.message.includes("403")
        ) {
          throw lastError;
        }

        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(
          `[${this.type}] Attempt ${attempt} failed, retrying in ${delay}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }
}
