const express = require('express');
const { createEvent, getLoggedInEvents, updateEvent, deleteEvent } = require('../controllers/event.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const { eventValidator, updateEventValidator } = require('../middlewares/validators/event.validator');


const router = express.Router();

// Create Event Route
router.post('/',authMiddleware, eventValidator,createEvent)

// Get LoggedIn Events Route
router.get('/', authMiddleware, getLoggedInEvents);

//update Event Route
router.patch('/:eventId', authMiddleware, updateEventValidator, updateEvent);

//delete Event
router.delete('/:eventId', authMiddleware, deleteEvent);


module.exports = router;