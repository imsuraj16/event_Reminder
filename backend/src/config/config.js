const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });

const config = Object.freeze({
    MONGODB_URI : process.env.MONGODB_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    VAPID_EMAIL: process.env.VAPID_EMAIL
})

module.exports = config