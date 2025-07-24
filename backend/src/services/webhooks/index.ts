import { GameDealAlert } from "../../models";
import { publishDealNotification, publishPingEvent } from "../redis";

/**
 * Process ITAD ping events for webhook testing
 */
export const processPingEvent = async (
  hookId: string,
  body: string
): Promise<void> => {
  try {
    const payload = typeof body === "string" ? body : String(body);

    // Store ping event in database for audit trail
    const pingAlert = new GameDealAlert({
      hookId,
      eventType: "ping",
      pingPayload: payload,
      processed: true,
      notificationSent: false,
    });

    await pingAlert.save();

    // Publish ping event to Redis for real-time testing
    const published = await publishPingEvent({
      hookId,
      eventType: "ping",
      payload,
      timestamp: new Date().toISOString(),
    });

    if (published) {
      console.log(`✅ Ping event published to Redis: ${hookId}`);

      // Update notification status
      pingAlert.notificationSent = true;
      await pingAlert.save();
    }

    // Validate ping response
    if (payload === "pong") {
      console.log(`✅ Webhook ${hookId} ping test successful`);
    } else {
      console.warn(
        `⚠️ Unexpected ping payload for webhook ${hookId}: ${payload}`
      );
    }
  } catch (error) {
    console.error(`❌ Error processing ping event for ${hookId}:`, error);
    throw error;
  }
};

/**
 * Process ITAD waitlist notifications for game deals
 */
export const processWaitlistNotification = async (
  hookId: string,
  games: any[]
) => {
  try {
    // Store the notification in database
    const dealAlert = new GameDealAlert({
      hookId: hookId,
      eventType: "notification-waitlist",
      games,
      processed: false,
      notificationSent: false,
    });

    await dealAlert.save();

    // Publish to Redis for real-time bot notification
    const published = await publishDealNotification(dealAlert);

    if (published) {
      // Mark as processed after successful Redis publish
      dealAlert.processed = true;
      dealAlert.notificationSent = true;
      await dealAlert.save();
      console.log(`✅ Deal notification published to Redis successfully`);
    }

    return dealAlert;
  } catch (error) {
    console.error(
      `❌ Error processing waitlist notification for ${hookId}:`,
      error
    );
    throw error;
  }
};
