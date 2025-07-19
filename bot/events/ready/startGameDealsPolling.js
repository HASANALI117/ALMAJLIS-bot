import GameDealsService from "../../services/gameDealsService.js";

export default function (client) {
  const gameDealsService = new GameDealsService(client);

  gameDealsService.startPolling();
  client.gameDealsService = gameDealsService;

  console.log("Game deals service initialized and polling started");
}
