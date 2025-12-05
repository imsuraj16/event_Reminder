const webpush = require('web-push');
const config = require('../config/config');

webpush.setVapidDetails(
  config.VAPID_EMAIL.startsWith('mailto:') ? config.VAPID_EMAIL : `mailto:${config.VAPID_EMAIL}`,
  config.VAPID_PUBLIC_KEY,
  config.VAPID_PRIVATE_KEY
);

const sendNotification = async (subscription, payload) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error; 
  }
};

module.exports = { sendNotification };