export const GAME_DEAL_CONSTANTS = {
  MAX_USER_ALERTS: 5,
  DEFAULT_MAX_PRICE: 60,
  DEFAULT_MIN_DISCOUNT: 50,
  POLLING_INTERVAL: 30 * 60 * 1000, // 30 minutes
  NOTIFICATION_COOLDOWN: 6 * 60 * 60 * 1000, // 6 hours
  API_TIMEOUT: 10000,
  STEAM_API_TIMEOUT: 5000,
};

export const ERROR_MESSAGES = {
  GAME_NOT_FOUND: "❌ Could not find a game named",
  NO_DEALS_FOUND: "📭 No current deals found for",
  ALERT_EXISTS: "❌ You already have an active alert for",
  MAX_ALERTS_REACHED: "❌ You can only have a maximum of 5 active game alerts",
  ALERT_NOT_FOUND: "❌ Could not find an active alert for",
  GENERIC_ERROR: "❌ An error occurred. Please try again later.",
};

export const STORES = {
  1: {
    storeName: "Steam",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/0.png",
      logo: "https://www.cheapshark.com/img/stores/logos/0.png",
      icon: "https://www.cheapshark.com/img/stores/icons/0.png",
    },
  },
  2: {
    storeName: "GamersGate",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/1.png",
      logo: "https://www.cheapshark.com/img/stores/logos/1.png",
      icon: "https://www.cheapshark.com/img/stores/icons/1.png",
    },
  },
  3: {
    storeName: "GreenManGaming",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/2.png",
      logo: "https://www.cheapshark.com/img/stores/logos/2.png",
      icon: "https://www.cheapshark.com/img/stores/icons/2.png",
    },
  },
  7: {
    storeName: "GOG",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/6.png",
      logo: "https://www.cheapshark.com/img/stores/logos/6.png",
      icon: "https://www.cheapshark.com/img/stores/icons/6.png",
    },
  },
  8: {
    storeName: "Origin",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/7.png",
      logo: "https://www.cheapshark.com/img/stores/logos/7.png",
      icon: "https://www.cheapshark.com/img/stores/icons/7.png",
    },
  },
  11: {
    storeName: "Humble Store",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/10.png",
      logo: "https://www.cheapshark.com/img/stores/logos/10.png",
      icon: "https://www.cheapshark.com/img/stores/icons/10.png",
    },
  },
  13: {
    storeName: "Uplay",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/12.png",
      logo: "https://www.cheapshark.com/img/stores/logos/12.png",
      icon: "https://www.cheapshark.com/img/stores/icons/12.png",
    },
  },
  15: {
    storeName: "Fanatical",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/14.png",
      logo: "https://www.cheapshark.com/img/stores/logos/14.png",
      icon: "https://www.cheapshark.com/img/stores/icons/14.png",
    },
  },
  21: {
    storeName: "WinGameStore",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/20.png",
      logo: "https://www.cheapshark.com/img/stores/logos/20.png",
      icon: "https://www.cheapshark.com/img/stores/icons/20.png",
    },
  },
  23: {
    storeName: "GameBillet",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/22.png",
      logo: "https://www.cheapshark.com/img/stores/logos/22.png",
      icon: "https://www.cheapshark.com/img/stores/icons/22.png",
    },
  },
  24: {
    storeName: "Voidu",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/23.png",
      logo: "https://www.cheapshark.com/img/stores/logos/23.png",
      icon: "https://www.cheapshark.com/img/stores/icons/23.png",
    },
  },
  25: {
    storeName: "Epic Games Store",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/24.png",
      logo: "https://www.cheapshark.com/img/stores/logos/24.png",
      icon: "https://www.cheapshark.com/img/stores/icons/24.png",
    },
  },
  27: {
    storeName: "Gamesplanet",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/26.png",
      logo: "https://www.cheapshark.com/img/stores/logos/26.png",
      icon: "https://www.cheapshark.com/img/stores/icons/26.png",
    },
  },
  28: {
    storeName: "Gamesload",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/27.png",
      logo: "https://www.cheapshark.com/img/stores/logos/27.png",
      icon: "https://www.cheapshark.com/img/stores/icons/27.png",
    },
  },
  29: {
    storeName: "2Game",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/28.png",
      logo: "https://www.cheapshark.com/img/stores/logos/28.png",
      icon: "https://www.cheapshark.com/img/stores/icons/28.png",
    },
  },
  30: {
    storeName: "IndieGala",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/29.png",
      logo: "https://www.cheapshark.com/img/stores/logos/29.png",
      icon: "https://www.cheapshark.com/img/stores/icons/29.png",
    },
  },
  31: {
    storeName: "Blizzard Shop",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/30.png",
      logo: "https://www.cheapshark.com/img/stores/logos/30.png",
      icon: "https://www.cheapshark.com/img/stores/icons/30.png",
    },
  },
  33: {
    storeName: "DLGamer",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/32.png",
      logo: "https://www.cheapshark.com/img/stores/logos/32.png",
      icon: "https://www.cheapshark.com/img/stores/icons/32.png",
    },
  },
  34: {
    storeName: "Noctre",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/33.png",
      logo: "https://www.cheapshark.com/img/stores/logos/33.png",
      icon: "https://www.cheapshark.com/img/stores/icons/33.png",
    },
  },
  35: {
    storeName: "DreamGame",
    isActive: true,
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/34.png",
      logo: "https://www.cheapshark.com/img/stores/logos/34.png",
      icon: "https://www.cheapshark.com/img/stores/icons/34.png",
    },
  },
};
