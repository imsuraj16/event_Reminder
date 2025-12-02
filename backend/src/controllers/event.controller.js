const eventModel = require("../models/event.model");

// Create Event Controller
const createEvent = async (req, res) => {
  try {
    const user = req.user._id;
    const {
      title,
      description,
      startTime,
      endTime,
      status,
      remindBeforeMinutes,
    } = req.body;

    const event = await eventModel.create({
      title,
      description,
      startTime,
      endTime,
      status,
      reminder: {
        remindBeforeMinutes: remindBeforeMinutes || 30,
      },
      userId: user,
    });

    return res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

//get loggedIn Events Controller
const getLoggedInEvents = async (req, res) => {
  try {
    const user = req.user._id;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const { status } = req.query;

    const filter = { userId: user };
    if (status) {
      filter.status = status;
    }

    const events = await eventModel.find(filter).sort({ startTime: 1 });

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

//update Event Controller
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    const user = req.user._id;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const {
      title,
      description,
      startTime,
      endTime,
      status,
      remindBeforeMinutes,
    } = req.body || {};

    const event = await eventModel.findOneAndUpdate(
      {
        _id: eventId,
        userId: user,
      },
      {
        title,
        description,
        startTime,
        endTime,
        status,
        reminder: {
          remindBeforeMinutes: remindBeforeMinutes,
        },
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message:
          "Event not found or you are not authorized to update this event",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

//delete Event Controller
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    const user = req.user._id;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const event = await eventModel.findOneAndDelete({
      _id: eventId,
      userId: user,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message:
          "Event not found or you are not authorized to delete this event",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

module.exports = {
  createEvent,
  getLoggedInEvents,
  updateEvent,
  deleteEvent,
};
