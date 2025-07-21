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
  19: {
    storeName: "2game",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/28.png",
      logo: "https://www.cheapshark.com/img/stores/logos/28.png",
      icon: "https://www.cheapshark.com/img/stores/icons/28.png",
    },
  },
  4: {
    storeName: "Blizzard",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/30.png",
      logo: "https://www.cheapshark.com/img/stores/logos/30.png",
      icon: "https://www.cheapshark.com/img/stores/icons/30.png",
    },
  },
  13: {
    storeName: "DLGamer",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/32.png",
      logo: "https://www.cheapshark.com/img/stores/logos/32.png",
      icon: "https://www.cheapshark.com/img/stores/icons/32.png",
    },
  },
  15: {
    storeName: "Dreamgame",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/34.png",
      logo: "https://www.cheapshark.com/img/stores/logos/34.png",
      icon: "https://www.cheapshark.com/img/stores/icons/34.png",
    },
  },
  16: {
    storeName: "Epic Game Store",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/24.png",
      logo: "https://www.cheapshark.com/img/stores/logos/24.png",
      icon: "https://www.cheapshark.com/img/stores/icons/24.png",
    },
  },
  6: {
    storeName: "Fanatical",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/14.png",
      logo: "https://www.cheapshark.com/img/stores/logos/14.png",
      icon: "https://www.cheapshark.com/img/stores/icons/14.png",
    },
  },
  20: {
    storeName: "GameBillet",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/22.png",
      logo: "https://www.cheapshark.com/img/stores/logos/22.png",
      icon: "https://www.cheapshark.com/img/stores/icons/22.png",
    },
  },
  24: {
    storeName: "GamersGate",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/1.png",
      logo: "https://www.cheapshark.com/img/stores/logos/1.png",
      icon: "https://www.cheapshark.com/img/stores/icons/1.png",
    },
  },
  25: {
    storeName: "Gamesload",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/27.png",
      logo: "https://www.cheapshark.com/img/stores/logos/27.png",
      icon: "https://www.cheapshark.com/img/stores/icons/27.png",
    },
  },
  26: {
    storeName: "GamesPlanet UK",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/26.png",
      logo: "https://www.cheapshark.com/img/stores/logos/26.png",
      icon: "https://www.cheapshark.com/img/stores/icons/26.png",
    },
  },
  27: {
    storeName: "GamesPlanet DE",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/26.png",
      logo: "https://www.cheapshark.com/img/stores/logos/26.png",
      icon: "https://www.cheapshark.com/img/stores/icons/26.png",
    },
  },
  28: {
    storeName: "GamesPlanet FR",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/26.png",
      logo: "https://www.cheapshark.com/img/stores/logos/26.png",
      icon: "https://www.cheapshark.com/img/stores/icons/26.png",
    },
  },
  29: {
    storeName: "GamesPlanet US",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/26.png",
      logo: "https://www.cheapshark.com/img/stores/logos/26.png",
      icon: "https://www.cheapshark.com/img/stores/icons/26.png",
    },
  },
  35: {
    storeName: "GOG",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/6.png",
      logo: "https://www.cheapshark.com/img/stores/logos/6.png",
      icon: "https://www.cheapshark.com/img/stores/icons/6.png",
    },
  },
  36: {
    storeName: "GreenManGaming",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/2.png",
      logo: "https://www.cheapshark.com/img/stores/logos/2.png",
      icon: "https://www.cheapshark.com/img/stores/icons/2.png",
    },
  },
  37: {
    storeName: "Humble Store",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/10.png",
      logo: "https://www.cheapshark.com/img/stores/logos/10.png",
      icon: "https://www.cheapshark.com/img/stores/icons/10.png",
    },
  },
  42: {
    storeName: "IndieGala Store",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/29.png",
      logo: "https://www.cheapshark.com/img/stores/logos/29.png",
      icon: "https://www.cheapshark.com/img/stores/icons/29.png",
    },
  },
  66: {
    storeName: "Noctre",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/33.png",
      logo: "https://www.cheapshark.com/img/stores/logos/33.png",
      icon: "https://www.cheapshark.com/img/stores/icons/33.png",
    },
  },
  61: {
    storeName: "Steam",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/0.png",
      logo: "https://www.cheapshark.com/img/stores/logos/0.png",
      icon: "https://www.cheapshark.com/img/stores/icons/0.png",
    },
  },
  62: {
    storeName: "Ubisoft Store",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/12.png",
      logo: "https://www.cheapshark.com/img/stores/logos/12.png",
      icon: "https://www.cheapshark.com/img/stores/icons/12.png",
    },
  },
  64: {
    storeName: "WinGameStore",
    images: {
      banner: "https://www.cheapshark.com/img/stores/banners/20.png",
      logo: "https://www.cheapshark.com/img/stores/logos/20.png",
      icon: "https://www.cheapshark.com/img/stores/icons/20.png",
    },
  },
};
