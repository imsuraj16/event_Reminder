const mongoose = require("mongoose");
const User = require("./src/models/user.model");
const Event = require("./src/models/event.model");
const dotenv = require("dotenv");

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/event_reminder"
    );
    console.log("Connected to MongoDB");

    // Create a temp user
    const user = await User.create({
      fullName: { firstName: "Test", lastName: "User" },
      email: `test${Date.now()}@example.com`,
      userName: `testuser${Date.now()}`,
      password: "password123",
    });
    console.log("User created:", user._id);

    // Create a temp event
    const event = await Event.create({
      title: "Test Event",
      startTime: new Date(Date.now() + 60000), // 1 min from now
      userId: user._id,
      reminder: { enabled: true, remindBeforeMinutes: 5 },
    });
    console.log("Event created:", event._id);

    // Fetch and populate
    const fetchedEvent = await Event.findById(event._id).populate("userId");

    if (fetchedEvent.userId && fetchedEvent.userId.email === user.email) {
      console.log("SUCCESS: User populated correctly!");
    } else {
      console.error("FAILURE: User NOT populated!");
      console.log("Fetched Event userId:", fetchedEvent.userId);
    }

    // Cleanup
    await Event.findByIdAndDelete(event._id);
    await User.findByIdAndDelete(user._id);
    console.log("Cleanup done");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

run();
