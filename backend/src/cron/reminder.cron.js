const cron = require('node-cron');
const Event = require('../models/event.model');
const User = require('../models/user.model');
const { sendNotification } = require('../services/pushNotification.service');

const setupCronJobs = () => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    console.log('Running reminder cron job...');
    try {
      const now = new Date();
      
      // Find candidate events
      // We look for events that are upcoming, have reminders enabled, and haven't sent a notification yet.
      // We also filter for events starting in the future (or very recently started if we want to catch late ones, but let's say future for now)
      const events = await Event.find({
        status: 'UPCOMING',
        'reminder.enabled': true,
        'reminder.notificationSent': false,
        startTime: { $gt: now } 
      }).populate('userId');

      for (const event of events) {
        const timeUntilEvent = event.startTime - now;
        const minutesUntilEvent = timeUntilEvent / 60000;

        if (minutesUntilEvent <= event.reminder.remindBeforeMinutes) {
          // Time to send reminder
          const user = event.userId;
          
          if (user && user.pushSubscriptions && user.pushSubscriptions.length > 0) {
            const payload = {
              title: `Reminder: ${event.title}`,
              body: `Your event starts in ${Math.round(minutesUntilEvent)} minutes.`,
              url: `/events/${event._id}` // Or whatever the frontend URL is
            };

            console.log(`Sending reminder for event ${event._id} to user ${user.userName}`);

            // Send to all subscriptions
            const promises = user.pushSubscriptions.map(sub => 
              sendNotification(sub, payload)
                .catch(err => {
                    if (err.statusCode === 410 || err.statusCode === 404) {
                        // Subscription is invalid/expired, could remove it here
                        console.log('Subscription expired/invalid');
                    }
                })
            );

            await Promise.all(promises);
          }

          // Mark as sent
          event.reminder.notificationSent = true;
          await event.save();
        }
      }
    } catch (error) {
      console.error('Error in reminder cron job:', error);
    }
  });
};

module.exports = setupCronJobs;
