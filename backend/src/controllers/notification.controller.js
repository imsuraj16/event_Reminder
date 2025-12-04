const User = require('../models/user.model');
const config = require('../config/config');

module.exports.subscribe = async (req, res) => {
  try {
    const subscription = req.body;
    const userId = req.user._id; // Assuming auth middleware populates req.user

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ message: 'Invalid subscription object' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if subscription already exists
    const subscriptionExists = user.pushSubscriptions.some(
      (sub) => sub.endpoint === subscription.endpoint
    );

    if (!subscriptionExists) {
      user.pushSubscriptions.push(subscription);
      await user.save();
    }

    res.status(201).json({ message: 'Subscription added successfully' });
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getVapidPublicKey = (req, res) => {
  res.status(200).json({ publicKey: config.VAPID_PUBLIC_KEY });
};
