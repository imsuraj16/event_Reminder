const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      maxlength: 1000,
    },

    location: {
      type: String,
      trim: true,
      default: "TBD",
    },

    startTime: {
      type: Date,
      required: true,
      index: true,
    },

    endTime: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["UPCOMING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "UPCOMING",
      index: true,
    },

    // Reminder config for Web Push
    reminder: {
      remindBeforeMinutes: {
        type: Number,
        default: 30, // assignment requirement
        min: 0,
      },
      notificationSent: {
        type: Boolean,
        default: false,
      },
      enabled: {
        type: Boolean,
        default: true,
      },
    },
    scheduledAt: {
      type: Date, // job scheduler ne kab schedule kiya
    },
    sentAt: {
      type: Date, // notification kab actually gayi
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// helpful index for dashboard and reminder queries
eventSchema.index({ userId: 1, startTime: 1 });
eventSchema.index({ userId: 1, status: 1 });

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;