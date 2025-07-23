import { GameDealAlert } from "../../models";
// import { publishDealNotification, publishPingEvent } from "../redis";

export const processPingEvent = async (hookId: string, body: string) => {
  console.log(`Ping event received for webhook ${hookId}: ${body}`);

  // Handle the ping payload
  const payload = typeof body === "string" ? body : String(body);

  // Store ping event in database
  const pingAlert = new GameDealAlert({
    hookId: hookId,
    eventType: "ping",
    pingPayload: payload,
    processed: true,
    notificationSent: false,
  });

  await pingAlert.save();

  // Publish ping event to Redis for testing
  // await publishPingEvent({
  //   hookId,
  //   eventType: "ping",
  //   payload,
  //   timestamp: new Date().toISOString(),
  // });

  if (payload === "pong") {
    console.log(`✅ Webhook ${hookId} ping test successful`);
  } else {
    console.warn(
      `⚠️ Unexpected ping payload for webhook ${hookId}: ${payload}`
    );
  }
};

export const processWaitlistNotification = async (
  hookId: string,
  games: any[]
) => {
  try {
    console.log(`Processing waitlist notification for ${games.length} games`);

    // Store the notification in database
    const dealAlert = new GameDealAlert({
      hookId: hookId,
      eventType: "notification-waitlist",
      games: games,
      processed: false,
      notificationSent: false,
    });

    await dealAlert.save();
    console.log(
      `✅ Stored waitlist notification in database - Change stream will process it`
    );

    // Publish to Redis for real-time bot notification
    // const published = await publishDealNotification(dealAlert);

    // if (published) {
    //   // Mark as processed after successful Redis publish
    //   dealAlert.processed = true;
    //   dealAlert.notificationSent = true;
    //   await dealAlert.save();
    //   console.log(`✅ Deal notification published to Redis successfully`);
    // }

    // Process each game's deals
    for (const game of games) {
      console.log(`Game: ${game.title} has ${game.deals.length} deals`);
      for (const deal of game.deals) {
        console.log(
          `  - ${deal.shop.name}: ${deal.price.amount} ${deal.price.currency} (${deal.cut}% off)`
        );
      }
    }

    return dealAlert;
  } catch (error) {
    console.error("❌ Error processing waitlist notification:", error);
    throw error;
  }
};
