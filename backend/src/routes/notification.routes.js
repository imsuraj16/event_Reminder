const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/subscribe', authMiddleware, notificationController.subscribe);
router.get('/vapid-public-key', authMiddleware, notificationController.getVapidPublicKey);

module.exports = router;
