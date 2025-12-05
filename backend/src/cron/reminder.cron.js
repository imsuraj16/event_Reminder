const cron = require("node-cron");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const { sendNotification } = require("../services/pushNotification.service");

const setupCronJobs = () => {
  // Run every minute - handles both reminders and status updates
  cron.schedule("* * * * *", async () => {
    console.log("Running reminder cron job...");
    try {
      const now = new Date();

      // ========== AUTO-COMPLETE PAST EVENTS ==========
      // Find events that are still "UPCOMING" but their endTime (or startTime if no endTime) has passed
      // Using $expr to handle the conditional logic
      const pastEvents = await Event.updateMany(
        {
          status: { $in: ["UPCOMING", "IN_PROGRESS"] },
          $or: [
            // If endTime exists, check if it has passed
            { endTime: { $exists: true, $lt: now } },
            // If no endTime, check if startTime has passed
            { endTime: { $exists: false }, startTime: { $lt: now } }
          ]
        },
        {
          $set: { status: "COMPLETED" },
        }
      );

      if (pastEvents.modifiedCount > 0) {
        console.log(`Auto-completed ${pastEvents.modifiedCount} past events`);
      }

      // Find candidate events
      // We look for events that are upcoming, have reminders enabled, and haven't sent a notification yet.
      // We also filter for events starting in the future (or very recently started if we want to catch late ones, but let's say future for now)
      const events = await Event.find({
        status: "UPCOMING",
        // "reminder.enabled": true, // Removed to support events without this field
        "reminder.notificationSent": false,
        startTime: { $gt: now },
      }).populate("userId");

      console.log(`Found ${events.length} candidate events for reminders.`);

      for (const event of events) {
        const timeUntilEvent = event.startTime - now;
        const minutesUntilEvent = timeUntilEvent / 60000;

        if (minutesUntilEvent <= event.reminder.remindBeforeMinutes) {
          // Time to send reminder
          const user = event.userId;
          if (!user) {
            console.error(
              `Failed to populate user for event ${event._id}. Check reference consistency.`
            );
            continue;
          }

          if (
            user &&
            user.pushSubscriptions &&
            user.pushSubscriptions.length > 0
          ) {
            console.log(`User ${user.userName} has ${user.pushSubscriptions.length} subscriptions.`);
            const payload = {
              title: `Reminder: ${event.title}`,
              body: `Your event starts in ${Math.round(
                minutesUntilEvent
              )} minutes.`,
              url: `/events/${event._id}`, // Or whatever the frontend URL is
            };

            console.log(
              `Sending reminder for event ${event._id} to user ${user.userName}`
            );

            // Track invalid subscriptions to remove them later
            const invalidEndpoints = [];

            // Send to all subscriptions
            const promises = user.pushSubscriptions.map((sub) =>
              sendNotification(sub, payload).catch((err) => {
                if (err.statusCode === 410 || err.statusCode === 404) {
                  // Subscription is invalid/expired
                  console.log(`Subscription expired/invalid for user ${user.userName}`);
                  invalidEndpoints.push(sub.endpoint);
                }
              })
            );

            const results = await Promise.all(promises);
            console.log(`Sent notifications to ${user.userName}. Results: ${results.length} attempts.`);

            // Remove invalid subscriptions
            if (invalidEndpoints.length > 0) {
              user.pushSubscriptions = user.pushSubscriptions.filter(
                (sub) => !invalidEndpoints.includes(sub.endpoint)
              );
              await user.save();
            }
          }

          // Mark as sent
          event.reminder.notificationSent = true;
          await event.save();
        }
      }
    } catch (error) {
      console.error("Error in reminder cron job:", error);
    }
  });
};

module.exports = setupCronJobs;